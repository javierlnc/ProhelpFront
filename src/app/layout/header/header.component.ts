import { AuthService } from './../../auth/login/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  user: any;
  constructor(private authService:AuthService){}
  ngOnInit(): void {
    this.user = this.authService.getUser();
    console.log ( "usernamae user ",this.user )
    console.log ( localStorage.getItem('user') )
  }
  }


