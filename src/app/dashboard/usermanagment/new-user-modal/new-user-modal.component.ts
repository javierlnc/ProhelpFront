import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsermanagmentService } from '../../usermanagment.service';

interface FormCreate{
  email: FormControl<string | null >,
  name: FormControl<string | null>,
  username: FormControl<string | null>,
  password: FormControl<string | null>,
  confirmPassword: FormControl<string | null>,
  area: FormControl<string | null>,
  rol: FormControl<string | null>,
}
@Component({
  selector: 'app-new-user-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-user-modal.component.html',
  styleUrl: './new-user-modal.component.css'
})
export class NewUserModalComponent {
  @Output() close = new EventEmitter<void>();
  private _formBuilder = inject(FormBuilder);
  private _usermanagmentService = inject(UsermanagmentService)
  errorMessage: string = '';

  

}
