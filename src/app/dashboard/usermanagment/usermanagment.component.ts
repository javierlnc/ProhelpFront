import { UsermanagmentService } from './../usermanagment.service';
import { NewUserModalComponent } from './new-user-modal/new-user-modal.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
export interface User{
  id:number,
  username:string,
  email:string,
  name:string,
  role:string,
  area:string,
}

@Component({
  selector: 'app-usermanagment',
  standalone: true,
  imports: [NewUserModalComponent, CommonModule],
  templateUrl: './usermanagment.component.html',
  styleUrl: './usermanagment.component.css'
})
export default class UsermanagmentComponent implements OnInit{

  showModal = true;
  currentPage = 1;
  users: User[] = [];
  constructor(private usermanagmentService: UsermanagmentService ){

  }
  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(){
    this.usermanagmentService
      .getAllUsers(this.currentPage - 1)
      .subscribe((res) => {
        console.log(res);
        this.users = res.userDTOList;
        console.log(this.users);
      });

  }
  roleMap: { [key: string]: string } = {
    'ADMIN': 'Administrador',
    'TEC': 'Técnico',
    'GEN': 'General'
  };

  getRoleName(abbreviation: string): string {
    return this.roleMap[abbreviation] || abbreviation;  // Retorna el nombre completo o la abreviación si no hay coincidencia
  }
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
 

}
