import {OrthographicCamera} from 'three';
import ThreeContainer from '../../Container';
import GameInput from './GameInput';
import ScrollSystem from './ScrollSystem';
import Treadmill from './Treadmill';

class BabylonDoomscroll extends ThreeContainer {
  private customCamera: OrthographicCamera;
  private gameInput: GameInput;
  private scroll: ScrollSystem;
  private treadmill: Treadmill;

  constructor() {
    super();
    this.camera.removeFromParent();
    this.customCamera = new OrthographicCamera(-1, 1, 1, -1, -0.01, 100);
    this.gameInput = new GameInput(this.userInputEvents);
    this.scroll = new ScrollSystem(this.gameInput);
    this.treadmill = new Treadmill();

    this.scene.add(this.treadmill);
    this.scene.add(this.customCamera);
  }

  override render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  override update(): void {
    this.scroll.update(this.clock.deltaTime);
  }
}

export default BabylonDoomscroll;
