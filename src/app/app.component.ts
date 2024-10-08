import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AdminService } from './services/admin.service';
import { CommonModule } from "@angular/common";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'memopus';
  isAdminMode = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private adminService: AdminService
  ) {
    this.adminService.adminMode$.subscribe((isAdmin) => {
      this.isAdminMode = isAdmin;
    });
  }

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

  /**
   * Toggles the administration mode and updates the state.
   */
  toggleAdminMode(): void {
    this.adminService.toggleAdminMode();
  }
}
