import {Mesh, MeshNormalMaterial, PlaneGeometry} from 'three';

class Treadmill extends Mesh {
  constructor() {
    const geometry = new PlaneGeometry();
    const material = new MeshNormalMaterial();
    super(geometry, material);
  }
}

export default Treadmill;
