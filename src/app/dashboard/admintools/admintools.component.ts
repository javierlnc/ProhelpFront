import { Component, OnInit } from '@angular/core';
import { CardComponent } from '@layout/card/card.component';
import { CopyServiceService } from '@utils/copy-service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admintools',
  standalone: true,
  imports: [CardComponent, RouterLink],
  templateUrl: './admintools.component.html',
  styleUrl: './admintools.component.css'
})
export default class AdmintoolsComponent implements OnInit {
  copies: any[] = [];
  constructor(private copyService : CopyServiceService){}
  ngOnInit(): void {
    this.copyService.getHerramientasCards().subscribe(data =>{
      this.copies = data;
      console.log(this.copies)
    });
  }


}
