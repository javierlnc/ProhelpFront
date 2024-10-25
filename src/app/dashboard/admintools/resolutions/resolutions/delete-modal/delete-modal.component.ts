import { toast } from 'ngx-sonner';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ResolutionsService } from '../../resolutions.service';

@Component({
  selector: 'app-drmodal',
  standalone: true,
  imports: [],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css',
})
export class DeleteModalComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.resolutionData);
  }
  @Output() close = new EventEmitter<void>();
  @Input() resolutionData: any;
  private resolutionService = inject(ResolutionsService);

  closeModal(): void {
    this.close.emit();
  }
  deletcResolution() {
    this.resolutionService.deleteResolution(this.resolutionData.id).subscribe({
      next: () => {
        this.close.emit();
        toast.success(`resolución eliminada`);
      },
      error: (err) => {
        const errorMsg =
          err?.error?.message || 'Error al eliminar la resolución';
        toast.error(errorMsg);
      },
    });
  }
}
