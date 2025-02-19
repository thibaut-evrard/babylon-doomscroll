import {ShaderMaterial, Texture} from 'three';
import {vertexShader} from './Shaders/vertex';
import {fragmentShader} from './Shaders/fragment';

class TreadmillMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        progress: {value: 0},
        texture: {value: new Texture()},
      },
      vertexShader,
      fragmentShader,
    });
  }
}

export default TreadmillMaterial;
