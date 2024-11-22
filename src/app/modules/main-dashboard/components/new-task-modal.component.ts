import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { TaskService } from '@services/task.service';
import { TicketsService } from '@services/tickets.service';
import { UsermanagmentService } from '@services/usermanagment.service';
import { isFieldRequired } from '@utils/validators/validators';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-ntamodal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-task-modal.component.html',
  styleUrl: './new-task-modal.component.css',
})
export class NewTaskModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  tickets: any[] = [];
  users: any[] = [];
  createForm: FormGroup;
  role = this.authService.getUser()?.rol;
  userId = this.authService.getUser()?.userId;
  isAdmin: boolean = this.role === 'ADMIN';

  constructor(
    private ticketService: TicketsService,
    private authService: AuthService,
    private userManagmentService: UsermanagmentService,
    private formBuilder: FormBuilder,
    private taskService: TaskService
  ) {
    this.createForm = this.initForm();
  }

  ngOnInit(): void {
    this.getTickets();
    this.getUsersList();

    if (!this.isAdmin && this.userId) {
      this.createForm.patchValue({
        responsibleUserId: this.userId,
      });
    }
  }

  private initForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      assignTicketId: ['', Validators.required],
      responsibleUserId: ['', Validators.required],
    });
  }

  getTickets(): void {
    if (!this.userId || !this.role) {
      toast.error('Error al obtener el usuario autenticado');
      return;
    }

    this.ticketService.getTicketsListByUser().subscribe({
      next: (res: any[]) => {
        this.tickets = res.filter((ticket) => {
          const isOpen = ticket.status === 'OPEN';
          return this.isAdmin
            ? isOpen
            : isOpen && ticket.assignedTechnician?.id === this.userId;
        });
      },
      error: (err) => {
        const errorMsg = err?.error?.message || 'Error al obtener los tickets';
        toast.error(errorMsg);
      },
    });
  }

  getUsersList(): void {
    this.userManagmentService.getUsersFilter().subscribe({
      next: (res) => (this.users = res),
      error: (err) => this.handleError(err, 'Error al cargar técnicos'),
    });
  }

  closeModal(): void {
    this.close.emit();
  }

  private handleError(error: any, message: string): void {
    const errorMsg = error?.error?.message || message;
    toast.error(errorMsg);
  }
  isRequired(field: string): boolean {
    return isFieldRequired(field, this.createForm);
  }
  submitForm() {
    if (this.createForm.valid) {
      this.taskService.createTask(this.createForm.value).subscribe({
        next: () => {
          toast.success('Tarea asignada');
          this.closeModal();
        },
        error: (err) => this.handleError(err, 'Error al crear la tarea'),
      });
    } else {
      toast.error('Por favor, completa todos los campos requeridos');
    }
  }
}
