import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewSolicitudModalComponent } from '../components/new-solicitud-modal/new-solicitud-modal.component';

@Component({
  selector: 'app-solicitudes',
  standalone: true,
  imports: [NewSolicitudModalComponent, CommonModule],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css',
})
export default class TicketsComponent {
  showModal: boolean = false;
  openModal() {
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
  }
}
