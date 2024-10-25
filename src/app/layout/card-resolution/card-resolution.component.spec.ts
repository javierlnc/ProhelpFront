import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardResolutionComponent } from './card-resolution.component';

describe('CardResolutionComponent', () => {
  let component: CardResolutionComponent;
  let fixture: ComponentFixture<CardResolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardResolutionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardResolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
