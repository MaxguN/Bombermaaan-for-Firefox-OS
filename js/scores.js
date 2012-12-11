var scoreSelected = 1;

function Scores() {
	theScore = this;
	theScore.bind();
}

Scores.prototype.bind = function() {
	binder.bind(canvas, "click", function (e) {
		console.log("click capté");
		e.stopPropagation();
		theScore.updateByClick(e);
	}, false);
};

Scores.prototype.unbind = function() {
	binder.unbind(canvas, "click");
};

Scores.prototype.updateByClick = function (event){
	
	var computed  = adaptCoords(event.clientX, event.clientY);
	
	if ((Math.round(computed.x) >= 428 && Math.round(computed.x) <= 528) && (Math.round(computed.y) >= 374 && Math.round(computed.y) <= 398 )){
		currentObject = menu;
		menu.bind();

	}
	
}



Scores.prototype.update = function (modifier) {
	if (keysDown[keys.up]) { // Player holding up
		
		if(selectValue >1) {
			selectValue--;
		}
		keysDown[keys.up] = false;
	}
	if (keysDown[keys.down]) { // Player holding down
		
		if(selectValue < 3){
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
	
	if (keysDown[keys.space]) { // Player holding space
		keysDown[keys.space] = false;
	}
	
	if (keysDown[keys.enter]) { // Player holding enter
		keysDown[keys.enter] = false;
	}
	
	if (keysDown[keys.escape]){
		currentObject = menu;
		menu.bind();
		keysDown[keys.escape] = false;
	}
	
	this.render();
}

Scores.prototype.render = function () {
	//Création du menu
	ctx.fillStyle="black";
	ctx.fillRect(0,0,screenWidth,screenHeight);
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "64px SquareFont";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	ctx.fillText("Scores", eval(screenWidth/2) ,50);
	
	ctx.font = "30px Test";
	ctx.textAlign = "center";
	ctx.textBaseline = "center";

	switch(scoreSelected) {
		case 1: ctx.fillText(" Exit ", screenWidth/2,370);
				break;		
	}
	
	
}