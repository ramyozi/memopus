import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from '../models/card.model';
import { Tag } from '../models/tag.model';
import {Column} from "../models/column.model";

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private apiUrl = 'http://localhost:3000/cards';
  private tagsUrl = 'http://localhost:3000/tags';
  private columnsUrl = 'http://localhost:3000/columns';

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

  /**
   * Update the column of a card
   * @param {number} cardId - The ID of the card to update
   * @param {number} columnId - The new column ID for the card
   * @returns {Observable<Card>} An observable of the updated card
   */
  updateCardColumn(cardId: number, columnId: number): Observable<Card> {
    return this.http.patch<Card>(`${this.apiUrl}/${cardId}`, { column: columnId });
  }

  /**
   * Fetch all columns from the server
   * @returns {Observable<Column[]>} An observable of column data
   */
  getColumns(): Observable<Column[]> {
    return this.http.get<Column[]>(this.columnsUrl);
  }
}
