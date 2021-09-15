import { TestBed } from '@angular/core/testing';

import { UseObjectService } from './use-object.service';

describe('UseObjectService', () => {
  let service: UseObjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UseObjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
