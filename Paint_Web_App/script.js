const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
var colorPicker;
const brushSize = document.getElementById('brushSize');
let isDrawing = false;
let undoStack = [];
let redoStack = [];
document.addEventListener('DOMContentLoaded', function() {
    const colors = [
        '#FF0000', '#00FF00', '#0000FF', 
        '#FFFF00', '#FF00FF', '#00FFFF', 
        '#000000', '#555555', '#AAAAAA', '#FFFFFF' 
    ];

    const colorpalette = document.getElementById('colorPalette');

    colors.forEach(color => {
        const colorSquare = document.createElement('div');
        colorSquare.classList.add('colorSquare');
        colorSquare.style.backgroundColor = color;

        colorSquare.addEventListener('click', function() {
            const selectedSquare = document.querySelector('.colorSquare.selected');
            if (selectedSquare) {
                selectedSquare.classList.remove('selected');
            }
            colorSquare.classList.add('selected');
            colorPicker=color;
        });
        colorPalette.appendChild(colorSquare);
    });
});


canvas.width = window.innerWidth - 50;
canvas.height = 400;

ctx.lineJoin = 'round';
ctx.lineCap = 'round';

function startDrawing(e) {
  isDrawing = true;
  ctx.strokeStyle = colorPicker;
  ctx.lineWidth = brushSize.value;
  ctx.beginPath();
  ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function draw(e) {
  if (isDrawing) {
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
  }
}

function stopDrawing() {
  isDrawing = false;
  undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
}

function undo() {
  if (undoStack.length > 1) {
    redoStack.push(undoStack.pop());
    ctx.putImageData(undoStack[undoStack.length - 1], 0, 0);
  }
}

function redo() {
  if (redoStack.length > 0) {
    undoStack.push(redoStack.pop());
    ctx.putImageData(undoStack[undoStack.length - 1], 0, 0);
  }
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

