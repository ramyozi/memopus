import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CardService } from '../../services/card.service';
import { Card } from '../../models/card.model';
import { Column } from '../../models/column.model';
import {ColumnService} from "../../services/column.service";
import {MatIcon} from "@angular/material/icon";
import {CardFormComponent} from "../forms/card-form/card-form.component";
import {MatDialog} from "@angular/material/dialog";
import {CardsComponent} from "../cards/cards.component";
import {AdminService} from "../../services/admin.service";
import {ColumnFormComponent} from "../forms/column-form/column-form.component";
import {Tag} from "../../models/tag.model";

@Component({
  selector: 'app-columns',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIcon, CardsComponent],
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.css']
})
export class ColumnsComponent implements OnInit {
  @Input() selectedTags: number[] = [];
  @Input() tags: Tag[] = [];
  cards: Card[] = [];
  columns: Column[] = [];
  error: string | null = null;
  isAdminMode: boolean = false;

  constructor(private cardService: CardService,
              private columnService: ColumnService,
              private dialog: MatDialog,
              private adminService: AdminService
) {}

  ngOnInit(): void {
    this.fetchCards();
    this.fetchColumns();
    this.adminService.adminMode$.subscribe((isAdmin) => {
      this.isAdminMode = isAdmin;
    });
  }
  /**
   * Fetch cards from the CardService
   */
  fetchCards(): void {
    this.cardService.getCards().subscribe(
      (data: Card[]) => {
        this.cards = data.map(card => ({ ...card, showAnswer: false }));
        this.error = null;
      },
      (error) => {
        this.error = 'Échec du chargement des cartes. Veuillez réessayer plus tard.';
        console.error('Error fetching cards:', error);
      }
    );
  }

  /**
   * Fetch columns from the CardService
   */
  fetchColumns(): void {
    this.columnService.getColumns().subscribe(
      (data: Column[]) => {
        this.columns = data;
        this.error = this.columns.length === 0 ? 'Aucune colonne disponible.' : null;
      },
      (error) => {
        this.error = 'Échec du chargement des colonnes. Veuillez réessayer plus tard.';
        console.error('Error fetching columns:', error);
      }
    );
  }

  /**
   * Move a card to a different column
   * @param {Card} card - The card to move
   * @param {number} columnId - The ID of the column to move the card to
   */
  moveCard(card: Card, columnId: number): void {
    card.column = columnId;
    this.cardService.updateCardColumn(card.id, columnId).subscribe(
      (updatedCard) => {
        const index = this.cards.findIndex(c => c.id === updatedCard.id);
        if (index > -1) {
          this.cards[index] = updatedCard;
        }
      },
      (error) => {
        console.error('Failed to update card column', error);
      }
    );
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
    event.dataTransfer!.effectAllowed = 'move';
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
      console.log(`Moving card with ID (string): "${cardId}" to column ${columnId}`);
      const card = this.cards.find(c => String(c.id) === cardId.trim());

      if (card) {
        console.log('Card found:', card);

        if (card.column !== columnId) {
          this.moveCard(card, columnId);
        }
      } else {
        console.error('Card not found. Card ID:', cardId, 'Available cards:', this.cards.map(c => c.id));
      }
    } else {
      console.error('Failed to get card ID from data transfer');
    }
  }

  /**
   * Open the create card modal
   */
  openCreateCardModal(columnId: number): void {
    const dialogRef = this.dialog.open(CardFormComponent, {
      width: '400px',
      data: {
        card: null,
        selectedTagId: this.selectedTags.length === 1 ? this.selectedTags[0] : null,
        columnId: columnId
      }    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchCards();
      }
    });
  }

  /**
   * Get the number of cards for a column
   * @param columnId
   * @returns {number}
   */
  getCardCountForColumn(columnId: number): number {
    return this.getCardsForColumn(columnId).length;
  }

  /**
   * Opens the update column modal.
   * @param {Column} column - The column to update.
   */
  openUpdateColumnModal(column: Column): void {
    const dialogRef = this.dialog.open(ColumnFormComponent, {
      width: '400px',
      data: { column }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchColumns();
      }
    });
  }
}
