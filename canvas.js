export const canvas = document.createElement("canvas");
export const context = canvas.getContext("2d");

canvas.width = 828;
canvas.height = 508;

document.body.appendChild(canvas);

const container = document.createElement("div");
container.style.display = "flex";
container.style.justifyContent = "center";
container.style.alignItems = "center";

container.appendChild(canvas);

document.body.appendChild(container);