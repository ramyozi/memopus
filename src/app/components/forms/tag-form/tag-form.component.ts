import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {Tag} from "../../../models/tag.model";
import {MatFormFieldModule} from "@angular/material/form-field";
import {TagService} from "../../../services/tag.service";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-tag-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.css']
})
export class TagFormComponent implements OnInit {
  tagForm: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TagFormComponent>,
    private tagService: TagService,
    @Inject(MAT_DIALOG_DATA) public data: { tag: Tag | null }
  ) {
    this.isEditMode = !!this.data.tag;
    this.tagForm = this.fb.group({
      label: [this.data.tag ? this.data.tag.label : '', Validators.required]
    });
  }

  ngOnInit(): void {}

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

  onCancel(): void {
    this.dialogRef.close();
  }
}
