import { UsermanagmentService } from './../usermanagment.service';
import { NewUserModalComponent } from './new-user-modal/new-user-modal.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  role: string;
  area: { areaDTO: { id: number; name: string } };
}

@Component({
  selector: 'app-usermanagment',
  standalone: true,
  imports: [NewUserModalComponent, CommonModule, DeleteModalComponent],
  templateUrl: './usermanagment.component.html',
  styleUrl: './usermanagment.component.css',
})
export default class UsermanagmentComponent implements OnInit {
  showModal = false;
  showDeleteModal = false;
  currentPage = 1;
  users: User[] = [];
  isEditModal: boolean = false;
  selectUser: any;
  delectUser: any;
  constructor(private usermanagmentService: UsermanagmentService) {}
  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.usermanagmentService
      .getAllUsers(this.currentPage - 1)
      .subscribe((res) => {
        this.users = res.userDTOList;
      });
  }
  roleMap: { [key: string]: string } = {
    ADMIN: 'Administrador',
    TEC: 'Técnico',
    GEN: 'General',
  };

  getRoleName(abbreviation: string): string {
    return this.roleMap[abbreviation] || abbreviation; // Retorna el nombre completo o la abreviación si no hay coincidencia
  }
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.isEditModal = false;
    this.delectUser = '';
    this.showDeleteModal = false;
    this.getUsers();
  }
  isEdit(user: any) {
    this.isEditModal = true;
    this.openModal();
    this.selectUser = user;
  }
  deleteUser(user: any) {
    this.showDeleteModal = true;
    this.delectUser = user;
  }
}
