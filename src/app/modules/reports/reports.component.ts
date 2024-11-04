import { CopyServiceService } from '@services/copy-service.service';
import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../layout/card/card.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
})
export default class ReportsComponent implements OnInit {
  copies: any[] = [];
  constructor(private copyService: CopyServiceService) {}
  ngOnInit(): void {
    this.getCopies();
  }

  getCopies() {
    this.copyService.getReportesCards().subscribe((data) => {
      this.copies = data;
      console.log(this.copies);
    });
  }
}
