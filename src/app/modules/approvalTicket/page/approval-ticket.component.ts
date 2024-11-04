import { UsermanagmentService } from '@services/usermanagment.service';
import { TicketsService } from '@services/tickets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { toast } from 'ngx-sonner';
import { CommonModule, DatePipe } from '@angular/common';
import { isFieldRequired } from '@utils/validators/validators';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApprovalResponse } from '@interfaces/approvalResponse';

@Component({
  selector: 'app-apticket',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './approval-ticket.component.html',
  styleUrl: './approval-ticket.component.css',
  providers: [DatePipe],
})
export default class ApprovalTicketComponent implements OnInit {
  ticketId!: number;
  ticketToApproval!: ApprovalResponse;
  users: any[] = [];
  approveForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private ticketsService: TicketsService,
    private usermanagmentService: UsermanagmentService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private router: Router
  ) {
    this.approveForm = this.initForm();
  }
  ngOnInit(): void {
    this.initialize();
    this.getUsersList();
  }

  private initialize(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.ticketId = +id;
        this.getTicketToApproval(this.ticketId);
      } else {
        console.error('ID del ticket no encontrado');
      }
    });
  }
  private getTicketToApproval(ticketId: number) {
    this.ticketsService.getTicketApproval(ticketId).subscribe({
      next: (res) => {
        this.ticketToApproval = res;
        console.log(this.ticketToApproval);
        this.populateTicketForm(res);
      },
      error: (err) => this.handleError(err, 'Error al cargar solicitud'),
    });
  }
  private getUsersList(): void {
    this.usermanagmentService.getUsersFilter().subscribe({
      next: (res) => (this.users = res),
      error: (err) => this.handleError(err, 'Error al cargar técnicos'),
    });
  }
  private initForm(): FormGroup {
    return this.formBuilder.group({
      subject: ['', Validators.required],
      requesterName: ['', Validators.required],
      id: ['', Validators.required],
      description: ['', Validators.required],
      priorityName: ['', Validators.required],
      assignedTechnicianName: ['', Validators.required],
      createdDate: ['', Validators.required],
      category: ['', Validators.required],
      dueDate: ['', Validators.required],
      closeByName: ['', Validators.required],
      resolutionDate: ['', Validators.required],
      resolutionDescription: ['', Validators.required],
    });
  }
  private populateTicketForm(ticket: ApprovalResponse): void {
    const formattedCreatedDate = this.datePipe.transform(
      ticket.createdDate,
      'dd/MM/yyyy, h:mm a'
    );
    const formattedDueDate = ticket.dueDate
      ? this.datePipe.transform(ticket.dueDate, 'dd/MM/yyyy, h:mm a')
      : '';
    const formattedResolutionDate = this.datePipe.transform(
      ticket.resolutionDate,
      'dd/MM/yyyy, h:mm a'
    );

    this.approveForm.patchValue({
      subject: this.ticketToApproval.subject,
      requesterName: this.ticketToApproval.requesterName,
      id: this.ticketToApproval.id,
      description: this.ticketToApproval.description,
      priorityName: this.ticketToApproval.priorityName,
      assignedTechnicianName: this.ticketToApproval.assignedTechnicianName,
      createdDate: formattedCreatedDate,
      category: this.ticketToApproval.category,
      dueDate: formattedDueDate,
      closeByName: this.ticketToApproval.closeByName,
      resolutionDate: formattedResolutionDate,
      resolutionDescription: this.ticketToApproval.resolutionDescription,
    });
  }
  onApproved() {
    this.ticketsService.approvalOrRefue(this.ticketId, 1).subscribe({
      next: () => {
        toast.success(`La solicitud "${this.ticketId}" ha sido resuelta`);
        this.router.navigate(['/dashboard/main']);
      },
      error: (err) => this.handleError(err, 'Error al cargar solicitud'),
    });
  }
  onRefused() {
    this.ticketsService.approvalOrRefue(this.ticketId, 2).subscribe({
      next: () => {
        toast.success(
          `La solicitud "${this.ticketId}" ha sido rrechazada y vuelto a abrir`
        );
        this.router.navigate(['/dashboard/main']);
      },
      error: (err) => this.handleError(err, 'Error al cargar solicitud'),
    });
  }
  onCancel() {
    this.router.navigate(['/dashboard/main']);
  }

  private handleError(error: any, message: string): void {
    const errorMsg = error?.error?.message || message;
    toast.error(errorMsg);
  }
}
