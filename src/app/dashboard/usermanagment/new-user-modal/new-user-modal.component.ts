import { passwordsMatchValidator } from './../../../utils/validators';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsermanagmentService } from '../../usermanagment.service';
import { toast } from 'ngx-sonner';
import { isFieldRequired } from '@utils/validators';
import { rolesMapping, UserRole } from '@utils/roles-mapping';
export interface AreaDTO {
  id: number;
  name: string;
}
@Component({
  selector: 'app-new-user-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-user-modal.component.html',
  styleUrl: './new-user-modal.component.css',
})
export class NewUserModalComponent implements OnInit {
  ngOnInit(): void {
    this.usermanagmentService.getAllAreas().subscribe(
      (data: AreaDTO[]) => {
        this.areas = data;
        console.log('areas' + this.areas);
      },
      (error) => {
        console.error('Error al cargar las áreas', error);
      }
    );
  }
  @Output() close = new EventEmitter<void>();
  private formBuilder = inject(FormBuilder);
  private usermanagmentService = inject(UsermanagmentService);
  rolesEnum = rolesMapping;
  areas: AreaDTO[] = [];
  rolesBackend = Object.values(UserRole);
  errorMessage: string = '';
  createForm: FormGroup = this.formBuilder.group(
    {
      email: ['', Validators.required],
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      areaId: ['', Validators.required],
      role: ['', Validators.required],
    },
    {
      validator: passwordsMatchValidator('password', 'confirmPassword'),
    }
  );
  isRequired(field: string): boolean {
    return isFieldRequired(field, this.createForm);
  }
  submitForm(): void {
    debugger;
    console.log(this.createForm.value);
    if (this.createForm.invalid) {
      toast.error('Por favor, completa todos los campos requeridos.');
      return;
    }
    this.usermanagmentService
      .createUserDetails(this.createForm.value)
      .subscribe({
        next: () => {
          this.close.emit();
          const { username } = this.createForm.value;
          toast.success(`Usuario "${username}" creado con éxito`);
        },
        error: (err) => {
          const errorMsg = err?.error?.message || 'Error al crear el usuario';
          toast.error(errorMsg);
        },
      });
  }
  closeModal(): void {
    this.close.emit();
  }
  get passwordsMismatch() {
    return this.createForm.hasError('passwordsMismatch');
  }
}
