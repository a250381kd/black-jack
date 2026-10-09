export class AnimationManager {
  constructor() {
    this.animations = new Map();
  }

  async cardAppear(element) {
    if (!element) return;
    element.style.animation = 'cardIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
    return new Promise(resolve => {
      setTimeout(resolve, 350);
    });
  }

  async cardFlip(element) {
    if (!element) return;
    return new Promise(resolve => {
      element.style.transition = 'transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      element.style.transform = 'rotateY(180deg)';
      setTimeout(() => {
        element.classList.remove('hidden');
        element.style.transform = 'rotateY(0deg)';
        setTimeout(resolve, 400);
      }, 200);
    });
  }

  async shake(element) {
    if (!element) return;
    return new Promise(resolve => {
      element.style.animation = 'shake 0.4s ease-in-out';
      setTimeout(resolve, 400);
    });
  }

  async bounce(element) {
    if (!element) return;
    return new Promise(resolve => {
      element.style.animation = 'bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      setTimeout(resolve, 600);
    });
  }

  async pulse(element) {
    if (!element) return;
    return new Promise(resolve => {
      element.style.animation = 'pulse 0.5s ease-out';
      setTimeout(resolve, 500);
    });
  }

  async glow(element, color = 'rgba(103, 246, 255, 0.8)') {
    if (!element) return;
    return new Promise(resolve => {
      element.style.boxShadow = `0 0 20px ${color}, 0 0 40px ${color}`;
      element.style.transition = 'box-shadow 0.3s ease-out';
      setTimeout(() => {
        element.style.boxShadow = '';
        setTimeout(resolve, 300);
      }, 300);
    });
  }

  async balanceChange(element, amount, isWin) {
    if (!element) return;
    return new Promise(resolve => {
      const color = isWin ? 'rgba(110, 247, 186, 1)' : 'rgba(255, 93, 97, 1)';
      element.style.color = color;
      element.style.transform = 'scale(1.2)';
      element.style.transition = 'all 0.3s ease-out';
      setTimeout(() => {
        element.style.color = 'var(--gold)';
        element.style.transform = 'scale(1)';
        setTimeout(resolve, 300);
      }, 300);
    });
  }
}
