import {AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Tag } from '../../../models/tag.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TagService } from '../../../services/tag.service';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NgxMatColorPickerModule } from '@angular-material-components/color-picker';
import { MatTooltip } from '@angular/material/tooltip';
import 'emoji-picker-element';

@Component({
  selector: 'app-tag-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NgxMatColorPickerModule,
    MatTooltip,
    MatDialogModule,
  ],
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TagFormComponent implements OnInit, AfterViewInit {
  tagForm: FormGroup;
  isEditMode: boolean;
  hasCards: boolean = false;

  @ViewChild('emojiPicker', { static: false }) emojiPickerRef!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TagFormComponent>,
    private tagService: TagService,
    @Inject(MAT_DIALOG_DATA) public data: { tag: Tag | null }
  ) {
    this.isEditMode = !!this.data.tag;
    this.tagForm = this.fb.group({
      label: [this.data.tag ? this.data.tag.label : '', Validators.required],
      color: [this.data.tag ? this.data.tag.color : '#ffffff'],
      emoji: [this.data.tag ? this.data.tag.emoji : '']
    });
  }

  ngOnInit(): void {
    if (this.isEditMode && this.data.tag) {
      this.verifyTagHasCards();
    }
  }

  ngAfterViewInit(): void {
    const pickerEl = this.emojiPickerRef.nativeElement as HTMLElement;
    pickerEl.addEventListener('emoji-click', (event: any) => {
      this.onEmojiSelect(event.detail);
    });
  }

  onEmojiSelect(detail: any): void {
    this.tagForm.patchValue({ emoji: detail.unicode });
  }

  onSubmit(): void {
    if (this.tagForm.valid) {
      if (this.isEditMode) {
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

  verifyTagHasCards(): void {
    this.tagService.hasAssociatedCards(this.data.tag!.id).subscribe((hasCards) => {
      this.hasCards = hasCards;
    });
  }

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
