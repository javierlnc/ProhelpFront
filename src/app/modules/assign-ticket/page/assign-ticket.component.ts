import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assign-ticket',
  standalone: true,
  imports: [],
  templateUrl: './assign-ticket.component.html',
  styleUrl: './assign-ticket.component.css',
})
export default class AssignTicketComponent implements OnInit {
  ticketId!: number;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.ticketId = +id; // Convertimos el string a número
        // Aquí puedes cargar el ticket usando el ID
        // this.loadTicket(this.ticketId);
      } else {
        console.error('ID del ticket no encontrado');
        // Maneja el caso donde el ID no está presente, por ejemplo redirigiendo o mostrando un mensaje
      }
    });
  }
}
