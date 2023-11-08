export const canvas = document.createElement("canvas");
export const context = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;
context.imageSmoothingEnabled = false;


document.body.appendChild(canvas);

const container = document.createElement("div");
container.style.display = "flex";
container.style.justifyContent = "center";
container.style.alignItems = "center";

container.appendChild(canvas);

document.body.appendChild(container);