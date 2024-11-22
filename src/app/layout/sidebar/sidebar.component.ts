import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  animations: [
    trigger('sidebarAnimation', [
      state(
        'open',
        style({
          transform: 'translateX(0px)',
          opacity: 1,
        })
      ),
      state(
        'closed',
        style({
          transform: 'translateX()',
          opacity: 1,
        })
      ),
      transition('open <=> closed', [animate('500ms')]),
    ]),
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  rol!: any;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.getRole();
  }
  sidebarState: 'open' | 'closed' = 'closed';
  toggleSidebar() {
    this.sidebarState = this.sidebarState === 'closed' ? 'open' : 'closed';
  }
  getRole() {
    this.rol = this.authService.getUser()?.rol;
  }
}
