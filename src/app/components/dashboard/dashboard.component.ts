import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsComponent } from '../tags/tags.component';
import { ColumnsComponent } from '../columns/columns.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TagsComponent, ColumnsComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  selectedTags: number[] = [];

  /**
   * Handle tag selection changes from the TagsComponent
   * @param {number[]} selectedTags - Array of selected tag IDs
   */
  onTagSelectionChanged(selectedTags: number[]): void {
    this.selectedTags = selectedTags;
  }
}
