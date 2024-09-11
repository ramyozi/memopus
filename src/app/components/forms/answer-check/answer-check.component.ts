import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatDivider} from "@angular/material/divider";
import * as stringSimilarity from 'string-similarity';

@Component({
  selector: 'app-answer-check',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDivider
  ],
  templateUrl: './answer-check.component.html',
  styleUrls: ['./answer-check.component.css']
})
export class AnswerCheckComponent {
  answerForm: FormGroup;
  answerComparison: { word: string; correct: boolean }[] = [];
  showComparison: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AnswerCheckComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { question: string, description: string; correctAnswer: string }
  ) {
    this.answerForm = this.fb.group({
      proposedAnswer: ['', Validators.required]
    });
  }

  /**
   * Checks the proposed answer against the correct answer using string similarity.
   */
  checkAnswer(): void {
    const proposed = this.answerForm.value.proposedAnswer.trim();
    const correctAnswer = this.data.correctAnswer.trim();
    this.answerComparison = [];

    const proposedWords = proposed.split(' ');
    const correctWords = correctAnswer.split(' ');

    // Comparaison
    proposedWords.forEach((word: string, index: number) => {
      const match = stringSimilarity.findBestMatch(word, correctWords);

      // Determine if the match is considered correct based on a similarity threshold (>0.7).
      this.answerComparison.push({
        word: word,
        correct: match.bestMatch.rating > 0.7
      });
    });

    this.showComparison = true;
  }

  /**
   * Closes the dialog.
   */
  closeDialog(): void {
    this.dialogRef.close();
  }

}
