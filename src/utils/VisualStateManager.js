import { AnimationManager } from './AnimationManager.js';
import { VisualEffects } from './VisualEffects.js';

export class VisualStateManager {
  constructor(animationManager, visualEffects) {
    this.animations = animationManager;
    this.effects = visualEffects;
    this.currentState = 'idle';
  }

  async onPlayerWin(statusBox, moneyBox, amount) {
    this.currentState = 'win';
    await Promise.all([
      this.animations.bounce(statusBox),
      this.animations.glow(statusBox, 'rgba(110, 247, 186, 0.8)'),
      this.effects.confetti(),
      this.animations.balanceChange(moneyBox, amount, true)
    ]);
    this.currentState = 'idle';
  }

  async onPlayerLose(statusBox, moneyBox, amount) {
    this.currentState = 'lose';
    await Promise.all([
      this.animations.shake(statusBox),
      this.animations.glow(statusBox, 'rgba(255, 93, 97, 0.8)'),
      this.effects.colorBurst('rgba(255, 93, 97, 0.8)'),
      this.animations.balanceChange(moneyBox, amount, false)
    ]);
    this.currentState = 'idle';
  }

  async onTie(statusBox) {
    this.currentState = 'tie';
    await this.animations.pulse(statusBox);
    this.currentState = 'idle';
  }

  async onDealCards(playerCards, dealerCards) {
    const delay = (ms) => new Promise(r => setTimeout(r, ms));
    await this.animations.cardAppear(dealerCards[0]);
    await delay(150);
    await this.animations.cardAppear(playerCards[0]);
    await delay(150);
    await this.animations.cardAppear(dealerCards[1]);
    await delay(150);
    await this.animations.cardAppear(playerCards[1]);
  }

  async onDealerReveal(card) {
    if (!card) return;
    await this.animations.cardFlip(card);
    await this.animations.glow(card, 'rgba(103, 246, 255, 0.6)');
  }
}
