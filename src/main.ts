import './style.css';
import { run as runFFT } from './examples/triangle.ff';
import { run as runFFS } from './examples/square.ff';
import { run as runFFH } from './examples/hex.ff';
import { run as runFFC } from './examples/circles.ff';

type Shape = 'Triangulo' | 'Cuadrado' | 'Hexagono' | 'Circulo';
type Color = 'Rojo' | 'Verde' | 'Azul';

const examples: Record<Shape, { run: (canvas: HTMLCanvasElement, color: Color) => void }> = {
  Triangulo: { run: runFFT },
  Cuadrado: { run: runFFS },
  Hexagono: { run: runFFH },
  Circulo: { run: runFFC },
};

const stage = document.getElementById('stage')!;
const botonFigura = document.getElementById('btn-shape') as HTMLButtonElement;
const botonColor = document.getElementById('btn-color') as HTMLButtonElement;

function show(shape: Shape, color: Color): void {
  // A fresh canvas gives a fresh WebGL context, so no state leaks between versions.
  const canvas = document.createElement('canvas');
  stage.replaceChildren(canvas);
  examples[shape].run(canvas, color);

  botonFigura.textContent = `Forma: ${shape}`;
  botonColor.textContent = `Color: ${color}`;
}

let figuraActual: Shape = 'Triangulo';
let colorActual: Color = 'Rojo';

const ordenFiguras: Shape[] = ['Triangulo', 'Cuadrado', 'Hexagono', 'Circulo'];
const ordenColores: Color[] = ['Rojo', 'Verde', 'Azul'];

botonFigura.addEventListener('click', () => {
  figuraActual = ordenFiguras[(ordenFiguras.indexOf(figuraActual) + 1) % ordenFiguras.length];
  show(figuraActual, colorActual);
});

botonColor.addEventListener('click', () => {
  colorActual = ordenColores[(ordenColores.indexOf(colorActual) + 1) % ordenColores.length];
  show(figuraActual, colorActual);
})
show(figuraActual, colorActual);