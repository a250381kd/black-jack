export class VisualEffects {
  constructor() {
    this.canvas = this.createCanvas();
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
  }

  createCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '15';
    document.body.appendChild(canvas);
    return canvas;
  }

  async confetti(x = this.canvas.width / 2, y = this.canvas.height / 2) {
    return new Promise(resolve => {
      const colors = ['#ff5fe8', '#9d7bff', '#67f6ff', '#6ef7ba', '#ffd671'];
      const count = 30;

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const velocity = 6 + Math.random() * 4;
        this.particles.push({
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity - 2,
          life: 1,
          decay: 0.015,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 4 + Math.random() * 4
        });
      }

      this.animateParticles();
      setTimeout(resolve, 1500);
    });
  }

  animateParticles() {
    const animate = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.particles = this.particles.filter(p => p.life > 0);

      this.particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1;
        p.life -= p.decay;

        this.ctx.fillStyle = p.color;
        this.ctx.globalAlpha = p.life;
        this.ctx.fillRect(p.x, p.y, p.size, p.size);
      });

      this.ctx.globalAlpha = 1;

      if (this.particles.length > 0) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }

  async colorBurst(color, x = this.canvas.width / 2, y = this.canvas.height / 2) {
    return new Promise(resolve => {
      for (let i = 0; i < 20; i++) {
        const angle = (Math.PI * 2 * i) / 20;
        const velocity = 4 + Math.random() * 3;
        this.particles.push({
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity - 1,
          life: 1,
          decay: 0.02,
          color,
          size: 3 + Math.random() * 3
        });
      }

      this.animateParticles();
      setTimeout(resolve, 1200);
    });
  }

  async flash(element) {
    if (!element) return;
    return new Promise(resolve => {
      element.style.filter = 'brightness(1.8)';
      element.style.transition = 'filter 0.2s ease-out';
      setTimeout(() => {
        element.style.filter = 'brightness(1)';
        setTimeout(resolve, 200);
      }, 100);
    });
  }
}
