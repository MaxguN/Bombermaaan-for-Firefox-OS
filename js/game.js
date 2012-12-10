var joueur;
var nomFichierVariables = 'resources/variables.json';
var map;
var multiPad;


function Game() {

	map = new Map("map");//Initialisation des maps
	screenWidth = map.getLargeur() * 32;
	screenHeight = map.getHauteur() * 32;
	canvas.width = screenWidth;
	canvas.height = screenHeight;
 
	//début de définition des variables
	// Création de l'objet XmlHttpRequest
	var xhr = getXMLHttpRequest();

	// Chargement du fichier
	xhr.open("GET", nomFichierVariables, false);
	xhr.send(null);
	if(xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0)) // Code == 0 en local
		throw new Error("Impossible de charger le fichier de propriétés nommée \"" + nomFichierVariables + "\" (code HTTP : " + xhr.status + ").");
	var varJsonProperties = xhr.responseText;
	
	// Analyse des données
	var varProperties = JSON.parse(varJsonProperties);
	//fin de définition des variables
	
	
	//initialisation du personnage
	joueur = new Personnage(varProperties.personnageBleuSrc, varProperties.personnageBleuPositionInitX, varProperties.personnageBleuPositionInitY, DIRECTION.BAS);
	map.addPersonnage(joueur);
	
	
	//on charge les options du jeu personnalisées par le joueur (stockées en Local Storage)
	optionsData = new OptionStorage(); 
	
	//on detecte le type de device
	if( navigator.userAgent.match(/Android/i) ||
 		navigator.userAgent.match(/webOS/i) ||
 		navigator.userAgent.match(/iPhone/i) || 
 		navigator.userAgent.match(/iPod/i) || 
 		navigator.userAgent.match(/firefoxOS/i) || 1 //on set à 1 pour que la condition soit vrai (pour le dev)
		){ 
 			multiPad = new MultiPad(varProperties.pad,varProperties.button,joueur);
 			theGame = this;
 			this.bind();
		}	
	
}

Game.prototype.bind = function() {
	binder.bind(canvas, "click", function (e) {
		e.stopPropagation();
		theGame.updateByClick(e);
	}, false);
};

Game.prototype.unbind = function() {
	binder.unbind(canvas, "click");
};

Game.prototype.updateByClick = function (event){
	console.log("Le vrai X : " + event.clientX);
	console.log("Le vrai Y : " + event.clientY);
	
	var x = event.clientX;
	var y = event.clientY;
	
	var computed  = adaptCoords(x, y);
	
	console.log("X computed: " + Math.round(computed.x));
	console.log("Y computed: " + Math.round(computed.y));

	/*if ((Math.round(computed.x) >= 352 && Math.round(computed.x) <= 603) && (Math.round(computed.y) >= 303 && Math.round(computed.y) <= 330 )){
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
		
	}*/

	
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
		joueur = null;
		menu.exitGame();
		keysDown[keys.escape] = false;
	}
	
	if (keysDown[keys.escape]) {
		//on aide le garbage collector de JS en supprimant les références initules.
		joueur = undefined;
		optionsData = undefined;
		game = undefined;
		map = undefined;
		multiPad = undefined;
		
		menu.exitGame();
		keysDown[keys.escape] = false;
	}
	
	if (keysDown[keys.space]) {
	
		keysDown[keys.space] = false;
	}
	
}

Game.prototype.update = function (length) {
	this.event();	
	
	if (action.haut) {
		joueur.deplacer(DIRECTION.HAUT, map)
	 } else if (action.droite) {
		joueur.deplacer(DIRECTION.DROITE, map)
	} else if (action.bas) {
		joueur.deplacer(DIRECTION.BAS, map)
	} else if (action.gauche) {		
		joueur.deplacer(DIRECTION.GAUCHE, map)
	}
	
	this.render();
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
	ctx.fillText("Exit", screenWidth/2 ,screenHeight - 50);
	
}