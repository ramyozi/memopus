import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [
    MatButton
  ],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isAdminMode: boolean = false;

  /**
   * Toggle the admin mode state.
   */
  toggleAdminMode(): void {
    this.isAdminMode = !this.isAdminMode;
    console.log(`Admin mode is now: ${this.isAdminMode ? 'enabled' : 'disabled'}`);
  }
}
