import { TestBed } from '@angular/core/testing';
import { Materiais } from './materiais';

describe('Materiais', () => {
  let service: Materiais;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Materiais);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
