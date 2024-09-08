import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CardsComponent} from "../cards/cards.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardsComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {}
