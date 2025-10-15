let canvas = document.getElementById('scratch-card1');
let context = canvas.getContext('2d');

const init = () => {
    context.fillStyle = "rgba(210, 124, 124, 1)";
    context.fillRect(0, 0, 300, 100);
};

let isDragging = false;

const scratch = (x, y) => {
    context.globalCompositeOperation = 'destination-out';
    context.beginPath();
    context.arc(x, y, 24, 0, Math.PI * 2, false);
    context.fill();
    
}

canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    scratch(e.offsetX, e.offsetY);
});

canvas.addEventListener('mousemove', (e) => {
    if (isDragging) {
        scratch(e.offsetX, e.offsetY);
    }
});

canvas.addEventListener('mouseup', () => {
    isDragging = false;
});

canvas.addEventListener('mouseleave', () => {
    isDragging = false;
});


init();
