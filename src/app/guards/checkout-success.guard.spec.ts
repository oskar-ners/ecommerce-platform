import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { checkoutSuccessGuard } from './checkout-success.guard';

describe('checkoutSuccessGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => checkoutSuccessGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
