/**
* Cette classe est chargÈe de la gestion du pad multidirectionnel.
*
**/
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

/**
* On affiche le pad
*
**/
MultiPad.prototype.render = function() {
	ctx.globalAlpha = 0.5;
	ctx.drawImage(this.pad,20,screenHeight - 100);
	ctx.drawImage(this.button,screenWidth - 100,screenHeight - 100);
	ctx.globalAlpha = 1;
}