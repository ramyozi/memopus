import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { Tag } from '../models/tag.model';
import {Card} from "../models/card.model";

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private apiUrl = 'http://localhost:3000/tags';
  private cardsUrl = 'http://localhost:3000/cards';

  constructor(private http: HttpClient) {}

  /**
   * Fetch all tags from the server
   * @returns {Observable<Tag[]>} An observable of tag data
   */
  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.apiUrl);
  }

  /**
   * Create a new tag on the server
   * @param {Tag} tag - The tag to create
   * @returns {Observable<Tag>} An observable of the created tag
   */
  createTag(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(this.apiUrl, tag);
  }

  /**
   * Update an existing tag on the server
   * @param {number} tagId - The ID of the tag to update
   * @param {Partial<Tag>} tagData - The new data for the tag
   * @returns {Observable<Tag>} An observable of the updated tag
   */
  updateTag(tagId: number, tagData: Partial<Tag>): Observable<Tag> {
    return this.http.put<Tag>(`${this.apiUrl}/${tagId}`, tagData);
  }

  /**
   * Delete a tag from the server
   * @param {number} tagId - The ID of the tag to delete
   * @returns {Observable<void>} An observable that completes when the tag is deleted
   */
  deleteTag(tagId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${tagId}`);
  }

  /**
   * Verify if the tag has associated cards.
   * @param {number} tagId - The ID of the tag to check.
   * @returns {Observable<boolean>} - True if the tag has associated cards, false otherwise.
   */
  hasAssociatedCards(tagId: number): Observable<boolean> {
    return this.http.get<Card[]>(`${this.cardsUrl}?tag=${tagId}`).pipe(
      map(cards => cards.length > 0)
    );
  }
}
