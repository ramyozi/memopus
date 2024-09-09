import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ColumnService } from '../../../services/column.service';
import { Column } from '../../../models/column.model';

@Component({
  selector: 'app-column-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './column-form.component.html',
  styleUrls: ['./column-form.component.css']
})
export class ColumnFormComponent {
  columnForm: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ColumnFormComponent>,
    private columnService: ColumnService,
    @Inject(MAT_DIALOG_DATA) public data: { column: Column | null }
  ) {
    this.isEditMode = !!this.data.column;
    this.columnForm = this.fb.group({
      label: [this.data.column ? this.data.column.label : '', Validators.required],
    });
  }

  /**
   * Handles form submission to update or create a column.
   */
  onSubmit(): void {
    if (this.columnForm.valid) {
      if (this.isEditMode) {
        this.columnService.updateColumn(this.data.column!.id, this.columnForm.value).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        this.columnService.addColumn(this.columnForm.value).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }

  /**
   * Closes the dialog without saving changes.
   */
  onCancel(): void {
    this.dialogRef.close();
  }
}
