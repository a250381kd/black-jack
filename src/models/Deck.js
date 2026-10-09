/**
 * Clase que representa un mazo de 52 cartas.
 */
import { Card } from './Card.js';

export class Deck {
  constructor() {
    this.cards = [];
    this.initialize();
    this.shuffle();
  }

  initialize() {
    this.cards = [];
    Card.SUITS.forEach((suit) => {
      Card.VALUES.forEach((value) => {
        this.cards.push(new Card(suit, value));
      });
    });
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  drawCard() {
    return this.cards.pop();
  }

  getRemainingCards() {
    return this.cards.length;
  }
}
