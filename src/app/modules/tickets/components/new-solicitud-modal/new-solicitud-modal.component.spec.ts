import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSolicitudModalComponent } from './new-solicitud-modal.component';

describe('NewSolicitudModalComponent', () => {
  let component: NewSolicitudModalComponent;
  let fixture: ComponentFixture<NewSolicitudModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSolicitudModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSolicitudModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
