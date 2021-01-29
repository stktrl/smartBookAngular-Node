import { TestBed } from '@angular/core/testing';

import { BookInformationService } from './book-information.service';

describe('BookInformationService', () => {
  let service: BookInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
