import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private adminMode = new BehaviorSubject<boolean>(false);

  /**
   * Observable for the current admin mode state.
   */
  adminMode$ = this.adminMode.asObservable();

  /**
   * Toggles the current state of admin mode.
   */
  toggleAdminMode(): void {
    this.adminMode.next(!this.adminMode.value);
  }

  /**
   * Checks if admin mode is currently enabled.
   * @returns {boolean} The current state of admin mode.
   */
  isAdminMode(): boolean {
    return this.adminMode.value;
  }
}
