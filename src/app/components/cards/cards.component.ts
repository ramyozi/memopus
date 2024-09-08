import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  cards: any[] = [];

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.fetchCards();
  }

  /**
   * Fetch cards from the CardService
   */
  fetchCards(): void {
    this.cardService.getCards().subscribe((data) => {
      this.cards = data;
    });
  }
}
