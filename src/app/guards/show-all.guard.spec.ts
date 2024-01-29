import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { showAllGuard } from './show-all.guard';

describe('showAllGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => showAllGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
