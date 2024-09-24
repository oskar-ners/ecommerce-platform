import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const checkoutSuccessGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (localStorage.getItem('orderTotal') && localStorage.getItem('products')) {
    return true;
  } else {
    router.navigateByUrl('/homepage');
    return false;
  }
};
