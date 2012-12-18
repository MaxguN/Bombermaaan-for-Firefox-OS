function Bomb(url, x, y){
	this.x = x;
	this.y = y;
	this.etatAnimation = -1;

	this.image = new Image();
	this.image.referenceBomb = this;
	this.image.onload = function() {
		if(!this.complete) 
			throw "Erreur de chargement du sprite nommé \"" + url + "\".";
		
		// Taille de la bomb
		this.referenceBomb.largeur = this.width / 4;
		this.referenceBomb.hauteur = this.height / 4;
	}
	
	this.image.src = url;
	
}

Bomb.prototype.render = function () {
	console.log("on pose une bombe " + this.x, this.y);
	ctx.drawImage(this.image, this.x,this.y );
}
