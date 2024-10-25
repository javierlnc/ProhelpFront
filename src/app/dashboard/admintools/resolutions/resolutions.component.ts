import { CardResolutionComponent } from '@layout/card-resolution/card-resolution.component';
import { Component, OnInit } from '@angular/core';
import { ResolutionsService } from './resolutions.service';
import { CommonModule } from '@angular/common';
import { NewResolutionModalComponent } from './resolutions/new-resolution-modal/new-resolution-modal.component';
import { PaginationComponent } from '../../../layout/pagination/pagination.component';
import { DeleteModalComponent } from './resolutions/delete-modal/delete-modal.component';
export interface Resolution {
  id: number;
  name: string;
  description: string;
}
@Component({
  selector: 'app-resolution',
  standalone: true,
  imports: [
    CardResolutionComponent,
    CommonModule,
    NewResolutionModalComponent,
    PaginationComponent,
    DeleteModalComponent,
  ],
  templateUrl: './resolutions.component.html',
  styleUrl: './resolutions.component.css',
})
export default class ResolutionComponent implements OnInit {
  resolutions: Resolution[] = [];
  currentPage = 1;
  showModal = false;
  resolutionEdit: any;
  isEditModal: boolean = false;
  isDeleteModal: boolean = false;
  resolutionDeleted: any;

  constructor(private resolutionsService: ResolutionsService) {}

  ngOnInit(): void {
    this.getResolutions();
  }

  getResolutions() {
    this.resolutionsService
      .getAllResolutions(this.currentPage - 1)
      .subscribe((res) => {
        this.resolutions = res.resolutionDTOList;
      });
  }
  openModal() {
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
    this.getResolutions();
    this.isEditModal = false;
    this.isDeleteModal = false;
  }
  isEdit(resolution: any) {
    this.isEditModal = true;
    this.resolutionEdit = resolution;
    this.openModal();
  }
  deleteResolution(resolution: any) {
    this.resolutionDeleted = resolution;
    this.showModal = false;
    this.isEditModal = false;
    this.isDeleteModal = true;
    console.log('delete ' + this.isDeleteModal + 'Edit ' + this.isEditModal);
  }
}
