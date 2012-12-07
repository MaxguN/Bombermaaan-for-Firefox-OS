function Menu() {
	document.getElementById("title").play();
//	addEventListener("click", function (e) {
//	e.stopPropagation();
//	clickablet();
//	console.log(e.clientX);
//}, false);

}

Menu.prototype.launchGame = function () {
	game = new Game();
	document.getElementById("title").pause();
	currentObject = game;
	
}

Menu.prototype.options = function () {
	options = new Options();
	currentObject = options;

}

Menu.prototype.scores = function () {
	scores = new Scores();
	currentObject = scores;

}

Menu.prototype.exitGame = function () {
	game = undefined;
	
	screenWidth = 960;
	screenHeight = 640;
	canvas.width = screenWidth;
	canvas.height = screenHeight;
	
	currentObject = menu;
}

var clickablet = function (){
//	alert("toto");
}

Menu.prototype.pressdown = function (e){
	consol.log("Touch event down");
//	alert("toto");
}

Menu.prototype.pressdown = function (e){
	consol.log("Touch event up ");
//	alert("toto");
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
			window.location = "multiplayer.html";
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
		case 1: ctx.drawImage(bomberman, 0, 0, 32, 32, screenWidth/4 , 298, 32, 32)
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