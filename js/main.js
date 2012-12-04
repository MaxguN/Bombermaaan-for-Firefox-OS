var screenWidth = 960;
var screenHeight = 640;

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

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = screenWidth;
canvas.height = screenHeight;

document.body.appendChild(canvas);

var metrics = {
	width : 0,
	height : 0,
	offset : {
		top : 0,
		right : 0,
		bottom : 0,
		left : 0
	},
	cwidth : function () {	// computed width
		return metrics.width - (metrics.offset.right + metrics.offset.left);
	},
	cheight : function () { // computed height
		return metrics.height - (metrics.offset.top + metrics.offset.bottom);
	}
};

function stretch() {
	metrics.width = document.body.offsetWidth;
	metrics.height = document.body.offsetHeight;
	canvas.style.width = metrics.cwidth() + 'px';
	canvas.style.height = metrics.cheight() + 'px';
}

stretch();
window.addEventListener('resize', stretch, true);

	
		

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