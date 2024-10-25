import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ResolutionsService } from '../../resolutions.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { isFieldRequired } from '@utils/validators';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-nrmodal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-resolution-modal.component.html',
  styleUrl: './new-resolution-modal.component.css',
})
export class NewResolutionModalComponent {
  @Output() close = new EventEmitter<void>();
  @Input() isEdit: boolean = false;
  @Input() resolutionData: any;
  private formBuilder = inject(FormBuilder);
  private reslutionsService = inject(ResolutionsService);
  errorMessage: string = '';
  createForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  });
  isRequired(field: 'name' | 'description'): boolean {
    return isFieldRequired(field, this.createForm);
  }
  submitForm() {
    if (this.isEdit && this.resolutionData) {
      if (this.createForm.invalid) {
        toast.error('Por favor, completa todos los campos requeridos.');
        return;
      }
      this.reslutionsService
        .updateResolution(this.resolutionData.id, this.createForm.value)
        .subscribe({
          next: () => {
            this.close.emit();
            toast.success('Resolución actualizada con éxito');
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
      this.reslutionsService.createResolution(this.createForm.value).subscribe({
        next: () => {
          this.close.emit();
          const { name } = this.createForm.value;
          toast.success(`Categoría "${name}" registrada con éxito`);
        },
      });
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.isEdit && this.resolutionData) {
      this.createForm.patchValue({
        name: this.resolutionData.name,
        description: this.resolutionData.description,
      });
    }
  }

  closeModal(): void {
    this.close.emit();
    this.isEdit = false;
  }
}
