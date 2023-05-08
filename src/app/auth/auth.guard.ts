import {inject} from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

// https://angular.io/guide/router-tutorial-toh#milestone-5-route-guards
export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuth = authService.getIsAuth();

  if(isAuth){
    return true;
  }
  
  return router.parseUrl('/login');
};