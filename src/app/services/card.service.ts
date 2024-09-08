import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private apiUrl = 'http://localhost:3000/cards';
  private tagsUrl = 'http://localhost:3000/tags';

  constructor(private http: HttpClient) {}

  /**
   * Fetch all cards from the server
   * @returns {Observable<any[]>} An observable of card data
   */
  getCards(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  /**
   * Fetch all tags from the server
   * @returns {Observable<any[]>} An observable of tag data
   */
  getTags(): Observable<any[]> {
    return this.http.get<any[]>(this.tagsUrl);
  }
}
