var selectValue = 1;
var optionsData; //l'objet qui set les options dÈfinies par le joueur.
var xhr;

//début de définition des variables
// Création de l'objet XmlHttpRequest
xhr = getXMLHttpRequest();
// Chargement du fichier
xhr.open("GET", nomFichierVariables, false);
xhr.send(null);
if(xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0)) // Code == 0 en local
throw new Error("Impossible de charger le fichier de propriétés nommée \"" + nomFichierVariables + "\" (code HTTP : " + xhr.status + ").");
var varJsonProperties = xhr.responseText;
	
// Analyse des données
var varProperties = JSON.parse(varJsonProperties);
//fin de définition des variables

var bomberman = new Image();
bomberman.src = "resources/images/bomberman.png";

var COULEUR = {
	"BLANC"    : 0,
	"NOIR" : 1,
	"ROUGE" : 2,
	"BLEU"   : 3,
	"VERT"   : 4

}

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

document.body.appendChild(canvas);

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