import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag } from '../models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private apiUrl = 'http://localhost:3000/tags';

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
}
