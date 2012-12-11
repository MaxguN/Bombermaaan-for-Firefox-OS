var pushed;
function MultiPad(urlPad, urlButton,joueur){
	
	this.pad = new Image();
	this.pad.onload = function() {
		if(!this.complete) 
			throw "Erreur de chargement du sprite nommée \"" + urlPad + "\".";
	}
	
	this.button = new Image();
	this.button.onload = function() {
		if(!this.complete) 
			throw "Erreur de chargement du sprite nommée \"" + urlButton + "\".";
	}
	
	this.pad.src = urlPad;
	this.button.src = urlButton;

}


MultiPad.prototype.render = function() {
	ctx.globalAlpha = 0.5;
	ctx.drawImage(this.pad,20,screenHeight - 90);
	
	//not pusshed
	ctx.drawImage(this.button, 65, 0,  64, 64,screenWidth - 85,screenHeight - 75, 64,64 );
	
	ctx.globalAlpha = 1;
}