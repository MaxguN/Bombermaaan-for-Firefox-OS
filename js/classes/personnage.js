var DIRECTION = {
	"BAS"    : 1,
	"GAUCHE" : 7,
	"DROITE" : 4,
	"HAUT"   : 10
}


var DUREE_ANIMATION = 4;
var DUREE_DEPLACEMENT = 16 ;


function Personnage(url, x, y, direction, couleur) {
	this.x = x; // (en cases)
	this.y = y; // (en cases)
	this.direction = direction;
	this.etatAnimation = -1;
	this.couleur = couleur;
	
	// Chargement de l'image dans l'attribut image
	this.image = new Image();
	this.image.referenceDuPerso = this;
	this.image.onload = function() {
		if(!this.complete) 
			throw "Erreur de chargement du sprite nommé \"" + url + "\".";
		
		// Taille du personnage
		this.referenceDuPerso.largeur = this.width / varProperties.nombreColonnesPerso; //12
		this.referenceDuPerso.hauteur = this.height / varProperties.nombreLignesPerso;
	}
	this.image.src = url;
}

Personnage.prototype.dessinerPersonnage = function(context) {
	var frame = eval(varProperties.imageInitPerso); // Numéro de l'image à prendre pour l'animation
	var decalageX = 0, decalageY = 0; // Décalage à appliquer à la position du personnage
	if(this.etatAnimation >= DUREE_DEPLACEMENT) {
		// Si le déplacement a atteint ou dépassé le temps nécessaire pour s'effectuer, on le termine
		this.etatAnimation = -1;
	} else if(this.etatAnimation >= 0) {
		// On calcule l'image (frame) de l'animation à afficher
		frame = Math.floor(this.etatAnimation / DUREE_ANIMATION);
		if(frame > 3) {
			frame %= 4;
		}
	
		// Nombre de pixels restant à parcourir entre les deux cases
		var pixelsAParcourir = varProperties.pixelsUnitaireCarte - (varProperties.pixelsUnitaireCarte * (this.etatAnimation / DUREE_DEPLACEMENT));
	
		// À partir de ce nombre, on définit le décalage en x et y.
		// NOTE : Si vous connaissez une manière plus élégante que ces quatre conditions, je suis preneur
		if(this.direction == DIRECTION.HAUT) {
			decalageY = pixelsAParcourir;
		} else if(this.direction == DIRECTION.BAS) {
			decalageY = -pixelsAParcourir;
		} else if(this.direction == DIRECTION.GAUCHE) {
			decalageX = pixelsAParcourir;
		} else if(this.direction == DIRECTION.DROITE) {
			decalageX = -pixelsAParcourir;
		}
		
		this.etatAnimation++;
	}
/*
 * Si aucune des deux conditions n'est vraie, c'est qu'on est immobile, 
 * donc il nous suffit de garder les valeurs 0 pour les variables 
 * frame, decalageX et decalageY
 */

	var imageMouvement = function imageMouvement(){
	switch(frame) {
			case 0 : return 1;
			break;
			case 1 : return 0;
			break;
			case 2 : return -1;
			break;
			case 3 : return 0;
			break;
	
		}
	}
	
	context.drawImage(
	this.image, 
	this.largeur*(imageMouvement()+this.direction), 
	this.hauteur*this.couleur, // Point d'origine du rectangle source à prendre dans notre image
	this.largeur,
	this.hauteur, // Taille du rectangle source (c'est la taille du personnage)
	// Point de destination (dépend de la taille du personnage)
(this.x * varProperties.pixelsUnitaireCarte) + decalageX, (this.y * varProperties.pixelsUnitaireCarte) - 8 + decalageY,
	// Point de destination (dépend de la taille du personnage)
	varProperties.pixelsUnitaireCarte, varProperties.pixelsUnitaireCarte // Taille du rectangle destination (c'est la taille du personnage)
);
}

Personnage.prototype.getCoordonneesAdjacentes = function(direction)  {
	var coord = {'x' : this.x, 'y' : this.y};
	switch(direction) {
		case DIRECTION.BAS : 
			coord.y++;
			break;
		case DIRECTION.GAUCHE : 
			coord.x--;
			break;
		case DIRECTION.DROITE : 
			coord.x++;
			break;
		case DIRECTION.HAUT : 
			coord.y--;
			break;
	}
	return coord;
}
	
Personnage.prototype.deplacer = function(direction, map) {
	// On ne peut pas se déplacer si un mouvement est déjà en cours !
	if(this.etatAnimation >= 0) {
		return false;
	}
	// On change la direction du personnage
	this.direction = direction;
		
	// On vérifie que la case demandée est bien située dans la carte
	var prochaineCase = this.getCoordonneesAdjacentes(direction);
	if(prochaineCase.x < 0 || prochaineCase.y < 0 || prochaineCase.x >= map.getLargeur() || prochaineCase.y >= map.getHauteur()) {
		// On retourne un booléen indiquant que le déplacement ne s'est pas fait, 
		// Ça ne coute pas cher et ca peut toujours servir
		return false;
	}
	
	// TODO : ici verifier si on ne passe pas dans un mur
	if(map.terrain[prochaineCase.y][prochaineCase.x]!=2){
		return false;
	}
	
	// On commence l'animation
	this.etatAnimation = 1;
	// On effectue le déplacement
	this.x = prochaineCase.x;
	this.y = prochaineCase.y;
		
	return true;
}
