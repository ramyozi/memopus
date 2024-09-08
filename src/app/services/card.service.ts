import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from '../models/card.model';
import { Tag } from '../models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private apiUrl = 'http://localhost:3000/cards';
  private tagsUrl = 'http://localhost:3000/tags';

  constructor(private http: HttpClient) {}

  /**
   * Fetch all cards from the server
   * @returns {Observable<Card[]>} An observable of card data
   */
  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.apiUrl);
  }

  /**
   * Fetch all tags from the server
   * @returns {Observable<Tag[]>} An observable of tag data
   */
  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.tagsUrl);
  }
}
