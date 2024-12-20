import { DeleteModalComponent } from '../components/delete-modal/delete-modal.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewModalComponent } from '../components/new-modal/new-modal.component';
import { CategoriesService } from '@services/categories.service';
import { Category } from '@interfaces/category';
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [NewModalComponent, CommonModule, DeleteModalComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export default class CategoriesComponent implements OnInit {
  showModal = false;
  currentPage = 1;
  categories: Category[] = [];
  categoryEdit: any;
  isEditModal: boolean = false;
  showDeleteModal: boolean = false;
  categryDeleted!: Category;

  constructor(private categoriesService: CategoriesService) {}
  ngOnInit(): void {
    this.getCategories();
  }
  getCategories() {
    this.categoriesService
      .getAllCategories(this.currentPage - 1)
      .subscribe((res) => {
        this.categories = res.categoryDTOList;
      });
  }
  deleteCategroy(category: Category) {
    this.showDeleteModal = true;
    this.categryDeleted = category;
  }
  isEdit(category: Category) {
    this.isEditModal = true;
    this.categoryEdit = category;
    this.openModal();
  }
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.showDeleteModal = false;
    this.isEditModal = false;
    this.categoryEdit = null;
    this.getCategories();
  }
}
