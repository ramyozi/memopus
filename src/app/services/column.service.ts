import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Column } from '../models/column.model';

@Injectable({
  providedIn: 'root'
})
export class ColumnService {
  private apiUrl = 'http://localhost:3000/columns';

  constructor(private http: HttpClient) {}

  /**
   * Fetch all columns from the server
   * @returns {Observable<Column[]>} An observable of column data
   */
  getColumns(): Observable<Column[]> {
    return this.http.get<Column[]>(this.apiUrl);
  }

  /**
   * Update column details on the server
   * @param {number} columnId - The ID of the column to update
   * @param {Partial<Column>} columnData - The new data for the column
   * @returns {Observable<Column>} An observable of the updated column
   */
  updateColumn(columnId: number, columnData: Partial<Column>): Observable<Column> {
    return this.http.patch<Column>(`${this.apiUrl}/${columnId}`, columnData);
  }

  /**
   * Add a new column to the server
   * @param {Column} column - The column to add
   * @returns {Observable<Column>} An observable of the added column
   */
  addColumn(column: Column): Observable<Column> {
    return this.http.post<Column>(this.apiUrl, column);
  }

  /**
   * Delete a column from the server
   * @param {number} columnId - The ID of the column to delete
   * @returns {Observable<void>} An observable that completes when the column is deleted
   */
  deleteColumn(columnId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${columnId}`);
  }
}
