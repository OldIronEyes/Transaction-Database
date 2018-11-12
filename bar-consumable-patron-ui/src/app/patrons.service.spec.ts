import { TestBed } from '@angular/core/testing';

import { PatronService } from './patrons.service';

describe('PatronsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PatronService = TestBed.get(PatronService);
    expect(service).toBeTruthy();
  });
});
