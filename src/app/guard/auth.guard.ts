import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastServiceService } from '../services/toast-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authStatus = inject(AuthService)
  const toast = inject(ToastServiceService)
  const router = inject(Router)
  if (authStatus.isLoggedin()) {
    return true;
  } else {
    toast.warning("Operation failed please login")
    router.navigateByUrl("/")
    return false
  }
};
