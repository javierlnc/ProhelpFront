import { CopyServiceService } from '@services/copy-service.service';
import { Component, OnInit } from '@angular/core';
import { CardComponent } from '@layout/card/card.component';
import { GenerateModalComponent } from '../components/generate-modal/generate-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CardComponent, GenerateModalComponent, CommonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
})
export default class ReportsComponent implements OnInit {
  showModal = true;
  reportTechnicians(): void {
    this.showModal = true;
  }
  reportSpecific(): void {
    this.showModal = true;
  }
  reportGeneral(): void {
    this.showModal = true;
  }
  closeModal(): void {
    this.showModal = false;
  }

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
