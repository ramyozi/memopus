import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from '../models/card.model';
import {Column} from "../models/column.model";

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private apiUrl = 'http://localhost:3000/cards';
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

  /**
   * Create a new card on the server
   * @param {Card} card - The card to create
   * @returns {Observable<Card>} An observable of the created card
   */
  createCard(card: Card): Observable<Card> {
    return this.http.post<Card>(this.apiUrl, card);
  }

  /**
   * Update an existing card on the server
   * @param {number} cardId - The ID of the card to update
   * @param {Partial<Card>} cardData - The new data for the card
   * @returns {Observable<Card>} An observable of the updated card
   */
  updateCard(cardId: number, cardData: Partial<Card>): Observable<Card> {
    return this.http.put<Card>(`${this.apiUrl}/${cardId}`, cardData);
  }

  /**
   * Delete a card from the server
   * @param {number} cardId - The ID of the card to delete
   * @returns {Observable<void>} An observable of the deletion status
   */
  deleteCard(cardId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${cardId}`);
  }
}
