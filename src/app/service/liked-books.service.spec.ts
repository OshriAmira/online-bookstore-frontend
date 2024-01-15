import { TestBed } from '@angular/core/testing';

import { LikedBooksService } from './liked-books.service';

describe('LikedBooksService', () => {
  let service: LikedBooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LikedBooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
