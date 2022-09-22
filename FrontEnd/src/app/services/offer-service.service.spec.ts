import { TestBed } from '@angular/core/testing';

import { OfferServiceService } from './offer-service.service';

describe('OfferServiceService', () => {
  let service: OfferServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfferServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
