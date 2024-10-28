import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewResolutionModalComponent } from './new-resolution-modal.component';

describe('NewResolutionModalComponent', () => {
  let component: NewResolutionModalComponent;
  let fixture: ComponentFixture<NewResolutionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewResolutionModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewResolutionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
