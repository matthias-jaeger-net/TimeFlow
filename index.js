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

	const scale = 100;
	const width = window.innerWidth;
	const height = window.innerHeight;

	const getCurrentTime = function() {
		return new Date();
	};

	const formatTime = function(date) {
		let hours = date.getHours();
		let minutes = date.getMinutes();
		let seconds = date.getSeconds();
		return [hours, minutes, seconds];
	};

	const queryTime = function() {
		console.log(formatTime(getCurrentTime()));
	};

	const renderTimeFlow = function() {
		// Prepare full screen svg as string
		let renderedString = '<svg width="' + width + '" height="' + height;
		renderedString += '" version="1.1" xmlns="http://www.w3.org/2000/svg">';
		const Circle = function(x, y, r) {
			let circle = '';
			let circleX = x;
			let circleY = y;
			let circleR = r;
			circle += '<circle cx="' + circleX + '" cy="' + circleY + '" r="' + circleR + '"';
			circle += ' stroke="black" stroke-width="1" fill="transparent"/>';
			return circle;
		}
		const rows = Math.floor(width / scale);
		const cols = Math.floor(height / scale);
		for (let row = 0; row < rows; row++) {
			for (let col = 0; col < cols; col++) {
				let x = row * scale + (scale / 2);
				let y = col * scale + (scale / 2);
				let circleToAdd = Circle(x, y, (scale / 2) - 5);
				renderedString += circleToAdd;
			}
		}
		// Close svg string and write
		renderedString += '</svg>';
		document.write(renderedString);
	};

	const animationLoop = function() {
		queryTime();
		renderTimeFlow();
	};

	setInterval(animationLoop, 1000);
})();