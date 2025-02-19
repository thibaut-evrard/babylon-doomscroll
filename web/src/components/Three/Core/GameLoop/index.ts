import Clock from './Clock';

class GameLoop {
  readonly clock: Clock;
  private _isActive = false;
  private frameId?: number;
  onFrame?: () => void;

  private readonly onFocus = () => {
    this.clock.needsRefresh = true;
  };

  constructor() {
    this.clock = new Clock();
    this.initListeners();
  }

  get isActive() {
    return this._isActive;
  }

  start() {
    this._isActive = true;
    this.stop();
    this.requestFrame();
  }

  stop() {
    this._isActive = false;
    this.cancelFrame();
  }

  dispose() {
    this.stop();
    this.removeListeners();
  }

  private update() {
    this.clock.update();
    this.requestFrame();
  }

  private requestFrame() {
    this.frameId = requestAnimationFrame(() => {
      if (this.onFrame) this.onFrame();
      this.update();
    });
  }

  private cancelFrame() {
    if (this.frameId) cancelAnimationFrame(this.frameId);
  }

  private removeListeners() {
    window.removeEventListener('focus', this.onFocus);
  }

  private initListeners() {
    window.addEventListener('focus', this.onFocus);
  }
}

export default GameLoop;
