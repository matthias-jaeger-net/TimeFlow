(function TimeFlow() {
  // Setup
  const width = window.innerWidth;
  const height = window.innerHeight;

  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');

  // Global helpers
  const map = function(num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  };

  const draw = function() {
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    // Clear with white background
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.fillRect(0, 0, width, height);

    let cx = width * 0.5;
    let cy = height * 0.5;

    ctx.lineCap = 'round';

    // Second pointer
    let sangle = map(second, 0, 59, 360, 0);
    let sx = Math.cos(sangle + Math.PI) * 200;
    let sy = Math.sin(sangle + Math.PI) * 200;

    ctx.strokeStyle = 'red';
    ctx.lineWidth = 5;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + sx, cy + sy);
    ctx.stroke();

    // Minute pointer
    let mangle = map(minute, 0, 59, 360, 0);
    mx = Math.cos(mangle) * 150;
    my = Math.sin(mangle) * 150;

    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 10;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + mx, cy + my);
    ctx.stroke();

    // Hour pointer
    let hangle = map(hour, 0, 59, 360, 0);
    sx = Math.cos(hangle + Math.PI) * 100;
    sy = Math.sin(hangle + Math.PI) * 100;

    ctx.strokeStyle = 'green';
    ctx.lineWidth = 15;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + sx, cy + sy);
    ctx.stroke();

  };
  setInterval(draw, 1);
})();
