import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CardService } from '../../services/card.service';
import {Card} from "../../models/card.model";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButton],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  cards: Card[] = [];
  filteredCards: Card[] = [];

  @Input() selectedTags: number[] = [];

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.fetchCards();
  }

  ngOnChanges(): void {
    this.filterCards();
  }

  /**
   * Fetch cards from the CardService
   */
  fetchCards(): void {
    this.cardService.getCards().subscribe((data) => {
      this.cards = data;
      this.filterCards();
    });
  }

  /**
   * Filter cards based on selected tags
   */
  filterCards(): void {
    if (this.selectedTags.length === 0) {
      this.filteredCards = this.cards;
    } else {
      this.filteredCards = this.cards.filter(card => this.selectedTags.includes(card.tag));
    }
  }

  /**
   * Toggle the visibility of the card's answer
   * @param {Card} card - The card to toggle
   */
  toggleAnswer(card: Card): void {
    card.showAnswer = !card.showAnswer;
  }
}
