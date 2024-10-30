import { TicketResponse } from '@interfaces/ticket-response';
import { TicketsService } from '@services/tickets.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

@Component({
  selector: 'app-ctmodal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './close-modal.component.html',
  styleUrl: './close-modal.component.css',
})
export class CloseModalComponent implements OnInit {
  resolutions: Resolution[] = [];
  selectedResolutionId: number | null = null;
  selectedResolutionDescription: string = '';
  closeForm: FormGroup;
  @Output() close = new EventEmitter<void>();
  @Input() ticketToClose!: TicketResponse;
  constructor(
    private resolutionsService: ResolutionsService,
    private formBuilder: FormBuilder,
    private ticketsService: TicketsService
  ) {
    this.closeForm = this.formBuilder.group({
      resolution: [''],
      description: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.getResolutions();
    console.log(this.ticketToClose);
    this.closeForm.get('resolution')?.valueChanges.subscribe((resolutionId) => {
      const selectedResolution = this.resolutions.find(
        (res) => res.id == resolutionId
      );
      this.closeForm
        .get('description')
        ?.setValue(selectedResolution?.description || '');
    });
  }
  getResolutions() {
    this.resolutionsService.getAllResoutionsList().subscribe({
      next: (res) => {
        this.resolutions = res;
      },
    });
  }
  submitForm() {
    debugger;
    const { description } = this.closeForm.value;
    this.ticketsService
      .closeTicket(this.ticketToClose.id, description)
      .subscribe({
        next: () => {
          this.close.emit();
          toast.success(
            `solicitud ${this.ticketToClose.id} se encuentra pendiente de aprovación`
          );
        },
        error: (err) => {
          const errorMsg =
            err?.error?.message || 'Error al cerrar la solicitud';
          toast.error(errorMsg);
        },
      });
  }
  closeModal() {
    this.close.emit();
  }
  isRequired(field: string): boolean {
    return isFieldRequired(field, this.closeForm);
  }
}
