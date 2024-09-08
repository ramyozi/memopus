import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CardService } from '../../services/card.service';
import {Tag} from "../../models/tag.model";

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tags: Tag[] = [];
  selectedTags: Set<number> = new Set<number>();

  @Output() tagSelectionChanged = new EventEmitter<number[]>();

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.fetchTags();
  }

  /**
   * Fetch tags from the CardService
   */
  fetchTags(): void {
    this.cardService.getTags().subscribe((data) => {
      this.tags = data;
    });
  }

  /**
   * Handle tag selection and emit event to parent component
   * @param {number} tagId - The ID of the selected tag
   */
  toggleTagSelection(tagId: number): void {
    if (this.selectedTags.has(tagId)) {
      this.selectedTags.delete(tagId);
    } else {
      this.selectedTags.add(tagId);
    }
    this.tagSelectionChanged.emit(Array.from(this.selectedTags));
  }
}
