import { TestBed } from '@angular/core/testing';

import { UsermanagmentService } from '../../data/services/usermanagment.service';

describe('UsermanagmentService', () => {
  let service: UsermanagmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsermanagmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
