import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewModalComponent } from './new-modal/new-modal.component';
import { CategoriesService } from './categories.service';
export interface Category {
  id: number;
  name: string;
  description: string; 
}
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [NewModalComponent, CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export default class CategoriesComponent implements OnInit {
  showModal = false;
  currentPage = 1;
  categories: Category[] = [];

  constructor(private categoriesService: CategoriesService) {}
  ngOnInit(): void {
    this.getCategories();
  }
  getCategories() {
    this.categoriesService
      .getAllCategories(this.currentPage - 1)
      .subscribe((res) => {
        console.log(res);
        this.categories = res.categoryDTOList;
        console.log(this.categories);
      });
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
