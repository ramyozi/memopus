import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsComponent } from '../tags/tags.component';
import { ColumnsComponent } from '../columns/columns.component';
import {Tag} from "../../models/tag.model";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TagsComponent, ColumnsComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  selectedTags: number[] = [];
  tags: Tag[] = [];

  /**
   * Handle tag selection changes from the TagsComponent
   * @param {number[]} selectedTags - Array of selected tag IDs
   */
  onTagSelectionChanged(selectedTags: number[]): void {
    this.selectedTags = selectedTags;
  }

  /**
   * Handle fetching tags from the TagsComponent
   * @param {Tag[]} tags - Array of tags
   */
  onTagsFetched(tags: Tag[]): void {
    this.tags = tags;
  }
}
