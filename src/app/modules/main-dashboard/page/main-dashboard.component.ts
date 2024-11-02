import { CloseModalComponent } from './../../assign-ticket/components/close-modal/close-modal.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@layout/header/header.component';
import { SidebarComponent } from '@layout/sidebar/sidebar.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TicketsService } from '@services/tickets.service';
import { toast } from 'ngx-sonner';
import { TaskService } from '@services/task.service';
import { TaskResponse } from '@interfaces/task-response';
import { TicketResponse } from '@interfaces/ticket-response';
import { UsermanagmentService } from '@services/usermanagment.service';
import { NewTaskModalComponent } from '../components/new-task-modal.component';

@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    SidebarComponent,
    RouterOutlet,
    RouterLink,
    NewTaskModalComponent,
  ],
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.css',
})
export default class MainDashboardComponent implements OnInit {
  tickets: any[] = [];
  approvalList: any[] = [];
  taskList: TaskResponse[] = [];
  totalResolvedTickets!: number;
  totalNewTickets!: number;
  showModal: boolean = false;

  constructor(
    private ticketService: TicketsService,
    private taskService: TaskService,
    private usermanagmentService: UsermanagmentService
  ) {}
  ngOnInit(): void {
    this.getTickets();
    this.getApprovalList();
    this.getTaskList();
  }
  getApprovalList(): void {
    this.ticketService.getApprovingTickets().subscribe({
      next: (res: any[]) => {
        this.approvalList = res;
      },
      error: (err) => {
        const errorMsg =
          err?.error?.message || 'Error al obtener la lista de aprovación';
        toast.error(errorMsg);
      },
    });
  }
  getTickets(): void {
    this.ticketService.getTicketsListByUser().subscribe({
      next: (res: any[]) => {
        this.tickets = res.filter((res) => res.status !== 'RESOLVED');
        this.totalResolvedTickets = res.filter(
          (ticket) => ticket.status === 'RESOLVED'
        ).length;
        this.totalNewTickets = res.filter(
          (ticket) => ticket.status === 'NEW'
        ).length;
      },
      error: (err) => {
        const errorMsg = err?.error?.message || 'Error al obtener los tickets';
        toast.error(errorMsg);
      },
    });
  }
  getTaskList(): void {
    this.taskService.getTaskForUser().subscribe({
      next: (res: TaskResponse[]) => {
        this.taskList = res.filter((res) => res.status === 'OPEN');
      },
    });
  }
  checkTask(taskId: number): void {
    debugger;
    this.taskService.closeTask(taskId).subscribe({
      next: () => {
        toast.success('Se ha cerrado la tarea');
        this.getTaskList();
      },
      error: (err) => {
        toast.error('No se pudo cerrar la tarea');
      },
    });
  }
  openModal(): void {
    this.showModal = true;
  }
  closeModal(): void {
    this.showModal = false;
    this.getTickets();
    this.getApprovalList();
    this.getTaskList();
  }
}
