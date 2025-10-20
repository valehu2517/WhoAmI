const canvas = document.getElementById("blurCanvas");
const ctx = canvas.getContext("2d");
let isDrawing = false;
const BRUSH = 40;
const FADE_DELAY = 2700;
const FADE_DURATION = 1000;


function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawBlurLayer();
}
window.addEventListener("resize", resize);
resize();

function drawBlurLayer() {
  ctx.filter = "blur(20px)";
  ctx.fillStyle = "rgba(255, 255, 255, 0.86)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function erase(x, y) {
  ctx.save();
  ctx.globalCompositeOperation = "destination-out";
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, BRUSH);
  gradient.addColorStop(0, "rgba(0,0,0,1)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, BRUSH, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Fade back
  setTimeout(() => fadeBack(x, y), FADE_DELAY);
}

function fadeBack(x, y) {
  const start = performance.now();

  function animate(time) {
    const progress = Math.min((time - start) / FADE_DURATION, 1);
    ctx.save();
    ctx.globalAlpha = progress;
    ctx.globalCompositeOperation = "source-over";
    
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, BRUSH);
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.05)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, BRUSH, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    if (progress < 1) requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

/* Mouse control */
canvas.addEventListener("mousedown", e => {
  isDrawing = true;
  erase(e.offsetX, e.offsetY);
  canvas.style.cursor = "grabbing";
});
canvas.addEventListener("mousemove", e => {
  if (isDrawing) erase(e.offsetX, e.offsetY);
});
canvas.addEventListener("mouseup", () => {
  isDrawing = false;
  canvas.style.cursor = "grab";
});
canvas.addEventListener("mouseleave", () => {
  isDrawing = false;
  canvas.style.cursor = "grab";
});

