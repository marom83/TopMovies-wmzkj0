import { TestBed } from '@angular/core/testing';

import { ClientLibService } from './client-lib.service';

describe('ClientLibService', () => {
  let service: ClientLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
