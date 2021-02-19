# Rudimentary snake game in JS

Just a simple snake game in JS, no frameworks or anything. 

## Setup and run

1. Clone the repo
2. Open dist/index.html
3. Enjoy

### Controls

WASD controls the snake. Or arrow keys if you're _that guy_.

## Some thoughts

Performance is pretty terrible (on MacOS at least, as it turns out, as when I made it on Windows machine, it seemed fine), then again in my day job I don't focus on JS game engines so it is what it is. If you happen to be seeing this and you're a JS game developer by trade, have a look at src/scripts/modules/engine.js and tell me what I'm doing wrong there. I'm running an endless requestAnimationFrame loop and re-drawing the scene based on current game speed when the timeout since last draw has increased enough.

This was just an evening project for me to see how hard would it be, sat in a private repo for half a year and now receiving a README :)

