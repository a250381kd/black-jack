import { Game } from './models/Game.js';

const game = new Game(100, 10);

const elements = {
  loading: document.querySelector('#loading-screen'),
  dealerHand: document.querySelector('#dealer-hand'),
  playerHand: document.querySelector('#player-hand'),
  dealerScore: document.querySelector('#dealer-score'),
  playerScore: document.querySelector('#player-score'),
  money: document.querySelector('#money'),
  status: document.querySelector('#status'),
  dealButton: document.querySelector('#deal-button'),
  hitButton: document.querySelector('#hit-button'),
  standButton: document.querySelector('#stand-button')
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
}

function setStatus(message, tone = 'info') {
  elements.status.textContent = message;
  elements.status.dataset.tone = tone;
}

function endRound(result) {
  game.dealerHidden = false;
  renderHand(elements.dealerHand, game.getDealerCards());

  const messages = {
    player_win: '¡Ganaste esta mano!',
    dealer_win: 'El dealer gana.',
    tie: 'Empate.'
  };

  setStatus(messages[result] || 'Ronda terminada.', result === 'player_win' ? 'success' : 'info');
  elements.hitButton.disabled = true;
  elements.standButton.disabled = true;
  updateScores();
}

function beginRound() {
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
  if (!game.isRoundActive) return;

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
  if (!game.isRoundActive) return;

  game.dealerPlay();
  const result = game.evaluateRound();
  endRound(result);
}

function hideLoadingScreen() {
  elements.loading.classList.add('hidden');
}

setTimeout(hideLoadingScreen, 1200);

elements.dealButton.addEventListener('click', beginRound);
elements.hitButton.addEventListener('click', hit);
elements.standButton.addEventListener('click', stand);

elements.hitButton.disabled = true;
elements.standButton.disabled = true;
renderHand(elements.dealerHand, game.getDealerCards());
renderHand(elements.playerHand, game.getPlayerCards());
updateScores();
setStatus('Pulsa “Nueva ronda” para empezar.', 'info');
