// Data shared by both implementations, so the two files differ only in how they drive WebGL.

/** Background color #1b1e2b as linear floats in [0, 1]. */
export const CLEAR_COLOR: readonly [number, number, number, number] = [0x1b / 255, 0x1e / 255, 0x2b / 255, 1];

/** Canvas size in device pixels. Fixed so both versions render the same pixels. */
export const CANVAS_SIZE = 480;

/** Interleaved vertex data: x, y, z, r, g, b, a per vertex. Clip space, counter-clockwise. */
export const TRIANGLE = new Float32Array([
  //  x      y     z    r  g  b  a
   0.0,   0.7,  0.0,  1, 0, 0, 1, // top: red
  -0.7,  -0.6,  0.0,  0, 1, 0, 1, // bottom left: green
   0.7,  -0.6,  0.0,  0, 0, 1, 1, // bottom right: blue
]);

export const SQUARE = new Float32Array([
  //  x      y     z
  -0.6,   0.6,  0.0,  // Arriba izq
  -0.6,  -0.6,  0.0,  // Abajo izq
   0.6,  -0.6,  0.0,  // Abajo der
   0.6,   0.6,  0.0,  // Arriba izq
]);

export const SQUARE_INDICES = new Uint16Array([
  0, 1, 2, // Triángulo inf izq
  0, 2, 3  // Triángulo sup der
]);

// 7 Vértices: El centro y las 6 esquinas del hexágono
export const HEX = new Float32Array([
   0.0,  0.0,    0.0,  // Centro
   0.6,  0.0,    0.0,  // Derecha (0 grados)
   0.3,  0.5196, 0.0,  // Arriba-Derecha (60 grados)
  -0.3,  0.5196, 0.0,  // Arriba-Izquierda (120 grados)
  -0.6,  0.0,    0.0,  // Izquierda (180 grados)
  -0.3, -0.5196, 0.0,  // Abajo-Izquierda (240 grados)
   0.3, -0.5196, 0.0   // Abajo-Derecha (300 grados)
]);

// 18 Índices: 6 triángulos, todos partiendo del centro (0) en sentido CCW
export const HEX_INDICES = new Uint16Array([
  0, 1, 2,  // Triángulo superior der
  0, 2, 3,  // Triángulo superior
  0, 3, 4,  // Triángulo superior izq
  0, 4, 5,  // Triángulo inferior izq
  0, 5, 6,  // Triángulo inferior
  0, 6, 1   // Triángulo inferior der
]);

export function Circulo(radio: number, SEGMENTS: number) {
  if (SEGMENTS > 64) SEGMENTS = 64;
  if (SEGMENTS < 3) SEGMENTS = 3; // Mínimo para que sea una figura

  const vertices = [];
  const indices = [];

  // Agregar el vértice central en el índice 0
  vertices.push(0.0, 0.0, 0.0);

  // Calcular los vértices del borde
  for (let i = 0; i < SEGMENTS; i++) {
    const angulo = (i / SEGMENTS) * Math.PI * 2.0; // Calculamos el ángulo actual en radianes
    const x = radio * Math.cos(angulo);
    const y = radio * Math.sin(angulo);
    vertices.push(x, y, 0.0);
  }

  // Crear los triángulos conectando el centro con el borde
  for (let i = 1; i <= SEGMENTS; i++) {
    const centro = 0;
    const actual = i;
    const siguiente = (i === SEGMENTS) ? 1 : i + 1;  // Si estamos en el último segmento, conectamos con el vértice 1 para cerrar el círculo
    indices.push(centro, actual, siguiente);  // Sentido antihorario (CCW)
  }

  return {vertices: new Float32Array(vertices), indices: new Uint16Array(indices), cantidadIndices: indices.length};
}

export const STRIDE_BYTES = 7 * 4;//4 bytes per float (Float32)
export const COLOR_OFFSET_BYTES = 3 * 4;
