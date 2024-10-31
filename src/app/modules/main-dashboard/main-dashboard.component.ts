import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@layout/header/header.component';
import { SidebarComponent } from '@layout/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { TicketsService } from '@services/tickets.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidebarComponent, RouterOutlet],
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.css',
})
export default class MainDashboardComponent implements OnInit {
  tickets: any[] = [];
  approvalList: any[] = [];
  constructor(private ticketService: TicketsService) {}
  ngOnInit(): void {
    this.getTickets();
    this.getApprovalList();
  }
  getApprovalList(): void {
    this.ticketService.getApprovingTickets().subscribe({
      next: (res: any[]) => {
        this.approvalList = res;
        console.log(this.approvalList);
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
        this.tickets = res;
      },
      error: (err) => {
        const errorMsg = err?.error?.message || 'Error al obtener los tickets';
        toast.error(errorMsg);
      },
    });
  }
}
