import { CategoriesService } from './../../admintools/categories/categories.service';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { toast } from 'ngx-sonner';
import { isFieldRequired } from '@utils/validators';
import { SolicitudService } from '../solicitud.service';

@Component({
  selector: 'app-nsmodal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-solicitud-modal.component.html',
  styleUrl: './new-solicitud-modal.component.css',
})
export class NewSolicitudModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Input() isEdit: boolean = false;
  @Input() userData: any;
  createForm: FormGroup;
  categories: any[] = [];

  private formBuilder = inject(FormBuilder);
  private categoriesService = inject(CategoriesService);
  private ticketService = inject(SolicitudService);
  constructor() {
    this.createForm = this.formBuilder.group({
      subject: ['', Validators.required],
      categoryId: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.loadCategories();
    console.log(this.categories);
  }
  private loadCategories(): void {
    this.categoriesService.getListCategories().subscribe(
      (data: any[]) => {
        console.log(data);
        this.categories = data;
        console.log('Categoires: ' + this.categories);
      },
      (error) => {
        toast.error(
          'No se pudieron cargar las categorias. Inténtalo de nuevo más tarde.'
        );
      }
    );
  }
  SubmitForm() {
    this.ticketService.creteTicket(this.createForm.value).subscribe({
      next: () => {
        this.close.emit();
        toast.success(`su solicitud ha sido creada exitosamente`);
      },
      error: (err) => {
        const errorMsg = err?.error?.message || 'Error al crear la solicitud';
        toast.error(errorMsg);
      },
    });
  }

  closeModal() {
    this.close.emit();
  }
  isRequired(field: string): boolean {
    return isFieldRequired(field, this.createForm);
  }
}
