import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalTicketComponent } from './approval-ticket.component';

describe('ApprovalTicketComponent', () => {
  let component: ApprovalTicketComponent;
  let fixture: ComponentFixture<ApprovalTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovalTicketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovalTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
