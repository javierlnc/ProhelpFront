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
import { forkJoin } from 'rxjs';

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
  totalTickets: number = 0;
  ticketsOverdue: number = 0;
  openTicketsCount: number = 0;
  pendingApprovalCount: number = 0;
  resolvedTicketsCount: number = 0;
  tecUser: number = 0;
  private chart!: any;

  constructor(
    private panelService: PanelService,
    private ticketService: TicketsService,
    private usermanagmentService: UsermanagmentService
  ) {}

  ngOnInit(): void {
    Chart.register(PieController, ArcElement, Tooltip, Legend);
    this.loadData();
  }

  private loadData(): void {
    forkJoin({
      ticketsByCategories: this.panelService.getListCategories(),
      ticketsByUsers: this.panelService.getTicketsList(),
      ticketsList: this.ticketService.getTicketsListByUser(),
      ticketsOverdue: this.panelService.getTicketsOverdue(),
      usersList: this.usermanagmentService.getUsersFilter(),
    }).subscribe({
      next: (res) => {
        this.ticketsByCategories = res.ticketsByCategories;
        this.ticketsByUsers = res.ticketsByUsers;
        this.ticketsOverdue = res.ticketsOverdue.length;
        this.tecUser = res.usersList.length;
        this.processTicketsList(res.ticketsList);
      },
      error: (err) => {
        console.error('Error al cargar datos del panel', err);
      },
    });
  }

  private processTicketsList(tickets: any[]): void {
    this.totalTickets = tickets.length;
    this.openTicketsCount = tickets.filter(
      (ticket) => ticket.status === 'OPEN'
    ).length;
    this.pendingApprovalCount = tickets.filter(
      (ticket) => ticket.status === 'PENDING_APPROVAL'
    ).length;
    this.resolvedTicketsCount = tickets.filter(
      (ticket) => ticket.status === 'RESOLVED'
    ).length;
    this.loadPieChart();
  }

  private loadPieChart(): void {
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

    this.chart = new Chart('chartPie', configPie);
  }
}
