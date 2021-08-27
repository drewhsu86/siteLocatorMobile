import { TestBed } from '@angular/core/testing';

import { GoogleMapsClusterService } from './google-maps-cluster.service';

describe('GoogleMapsClusterService', () => {
  let service: GoogleMapsClusterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleMapsClusterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
