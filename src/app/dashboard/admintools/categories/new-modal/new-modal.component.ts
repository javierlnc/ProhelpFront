import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { isFieldRequired } from '@utils/validators';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../categories.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-new-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-modal.component.html',
  styleUrl: './new-modal.component.css',
})
export class NewModalComponent {
  @Output() close = new EventEmitter<void>();
  @Input() isEdit: boolean = false;
  @Input() categoryData: any;
  private formBuilder = inject(FormBuilder);
  private categoriesService = inject(CategoriesService);

  errorMessage: string = '';
  createForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  });
  isRequired(field: 'name' | 'description'): boolean {
    return isFieldRequired(field, this.createForm);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.isEdit && this.categoryData) {
      this.createForm.patchValue({
        name: this.categoryData.name,
        description: this.categoryData.description,
      });
    }
  }
  submitForm(): void {
    if (this.isEdit && this.categoryData) {
      if (this.createForm.invalid) {
        toast.error('Por favor, completa todos los campos requeridos.');
        return;
      }
      this.categoriesService
        .updateCategory(this.categoryData.id, this.createForm.value)
        .subscribe({
          next: () => {
            this.close.emit();
            toast.success('Categoria actualizada con éxito');
          },
          error: (err) => {
            const errorMsg =
              err?.error?.message || 'Error al actualizar la categoría';
            toast.error(errorMsg);
          },
        });
    } else {
      if (this.createForm.invalid) {
        toast.error('Por favor, completa todos los campos requeridos.');
        return;
      }
      this.categoriesService
        .createCategoryDetails(this.createForm.value)
        .subscribe({
          next: () => {
            this.close.emit();
            const { name } = this.createForm.value;
            toast.success(`Categoría "${name}" registrada con éxito`);
          },
          error: (err) => {
            const errorMsg =
              err?.error?.message || 'Error al crear la categoría';
            toast.error(errorMsg);
          },
        });
    }
  }
  closeModal(): void {
    this.close.emit();
    this.isEdit = false;
  }
}
