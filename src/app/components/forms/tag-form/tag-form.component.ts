import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import {FormBuilder, ReactiveFormsModule, FormGroup, Validators, FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {Tag} from "../../../models/tag.model";
import {MatFormFieldModule} from "@angular/material/form-field";
import {TagService} from "../../../services/tag.service";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {NgxMatColorPickerModule } from '@angular-material-components/color-picker';
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-tag-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NgxMatColorPickerModule,
    ReactiveFormsModule,
    MatTooltip
  ],  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.css']
})
export class TagFormComponent implements OnInit {
  tagForm: FormGroup;
  isEditMode: boolean;
  hasCards: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TagFormComponent>,
    private tagService: TagService,
    @Inject(MAT_DIALOG_DATA) public data: { tag: Tag | null }
  ) {
    this.isEditMode = !!this.data.tag;
    this.tagForm = this.fb.group({
      label: [this.data.tag ? this.data.tag.label : '', Validators.required],
      color: [this.data.tag ? this.data.tag.color : '#ffffff']
    });
  }

  ngOnInit(): void {
    if (this.isEditMode && this.data.tag) {
      this.verifyTagHasCards();
    }
  }
  onSubmit(): void {
    if (this.tagForm.valid) {
      if (this.isEditMode) {
        // Update existing tag
        this.tagService.updateTag(this.data.tag!.id, this.tagForm.value).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        this.tagService.createTag(this.tagForm.value).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }


  /**
   * Verify if the tag has associated cards.
   */
  verifyTagHasCards(): void {
    this.tagService.hasAssociatedCards(this.data.tag!.id).subscribe((hasCards) => {
      this.hasCards = hasCards;
    });
  }

  /**
   * Delete the tag if it has no associated cards.
   */
  deleteTag(): void {
    if (this.hasCards) {
      alert("Ce tag est associé à des cartes et ne peut pas être supprimé.");
      return;
    }

    if (this.data.tag) {
      this.tagService.deleteTag(this.data.tag.id).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }


  onCancel(): void {
    this.dialogRef.close();
  }
}
