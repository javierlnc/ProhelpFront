import { isFieldRequired } from '@utils/validators/validators';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';
interface FormLogin {
  username: FormControl<string | null>;
  password: FormControl<string | null>;
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export default class LoginComponent {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private router = inject(Router);
  errorMessage: string = '';

  isRequired(field: 'username' | 'password') {
    return isFieldRequired(field, this.loginForm);
  }

  loginForm = this._formBuilder.group<FormLogin>({
    username: this._formBuilder.control('', Validators.required),
    password: this._formBuilder.control('', Validators.required),
  });

  onLogin(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      if (username && password) {
        this._authService.login(username, password).subscribe({
          error: (errorData) => {
            this.errorMessage = errorData;
            console.log(this.errorMessage);
            this.loginForm.reset();
          },
          complete: () => {
            this.router.navigate(['/dashboard/main']);
          },
        });
      } else {
        this.errorMessage = 'Usuario y contraseña son requeridos';
      }
    }
  }
}
