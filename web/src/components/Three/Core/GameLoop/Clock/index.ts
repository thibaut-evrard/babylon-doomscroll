const TIME_SCALE = 0.001;

class Clock {
  needsRefresh = false;
  private time = performance.now() * TIME_SCALE;
  private _deltaTime = 0;
  private _elapsedTime = 0;

  get deltaTime() {
    return this._deltaTime;
  }

  get elapsedTime() {
    return this._elapsedTime;
  }

  update() {
    if (this.needsRefresh) this.resetDeltaTime();
    const newTime = performance.now() * TIME_SCALE;
    this._deltaTime = newTime - this.time;
    this._elapsedTime += this._deltaTime;
    this.time = newTime;
  }

  private resetDeltaTime() {
    this._deltaTime = 0;
    this.time = performance.now() * TIME_SCALE;
    this.needsRefresh = false;
  }
}

export default Clock;
