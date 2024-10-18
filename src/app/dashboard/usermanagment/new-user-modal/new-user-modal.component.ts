import { passwordsMatchValidator } from './../../../utils/validators';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsermanagmentService } from '../../usermanagment.service';
import { toast } from 'ngx-sonner';
import { isFieldRequired } from '@utils/validators';

@Component({
  selector: 'app-new-user-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-user-modal.component.html',
  styleUrl: './new-user-modal.component.css'
})
export class NewUserModalComponent {
@Output() close = new EventEmitter<void>();
private formBuilder = inject(FormBuilder);
private usermanagmentService = inject(UsermanagmentService);
errorMessage: string = '';
  createForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    name: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    area: ['', Validators.required],
    rol: ['', Validators.required],
  },{
    validator: passwordsMatchValidator('password', 'confirmPassword')
  });
  isRequired(field: string): boolean {
    return isFieldRequired(field, this.createForm);
  }
  submitForm(): void {
    if (this.createForm.invalid) {
      toast.error('Por favor, completa todos los campos requeridos.');
      return;
    }
    this.usermanagmentService.createUserDetails(this.createForm.value).subscribe({
      next: () => {
        this.close.emit();
        const {username} = this.createForm.value;
        toast.success(`Usuario "${username}" creado con éxito`)
      },
      error: (err) => {
             const errorMsg = err?.error?.message || 'Error al crear el usuario';
             toast.error(errorMsg);
           }

    })
  
  }
  closeModal(): void {
    this.close.emit();  
  }
  get passwordsMismatch(){
    return this.createForm.hasError('passwordsMismatch');
  }


  

}
