import {lerp} from 'three/src/math/MathUtils.js';
import GameInput from '../GameInput';

const DAMPING = 2;

class ScrollSystem {
  private velocity = 0;
  private movement = 0;
  private progress = 0;
  private gameInput: GameInput;

  constructor(gameInput: GameInput) {
    this.gameInput = gameInput;
    this.gameInput.onScroll = this.scrollUpdate.bind(this);
  }

  scrollUpdate(offset: number) {
    this.movement = offset;
  }

  update(deltaTime: number) {
    if (this.gameInput.isDrag) {
      this.progress += this.movement;
      this.velocity = lerp(this.velocity, this.movement, DAMPING * deltaTime);
    } else {
      this.progress += this.velocity;
    }

    this.velocity = lerp(this.velocity, 0, DAMPING * deltaTime);
    this.movement = 0;
  }
}

export default ScrollSystem;
