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
import { CommonModule, DatePipe } from '@angular/common'; // Importa DatePipe
import { TicketsService } from '@services/tickets.service';

@Component({
  selector: 'app-assign-ticket',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './assign-ticket.component.html',
  styleUrl: './assign-ticket.component.css',
  providers: [DatePipe], // Declara el proveedor de DatePipe
})
export default class AssignTicketComponent implements OnInit {
  ticketId!: number;
  ticketResponse!: TicketResponse;
  ticketForm: FormGroup;
  users: any;

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
      dueDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.ticketId = +id;
      } else {
        console.error('ID del ticket no encontrado');
      }
    });
    this.getTicket();
    this.getUsersList();
  }

  getTicket() {
    this.ticketService.getTicketById(this.ticketId).subscribe({
      next: (res) => {
        this.ticketResponse = res;

        // Formatea las fechas con DatePipe
        const formattedCreatedDate = this.datePipe.transform(
          res.createdDate,
          'dd/MM/yyyy, h:mm a'
        );
        const formattedDueDate = res.dueDate
          ? this.datePipe.transform(res.dueDate, 'dd/MM/yyyy, h:mm a')
          : '';

        // Configura el valor del formulario
        this.ticketForm.patchValue({
          subject: res.subject,
          requesterName: res.requesterName,
          id: res.id,
          description: res.description,
          priorityId: res.priorityId,
          assignedTechnicianId: res.assignedTechnicianId,
          createdDate: formattedCreatedDate, // Usa la fecha formateada
          category: res.category,
          dueDate: formattedDueDate, // Usa la fecha formateada
        });
      },
      error: (err) => {
        const errorMsg = err?.error?.message || 'Error al cargar solicitud';
        toast.error(errorMsg);
      },
    });
  }
  getUsersList() {
    this.userManagmentService.getUsersFilter().subscribe({
      next: (res) => {
        this.users = res;
      },
      error: (err) => {
        const errorMsg = err?.error?.message || 'Error al cargar tecnicos';
        toast.error(errorMsg);
      },
    });
  }
  onCancel() {
    this.router.navigate(['/dashboard/tickets']);
  }
  onAssing() {
    const { assignedTechnicianId, priorityId, id } = this.ticketForm.value;
    this.ticketService
      .assignTechnicianAndPriority(id, assignedTechnicianId, priorityId)
      .subscribe({
        next: () => {
          this.router.navigate(['/dashboard/tickets']);
          toast.success(`solicitud asignada`);
        },
        error: (err) => {
          const errorMsg = err?.error?.message || 'Error al asignar solicitud';
          toast.error(errorMsg);
        },
      });
  }
}
