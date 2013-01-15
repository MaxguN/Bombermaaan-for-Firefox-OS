


function FrameDeflagration (x,y, boostPuissance, cardinal_etape){
	this.x=x;
	this.y=y;
	this.boostPuissance = boostPuissance;
	this.cardinal_etape = cardinal_etape;
	
	if(this.textures === undefined){
		FrameDeflagration.prototype.textures=new Image();
		FrameDeflagration.prototype.textures.onload = function(){
			FrameDeflagration.prototype.largeur=(FrameDeflagration.prototype.textures.width/28);
			FrameDeflagration.prototype.hauteur=FrameDeflagration.prototype.textures.height;
		}
		FrameDeflagration.prototype.textures.src=varProperties.DeflagrationSrc;
	}
}

FrameDeflagration.prototype.dessinerFrameDeflagration = function (context) {
	for (var bombe in map.bombes) {
		if(map.bombes[bombe].x==this.x && map.bombes[bombe].y==this.y){
			map.addDeflagration(new Deflagration(map.bombes[bombe]));
			delete map.bombes[bombe];
		}
	}
	for (var indexPerso in map.personnages) {
		if(map.personnages[indexPerso].x==this.x && map.personnages[indexPerso].y==this.y){
			map.personnages[indexPerso].dessinerPersonnageMort(context);
			
		}
	}

	context.drawImage(
	this.textures, 
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