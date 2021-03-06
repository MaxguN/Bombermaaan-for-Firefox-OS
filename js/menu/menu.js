var musiqueMenu;

function Menu() {
	musiqueMenu = new Audio("resources/song/title.wav");
   	musiqueMenu.loop = true;
   	musiqueMenu.volume=0.4;
	theMenu = this;
	this.bind();

	if(optionsData.loadSound() === "No"){
		musiqueMenu.pause();
	}
}

Menu.prototype.bind = function() {
	binder.bind(canvas, "click", function (e) {
		e.stopPropagation();
		theMenu.updateByClick(e);
	}, false);

	binder.bind(canvas, "mousemove", function (e) {
		e.stopPropagation();
		theMenu.mouseMouve(e);
	}, false);
};

Menu.prototype.unbind = function() {
	binder.unbind(canvas, "click");
};

Menu.prototype.launchGame = function () {
	this.unbind();
	game = new Game();
	
	
	currentObject = game;
}

Menu.prototype.options = function () {
	this.unbind();
	options = new Options();
	
	currentObject = options;

}

Menu.prototype.scores = function () {
	this.unbind();
	scores = new Scores();
	
	currentObject = scores;

}

Menu.prototype.multiplayer = function() {
	window.location = "multiplayer/index.html";
}

Menu.prototype.exitGame = function () {
	this.bind();
	game = undefined;
	
	screenWidth = 960;
	screenHeight = 640;
	canvas.width = screenWidth;
	canvas.height = screenHeight;
	
	currentObject = menu;
	
}

Menu.prototype.mouseMouve = function(event){

	var computed  = adaptCoords(event.clientX, event.clientY);

	if ((Math.round(computed.x) >= 352 && Math.round(computed.x) <= 603) && (Math.round(computed.y) >= 303 && Math.round(computed.y) <= 330 )){
		selectValue = 1;
	}
	
	if ((Math.round(computed.x) >= 314 && Math.round(computed.x) <= 639) && (Math.round(computed.y) >= 339 && Math.round(computed.y) <= 363 )){
		selectValue = 2;
	}
	
	if ((Math.round(computed.x) >= 390 && Math.round(computed.x) <= 564) && (Math.round(computed.y) >= 374 && Math.round(computed.y) <= 398 )){
		selectValue = 3;
	}
	
	if ((Math.round(computed.x) >= 382 && Math.round(computed.x) <= 573) && (Math.round(computed.y) >= 409 && Math.round(computed.y) <= 432 )){
		selectValue = 4;
		
	}

}

Menu.prototype.updateByClick = function (event){
	
	var computed  = adaptCoords(event.clientX, event.clientY);
	
	if ((Math.round(computed.x) >= 352 && Math.round(computed.x) <= 603) && (Math.round(computed.y) >= 303 && Math.round(computed.y) <= 330 )){
		this.launchGame();
	}
	
	if ((Math.round(computed.x) >= 314 && Math.round(computed.x) <= 639) && (Math.round(computed.y) >= 339 && Math.round(computed.y) <= 363 )){
		this.multiplayer();
	}
	
	if ((Math.round(computed.x) >= 390 && Math.round(computed.x) <= 564) && (Math.round(computed.y) >= 374 && Math.round(computed.y) <= 398 )){
		this.scores();
	}
	
	if ((Math.round(computed.x) >= 382 && Math.round(computed.x) <= 573) && (Math.round(computed.y) >= 409 && Math.round(computed.y) <= 432 )){
		this.options();
		
	}
}

Menu.prototype.update = function (modifier) {
	if (keysDown[keys.up]) { // Player holding up
		
		if(selectValue >1) {
			selectValue--;
		}
		keysDown[keys.up] = false;
	}
	if (keysDown[keys.down]) { // Player holding down
		
		if(selectValue < 4){
			selectValue++;
		}
		keysDown[keys.down] = false;
	}
	if (keysDown[keys.left]) { // Player holding left
		
		keysDown[keys.left] = false;
	}
	if (keysDown[keys.right]) { // Player holding right
		
		keysDown[keys.right] = false;
	}
	
	if (keysDown[keys.enter]) { // Player holding enter
		keysDown[keys.enter] = false;
	}
	
	if (keysDown[keys.space]) { // Player holding space
		if(selectValue === 1){
			this.launchGame();
		}
		
		if(selectValue === 2){
			this.multiplayer();
		}
		
		if(selectValue === 3){
			this.scores();
		}
		
		if(selectValue === 4){
			this.options();
		}
		
		keysDown[keys.space] = false;
	}
	
	this.render();
}

Menu.prototype.render = function () {
	//Création du menu
	ctx.fillStyle="black";
	ctx.fillRect(0,0,screenWidth,screenHeight);
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "128px SquareFont";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	ctx.fillText("Bombermaaan", eval(screenWidth/2) ,100);
	
	ctx.font = "30px Test";
	ctx.textAlign = "center";
	ctx.textBaseline = "center";
	
	switch(selectValue) {
		case 1: ctx.drawImage(bomberman, 0, 0, 32, 32, screenWidth/4 , 298, 32, 32);
				ctx.fillText(" New Game ", screenWidth/2,300);
				ctx.fillText(" Multiplayer ", screenWidth/2,335);
				ctx.fillText(" Scores ", screenWidth/2,370);
				ctx.fillText(" Options ", screenWidth/2,405);
				break;
		case 2: ctx.drawImage(bomberman, 0, 0, 32, 32, screenWidth/4 , 333, 32, 32)
				ctx.fillText(" New Game ", screenWidth/2,300);
				ctx.fillText(" Multiplayer ", screenWidth/2,335);
				ctx.fillText(" Scores ", screenWidth/2,370);
				ctx.fillText(" Options ", screenWidth/2,405);
				break;
		case 3: ctx.drawImage(bomberman, 0, 0, 32, 32, screenWidth/4 , 368, 32, 32)
				ctx.fillText(" New Game ", screenWidth/2,300);
				ctx.fillText(" Multiplayer ", screenWidth/2,335);
				ctx.fillText(" Scores ", screenWidth/2,370);
				ctx.fillText(" Options ", screenWidth/2,405);
				break;
		case 4: ctx.drawImage(bomberman, 0, 0, 32, 32, screenWidth/4 , 403, 32, 32)
				ctx.fillText(" New Game ", screenWidth/2,300);
				ctx.fillText(" Multiplayer ", screenWidth/2,335);
				ctx.fillText(" Scores ", screenWidth/2,370);
				ctx.fillText(" Options ", screenWidth/2,405);
				break;						
	}
}