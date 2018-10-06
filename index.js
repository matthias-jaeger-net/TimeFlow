/* *
 *  TimeFlow
 *  Matthias Jäger, Graz 2018
 *  Github: https://github.com/matthias-jaeger-net/TimeFlow
 */

(function TimeFlow() {

	// Maps an input to a range
	const map = (input, minInput, maxInput, minOutput, maxOutput) => {
		return (input - minInput) * (maxOutput - minOutput) / (maxInput - minInput) + minOutput;
	};

	// Returns an object with the current time
	const getCurrentTime = () => {
		let date = new Date();
		let hours = date.getHours();
		let minutes = date.getMinutes();
		let seconds = date.getSeconds();
		return {
			hours: hours,
			minutes: minutes,
			seconds: seconds
		}
	};

	// Returns a <line> string
	const HandString = (position, angle, radius) => {
		let x1 = position.x;
		let y1 = position.y;
		// Polar to carthesian
		let x2 = x1 + Math.cos(angle - Math.PI / 2) * radius;
		let y2 = y1 + Math.sin(angle - Math.PI / 2) * radius;
		let style = 'stroke:black; stroke-width:4; '
		return '<line stroke-linecap="round" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" style="' + style + '" />';
	}

	// Retunrs a finished clock string
	const createClockString = (position, time, radius) => {
		let unit = (radius / 100.0);
		let clock = '';
		clock += HandString(position, map(time.hours, 0, 23, 0, Math.PI * 4), unit * 60);
		clock += HandString(position, map(time.minutes, 0, 59, 0, Math.PI * 2), unit * 70);
		clock += HandString(position, map(time.seconds, 0, 59, 0, Math.PI * 2), unit * 80);
		return clock;
	};

	// Returns an array with positions of a given grid
	const createGrid = (rows, cols, unit) => {
		let positions = [];
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				let position = {
					x: i * unit + (unit / 2.0),
					y: j * unit + (unit / 2.0)
				}
				positions.push(position);
			}
		}
		return positions;
	}

	const writeInDocument = () => {

		let now = getCurrentTime();

		// Defining a grid based on the resolution
		let width = window.innerWidth;
		let height = window.innerHeight;
		let scale = width / 20;
		let rows = width / scale; // map(now.seconds, 0, 59, 1, 60);
		let cols = height / scale; // map(now.minutes, 0, 59, 1, 60);
		let grid = createGrid(rows, cols, scale);
		let padding = (scale / 100.0) * 10.0;

		// Creating a full with <svg> string with clocks
		let svg = '<svg width="' + width + '" height="' + height + '" version="1.1" xmlns="http://www.w3.org/2000/svg">';
		for (let position of grid) {
			svg += createClockString(position, now, (scale / 2) - padding);
		}
		svg += '</svg>';

		// Open document stream and write the <svg>
		document.open();
		document.write(svg);
	};

	setInterval(writeInDocument, 1000);

})();