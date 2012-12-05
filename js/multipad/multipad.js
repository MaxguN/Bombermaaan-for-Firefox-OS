/**
* Cette classe est chargée de la gestion du pad multidirectionnel.
*
**/
function MultiPad(url){
	this.image = new Image();
	this.image.onload = function() {
		if(!this.complete) 
			throw "Erreur de chargement du sprite nommé \"" + url + "\".";
	}
	
	this.image.src = url;

}

/**
* On affiche le pad
*
**/
MultiPad.prototype.render = function() {
	ctx.drawImage(this.image,20,20);
}