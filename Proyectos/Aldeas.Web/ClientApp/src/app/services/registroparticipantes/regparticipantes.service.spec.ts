import { TestBed } from '@angular/core/testing';

import { RegparticipantesService } from './regparticipantes.service';

describe('RegparticipantesService', () => {
  let service: RegparticipantesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegparticipantesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
