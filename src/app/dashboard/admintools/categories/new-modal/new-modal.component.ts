import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { isRequired } from '@utils/validators';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../categories.service';
import { toast } from 'ngx-sonner';

interface FormCreate{
  name: FormControl<string | null >,
  description: FormControl<string | null>
}
@Component({
  selector: 'app-new-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-modal.component.html',
  styleUrl: './new-modal.component.css'
})
export class NewModalComponent {
  @Output() close = new EventEmitter<void>();
  private _formBuilder = inject(FormBuilder);
  private _categoriesService = inject(CategoriesService)
  errorMessage: string = '';
  


  isRequired(field: 'name' | 'description' ){
    return isRequired(field, this.createForm)
  }
  createForm = this._formBuilder.group<FormCreate>({
    name: this._formBuilder.control('', Validators.required),
    description: this._formBuilder.control('', Validators.required)
  });
  submitForm(){
    if(this.createForm.invalid){
      toast.error('Por favor, completa todos los campos requeridos.');
      return;
    }
    this._categoriesService.createCategoryDetails(this.createForm.value).subscribe({
      next: ()=>{
        this.close.emit();
        const { name} = this.createForm.value;
        toast.success(`Categoría "${name}" registrada con éxito`);

      },
      error: (error) => {
        toast.error(error)
      }
    });

  }
  closeModal() {
    this.close.emit();  // Emitimos el evento para cerrar el modal
  }

}
