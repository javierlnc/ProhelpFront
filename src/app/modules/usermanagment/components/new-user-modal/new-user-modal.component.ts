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
import { UsermanagmentService } from '@services/usermanagment.service';
import { toast } from 'ngx-sonner';
import {
  isFieldRequired,
  passwordsMatchValidator,
} from '@utils/validators/validators';
import { RolesMapping, UserRole } from '@utils/roles-mapping/roles-mapping';
import { Area } from '@interfaces/area';

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

  areas: Area[] = [];
  rolesBackend = Object.values(UserRole);
  rolesEnum = RolesMapping;
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
    if (this.isEdit && this.userData) {
      this.createForm.patchValue({
        email: this.userData.email,
        name: this.userData.name,
        username: this.userData.username,
        areaId: this.userData.area.id,
        role: this.userData.role,
      });
      this.createForm.get('password')?.clearValidators();
      this.createForm.get('confirmPassword')?.clearValidators();
    } else {
      this.createForm.reset();
    }
  }
  ngOnInit(): void {
    this.loadAreas();
  }

  private loadAreas(): void {
    this.usermanagmentService.getAllAreas().subscribe(
      (data: Area[]) => {
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
