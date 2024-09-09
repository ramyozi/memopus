import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TagService } from '../../services/tag.service';
import { Tag } from '../../models/tag.model';
import {MatIcon} from "@angular/material/icon";
import {TagFormComponent} from "../forms/tag-form/tag-form.component";
import {MatDialog} from "@angular/material/dialog";
import {AdminService} from "../../services/admin.service";
import {LightenDarkenColor} from "../../hooks/edit-color";

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIcon],
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tags: Tag[] = [];
  selectedTags: Set<number> = new Set<number>();
  error: string | null = null;
  isAdminMode: boolean = false;

  @Output() tagSelectionChanged = new EventEmitter<number[]>();
  @Output() tagsFetched = new EventEmitter<Tag[]>();

  constructor(
    private tagService: TagService,
    private dialog: MatDialog,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.fetchTags();
    this.adminService.adminMode$.subscribe((isAdmin) => {
      this.isAdminMode = isAdmin;
    });
  }

  /**
   * Fetch tags from the TagService
   */
  fetchTags(): void {
    this.tagService.getTags().subscribe(
      (data: Tag[]) => {
        this.tags = data.map(tag => ({
          ...tag,
          color: this.assignColor(tag.id)
        }));
        this.error = this.tags.length === 0 ? 'Aucun tag disponible.' : null;
        this.tagsFetched.emit(this.tags);
      },
      (error) => {
        this.error = 'Échec du chargement des tags. Veuillez réessayer plus tard.';
        console.error('Error fetching tags:', error);
      }
    );
  }

  /**
   * Assign a color based on the tag ID.
   * @param {number} tagId - The tag ID.
   * @returns {string} - The assigned color.
   */
  private assignColor(tagId: number): string {
    const colors = [
      '#FFEBEE', '#E3F2FD', '#E8F5E9', '#FFF3E0', '#F3E5F5', '#FCE4EC'
    ];
    return colors[tagId % colors.length];
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
    this.emitTagSelection();
  }

  /**
   * Emit the selected tags as an array to the parent component
   */
  private emitTagSelection(): void {
    this.tagSelectionChanged.emit(Array.from(this.selectedTags));
  }

  /**
   * Reset selected tags and emit an empty array to clear filters
   */
  resetSelections(): void {
    this.selectedTags.clear();
    this.emitTagSelection();
  }

  /**
   * Open the create tag modal.
   */
  openCreateTagModal(): void {
    const dialogRef = this.dialog.open(TagFormComponent, {
      width: '400px',
      data: { tag: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchTags();
      }
    });
  }

  /**
   * Opens the update tag modal.
   * @param {Tag} tag - The tag to update.
   */
  openUpdateTagModal(tag: Tag): void {
    const dialogRef = this.dialog.open(TagFormComponent, {
      width: '400px',
      data: { tag }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchTags();
      }
    });
  }


  /**
   * Get the style for a tag.
   * @param tag - The tag to get the style for.
   */
  getTagStyle(tag: Tag): any {
    const isSelected = this.selectedTags.has(tag.id);
    return {
      'background-color': isSelected ? this.darkenColor(tag.color || 'ffffff', 20) : tag.color,
      'color': isSelected ? '#000000' : '#000000',
      'border': isSelected ? '2px solid #ffffff' : '1px solid #cccccc',
      'box-shadow': isSelected ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
      'padding': isSelected ? '16px 24px' : '8px 16px',
      'font-size': isSelected ? '1.2em' : '1em',
      'border-radius': isSelected ? '12px' : '8px',
      'transition': 'all 0.3s ease'
    };
  }


  /**
   * Darken a color by a specified amount.
   * @param {string} color - The color to darken.
   * @param {number} amount - The amount to darken the color by.
   *
   * @returns {string} - The darkened color.
   */
  darkenColor(color: string, amount: number): string {
    return LightenDarkenColor(color, -amount);
  }
}
