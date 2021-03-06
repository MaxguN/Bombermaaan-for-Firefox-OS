var optionSelected = 1;

var colorTab = ["BLANC", "NOIR", "ROUGE", "BLEU", "VERT"];
var colorTabTaille = 4;


function Options() {
	theOptions = this;
	theOptions.bind();
	
}

Options.prototype.addInput - function(){

}

Options.prototype.bind = function() {
	binder.bind(canvas, "click", function (e) {
		e.stopPropagation();
		theOptions.updateByClick(e);
	}, false);

	binder.bind(canvas, "mousemove", function (e) {
		e.stopPropagation();
		theOptions.mouseMouve(e);
	}, false);
};

Options.prototype.unbind = function() {
	binder.unbind(canvas, "click");
};

Options.prototype.updateByClick = function (event){
	console.log("Le vrai X : " + event.clientX);
	console.log("Le vrai Y : " + event.clientY);
	
	var x = event.clientX;
	var y = event.clientY;
	
	var computed  = adaptCoords(x, y);
	
	console.log("X computed: " + Math.round(computed.x));
	console.log("Y computed: " + Math.round(computed.y));

	//on gère le
	if ((Math.round(computed.x) >= 324 && Math.round(computed.x) <= 651) && (Math.round(computed.y) >= 303 && Math.round(computed.y) <= 330 )){
		if( optionsData.loadSound() === "Yes"){
				optionsData.saveSound("No");
			}else if( optionsData.loadSound() === "No") {
				optionsData.saveSound("Yes");
			}
	}
	


	if ((Math.round(computed.x) >= 302 && Math.round(computed.x) <= 673) && (Math.round(computed.y) >= 374 && Math.round(computed.y) <= 398 )){

		
	}
	
	if ((Math.round(computed.x) >= 428 && Math.round(computed.x) <= 528) && (Math.round(computed.y) >= 405 && Math.round(computed.y) <= 425 )){
		currentObject = menu;
		menu.bind();

	}
	
}

Options.prototype.mouseMouve = function(event){

	var computed  = adaptCoords(event.clientX, event.clientY);

	if ((Math.round(computed.x) >= 352 && Math.round(computed.x) <= 603) && (Math.round(computed.y) >= 303 && Math.round(computed.y) <= 330 )){
		optionSelected = 1;
	}
	
	if ((Math.round(computed.x) >= 314 && Math.round(computed.x) <= 639) && (Math.round(computed.y) >= 339 && Math.round(computed.y) <= 363 )){
		optionSelected = 2;
	}
	
	if ((Math.round(computed.x) >= 302 && Math.round(computed.x) <= 673) && (Math.round(computed.y) >= 374 && Math.round(computed.y) <= 398 )){

		optionSelected = 3;
	}

	if ((Math.round(computed.x) >= 413 && Math.round(computed.x) <= 550) && (Math.round(computed.y) >= 405 && Math.round(computed.y) <= 425 )){

		optionSelected = 4;
	}
	

}


Options.prototype.update = function () {
	if (keysDown[keys.up]) { // Player holding up
		
		if(optionSelected >1) {
			optionSelected--;
		}
		keysDown[keys.up] = false;
	}
	if (keysDown[keys.down]) { // Player holding down
		
		if(optionSelected < 4){
			optionSelected++;
		}
		keysDown[keys.down] = false;
	}
	if (keysDown[keys.left]) { // Player holding left
		if (optionSelected === 1 ){
			if( optionsData.loadSound() === "Yes"){
				optionsData.saveSound("No");
				musiqueMenu.pause();
			}else if( optionsData.loadSound() === "No") {
				optionsData.saveSound("Yes");
				musiqueMenu.load();
				musiqueMenu.play();
			}
		
		}


		if (optionSelected === 3 ){
			var i = optionsData.loadColor();
			//console.log(i);
			if(i <= 0){
				i = colorTabTaille; 
				optionsData.saveColor(i);
			}else {
				i--;
				optionsData.saveColor(i);
			}

			//optionsData.saveColor(optionsData.loadColor()++]);
		
		}

		keysDown[keys.left] = false;
	}
	if (keysDown[keys.right]) { // Player holding right
		if (optionSelected === 1 ){
			if( optionsData.loadSound() === "Yes"){
				optionsData.saveSound("No");
				musiqueMenu.pause();
			}else if( optionsData.loadSound() === "No") {
				optionsData.saveSound("Yes");
				musiqueMenu.load();
				musiqueMenu.play();
			}
		
		}

		if (optionSelected === 3 ){
			var i = optionsData.loadColor();
			//console.log(i);
			if(i >= colorTabTaille){
				i = 0; 
				optionsData.saveColor(i);
			}else {
				i++;
				optionsData.saveColor(i);
			}

			//optionsData.saveColor(optionsData.loadColor()++]);
		
		}
		keysDown[keys.right] = false;
	}
	
	if (keysDown[keys.space]) { // Player holding space
		
		if (optionSelected === 4 ){
			currentObject = menu;
			menu.bind();
		}
		keysDown[keys.space] = false;
	}
	
	if (keysDown[keys.enter]) { // Player holding enter
		keysDown[keys.enter] = false;
	}
	
	if (keysDown[keys.escape]){
		
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
		case 1: ctx.drawImage(bomberman, 0, 0, 32, 32, screenWidth/5 , 298, 32, 32);
				ctx.fillText(" Sound :  <"+optionsData.loadSound()+">", screenWidth/2,300);
				ctx.fillText(" Nickname : "+optionsData.loadNickName()+"", screenWidth/2,335);
				ctx.fillText(" Color : "+colorTab[optionsData.loadColor()]+"", screenWidth/2,370);
				ctx.fillText(" Exit ", screenWidth/2,405);
				break;
		case 2: ctx.drawImage(bomberman, 0, 0, 32, 32, screenWidth/5 , 333, 32, 32);
				ctx.fillText(" Sound : "+optionsData.loadSound()+"", screenWidth/2,300);
				ctx.fillText(" Nickname : <"+optionsData.loadNickName()+">", screenWidth/2,335);
				ctx.fillText(" Color : "+colorTab[optionsData.loadColor()]+"", screenWidth/2,370);
				ctx.fillText(" Exit ", screenWidth/2,405);
				break;	
		case 3: ctx.drawImage(bomberman, 0, 0, 32, 32, screenWidth/5 , 368, 32, 32);
				ctx.fillText(" Sound : "+optionsData.loadSound()+"", screenWidth/2,300);
				ctx.fillText(" Nickname : "+optionsData.loadNickName()+"", screenWidth/2,335);
				ctx.fillText(" Color : <"+colorTab[optionsData.loadColor()]+">", screenWidth/2,370);
				ctx.fillText(" Exit ", screenWidth/2,405);	
				break;
		case 4: ctx.drawImage(bomberman, 0, 0, 32, 32, screenWidth/5 , 403, 32, 32);
				ctx.fillText(" Sound : "+optionsData.loadSound()+"", screenWidth/2,300);
				ctx.fillText(" Nickname : "+optionsData.loadNickName()+"", screenWidth/2,335);
				ctx.fillText(" Color : "+colorTab[optionsData.loadColor()]+"", screenWidth/2,370);
				ctx.fillText(" <Exit> ", screenWidth/2,405);		
				break;				
	}
	
	
}