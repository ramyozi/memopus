import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { ColumnService } from '../../../services/column.service';
import { Column } from '../../../models/column.model';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule} from "@angular/material/card"; 

@Component({
  selector: 'app-column-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './column-form.component.html',
  styleUrls: ['./column-form.component.css']
})
export class ColumnFormComponent {
  columnForm: FormGroup;
  isEditMode: boolean;
  columns: Column[] = [];
  newColumnPosition: number;
  customPositioningEnabled: boolean = false; 

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ColumnFormComponent>,
    private columnService: ColumnService,
    @Inject(MAT_DIALOG_DATA) public data: { column: Column | null; columns: Column[] }
  ) {
    this.isEditMode = !!this.data.column;
    this.columns = [...this.data.columns]; 

    this.columnForm = this.fb.group({
      label: [this.data.column ? this.data.column.label : '', Validators.required],
      customPosition: [false] 
    });

    
    if (!this.isEditMode) {
      this.newColumnPosition = this.columns.length;
    } else {
      this.newColumnPosition = this.columns.findIndex(col => col.id === this.data.column?.id);
    }
  }

  /**
   * Moves the new or updated column up in the order.
   */
  moveUp(): void {
    if (this.newColumnPosition > 0) {
      this.swapColumns(this.newColumnPosition, this.newColumnPosition - 1);
      this.newColumnPosition--;
    }
  }

  /**
   * Moves the new or updated column down in the order.
   */
  moveDown(): void {
    if (this.newColumnPosition < this.columns.length - 1) {
      this.swapColumns(this.newColumnPosition, this.newColumnPosition + 1);
      this.newColumnPosition++;
    }
  }

  /**
   * Swaps two columns in the order.
   * @param index1 - Index of the first column.
   * @param index2 - Index of the second column.
   */
  swapColumns(index1: number, index2: number): void {
    [this.columns[index1], this.columns[index2]] = [this.columns[index2], this.columns[index1]];
  }

  /**
   * Handles form submission to update or create a column.
   */
  onSubmit(): void {
    if (this.columnForm.valid) {
      const newColumnData = { ...this.columnForm.value, order: this.newColumnPosition };

      if (this.isEditMode) {
        
        this.columnService.updateColumn(this.data.column!.id, newColumnData).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        
        this.columnService.addColumn(newColumnData).subscribe((newColumn) => {
          this.updateColumnPositions(newColumn.id); 
          this.dialogRef.close(true);
        });
      }
    }
  }

  /**
   * Updates positions of all columns after adding a new one.
   * @param newColumnId - ID of the newly created column.
   */
  updateColumnPositions(newColumnId: number): void {
    this.columns.forEach((column, index) => {
      column.order = index;
      if (column.id !== newColumnId) {
        this.columnService.updateColumn(column.id, column).subscribe();
      }
    });
  }

  /**
   * Closes the dialog without saving changes.
   */
  onCancel(): void {
    this.dialogRef.close();
  }
}
