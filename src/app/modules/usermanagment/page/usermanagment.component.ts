import { UsermanagmentService } from '../../../data/services/usermanagment.service';
import { NewUserModalComponent } from '../components/new-user-modal/new-user-modal.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteModalComponent } from '../components/delete-modal/delete-modal.component';
import { User } from '@interfaces/user';
import { RolesMapping } from '@utils/roles-mapping/roles-mapping';

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
  isEditModal = false;
  selectedUserForEdit: User | null = null;
  selectedUserForDeletion: User | null = null;

  constructor(private usermanagmentService: UsermanagmentService) {}

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(): void {
    this.usermanagmentService
      .getAllUsers(this.currentPage - 1)
      .subscribe((res) => {
        this.users = res.userDTOList;
      });
  }

  getRoleName(role: string): string {
    return RolesMapping[role as keyof typeof RolesMapping] || role;
  }
  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.isEditModal = false;
    this.selectedUserForDeletion = null;
    this.selectedUserForEdit = null;
    this.showDeleteModal = false;
    this.getUsers();
  }
  isEdit(user: User): void {
    this.isEditModal = true;
    this.openModal();
    this.selectedUserForEdit = user;
  }
  deleteUser(user: User): void {
    this.showDeleteModal = true;
    this.selectedUserForDeletion = user;
  }
}
