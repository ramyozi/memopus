import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from '../cards/cards.component';
import { TagsComponent } from '../tags/tags.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardsComponent, TagsComponent],
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
