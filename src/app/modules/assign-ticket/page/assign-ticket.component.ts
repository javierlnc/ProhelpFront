import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { isFieldRequired } from '@utils/validators/validators';
import { CloseModalComponent } from '../components/close-modal/close-modal.component';
import { UsermanagmentService } from '@services/usermanagment.service';
import { TicketsService } from '@services/tickets.service';
import { TicketResponse } from '@interfaces/ticket-response';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-assign-ticket',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CloseModalComponent],
  templateUrl: './assign-ticket.component.html',
  styleUrls: ['./assign-ticket.component.css'],
  providers: [DatePipe],
})
export default class AssignTicketComponent implements OnInit {
  ticketId!: number;
  ticketResponse!: TicketResponse;
  ticketForm: FormGroup;
  users: any[] = [];
  isCloseEnabled: boolean = false;
  showModal = false;
  rol = this.authService.getUser()?.rol;

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketsService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private router: Router,
    private userManagmentService: UsermanagmentService,
    private authService: AuthService
  ) {
    this.ticketForm = this.initForm();
  }

  ngOnInit(): void {
    this.initialize();
  }

  private initialize(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.ticketId = +id;
        this.getTicket();
      } else {
        console.error('ID del ticket no encontrado');
      }
    });
    this.getUsersList();
  }

  private initForm(): FormGroup {
    return this.formBuilder.group({
      subject: ['', Validators.required],
      requesterName: ['', Validators.required],
      id: ['', Validators.required],
      description: ['', Validators.required],
      priorityId: ['', Validators.required],
      assignedTechnicianId: ['', Validators.required],
      createdDate: ['', Validators.required],
      category: ['', Validators.required],
      dueDate: '',
    });
  }

  getTicket(): void {
    this.ticketService.getTicketById(this.ticketId).subscribe({
      next: (res) => {
        this.ticketResponse = res;
        this.updateButtonStatus();
        this.populateTicketForm(res);
      },
      error: (err) => this.handleError(err, 'Error al cargar solicitud'),
    });
  }

  private populateTicketForm(ticket: TicketResponse): void {
    const formattedCreatedDate = this.datePipe.transform(
      ticket.createdDate,
      'dd/MM/yyyy, h:mm a'
    );
    const formattedDueDate = ticket.dueDate
      ? this.datePipe.transform(ticket.dueDate, 'dd/MM/yyyy, h:mm a')
      : '';

    this.ticketForm.patchValue({
      subject: ticket.subject,
      requesterName: ticket.requesterName,
      id: ticket.id,
      description: ticket.description,
      priorityId: ticket.priorityId,
      assignedTechnicianId: ticket.assignedTechnicianId,
      createdDate: formattedCreatedDate,
      category: ticket.category,
      dueDate: formattedDueDate,
    });
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  isRequired(field: string): boolean {
    return isFieldRequired(field, this.ticketForm);
  }

  getUsersList(): void {
    this.userManagmentService.getUsersFilter().subscribe({
      next: (res) => (this.users = res),
      error: (err) => this.handleError(err, 'Error al cargar técnicos'),
    });
  }

  private updateButtonStatus(): void {
    this.isCloseEnabled = ['OPEN', 'ON_HOLD'].includes(
      this.ticketResponse.status
    );
  }

  private handleError(error: any, message: string): void {
    const errorMsg = error?.error?.message || message;
    toast.error(errorMsg);
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/tickets']);
  }

  onAssign(): void {
    const { assignedTechnicianId, priorityId, id } = this.ticketForm.value;
    this.ticketService
      .assignTechnicianAndPriority(id, assignedTechnicianId, priorityId)
      .subscribe({
        next: () => {
          this.router.navigate(['/dashboard/tickets']);
          toast.success('Solicitud asignada');
        },
        error: (err) => this.handleError(err, 'Error al asignar solicitud'),
      });
  }
}
