import { TestBed } from '@angular/core/testing';

import { UsuarioAdminService } from './usuario-admin.service';

describe('UsuarioAdminService', () => {
  let service: UsuarioAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
