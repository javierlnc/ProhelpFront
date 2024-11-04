import { UsermanagmentService } from '@services/usermanagment.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PanelService } from '@services/panel.service';
import { TicketsService } from '@services/tickets.service';
import {
  Chart,
  ChartConfiguration,
  ChartData,
  ArcElement,
  Tooltip,
  Legend,
  PieController,
} from 'chart.js';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export default class PanelComponent implements OnInit {
  ticketsByCategories: any;
  ticketsByUsers: any;
  totalTickets: any;
  ticketsOverdue: any;
  openTicketsCount!: number;
  pendingApprovalCount!: number;
  resolvedTicketsCount!: number;
  tecUser!: number;
  private chart!: any;

  constructor(
    private panelService: PanelService,
    private ticketService: TicketsService,
    private usermanagmentService: UsermanagmentService
  ) {}

  ngOnInit(): void {
    Chart.register(PieController, ArcElement, Tooltip, Legend);

    this.getTicketByCategories();
    this.getTicketsByUser();
    this.getTicketsList();
    this.getTicketsOverdue();
    this.getUsersList();
  }
  getTicketsOverdue() {
    this.panelService.getTicketsOverdue().subscribe({
      next: (res) => {
        this.ticketsOverdue = res.length;
      },
    });
  }

  getTicketByCategories() {
    this.panelService.getListCategories().subscribe({
      next: (res) => {
        this.ticketsByCategories = res;
      },
    });
  }

  getTicketsByUser() {
    this.panelService.getTicketsList().subscribe({
      next: (res) => {
        this.ticketsByUsers = res;
        console.log(this.ticketsByUsers);
      },
    });
  }

  getTicketsList(): void {
    this.ticketService.getTicketsListByUser().subscribe({
      next: (res) => {
        this.totalTickets = res.length;

        this.openTicketsCount = res.filter(
          (ticket: any) => ticket.status === 'OPEN'
        ).length;
        this.pendingApprovalCount = res.filter(
          (ticket: any) => ticket.status === 'PENDING_APPROVAL'
        ).length;
        this.resolvedTicketsCount = res.filter(
          (ticket: any) => ticket.status === 'RESOLVED'
        ).length;
        this.loadPieChart();
      },
      error: (err) => {
        console.error('Error al obtener la lista de tickets', err);
      },
    });
  }
  getUsersList() {
    this.usermanagmentService.getUsersFilter().subscribe({
      next: (res) => {
        this.tecUser = res.length;
        console.log(res);
        console.log(this.tecUser);
      },
    });
  }

  loadPieChart(): void {
    // Verifica si el gráfico ya existe y destrúyelo si es necesario
    if (this.chart) {
      this.chart.destroy();
    }

    const dataPie: ChartData<'pie', number[], string> = {
      labels: ['Abiertos', 'Esperando Aprobación', 'Resueltos'],
      datasets: [
        {
          label: 'Estado de Tickets',
          data: [
            this.openTicketsCount,
            this.pendingApprovalCount,
            this.resolvedTicketsCount,
          ],
          backgroundColor: [
            'rgb(33, 36, 38)',
            'rgb(242, 118, 102)',
            'rgb(226, 242, 102)',
          ],
          hoverOffset: 4,
        },
      ],
    };

    const configPie: ChartConfiguration<'pie'> = {
      type: 'pie',
      data: dataPie,
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      },
    };

    // Crea y asigna el gráfico a la propiedad
    this.chart = new Chart('chartPie', configPie);
  }
}
