function Bomb(url, x, y){
	this.x = x;
	this.y = y;
	this.etatAnimation = -1;

	this.image = new Image();
	this.image.referenceDuPerso = this;
	this.image.onload = function() {
		if(!this.complete) 
			throw "Erreur de chargement du sprite nommé \"" + url + "\".";
		
		// Taille de la bomb
		this.referenceDuPerso.largeur = this.width / 4;
		this.referenceDuPerso.hauteur = this.height / 4;
	}
	
	this.image.src = "resources/images/" + url;
}

