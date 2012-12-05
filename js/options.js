var optionSelected = 1;

function Options() {
	optionsData = new OptionStorage();
}

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
		optionsData = undefined;
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
				break;
		case 2: ctx.fillText(" Pad : "+optionsData.loadPad()+"", screenWidth/2,300);
				ctx.fillText(" Nickname : <"+optionsData.loadNickName()+">", screenWidth/2,335);
				break;			
	}
	
	
}