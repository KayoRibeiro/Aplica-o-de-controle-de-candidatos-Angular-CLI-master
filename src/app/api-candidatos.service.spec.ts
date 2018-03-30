import { TestBed, inject } from '@angular/core/testing';

import { ApiCandidatosService } from './api-candidatos.service';

describe('ApiCandidatosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiCandidatosService]
    });
  });

  it('should be created', inject([ApiCandidatosService], (service: ApiCandidatosService) => {
    expect(service).toBeTruthy();
  }));
});
