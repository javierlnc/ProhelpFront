import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewSolicitudModalComponent } from './new-solicitud-modal/new-solicitud-modal.component';

@Component({
  selector: 'app-solicitudes',
  standalone: true,
  imports: [NewSolicitudModalComponent, CommonModule],
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.css',
})
export default class SolicitudesComponent {
  showModal: boolean = false;
  openModal() {
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
  }
}
