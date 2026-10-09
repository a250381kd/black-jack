/**
 * Clase que representa una mano del jugador o del dealer.
 */
export class Hand {
  constructor() {
    this.cards = [];
  }

  static calculate(cards) {
    let total = 0;
    let aces = 0;

    cards.forEach((card) => {
      total += card.getNumericValue();
      if (card.value === 'A') aces += 1;
    });

    while (total > 21 && aces > 0) {
      total -= 10;
      aces -= 1;
    }

    return total;
  }

  addCard(card) {
    this.cards.push(card);
  }

  getValue() {
    return Hand.calculate(this.cards);
  }

  isBust() {
    return this.getValue() > 21;
  }

  isBlackjack() {
    return this.cards.length === 2 && this.getValue() === 21;
  }

  clear() {
    this.cards = [];
  }

  getCards() {
    return this.cards;
  }
}
