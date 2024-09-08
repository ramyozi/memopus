import { Component } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import { AuthService } from './services/auth.service';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'memopus';

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Checks if the user is authenticated.
   * @returns {boolean} The authentication status.
   */
  isAuthenticated(): boolean {
    return this.authService.isLoggedIn();
  }

  /**
   * Logs out the user and navigates to the login page.
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
