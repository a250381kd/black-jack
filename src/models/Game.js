/**
 * Lógica central del blackjack.
 */
import { Deck } from './Deck.js';
import { Hand } from './Hand.js';

export class Game {
  constructor(initialMoney = 100, bet = 10) {
    this.money = initialMoney;
    this.bet = bet;
    this.playerHand = new Hand();
    this.dealerHand = new Hand();
    this.deck = new Deck();
    this.isRoundActive = false;
    this.isRoundFinished = false;
    this.dealerHidden = true;
  }

  startRound() {
    if (this.deck.getRemainingCards() < 15) {
      this.deck = new Deck();
    }

    this.playerHand.clear();
    this.dealerHand.clear();
    this.isRoundActive = true;
    this.isRoundFinished = false;
    this.dealerHidden = true;

    this.playerHand.addCard(this.deck.drawCard());
    this.dealerHand.addCard(this.deck.drawCard());
    this.playerHand.addCard(this.deck.drawCard());
    this.dealerHand.addCard(this.deck.drawCard());
  }

  playerHit() {
    if (!this.isRoundActive || this.isRoundFinished) return null;
    const card = this.deck.drawCard();
    this.playerHand.addCard(card);
    return card;
  }

  dealerPlay() {
    this.dealerHidden = false;
    while (this.dealerHand.getValue() < 17) {
      this.dealerHand.addCard(this.deck.drawCard());
    }
    this.isRoundActive = false;
    this.isRoundFinished = true;
  }

  evaluateRound() {
    const playerValue = this.playerHand.getValue();
    const dealerValue = this.dealerHand.getValue();

    if (playerValue > 21) {
      this.money -= this.bet;
      return 'dealer_win';
    }

    if (dealerValue > 21) {
      this.money += this.bet;
      return 'player_win';
    }

    if (playerValue > dealerValue) {
      this.money += this.bet;
      return 'player_win';
    }

    if (playerValue < dealerValue) {
      this.money -= this.bet;
      return 'dealer_win';
    }

    return 'tie';
  }

  getPlayerCards() {
    return this.playerHand.getCards();
  }

  getDealerCards() {
    return this.dealerHand.getCards();
  }

  getPlayerValue() {
    return this.playerHand.getValue();
  }

  getDealerValue() {
    return this.dealerHand.getValue();
  }

  getVisibleDealerValue() {
    const cards = this.dealerHand.getCards();
    if (cards.length <= 1) return 0;
    return Hand.calculate(cards.slice(1));
  }

  getMoney() {
    return this.money;
  }
}
