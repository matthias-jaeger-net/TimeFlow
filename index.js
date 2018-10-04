const width = window.innerWidth;
const height = window.innerHeight;
const scale = 200;
const rows = Math.floor(width / scale);
const cols = Math.floor(height / scale);

const Circle = function(d) {
  let circle = '';
  let circleR = d / 2;
  let circleD = d;
  circle += '<svg width="' + circleD + '" height="' + circleD + '" version="1.1" xmlns="http://www.w3.org/2000/svg">';
  circle += '<circle cx="' + circleR + '" cy="' + circleR + '" r="' + circleR + '"';
  circle += ' stroke="black" stroke-width="1" fill="black"/>';
  circle += '</svg>';
  return circle;
}

let rendering = '';
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    let circleToAdd = Circle(scale);
    rendering += circleToAdd;
  }
}

console.log(window.innerWidth);

console.log(rows);

document.write(rendering);
