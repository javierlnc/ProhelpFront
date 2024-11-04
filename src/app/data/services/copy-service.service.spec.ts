import { TestBed } from '@angular/core/testing';

import { CopyServiceService } from '../data/services/copy-service.service';

describe('CopyServiceService', () => {
  let service: CopyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CopyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
