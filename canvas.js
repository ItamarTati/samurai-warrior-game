export const canvas = document.createElement("canvas");
canvas.width = 400;
canvas.height = 400;

export const screenCenterX = canvas.width / 2
export const screenCenterY = canvas.height / 2

export const context = canvas.getContext("2d");
context.imageSmoothingEnabled = false;

const container = document.createElement("div");
container.style.cssText = "display: flex; justify-content: center; align-items: center;";

container.appendChild(canvas);
document.body.appendChild(container);