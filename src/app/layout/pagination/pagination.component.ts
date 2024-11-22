import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  @Input() showing: number = 0;
  @Input() totalShowing: number = 0;
  @Input() total: number = 0;
  @Output() next = new EventEmitter<void>();
  @Output() previus = new EventEmitter<void>();

  onNext() {
    this.next.emit();
  }
  onPrevious() {
    this.previus.emit();
  }
}
