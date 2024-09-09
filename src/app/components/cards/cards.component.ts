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
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, MatIcon],
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
   * Check if the proposed answer is correct.
   * @param {Card} card - The card for which to check the proposed answer.
   * @returns {boolean} - True if the proposed answer is correct, false otherwise
   */
  openAnswerModal(card: Card): void {
    const dialogRef = this.dialog.open(AnswerCheckComponent, {
      width: '600px',
      data: {
        question: card.question,
        correctAnswer: card.answer,
        description: card.description
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  /**
   * Handle drag start event for a card
   * @param {DragEvent} event - The drag event
   * @param {Card} card - The card being dragged
   */
  onDragStart(event: DragEvent, card: Card): void {
    event.dataTransfer?.setData('text/plain', card.id.toString());
    event.dataTransfer!.effectAllowed = 'move';
  }
}
