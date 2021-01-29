import { TestBed } from '@angular/core/testing';

import { MemberInformationService } from './member-information.service';

describe('MemberInformationService', () => {
  let service: MemberInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
