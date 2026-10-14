# RGB Figures: FixedFunction

By Gabriel De Ornelas from `Tripiante`

One RGB triangle, one square, one hexagon, one circle .

- `src/examples/triangle.ff.ts`, `src/examples/square.ff.ts`, `src/examples/hex.ff.ts`, `src/examples/circles.ff.ts` uses the FixedFunction (FF) module. The shaders stay hidden.

## Requirements

- Node.js 18 or later (tested with Node 24)
- npm
- A browser with WebGL2 support

## Run

1. Install the dependencies. This is the only step that needs a network connection.

   ```
   npm install
   ```

2. Start the development server.

   ```
   npm run dev
   ```

3. Open `http://localhost:5173` in your browser.

## Use

- Click "Forma" or "Color" to switch versions.

## Other commands

| Command           | Action                                          |
| ----------------- | ----------------------------------------------- |
| `npm run build`   | Type-check with `tsc` and build to `dist/`      |
| `npm run preview` | Serve the built `dist/` folder locally          |

## Project layout

```
index.html                    page markup
src/main.ts                   canvas swap
src/examples/shared.ts        vertex data for every figure and clear color (#1b1e2b)
src/examples/triangle.ff.ts   the implementations of the triangle
src/examples/square.ff.ts     the implementations of the square
src/examples/hex.ff.ts        the implementations of the hexagon
src/examples/circle.ff.ts     the implementations of the circle
src/vendor/ff/                FF v1.0 (read only; do not edit)
```

## Troubleshooting

- **Blank page or "WebGL2 is not available."** Enable hardware acceleration in the browser, or try another browser.
- **Port 5173 is in use.** Stop the other process, or run `npx vite --port 3000`.
