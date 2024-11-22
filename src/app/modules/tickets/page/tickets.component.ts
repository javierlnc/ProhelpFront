import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewSolicitudModalComponent } from '../components/new-solicitud-modal/new-solicitud-modal.component';
import { TicketsService } from '@services/tickets.service';
import { toast } from 'ngx-sonner';
import { StatusMapping } from '@utils/status-mapping/status-mapping';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-solicitudes',
  standalone: true,
  imports: [NewSolicitudModalComponent, CommonModule],
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export default class TicketsComponent implements OnInit {
  private ticketService = inject(TicketsService);
  private authService = inject(AuthService);
  private router = inject(Router);
  rol = this.authService.getUser()?.rol;
  tickets: any[] = [];

  showModal = false;

  ngOnInit(): void {
    this.getTickets();
  }

  getTickets(): void {
    this.ticketService.getTicketsListByUser().subscribe({
      next: (res: any[]) => {
        this.tickets = res.filter((res) => res.status !== 'RESOLVED');
      },
      error: (err) => {
        const errorMsg = err?.error?.message || 'Error al obtener los tickets';
        toast.error(errorMsg);
      },
    });
  }
  trackByTicketId(index: number, ticket: any): number {
    return ticket.id;
  }
  getTicketStatusName(status: string): string {
    return StatusMapping[status as keyof typeof StatusMapping] || status;
  }

  toAssign(ticketId: number): void {
    this.router.navigate([`dashboard/assign-ticket/${ticketId}`]);
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.getTickets();
  }
}
