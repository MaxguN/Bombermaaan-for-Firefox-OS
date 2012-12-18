

function Bomb(url, joueur){
	this.x = joueur.x;
	this.y = joueur.y;
	this.etatAnimation = 0;
	this.dureeAnimation = 16;
	this.temps=0;

	this.image = new Image();
	this.image.referenceBomb = this;
	this.image.onload = function() {
		if(!this.complete) 
			throw "Erreur de chargement du sprite nommé \"" + url + "\".";
		
		// Taille de la bomb
		this.referenceBomb.largeur = this.width / 3;
		this.referenceBomb.hauteur = this.height ;
	}
	
	this.image.src = url;
	
}

Bomb.prototype.dessinerBombe = function (context) {
	//console.log("on pose une bombe " + this.x, this.y);
	var frame = 0;
	var test = 1;
	frame = Math.floor(this.etatAnimation / this.dureeAnimation);
		if(frame > 2) {
			frame %= 3;
		}
	
	this.etatAnimation++;
	if (this.temps++ >30){
		if(this.dureeAnimation<4){
			
			delete map.bombes[map.bombes.indexOf(this)]
			}
		this.dureeAnimation=this.dureeAnimation/2;
		this.temps=0;
	}
	
	
	
	context.drawImage(
	this.image, 
	frame*this.largeur,
	0,
	this.largeur,
	this.hauteur,
	this.x * varProperties.pixelsUnitaireCarte+4, 
	this.y * varProperties.pixelsUnitaireCarte+6,
	varProperties.pixelsUnitaireCarte/1.5, 
	varProperties.pixelsUnitaireCarte/1.5
	);
}
