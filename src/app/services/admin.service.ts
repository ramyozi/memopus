import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private adminModeSubject = new BehaviorSubject<boolean>(false);

  /**
   * Observable for the current admin mode state.
   */
  adminMode$ = this.adminModeSubject.asObservable();

  /**
   * Toggles the current state of admin mode.
   */
  toggleAdminMode(): void {
    const newAdminMode = !this.adminModeSubject.value;
    this.adminModeSubject.next(newAdminMode);
  }

  /**
   * Checks if admin mode is currently enabled.
   * @returns {boolean} The current state of admin mode.
   */
  isAdminMode(): boolean {
    return this.adminModeSubject.value;
  }
}
