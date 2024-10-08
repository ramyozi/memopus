import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import {Tag} from "../../../models/tag.model";
import {CardService} from "../../../services/card.service";
import {Card} from "../../../models/card.model";
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';  // Import MatFormFieldModule
import { MatInputModule } from '@angular/material/input';  // Import MatInputModule
import { MatSelectModule } from '@angular/material/select';  // Import MatSelectModule
import { MatOptionModule } from '@angular/material/core';
import {TagService} from "../../../services/tag.service";
import {MatIconModule} from "@angular/material/icon";  // Import MatOptionModule

@Component({
  selector: 'app-card-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule
  ],
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})
export class CardFormComponent implements OnInit {
  cardForm: FormGroup;
  isEditMode: boolean;
  tags: Tag[];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CardFormComponent>,
    private cardService: CardService,
    private tagService: TagService,
    @Inject(MAT_DIALOG_DATA) public data: { card: Card | null; selectedTagId: number | null; columnId: number | null }
  ) {
    this.isEditMode = !!this.data.card;
    this.cardForm = this.fb.group({
      question: [this.data.card ? this.data.card.question : '', Validators.required],
      answer: [this.data.card ? this.data.card.answer : '', Validators.required],
      description: [this.data.card ? this.data.card.description : '', Validators.required],
      tag: [this.data.selectedTagId || (this.data.card ? this.data.card.tag : ''), Validators.required],
      column: [this.data.columnId || (this.data.card ? this.data.card.column : ''), Validators.required]

    });

    this.tags = [];
  }

  /**
   * Load tags on load of the component.
   */
  ngOnInit(): void {
    this.loadTags();
  }

  /**
   * Load tags for the selector
   */
  loadTags(): void {
    this.tagService.getTags().subscribe(tags => {
      this.tags = tags;
    });
  }

  /**
   * Submit the form to create or update a card.
   */
  onSubmit(): void {
    console.log(this.cardForm.value);
    if (this.cardForm.valid) {
      if (this.isEditMode) {
        this.cardService.updateCard(this.data.card!.id, this.cardForm.value).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        this.cardService.createCard(this.cardForm.value).subscribe(() => {
          console.log('Card created');
          this.dialogRef.close(true);
        });
      }
    }
  }

  /**
   * Delete the card.
   */
  deleteCard(): void {
    if (this.data.card) {
      this.cardService.deleteCard(this.data.card.id).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  /**
   * Close the dialog.
   */
  onCancel(): void {
    this.dialogRef.close();
  }
}
