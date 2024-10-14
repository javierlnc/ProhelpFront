import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../layout/header/header.component";
import { SidebarComponent } from "../../layout/sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidebarComponent, RouterOutlet],
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.css'
})
export default class MainDashboardComponent {

}

