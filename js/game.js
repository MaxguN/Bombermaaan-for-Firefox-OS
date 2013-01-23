var joueur;
var joueur2;
var nomFichierVariables = 'resources/variables.json';
var map;
var multiPad;
var joyStick;
var musique;


function Game() {
	musiqueMenu.pause();
   musique = new Audio("resources/song/title.wav");
   musique.loop = true;
   musique.volume=0.4;

   if(optionsData.loadSound() === "Yes"){
		musique.play();
	}

	

	optionsData = new OptionStorage();
	map = new Map("map");//Initialisation des maps
	screenWidth = map.getLargeur() * varProperties.pixelsUnitaireCarte;
	screenHeight = map.getHauteur() * varProperties.pixelsUnitaireCarte;
	canvas.width = screenWidth;
	canvas.height = screenHeight;
 
	
	
	
	//initialisation du personnage
	
	joueur = new Personnage(varProperties.personnageSrc, varProperties.personnageUnPositionInitX, varProperties.personnageUnPositionInitY, DIRECTION.BAS, optionsData.loadColor());
	map.addPersonnage(joueur);

	this.adversaires = new Array();
	for (i=0; i<4; i++){
		this.adversaires.push(new Personnage(varProperties.personnageSrc, varProperties.personnageDeuxPositionInitX, varProperties.personnageDeuxPositionInitY, DIRECTION.BAS, i+1));
		map.addPersonnage(this.adversaires[i]);
	}

	
	
	//on charge les options du jeu personnalisées par le map.personnages[0] (stockées en Local Storage)
	optionsData = new OptionStorage(); 
	
	//on detecte le type de device
	if( navigator.userAgent.match(/Android/i) ||
 		navigator.userAgent.match(/webOS/i) ||
 		navigator.userAgent.match(/iPhone/i) || 
 		navigator.userAgent.match(/iPod/i) || 
 		navigator.userAgent.match(/firefoxOS/i) ||  //on set à 1 pour que la condition soit vrai (pour le dev)
		1 ){ 
 			multiPad = new MultiPad(varProperties.pad,varProperties.button,map.personnages[0]);
 			joyStick = new JoyStick();
 			theGame = this;
 			this.bind();
 			joyStick.bind();
		}	
	
}

Game.prototype.bind = function() {
	binder.bind(canvas, "touchstart", function (e) {
		e.stopPropagation();
		theGame.updateByClick(e);
	}, false);
	binder.bind(canvas, "touchend", function (e) {
		e.stopPropagation();
		theGame.updateByClick(e);
	}, false);
};

Game.prototype.unbind = function() {
	binder.unbind(canvas, "touchstart");
	binder.unbind(canvas, "touchend");
};


Game.prototype.updateByClick = function (event){
	//console.log("Le vrai X : " + event.clientX);
	//console.log("Le vrai Y : " + event.clientY);

	for (var i = 0; i < event.changedTouches.length; i += 1) {
		var touch = event.changedTouches[i];
		
		var x = touch.clientX;
		var y = touch.clientY;

		var computed  = adaptCoords(x, y);
		
		//console.log("X computed: " + Math.round(computed.x));
		//console.log("Y computed: " + Math.round(computed.y));



		//déplacement
		if ((Math.round(computed.x) >= 49 && Math.round(computed.x) <= 71) && (Math.round(computed.y) >= 391 && Math.round(computed.y) <= 415 )){
			map.personnages[0].deplacer(DIRECTION.HAUT, map);
		}
		
		if ((Math.round(computed.x) >= 21 && Math.round(computed.x) <= 49) && (Math.round(computed.y) >= 417 && Math.round(computed.y) <= 440 )){
			map.personnages[0].deplacer(DIRECTION.GAUCHE, map);
		}
		
		if ((Math.round(computed.x) >= 49 && Math.round(computed.x) <= 71) && (Math.round(computed.y) >= 440 && Math.round(computed.y) <= 466 )){
			map.personnages[0].deplacer(DIRECTION.BAS, map);
		}
		
		if ((Math.round(computed.x) >= 72 && Math.round(computed.x) <= 99) && (Math.round(computed.y) >= 418 && Math.round(computed.y) <= 441 )){
			map.personnages[0].deplacer(DIRECTION.DROITE, map);
			
		}

		if ((Math.round(computed.x) >= 402 && Math.round(computed.x) <= 453) && (Math.round(computed.y) >= 409 && Math.round(computed.y) <= 462 )){
			map.addBomb(new Bomb (varProperties.BombeSrc, map.personnages[0]));
		}

		//Exit
		if ((Math.round(computed.x) >= 231 && Math.round(computed.x) <= 259) && (Math.round(computed.y) >= 418 && Math.round(computed.y) <= 428 )){
			map.personnages[0] = undefined;
			
			game = undefined;
			map = undefined;
			multiPad = undefined;
			
			menu.exitGame();
		}

	}
	
}


var action = {"haut":false,"bas":false,"gauche":false,"droite":false};

Game.prototype.event = function () {
	if (keysDown[keys.up]) { // Player holding up
		action.haut = true;
		if (keysDown[keys.right] && !action.droite ||
				keysDown[keys.left] && !action.gauche) {
			keysDown[keys.up] = false;
			action.haut = false;
		}
		if (keysDown[keys.down]) {
			keysDown[keys.up] = false;
			keysDown[keys.down] = false;
			action.haut = false;
			action.bas = false;
		}
	} else {
		action.haut = false;
		if (keysDown[keys.up] === undefined && 
				keysDown[keys.down] === false && 
				!keysDown[keys.left] && !keysDown[keys.right]) {
			keysDown[keys.down] = true;
			action.bas = true;
		}
	}
	
	if (keysDown[keys.down]) { // Player holding down
		action.bas = true;
		if (keysDown[keys.right] && !action.droite ||
				keysDown[keys.left] && !action.gauche) {
			keysDown[keys.down] = false;
			action.bas = false;
		}
	} else {

		action.bas = false;
		if (keysDown[keys.down] === undefined && 
				keysDown[keys.up] === false && 
				!keysDown[keys.left] && !keysDown[keys.right]) {
			keysDown[keys.up] = true;
			action.haut = true;
		}
	}	
	
	if (keysDown[keys.left]) { // Player holding left
		action.gauche = true;
		if (keysDown[keys.up] && action.haut ||
				keysDown[keys.down] && action.bas) {
			keysDown[keys.left] = false;
			action.gauche = false;
		}
		if (keysDown[keys.right]) {
			keysDown[keys.left] = false;
			keysDown[keys.right] = false;
			action.gauche = false;
			action.droite = false;
		}
	} else {
		action.gauche = false;
		if (keysDown[keys.left] === undefined && 
				keysDown[keys.right] === false && 
				!keysDown[keys.up] && !keysDown[keys.down]) {
			keysDown[keys.right] = true;
			action.droite = true;
		}
	}
	
	if (keysDown[keys.right]) { // Player holding right
		action.droite = true;
		if (keysDown[keys.up] && action.haut ||
				keysDown[keys.down] && action.bas) {
			keysDown[keys.right] = false;
			action.droite = false;
		}
	} else {
		action.droite = false;
		if (keysDown[keys.right] === undefined && 
				keysDown[keys.left] === false && 
				!keysDown[keys.up] && !keysDown[keys.down]) {
			keysDown[keys.left] = true;
			action.gauche = true;
		}
	}

	if (keysDown[keys.escape]) {
		map.personnages[0] = null;
		menu.exitGame();
		keysDown[keys.escape] = false;
	}
	
	if (keysDown[keys.escape]) {
		//on aide le garbage collector de JS en supprimant les références initules.
		console.log("echap");
		map.personnages[0] = undefined; //y'a un pbl avec cette ligne je pense !!
		optionsData = undefined;
		game = undefined;
		map = undefined;
		multiPad = undefined;
		menu.exitGame();
		keysDown[keys.escape] = false;
	}
	
	if (keysDown[keys.space]) {
		map.addBomb(new Bomb (varProperties.BombeSrc, map.personnages[0]));
		keysDown[keys.space] = false;
	}
	
}

Game.prototype.update = function (length) {
	this.event();	
	
	if (action.haut) {
		map.personnages[0].deplacer(DIRECTION.HAUT, map)
	 } else if (action.droite) {
		map.personnages[0].deplacer(DIRECTION.DROITE, map)
	} else if (action.bas) {
		map.personnages[0].deplacer(DIRECTION.BAS, map)
	} else if (action.gauche) {		
		map.personnages[0].deplacer(DIRECTION.GAUCHE, map)
	}
	
	this.render();
}

Game.prototype.updatePositionAdvsersaire = function(){
	
	for(idAdversaire in this.adversaires){
	var randomnumber = Math.round(Math.floor ( Math.random() * 5 ));
	switch(randomnumber) {
		case 1: this.adversaires[idAdversaire].deplacer(DIRECTION.HAUT, map);
				break;
		case 2: this.adversaires[idAdversaire].deplacer(DIRECTION.DROITE, map);
				break;
		case 3: this.adversaires[idAdversaire].deplacer(DIRECTION.BAS, map);
				break;
		case 4: this.adversaires[idAdversaire].deplacer(DIRECTION.GAUCHE, map);
				break;						
	}
	}

}

Game.prototype.render = function () {
	ctx.fillStyle="black";
	ctx.fillRect(0,0,screenWidth,screenHeight);
	ctx.fillStyle = "rgb(250, 250, 250)";
	map.dessinerMap(ctx);

	//si le multipad a été init
	if(multiPad != null){
		multiPad.render();
	}



	//affichage du nickname du joueur
	ctx.fillStyle = "red";
	ctx.font = "10px SquareFont";
	ctx.fillText(optionsData.loadNickName(), 45 ,10);

	//affichage du Exit
	ctx.fillStyle = "black";
	ctx.font = "15px SquareFont";
	ctx.fillText("Exit", screenWidth/2 - 10 ,screenHeight - 50);

	this.updatePositionAdvsersaire();

	if(joyStick != null){
		console.log("Appelle du render");
		joyStick.render();
	}
	
}