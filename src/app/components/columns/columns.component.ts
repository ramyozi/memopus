import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CardService } from '../../services/card.service';
import { Card } from '../../models/card.model';
import { Column } from '../../models/column.model';

@Component({
  selector: 'app-columns',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.css']
})
export class ColumnsComponent implements OnInit {
  @Input() selectedTags: number[] = [];
  cards: Card[] = [];
  columns: Column[] = [];

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.fetchCards();
    this.fetchColumns();
  }

  /**
   * Fetch cards from the CardService
   */
  fetchCards(): void {
    this.cardService.getCards().subscribe((data: Card[]) => {
      this.cards = data.map(card => ({ ...card, showAnswer: false }));
    });
  }

  /**
   * Fetch columns from the CardService
   */
  fetchColumns(): void {
    this.cardService.getColumns().subscribe((data: Column[]) => {
      this.columns = data;
    });
  }

  /**
   * Move a card to a different column
   * @param {Card} card - The card to move
   * @param {number} columnId - The ID of the column to move the card to
   */
  moveCard(card: Card, columnId: number): void {
    card.column = columnId;
    this.cardService.updateCardColumn(card.id, columnId).subscribe();
  }

  /**
   * Get cards filtered by column ID
   * @param {number} columnId - The column ID to filter cards by
   * @returns {Card[]} Array of cards for the specified column
   */
  getCardsForColumn(columnId: number): Card[] {
    return this.cards.filter(card => card.column === columnId && (this.selectedTags.length === 0 || this.selectedTags.includes(card.tag)));
  }

  /**
   * Handle drag start event
   * @param {DragEvent} event - The drag event
   * @param {Card} card - The card being dragged
   */
  onDragStart(event: DragEvent, card: Card): void {
    event.dataTransfer?.setData('text/plain', card.id.toString());
  }

  /**
   * Handle drag over event
   * @param {DragEvent} event - The drag event
   */
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.dataTransfer!.dropEffect = 'move';
  }

  /**
   * Handle drop event
   * @param {DragEvent} event - The drag event
   * @param {number} columnId - The ID of the column where the card is dropped
   */
  onDrop(event: DragEvent, columnId: number): void {
    event.preventDefault();
    const cardId = event.dataTransfer?.getData('text/plain');
    if (cardId) {
      const card = this.cards.find(c => c.id === +cardId);
      if (card && card.column !== columnId) {
        this.moveCard(card, columnId);
      }
    }
  }

  /**
   * Handle click event
   * @param {Card} card - The card to toggle
   */
  toggleAnswer(card: Card): void {
    card.showAnswer = !card.showAnswer;
  }
}
