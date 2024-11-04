import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-grmodal',
  standalone: true,
  imports: [],
  templateUrl: './generate-modal.component.html',
  styleUrl: './generate-modal.component.css',
})
export class GenerateModalComponent {
  @Output() close = new EventEmitter<void>();
  @Input() isEdit: boolean = false;

  closeModal() {
    this.close.emit();
  }
}
