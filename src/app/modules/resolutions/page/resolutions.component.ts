import { CardResolutionComponent } from '@layout/card-resolution/card-resolution.component';
import { Component, OnInit } from '@angular/core';
import { ResolutionsService } from '../../../data/services/resolutions.service';
import { CommonModule } from '@angular/common';
import { NewResolutionModalComponent } from '../components/new-resolution-modal/new-resolution-modal.component';
import { PaginationComponent } from '../../../layout/pagination/pagination.component';
import { DeleteModalComponent } from '../components/delete-modal/delete-modal.component';
import { Resolution } from '@interfaces/resolution';

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
  totalResolution!: number;

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
    this.resolutionsService.getAllResoutionsList().subscribe((res) => {
      this.totalResolution = res.length;
      console.log(res);
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
  next() {
    this.currentPage += 1;
    this.getResolutions();
  }
  previus() {
    if (this.currentPage === 1) {
      return;
    } else {
      this.currentPage -= 1;
      this.getResolutions();
    }
  }
}
