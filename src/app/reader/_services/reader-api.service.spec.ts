import { TestBed } from '@angular/core/testing';

import { ReaderApiService } from './reader-api.service';

describe('ReaderApiService', () => {
  let service: ReaderApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReaderApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
