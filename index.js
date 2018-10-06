/* *
 *  TimeFlow
 *
 *  This program creates an abstract graphic, based on the given Time.
 *  Simply copy and paste the graphic, because it's rendered as a
 *  fully scalable vector graphic. Also feel free to modify and change
 *  this code to fit your project.
 *
 *  Github: https://github.com/matthias-jaeger-net/TimeFlow
 *
 *  Matthias Jäger, Graz 2018
 */

(function TimeFlow() {

	const width = window.innerWidth;
	const height = window.innerHeight;

	const map = (num, in_min, in_max, out_min, out_max) => {
		return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
	};

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

	const CircleString = (position, radius) => {
		let circle = '';
		circle += '<circle cx="' + position.x + '" cy="' + position.y + '" r="' + radius + '"';
		circle += ' stroke="black" stroke-width="8" fill="transparent"/>';
		return circle;
	};

	const HandString = (position, angle, radius) => {
		let x1 = position.x;
		let y1 = position.y;
		let x2 = x1 + Math.cos(angle - Math.PI / 2) * radius;
		let y2 = y1 + Math.sin(angle - Math.PI / 2) * radius;
		let style = 'stroke:black; stroke-width:8; '
		return '<line stroke-linecap="round" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" style="' + style + '" />';
	}

	const createClockString = (position, time, radius) => {
		let unit = radius / 100.0;
		let clock = CircleString(position, radius);
		clock += HandString(position, map(time.hours, 0, 24, 0, Math.PI * 4), unit * 60);
		clock += HandString(position, map(time.minutes, 0, 59, 0, Math.PI * 2), unit * 70);
		clock += HandString(position, map(time.seconds, 0, 59, 0, Math.PI * 2), unit * 80);
		return clock;
	};

	const createClockGrid = () => {
		console.log('yh');
	}

	const writeClockString = () => {
		let position = {
			x: width / 2,
			y: height / 2
		}
		let clock1 = createClockString(position, getCurrentTime(), 100);

		let position2 = {
			x: width / 3,
			y: height / 5
		}
		let clock2 = createClockString(position2, getCurrentTime(), 200);

		let grafic = '<svg width="' + width + '" height="' + height + '" version="1.1" xmlns="http://www.w3.org/2000/svg">';
		grafic += clock1 + " " + clock2;
		grafic += '</svg>';

		document.open();
		document.write(grafic);
	};




	setInterval(writeClockString, 1000);

})();