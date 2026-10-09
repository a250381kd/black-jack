export class BasePlugin {
  constructor({ name, description = '', enabled = true } = {}) {
    this.name = name;
    this.description = description;
    this.enabled = enabled;
  }

  init() {}

  setEnabled(enabled) {
    this.enabled = enabled;
    return this;
  }

  beforeRound() {}
  afterRound() {}
  onPlayerAction() {}
  onGameOver() {}

  getState() {
    return {
      name: this.name,
      description: this.description,
      enabled: this.enabled,
    };
  }
}
