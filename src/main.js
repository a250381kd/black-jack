import { Game } from './models/Game.js';

const game = new Game(100, 10);
let currentBet = 10;

const elements = {
  loading: document.querySelector('#loading-screen'),
  gameOver: document.querySelector('#game-over-screen'),
  gameOverMessage: document.querySelector('#game-over-message'),
  dealerHand: document.querySelector('#dealer-hand'),
  playerHand: document.querySelector('#player-hand'),
  dealerScore: document.querySelector('#dealer-score'),
  playerScore: document.querySelector('#player-score'),
  money: document.querySelector('#money'),
  betValue: document.querySelector('#bet-value'),
  status: document.querySelector('#status'),
  dealButton: document.querySelector('#deal-button'),
  hitButton: document.querySelector('#hit-button'),
  standButton: document.querySelector('#stand-button'),
  restartButton: document.querySelector('#restart-button')
};

function createCardElement(card, hidden = false) {
  const cardEl = document.createElement('div');
  cardEl.className = `card ${card.isRed ? 'red' : ''} ${hidden ? 'hidden' : ''}`;

  if (!hidden) {
    cardEl.innerHTML = `
      <div class="card-top"><span>${card.suit}</span></div>
      <div class="card-value">${card.value}</div>
      <div class="card-bottom"><span>${card.suit}</span></div>
    `;
  }

  return cardEl;
}

function renderHand(container, cards, hideFirst = false) {
  container.innerHTML = '';
  cards.forEach((card, index) => {
    const shouldHide = hideFirst && index === 0 && game.dealerHidden;
    container.appendChild(createCardElement(card, shouldHide));
  });
}

function updateScores() {
  elements.dealerScore.textContent = game.dealerHidden
    ? game.getVisibleDealerValue()
    : game.getDealerValue();

  elements.playerScore.textContent = game.getPlayerValue();
  elements.money.textContent = game.getMoney();
  elements.betValue.textContent = String(currentBet);
}

function setStatus(message, tone = 'info') {
  elements.status.textContent = message;
  elements.status.dataset.tone = tone;
}

function checkGameOver() {
  if (game.getMoney() <= 0) {
    elements.gameOverMessage.textContent = 'Te has quedado sin saldo. La mesa se cierra por hoy.';
    elements.gameOver.classList.remove('hidden');
    elements.hitButton.disabled = true;
    elements.standButton.disabled = true;
    return true;
  }
  return false;
}

function endRound(result) {
  game.dealerHidden = false;
  renderHand(elements.dealerHand, game.getDealerCards());

  const messages = {
    player_win: '¡Ganaste esta mano!',
    dealer_win: 'El dealer gana.',
    tie: 'Empate.'
  };

  const tone = result === 'player_win' ? 'success' : result === 'tie' ? 'info' : 'danger';
  setStatus(messages[result] || 'Ronda terminada.', tone);
  elements.hitButton.disabled = true;
  elements.standButton.disabled = true;
  updateScores();

  if (!checkGameOver()) {
    return;
  }
}

function beginRound() {
  if (elements.gameOver && !elements.gameOver.classList.contains('hidden')) {
    return;
  }

  game.bet = currentBet;
  game.startRound();

  renderHand(elements.dealerHand, game.getDealerCards(), true);
  renderHand(elements.playerHand, game.getPlayerCards());
  updateScores();

  elements.hitButton.disabled = false;
  elements.standButton.disabled = false;

  if (game.getPlayerValue() === 21) {
    game.dealerHidden = false;
    renderHand(elements.dealerHand, game.getDealerCards());
    setStatus('¡Blackjack del jugador!', 'success');
    elements.hitButton.disabled = true;
    elements.standButton.disabled = true;
    updateScores();
    return;
  }

  setStatus('Tu turno. Decide si pides o te plantas.', 'info');
}

function hit() {
  if (!game.isRoundActive || elements.gameOver.classList.contains('hidden') === false) return;

  const card = game.playerHit();
  if (card) {
    renderHand(elements.playerHand, game.getPlayerCards());
    updateScores();
  }

  if (game.getPlayerValue() > 21) {
    const result = game.evaluateRound();
    endRound(result);
    return;
  }

  if (game.getPlayerValue() === 21) {
    game.dealerPlay();
    const result = game.evaluateRound();
    endRound(result);
  }
}

function stand() {
  if (!game.isRoundActive || elements.gameOver.classList.contains('hidden') === false) return;

  game.dealerPlay();
  const result = game.evaluateRound();
  endRound(result);
}

function hideLoadingScreen() {
  elements.loading.classList.add('hidden');
}

function selectBet(event) {
  const button = event.currentTarget;
  const bet = Number(button.dataset.bet);
  currentBet = bet;

  document.querySelectorAll('.bet-button').forEach((btn) => {
    btn.classList.toggle('active', btn === button);
  });

  updateScores();
}

function resetGame() {
  game.resetGame();
  currentBet = 10;
  document.querySelectorAll('.bet-button').forEach((btn) => {
    const isDefault = Number(btn.dataset.bet) === 10;
    btn.classList.toggle('active', isDefault);
  });
  elements.gameOver.classList.add('hidden');
  elements.hitButton.disabled = true;
  elements.standButton.disabled = true;
  renderHand(elements.dealerHand, game.getDealerCards());
  renderHand(elements.playerHand, game.getPlayerCards());
  updateScores();
  setStatus('Pulsa “Nueva ronda” para empezar.', 'info');
}

setTimeout(hideLoadingScreen, 1200);

document.querySelectorAll('.bet-button').forEach((button) => {
  button.addEventListener('click', selectBet);
});

elements.dealButton.addEventListener('click', beginRound);
elements.hitButton.addEventListener('click', hit);
elements.standButton.addEventListener('click', stand);
elements.restartButton.addEventListener('click', resetGame);

elements.hitButton.disabled = true;
elements.standButton.disabled = true;
renderHand(elements.dealerHand, game.getDealerCards());
renderHand(elements.playerHand, game.getPlayerCards());
updateScores();
setStatus('Pulsa “Nueva ronda” para empezar.', 'info');
