import { ReportService } from './../../../../data/services/report.service';
import {
  Component,
  DebugElement,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { DataPickerComponent } from '../../../../layout/data-picker/data-picker.component';
import { UsermanagmentService } from '@services/usermanagment.service';
import { toast } from 'ngx-sonner';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { isFieldRequired } from '@utils/validators/validators';

@Component({
  selector: 'app-grmodal',
  standalone: true,
  imports: [DataPickerComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './generate-modal.component.html',
  styleUrl: './generate-modal.component.css',
})
export class GenerateModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Input() isSpecific: boolean = false;
  @Input() typeReport!: string;
  starDate!: string;
  endDate!: string;
  users: any[] = [];
  reportForm: FormGroup;
  constructor(
    private userManagmentService: UsermanagmentService,
    private formBuilder: FormBuilder,
    private reportService: ReportService
  ) {
    this.reportForm = this.initForm();
  }
  ngOnInit(): void {
    this.getUsersList();
    this.isSpecificReport();
  }
  closeModal() {
    this.close.emit();
  }
  getUsersList(): void {
    this.userManagmentService.getUsersFilter().subscribe({
      next: (res) => (this.users = res),
      error: (err) => this.handleError(err, 'Error al cargar técnicos'),
    });
  }
  isSpecificReport() {
    if (this.typeReport === 'especifico') {
      this.isSpecific = true;
    }
  }
  private initForm(): FormGroup {
    return this.formBuilder.group({
      reportType: ['', Validators.required],
      starDate: ['', Validators.required],
      endDate: ['', Validators.required],
      assignedTechnicianId: ['', Validators.required],
    });
  }
  receiveDateFrom(data: string) {
    const date = new Date(data);
    const isoDate = date.toISOString().split('T')[0];
    this.starDate = `${isoDate}T00:00:00`;
  }
  receiveDateTo(data: string) {
    const date = new Date(data);
    const isoDate = date.toISOString().split('T')[0];
    this.endDate = `${isoDate}T23:59:59`;
  }
  private populateReportForm(): void {
    this.reportForm.patchValue({
      reportType: this.typeReport,
      starDate: this.starDate,
      endDate: this.endDate,
    });
  }

  submitForm() {
    if (this.isSpecific === false) {
      if (this.reportForm.value.assignedTechnicianId === '') {
        this.reportForm.patchValue({ assignedTechnicianId: '1' });
      }
    }
    this.populateReportForm();
    if (!this.reportForm.valid) {
      toast.error('Por favor, complete todos los campos obligatorios.');
      return;
    }
    console.log(this.reportForm.value);
    this.reportService.generateReport(this.reportForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.close.emit();
      },
      error: (err) => {
        const errorMsg =
          err?.error?.message || 'Error al actualizar el usuario';
        toast.error(errorMsg);
      },
    });
  }
  private handleError(error: any, message: string): void {
    const errorMsg = error?.error?.message || message;
    toast.error(errorMsg);
  }
}
