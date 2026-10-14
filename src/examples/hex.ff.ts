// RGB square, FixedFunction (FF) version.
// FF hides the shaders.
import { ATTRIB, createFixedFunction, LIGHTING } from '../vendor/ff/ff';
import { CANVAS_SIZE, CLEAR_COLOR, HEX, HEX_INDICES } from './shared';

// Step 1. Get the WebGL2 context.
function getContext(canvas: HTMLCanvasElement): WebGL2RenderingContext {
  const gl = canvas.getContext('webgl2');
  if (!gl) throw new Error('WebGL2 is not available.');
  return gl;
}

// Step 2. Shaders and program: FF creates and owns them.
// Step 3. Vertex specification: copy the vertex data to the GPU.
function createBuffers(gl: WebGL2RenderingContext) {
  const vbo = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, HEX, gl.STATIC_DRAW);

  const ebo = gl.createBuffer()!;
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, HEX_INDICES, gl.STATIC_DRAW);

  return { vbo, ebo };
}

// Step 4. Describe how the vertex data is laid out, using FF's attribute slots.
function createVAO(gl: WebGL2RenderingContext, vbo: WebGLBuffer, ebo: WebGLBuffer): WebGLVertexArrayObject {
  const vao = gl.createVertexArray()!;
  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.enableVertexAttribArray(ATTRIB.POSITION);
  gl.vertexAttribPointer(ATTRIB.POSITION, 3, gl.FLOAT, false, 0, 0);
  gl.disableVertexAttribArray(ATTRIB.COLOR);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
  gl.bindVertexArray(null);
  return vao;
}

// Step 5. Pipeline state: canvas size, viewport, clear color.
function setupState(gl: WebGL2RenderingContext, canvas: HTMLCanvasElement): void {
  canvas.width = CANVAS_SIZE;
  canvas.height = CANVAS_SIZE;
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(...CLEAR_COLOR);
}

// Step 6. Draw. ff.drawArrays binds the FF program and uploads its uniforms first.
function draw(gl: WebGL2RenderingContext, ff: ReturnType<typeof createFixedFunction>, vao: WebGLVertexArrayObject): void {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.bindVertexArray(vao);

  ff.drawElements(gl.TRIANGLES, 18, gl.UNSIGNED_SHORT, 0);
}

export function run(canvas: HTMLCanvasElement, color: string): void {
  const gl = getContext(canvas);
  const ff = createFixedFunction(gl, { debug: true });
  ff.disable(LIGHTING); // unlit: the output is the per-vertex color
  if (color === 'Rojo') {
    ff.setColor([1,0,0]); // 100% Rojo
  } 
  else if (color === 'Verde') {
    ff.setColor([0,1,0]); // 100% Verde
  } 
  else if (color === 'Azul') {
    ff.setColor([0,0,1]); // 100% Azul
  }
  const { vbo, ebo } = createBuffers(gl);
  const vao = createVAO(gl, vbo, ebo);
  setupState(gl, canvas);
  draw(gl, ff, vao);
}
