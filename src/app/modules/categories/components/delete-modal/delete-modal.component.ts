import { toast } from 'ngx-sonner';
import { CategoriesService } from '../../../../data/services/categories.service';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Category } from '@interfaces/category';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css',
})
export class DeleteModalComponent {
  @Output() closeDelete = new EventEmitter<void>();
  @Input() categoryData!: Category;
  private categoriesService = inject(CategoriesService);

  closeModal(): void {
    this.closeDelete.emit();
  }
  deletcCategory() {
    this.categoriesService.deleteCategory(this.categoryData.id).subscribe({
      next: () => {
        this.closeDelete.emit();
        toast.success(`Categoría eliminada`);
      },
      error: (err) => {
        const errorMsg =
          err?.error?.message || 'Error al eliminar la categoría';
        toast.error(errorMsg);
      },
    });
  }
}
