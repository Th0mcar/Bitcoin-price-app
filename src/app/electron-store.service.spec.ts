import { TestBed } from '@angular/core/testing';

import { ElectronStoreService } from './electron-sotre.service';

describe('ElectronStoreService', () => {
  let service: ElectronStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElectronStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
