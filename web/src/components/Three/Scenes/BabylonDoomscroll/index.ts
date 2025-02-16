import {OrthographicCamera} from 'three';
import ThreeContainer from '../../Container';
import GameInput from './GameInput';
import ScrollSystem from './ScrollSystem';

class BabylonDoomscroll extends ThreeContainer {
  private customCamera: OrthographicCamera;
  private gameInput: GameInput;
  private scroll: ScrollSystem;

  constructor() {
    super();
    this.camera.removeFromParent();
    this.customCamera = new OrthographicCamera();
    this.gameInput = new GameInput(this.userInputEvents);
    this.scroll = new ScrollSystem(this.gameInput);
    this.scene.add(this.customCamera);
  }

  override render(): void {
    this.renderer.render(this.scene, this.customCamera);
  }

  override update(): void {
    this.scroll.update(this.clock.deltaTime);
  }
}

export default BabylonDoomscroll;
