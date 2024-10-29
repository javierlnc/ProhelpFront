import { UsermanagmentService } from '@services/usermanagment.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import { TicketResponse } from '@interfaces/ticket-response';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { TicketsService } from '@services/tickets.service';
import { isFieldRequired } from '@utils/validators/validators';

@Component({
  selector: 'app-assign-ticket',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
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

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketsService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private router: Router,
    private userManagmentService: UsermanagmentService
  ) {
    this.ticketForm = this.formBuilder.group({
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

  ngOnInit(): void {
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

  getTicket(): void {
    this.ticketService.getTicketById(this.ticketId).subscribe({
      next: (res) => {
        this.ticketResponse = res;
        this.checkButtonStatus();
        this.patchTicketForm(res);
      },
      error: (err) => {
        const errorMsg = err?.error?.message || 'Error al cargar solicitud';
        toast.error(errorMsg);
      },
    });
  }

  private patchTicketForm(ticket: TicketResponse): void {
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
  isRequired(field: string): boolean {
    return isFieldRequired(field, this.ticketForm);
  }
  getUsersList(): void {
    this.userManagmentService.getUsersFilter().subscribe({
      next: (res) => {
        this.users = res;
      },
      error: (err) => {
        const errorMsg = err?.error?.message || 'Error al cargar técnicos';
        toast.error(errorMsg);
      },
    });
  }

  private checkButtonStatus(): void {
    this.isCloseEnabled =
      this.ticketResponse.status === 'OPEN' ||
      this.ticketResponse.status === 'ON_HOLD';
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
        error: (err) => {
          const errorMsg = err?.error?.message || 'Error al asignar solicitud';
          toast.error(errorMsg);
        },
      });
  }
}
