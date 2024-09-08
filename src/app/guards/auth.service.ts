import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Determines if the route can be activated.
   * If the user is logged in, redirect to the dashboard.
   * If not, allow access to the route.
   */
  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}
