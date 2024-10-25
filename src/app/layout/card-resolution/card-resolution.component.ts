import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-resolution',
  standalone: true,
  imports: [],
  templateUrl: './card-resolution.component.html',
  styleUrl: './card-resolution.component.css',
})
export class CardResolutionComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() resolution: any;
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  onEdit() {
    this.edit.emit(this.resolution);
  }
  onDelete() {
    this.delete.emit(this.resolution);
    console.log('resolution card ' + this.resolution);
  }
}
