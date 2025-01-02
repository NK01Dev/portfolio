import { TestBed } from '@angular/core/testing';

import { IconLoaderService } from './icon-loader.service';

describe('IconLoaderService', () => {
  let service: IconLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IconLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
