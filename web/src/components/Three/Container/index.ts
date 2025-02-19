import {PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import ResizeManager from '../Core/ResizeManager';
import GameLoop from '../Core/GameLoop';
import Clock from '../Core/GameLoop/Clock';
import UserInput from '../Core/UserInput';

class ThreeContainer {
  gameLoop: GameLoop;
  protected renderer: WebGLRenderer;
  protected scene: Scene;
  protected camera: PerspectiveCamera;
  protected resizeManager: ResizeManager;
  protected userInputEvents: UserInput;
  protected clock: Clock;

  protected readonly onFrame = () => {
    this.update();
    this.render();
  };

  constructor() {
    this.renderer = new WebGLRenderer();
    this.camera = new PerspectiveCamera();
    this.scene = new Scene();

    this.userInputEvents = new UserInput(this.renderer.domElement);
    this.resizeManager = new ResizeManager(this.renderer, this.camera);
    this.gameLoop = new GameLoop();
    this.clock = this.gameLoop.clock;

    this.scene.add(this.camera);
  }

  init(element: HTMLDivElement) {
    element.appendChild(this.renderer.domElement);
    this.gameLoop.onFrame = this.onFrame;
    this.gameLoop.start();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  update() {}

  dispose() {
    this.gameLoop.onFrame = undefined;
    this.gameLoop.dispose();
    this.userInputEvents.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}

export default ThreeContainer;
