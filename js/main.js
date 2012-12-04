var selectValue = 1;


var bomberman = new Image();
bomberman.src = "resources/images/bomberman.png";


// Handle keyboard controls
var keysDown = {};

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

addEventListener("keydown", function (e) {
	if (keysDown[e.keyCode] !== false) {
		keysDown[e.keyCode] = true;
	}
}, false);

document.body.appendChild(canvas);

var menu = new Menu();
var game;
var options;
var scores;

var currentObject = menu;

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	currentObject.update(delta / 1000);

	then = now;
};


var then = Date.now();
setInterval(main, 20); // Execute as fast as possible