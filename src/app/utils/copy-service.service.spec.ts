import { TestBed } from '@angular/core/testing';

import { CopyServiceService } from './copy-service.service';

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
