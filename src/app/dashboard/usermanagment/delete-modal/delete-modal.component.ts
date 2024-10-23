import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { UsermanagmentService } from '../../usermanagment.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css',
})
export class DeleteModalComponent {
  @Output() closeDelete = new EventEmitter<void>();
  @Input() userData: any;
  private usermanagmentService = inject(UsermanagmentService);

  closeModal(): void {
    this.closeDelete.emit();
  }
  deletcUser() {
    this.usermanagmentService.deleteUser(this.userData.id).subscribe({
      next: () => {
        this.closeDelete.emit();
        toast.success(` ha sido eliminado`);
      },
      error: (err) => {
        const errorMsg = err?.error?.message || 'Error al eliminar el usuario';
        toast.error(errorMsg);
      },
    });
  }
}
