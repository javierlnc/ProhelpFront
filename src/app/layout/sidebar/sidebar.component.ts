import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('sidebarAnimation', [
      state('open', style({
        transform: 'translateX(0px)',
        opacity: 1
      })),
      state('closed', style({
        transform: 'translateX()', // Ajustar según tu diseño
        opacity: 1
      })),
      transition('open <=> closed', [
        animate('300ms')
      ])
    ])
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  sidebarState: 'open' | 'closed' = 'closed';
  toggleSidebar() {
    this.sidebarState = this.sidebarState === 'closed' ? 'open' : 'closed';
  }

}
