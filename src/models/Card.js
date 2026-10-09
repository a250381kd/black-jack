/**
 * Clase que representa una carta individual.
 */
export class Card {
  static SUITS = ['♠', '♥', '♦', '♣'];
  static VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
    this.isRed = ['♥', '♦'].includes(suit);
  }

  getNumericValue() {
    if (this.value === 'A') return 11;
    if (['K', 'Q', 'J'].includes(this.value)) return 10;
    return Number(this.value);
  }
}
