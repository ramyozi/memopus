import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable, of} from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

interface User {
  id: number;
  login: string;
  pwd: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private isAuthenticated = false;

  constructor(private http: HttpClient) {}

  /**
   * Logs in the user by verifying credentials.
   * @param {string} login - The user's login name.
   * @param {string} password - The user's password.
   * @returns {Observable<boolean>} Returns an observable of authentication status.
   */
  login(login: string, password: string): Observable<boolean> {
    return this.http.get<User[]>(`${this.apiUrl}?login=${login}&pwd=${password}`).pipe(
      map(users => {
        if (users.length > 0) {
          this.isAuthenticated = true;
          localStorage.setItem('user', JSON.stringify(users[0]));
          return true;
        } else {
          return false;
        }
      }),
      catchError(() => of(false))
    );
  }

  /**
   * Checks if the user is authenticated.
   * @returns {boolean} The authentication status.
   */
  isLoggedIn(): boolean {
    return this.isAuthenticated || !!localStorage.getItem('user');
  }

  /**
   * Logs out the user by clearing local storage and authentication status.
   */
  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('user');
  }
}
