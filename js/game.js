
var joueur;
var nomFichierVariables = './resources/variables.json';
var map;


function Game() {

 map = new Map("map");//Initialisation des maps
 
 
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
}

Game.prototype.pressdown = function (e){
	consol.log("Touch event down");
}

Game.prototype.pressdown = function (e){
	consol.log("Touch event up ");
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
		joueur = undefined;
		menu.exitGame();
		keysDown[keys.escape] = false;
	}
	
	if (keysDown[keys.space]) {
		
	
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
	/*ctx.fillStyle="black";
	ctx.fillRect(0,0,screenWidth,screenHeight);
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "16px SquareFont";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	
	ctx.fillText("X : " + this.x, 50, 100);
	ctx.fillText("Y : " + this.y, 50, 120);

	ctx.drawImage(bomberman, 0, 0, 32, 56, this.x, this.y, 32, 56);*/
	
}