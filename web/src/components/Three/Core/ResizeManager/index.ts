import {PerspectiveCamera, WebGLRenderer} from 'three';

class ResizeManager {
  onResize?: () => void;
  private observer: ResizeObserver;
  private target: HTMLElement;
  private renderer: WebGLRenderer;
  private camera: PerspectiveCamera;

  private readonly onResizeEvent = () => {
    const container = this.renderer.domElement.parentElement;
    if (!container) return;

    if (this.onResize) this.onResize();
    this.resizeRenderer(container);
    this.resizeCamera(container);
  };

  constructor(renderer: WebGLRenderer, camera: PerspectiveCamera) {
    this.renderer = renderer;
    this.camera = camera;
    this.observer = new ResizeObserver(this.onResizeEvent);
    this.target = document.body;
    this.observer.observe(this.target);
    this.onResizeEvent();
  }

  setTarget(element: HTMLElement) {
    this.observer.unobserve(this.target);
    this.target = element;
    this.observer.observe(this.target);
    this.onResizeEvent();
  }

  dispose() {
    this.observer.disconnect();
  }

  private resizeRenderer(container: HTMLElement) {
    this.renderer.setSize(container.offsetWidth, container.offsetHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }

  private resizeCamera(container: HTMLElement) {
    this.camera.aspect = container.offsetWidth / container.offsetHeight;
    this.camera.updateProjectionMatrix();
  }
}

export default ResizeManager;
