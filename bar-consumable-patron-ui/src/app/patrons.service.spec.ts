import { TestBed } from '@angular/core/testing';

import { PatronsService } from './patrons.service';

describe('PatronsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PatronsService = TestBed.get(PatronsService);
    expect(service).toBeTruthy();
  });
});
