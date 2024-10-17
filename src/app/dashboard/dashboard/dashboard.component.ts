import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../layout/header/header.component";
import { SidebarComponent } from "../../layout/sidebar/sidebar.component";
import { RouterOutlet, RouterModule, Routes } from '@angular/router';
import { AuthService } from '../../auth/login/auth.service';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, RouterOutlet, RouterModule,],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  constructor(private authService: AuthService){}
  ngOnInit(): void {
    console.log ( localStorage.getItem('user') )
    this.authService.isAuthenticated();
  }

}
