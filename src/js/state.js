// A Singleton pattern to init and store the state of the game

class GameStore {
  constructor() {
    const $slider = document.getElementById("speedControl");
    if (!GameStore.instance) {
      this.state = {
        currentSpeed: $slider.value,
        score: 0,
        isPlaying: false,
        timerInterval: null
      };
      GameStore.instance = this;
    }

    return GameStore.instance;
  }

  setState(prop, value) {
    this.state[prop] = value;
  }

  getState(prop) {
    return this.state[prop];
  }
}

const instance = new GameStore();
Object.freeze(instance);

export default instance;
