import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { NewSolicitudModalComponent } from '../components/new-solicitud-modal/new-solicitud-modal.component';
import { TicketsService } from '@services/tickets.service';
import { toast } from 'ngx-sonner';
import { StatusMapping } from '@utils/status-mapping/status-mapping';

@Component({
  selector: 'app-solicitudes',
  standalone: true,
  imports: [NewSolicitudModalComponent, CommonModule],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css',
})
export default class TicketsComponent implements OnInit {
  ticketService = inject(TicketsService);
  tickets: any[] = [];

  ngOnInit(): void {
    this.getTickets();
  }

  getTickets() {
    this.ticketService.getTicketsListByUser().subscribe({
      next: (res) => {
        this.tickets = res;
        console.log(this.tickets);
      },
      error: (err) => {
        const errorMsg = err?.error?.message || 'Error al crear la categoría';
        toast.error(errorMsg);
      },
    });
  }
  getTicketStatusName(status: string): string {
    return StatusMapping[status as keyof typeof StatusMapping] || status;
  }

  showModal: boolean = false;
  openModal() {
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
  }
}
