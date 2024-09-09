import {Component, OnInit, Input, SimpleChanges, OnChanges, EventEmitter, Output} from '@angular/core';
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
import {CardFormComponent} from "../forms/card-form/card-form.component";
import {AdminService} from "../../services/admin.service";

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

  @Output() cardUpdated = new EventEmitter<void>();

  showInput: { [cardId: number]: boolean } = {};
  isAdminMode: boolean = false;


  constructor(private cardService: CardService, private dialog: MatDialog, private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.adminMode$.subscribe((isAdmin) => {
      this.isAdminMode = isAdmin;
    });
  }
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
   * Open the card form modal in edit mode.
   * @param {Card} card - The card to edit.
   */
  openEditCardModal(card: Card): void {
    const dialogRef = this.dialog.open(CardFormComponent, {
      width: '400px',
      data: {
        card: card,
        selectedTagId: card.tag,
        columnId: card.column
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cardUpdated.emit();
      }
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
