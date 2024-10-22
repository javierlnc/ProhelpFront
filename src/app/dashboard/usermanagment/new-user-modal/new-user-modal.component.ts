import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  Input,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsermanagmentService } from '../../usermanagment.service';
import { toast } from 'ngx-sonner';
import { isFieldRequired } from '@utils/validators';
import { passwordsMatchValidator } from './../../../utils/validators';
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
  styleUrls: ['./new-user-modal.component.css'],
})
export class NewUserModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Input() isEdit: boolean = false;
  @Input() userData: any;

  areas: AreaDTO[] = [];
  rolesBackend = Object.values(UserRole);
  rolesEnum = rolesMapping;
  createForm: FormGroup;

  private usermanagmentService = inject(UsermanagmentService);
  private formBuilder = inject(FormBuilder);

  constructor() {
    this.createForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        name: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
        areaId: ['', Validators.required],
        role: ['', Validators.required],
      },
      {
        validators: passwordsMatchValidator('password', 'confirmPassword'),
      }
    );
  }
  ngOnChanges(changes: SimpleChanges) {
    // Si isEdit es true y hay datos del usuario, actualiza el formulario
    if (this.isEdit && this.userData) {
      this.createForm.patchValue({
        email: this.userData.email,
        name: this.userData.name,
        username: this.userData.username,
        areaId: this.userData.area.id,
        role: this.userData.role,
      });

      // Si quieres deshabilitar la contraseña en modo edición
      this.createForm.get('password')?.clearValidators();
      this.createForm.get('confirmPassword')?.clearValidators();
    } else {
      // Resetear el formulario cuando no está en modo edición
      this.createForm.reset();
    }
  }
  ngOnInit(): void {
    this.loadAreas();
  }

  private loadAreas(): void {
    this.usermanagmentService.getAllAreas().subscribe(
      (data: AreaDTO[]) => {
        this.areas = data;
      },
      (error) => {
        toast.error(
          'No se pudieron cargar las áreas. Inténtalo de nuevo más tarde.'
        );
      }
    );
  }

  isRequired(field: string): boolean {
    return isFieldRequired(field, this.createForm);
  }

  submitForm(): void {
    if (this.isEdit && this.userData) {
      if (this.createForm.invalid) {
        toast.error('Por favor, completa todos los campos requeridos.');
        return;
      }
      this.usermanagmentService
        .updateUser(this.userData.id, this.createForm.value)
        .subscribe({
          next: () => {
            this.close.emit();
            const { username } = this.createForm.value;
            toast.success(`Usuario "${username}" actualizado con éxito`);
          },
          error: (err) => {
            const errorMsg =
              err?.error?.message || 'Error al actualizar el usuario';
            console.log(errorMsg);
            toast.error(errorMsg);
          },
        });
    } else {
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
  }

  closeModal(): void {
    this.isEdit = false;
    this.close.emit();
  }

  get passwordsMismatch() {
    return this.createForm.hasError('passwordsMismatch');
  }
}
