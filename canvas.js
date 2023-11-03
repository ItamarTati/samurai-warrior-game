export const canvas = document.createElement("canvas");
export const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = 600;

document.body.appendChild(canvas);

