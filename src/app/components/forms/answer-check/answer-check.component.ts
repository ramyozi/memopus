import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-answer-check',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './answer-check.component.html',
  styleUrls: ['./answer-check.component.css']
})
export class AnswerCheckComponent {
  answerForm: FormGroup;
  answerComparison: { char: string; correct: boolean }[] = [];
  showComparison: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AnswerCheckComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { question: string; correctAnswer: string }
  ) {
    this.answerForm = this.fb.group({
      proposedAnswer: ['', Validators.required]
    });
  }

  /**
   * Check the proposed answer against the correct answer.
   */
  checkAnswer(): void {
    const proposed = this.answerForm.value.proposedAnswer;
    const answer = this.data.correctAnswer;
    this.answerComparison = [];

    for (let i = 0; i < Math.max(proposed.length, answer.length); i++) {
      this.answerComparison.push({
        char: proposed[i] || '_',
        correct: proposed[i] === answer[i]
      });
    }

    this.showComparison = true;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
