


function FrameDeflagration (url, x,y, boostPuissance, cardinal_etape){
	this.x = x;
	this.y=y;
	this.boostPuissance = boostPuissance;
	this.cardinal_etape = cardinal_etape;
	
	this.image = new Image();
	this.image.referenceDeflag = this;
	this.image.onload = function() {
		if(!this.complete) 
			throw "Erreur de chargement du sprite nommé \"" + url + "\".";
		
		// Taille de la deflag
		this.referenceDeflag.largeur = this.width / 28;
		this.referenceDeflag.hauteur = this.height ;
	}
	
	this.image.src = url;

	
}

FrameDeflagration.prototype.dessinerFrameDeflagration = function (context) {
	
	for (var bombe in map.bombes) {
		if(map.bombes[bombe].x==this.x && map.bombes[bombe].y==this.y){
			map.addDeflagration(new Deflagration(varProperties.DeflagrationSrc,map.bombes[bombe]));
			delete map.bombes[bombe];
		}
	}
			
	context.drawImage(
	this.image, 
	this.largeur*this.cardinal_etape - this.boostPuissance*this.largeur,
	0,
	this.largeur,
	this.hauteur,
	this.x * varProperties.pixelsUnitaireCarte, 
	this.y * varProperties.pixelsUnitaireCarte,
	eval(varProperties.pixelsUnitaireCarte)+2, 
	eval(varProperties.pixelsUnitaireCarte)+2
	);
	
}