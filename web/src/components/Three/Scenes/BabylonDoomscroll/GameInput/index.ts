import UserInput, {InputEvent} from '@/components/Three/Core/UserInput';
import {Vector2} from 'three';

interface MoveEvent {
  position: Vector2;
}

class GameInput {
  onScroll?: (offset: number) => void;
  private inputEvents: UserInput;
  private _isDrag = false;
  private position = new Vector2();

  get isDrag() {
    return this._isDrag;
  }

  private readonly onPointerDown = ({position}: MoveEvent) => {
    this._isDrag = true;
    this.position = position.clone();
  };

  private readonly onPointerUp = () => {
    this._isDrag = false;
    this.position = new Vector2();
  };

  private readonly onPointerMove = ({position}: MoveEvent) => {
    if (!this._isDrag) return;
    const offset = position.clone().sub(this.position).y;
    if (this.onScroll) this.onScroll(offset);
    this.position.copy(position);
  };

  constructor(inputEvents: UserInput) {
    this.inputEvents = inputEvents;
    this.initListeners();
  }

  dispose() {
    this.removeListeners();
  }

  private initListeners() {
    this.inputEvents.on(InputEvent.POINTER_DOWN, this.onPointerDown);
    this.inputEvents.on(InputEvent.POINTER_UP, this.onPointerUp);
    this.inputEvents.on(InputEvent.POINTER_MOVE, this.onPointerMove);
  }

  private removeListeners() {
    this.inputEvents.removeListener(
      InputEvent.POINTER_DOWN,
      this.onPointerDown
    );
    this.inputEvents.removeListener(InputEvent.POINTER_UP, this.onPointerUp);
    this.inputEvents.removeListener(
      InputEvent.POINTER_MOVE,
      this.onPointerMove
    );
  }
}

export default GameInput;
