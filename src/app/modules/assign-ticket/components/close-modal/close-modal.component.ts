import { TicketResponse } from '@interfaces/ticket-response';
import { TicketsService } from '@services/tickets.service';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Resolution } from '@interfaces/resolution';
import { ResolutionsService } from '@services/resolutions.service';
import { isFieldRequired } from '@utils/validators/validators';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ctmodal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './close-modal.component.html',
  styleUrls: ['./close-modal.component.css'],
})
export class CloseModalComponent implements OnInit {
  @Input() ticketToClose!: TicketResponse;
  @Output() close = new EventEmitter<void>();

  resolutions: Resolution[] = [];
  closeForm: FormGroup;

  constructor(
    private resolutionsService: ResolutionsService,
    private formBuilder: FormBuilder,
    private ticketsService: TicketsService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.closeForm = this.initForm();
  }

  ngOnInit(): void {
    this.fetchResolutions();
    this.subscribeToResolutionChanges();
  }

  private initForm(): FormGroup {
    return this.formBuilder.group({
      resolution: [''],
      description: ['', Validators.required],
    });
  }

  private fetchResolutions(): void {
    this.resolutionsService.getAllResoutionsList().subscribe({
      next: (res) => (this.resolutions = res),
      error: () => toast.error('Error al cargar resoluciones'),
    });
  }

  private subscribeToResolutionChanges(): void {
    debugger;
    this.closeForm.get('resolution')?.valueChanges.subscribe((resolutionId) => {
      this.onResolutionChange(resolutionId);
    });
  }

  private onResolutionChange(resolutionId: number): void {
    debugger;
    const selectedResolution = this.resolutions.find(
      (res) => res.id == resolutionId
    );
    this.closeForm
      .get('description')
      ?.setValue(selectedResolution?.description || '');
    this.cdr.markForCheck();
  }

  submitForm(): void {
    const { description } = this.closeForm.value;
    this.ticketsService
      .closeTicket(this.ticketToClose.id, description)
      .subscribe({
        next: () => {
          this.close.emit();
          toast.success(
            `Solicitud ${this.ticketToClose.id} se encuentra pendiente de aprobación`
          );
          this.router.navigate(['/dashboard/tickets']);
        },
        error: (err) => {
          const errorMsg =
            err?.error?.message || 'Error al cerrar la solicitud';
          toast.error(errorMsg);
        },
      });
  }

  closeModal(): void {
    this.close.emit();
    this.router.navigate(['/dashboard/tickets']);
  }

  isRequired(field: string): boolean {
    return isFieldRequired(field, this.closeForm);
  }
}
