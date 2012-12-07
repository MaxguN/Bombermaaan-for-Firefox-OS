var optionSelected = 1;

function Options() {
	optionsData = new OptionStorage();
	theOptions = this;
	//addEventListener("click", function (e) {
	//e.stopPropagation();
	//theOptions.updateByClick(e);
}


/*Options.prototype.updateByClick = function (event){
	console.log("Le vrai X : " + event.clientX);
	console.log("Le vrai Y : " + event.clientY);
	
	var x = event.clientX;
	var y = event.clientY;
	
	var computed  = adaptCoords(x, y);
	
	console.log("X computed: " + Math.round(computed.x));
	console.log("Y computed: " + Math.round(computed.y));
	
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
*/

Options.prototype.update = function () {
	if (keysDown[keys.up]) { // Player holding up
		
		if(optionSelected >1) {
			optionSelected--;
		}
		keysDown[keys.up] = false;
	}
	if (keysDown[keys.down]) { // Player holding down
		
		if(optionSelected < 2){
			optionSelected++;
		}
		keysDown[keys.down] = false;
	}
	if (keysDown[keys.left]) { // Player holding left
		if (optionSelected === 1 ){
			if( optionsData.loadPad() === "Yes"){
				optionsData.savePad("No");
			}else if( optionsData.loadPad() === "No") {
				optionsData.savePad("Yes");
			}
		
		}
		keysDown[keys.left] = false;
	}
	if (keysDown[keys.right]) { // Player holding right
		if (optionSelected === 1 ){
			if( optionsData.loadPad() === "Yes"){
				optionsData.savePad("No");
			}else if( optionsData.loadPad() === "No") {
				optionsData.savePad("Yes");
			}
		
		}
		keysDown[keys.right] = false;
	}
	
	if (keysDown[keys.space]) { // Player holding space
		keysDown[keys.space] = false;
		if (optionSelected === 1 ){
			
		}
	}
	
	if (keysDown[keys.enter]) { // Player holding enter
		keysDown[keys.enter] = false;
	}
	
	if (keysDown[keys.escape]){
		currentObject = menu;
		keysDown[keys.escape] = false;
	}
	
	this.render();
}

Options.prototype.render = function () {
	//Création du menu
	ctx.fillStyle="black";
	ctx.fillRect(0,0,screenWidth,screenHeight);
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "64px SquareFont";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	ctx.fillText("Options", eval(screenWidth/2) ,50);
	
	ctx.font = "30px Test";
	ctx.textAlign = "center";
	ctx.textBaseline = "center";
	
	switch(optionSelected) {
		case 1: ctx.fillText(" Pad :  <"+optionsData.loadPad()+">", screenWidth/2,300);
				ctx.fillText(" Nickname : "+optionsData.loadNickName()+"", screenWidth/2,335);
				ctx.fillText(" Exit ", screenWidth/2,370);
				break;
		case 2: ctx.fillText(" Pad : "+optionsData.loadPad()+"", screenWidth/2,300);
				ctx.fillText(" Nickname : <"+optionsData.loadNickName()+">", screenWidth/2,335);
				ctx.fillText(" Exit ", screenWidth/2,370);
				break;			
	}
	
	
}