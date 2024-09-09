import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CardService } from '../../services/card.service';
import { Card } from '../../models/card.model';
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {AnswerCheckComponent} from "../forms/answer-check/answer-check.component";

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit, OnChanges {
  @Input() cards: Card[] = [];
  @Input() columns: number = 3;

  proposedAnswers: { [cardId: number]: string } = {};
  answerComparisons: { [cardId: number]: { char: string; correct: boolean }[] } = {};
  showInput: { [cardId: number]: boolean } = {};


  constructor(private cardService: CardService, private dialog: MatDialog) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cards']) {
      this.cards.forEach(card => this.showInput[card.id] = false);
    }
  }

  /**
   * Toggle visibility of the answer input form
   * @param {number} cardId - The ID of the card for which to toggle the input form
   */
  toggleInput(cardId: number): void {
    this.showInput[cardId] = !this.showInput[cardId];
  }

  /**
   * Compare proposed answer to the correct answer character by character.
   * @param {Card} card - The card for which the answer is being checked.
   */
  checkAnswer(card: Card): void {
    const proposed = this.proposedAnswers[card.id] || '';
    const answer = card.answer;
    const comparison = [];

    for (let i = 0; i < Math.max(proposed.length, answer.length); i++) {
      comparison.push({
        char: proposed[i] || '_',
        correct: proposed[i] === answer[i]
      });
    }

    this.answerComparisons[card.id] = comparison;
  }

  /**
   * Check if the proposed answer contains any incorrect characters.
   * @param {number} cardId - The ID of the card for which to check the proposed answer.
   * @returns {boolean} - True if the proposed answer contains any incorrect characters, false otherwise
    */
  hasIncorrectCharacters(cardId: number): boolean {
    return this.answerComparisons[cardId]?.some((char) => !char.correct);
  }

  /**
   * Check if the proposed answer is correct.
   * @param {Card} card - The card for which to check the proposed answer.
   * @returns {boolean} - True if the proposed answer is correct, false otherwise
   */
  openAnswerModal(card: Card): void {
    const dialogRef = this.dialog.open(AnswerCheckComponent, {
      width: '600px',
      data: {
        question: card.question,
        correctAnswer: card.answer
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
