import EventEmitter from 'eventemitter3';
import {Vector2} from 'three';

export enum InputEvent {
  POINTER_MOVE = 'pointer-move',
  POINTER_UP = 'pointer-up',
  POINTER_DOWN = 'pointer-down',
  PINCH_START = 'pinch-start',
  PINCH_END = 'pinch-end',
  PINCH_MOVE = 'pinch-move',
  WHEEL = 'wheel',
  KEY_PRESS = 'key-press',
}

const ACTIVE = {passive: false};

class UserInput extends EventEmitter {
  private readonly canvas: HTMLElement;

  private readonly onTouchStartHandler = (evt: TouchEvent) => {
    evt.preventDefault();

    const target = evt.target as HTMLElement;
    if (!target) return;

    if (evt.touches.length === 1) {
      const position = this.getTouchPosition(evt.touches[0], target);
      this.emit(InputEvent.POINTER_DOWN, {position});
    } else if (evt.touches.length === 2) {
      const t0 = this.getTouchPosition(evt.touches[0], target);
      const t1 = this.getTouchPosition(evt.touches[1], target);
      const distance = t0.distanceTo(t1);
      this.emit(InputEvent.PINCH_START, {distance});
    }
  };

  private readonly onTouchMoveHandler = (evt: TouchEvent) => {
    evt.preventDefault();

    const target = evt.target as HTMLElement;
    if (!target) return;

    if (evt.touches.length === 1) {
      const position = this.getTouchPosition(evt.touches[0], target);
      this.emit(InputEvent.POINTER_MOVE, {position});
    } else if (evt.touches.length === 2) {
      const t0 = this.getTouchPosition(evt.touches[0], target);
      const t1 = this.getTouchPosition(evt.touches[1], target);
      const distance = t0.distanceTo(t1);
      this.emit(InputEvent.PINCH_MOVE, {distance});
    }
  };

  private readonly onMouseDownHandler = (evt: MouseEvent) => {
    evt.preventDefault();

    const position = new Vector2(evt.offsetX, evt.offsetY);
    this.emit(InputEvent.POINTER_DOWN, {position});
  };

  private readonly onMouseMoveHandler = (evt: MouseEvent) => {
    evt.preventDefault();

    const position = new Vector2(evt.offsetX, evt.offsetY);
    this.emit(InputEvent.POINTER_MOVE, {position});
  };

  private readonly onPressEndHandler = (evt: MouseEvent) => {
    evt.preventDefault();
    const position = new Vector2(evt.offsetX, evt.offsetY);
    this.emit(InputEvent.POINTER_UP, {position});
  };

  private readonly onWheelHandler = (evt: WheelEvent) => {
    evt.preventDefault();

    const offset = new Vector2(evt.deltaX, evt.deltaY);
    this.emit(InputEvent.WHEEL, {offset});
  };

  private readonly onKeyDownHandler = (evt: KeyboardEvent) => {
    const key = evt.key;
    this.emit(InputEvent.KEY_PRESS, {key});
  };

  constructor(canvas: HTMLElement) {
    super();
    this.canvas = canvas;
    this.initListeners();
  }

  dispose() {
    this.removeListeners();
    this.removeAllListeners();
  }

  private getTouchPosition(touch: Touch, canvas: HTMLElement) {
    return new Vector2(
      touch.clientX - canvas.offsetLeft,
      touch.clientY - canvas.offsetTop
    );
  }

  private initListeners() {
    this.canvas.addEventListener('wheel', this.onWheelHandler, ACTIVE);
    this.canvas.addEventListener('mousemove', this.onMouseMoveHandler);
    this.canvas.addEventListener('mousedown', this.onMouseDownHandler);
    this.canvas.addEventListener(
      'touchstart',
      this.onTouchStartHandler,
      ACTIVE
    );
    this.canvas.addEventListener('touchmove', this.onTouchMoveHandler, ACTIVE);
    this.canvas.addEventListener('pointerup', this.onPressEndHandler);
    this.canvas.addEventListener('pointerout', this.onPressEndHandler);
    window.addEventListener('keydown', this.onKeyDownHandler);
  }

  private removeListeners() {
    this.canvas.removeEventListener('wheel', this.onWheelHandler);
    this.canvas.removeEventListener('mousemove', this.onMouseMoveHandler);
    this.canvas.removeEventListener('mousedown', this.onMouseDownHandler);
    this.canvas.removeEventListener('touchstart', this.onTouchStartHandler);
    this.canvas.removeEventListener('touchmove', this.onTouchMoveHandler);
    this.canvas.removeEventListener('pointerup', this.onPressEndHandler);
    this.canvas.removeEventListener('pointerout', this.onPressEndHandler);
    window.removeEventListener('keydown', this.onKeyDownHandler);
  }
}

export default UserInput;
