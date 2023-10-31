export let keyPresses = {};

export function keyDownListener(event) {
    keyPresses[event.key] = true;
}

export function keyUpListener(event) {
    keyPresses[event.key] = false;
}

document.addEventListener('keydown', keyDownListener, false);
document.addEventListener('keyup', keyUpListener, false);