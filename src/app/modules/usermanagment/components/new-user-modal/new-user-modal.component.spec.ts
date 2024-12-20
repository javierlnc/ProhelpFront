import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserModalComponent } from './new-user-modal.component';

describe('NewUserModalComponent', () => {
  let component: NewUserModalComponent;
  let fixture: ComponentFixture<NewUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewUserModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
