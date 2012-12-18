
function Map(nom) {
	
	// Création de l'objet XmlHttpRequest
	var xhr = getXMLHttpRequest();

	// Chargement du fichier
	xhr.open("GET", './resources/data/' + nom + '.json', false);
	xhr.send(null);
	if(xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0)) // Code == 0 en local
		throw new Error("Impossible de charger la carte nommée \"" + nom + "\" (code HTTP : " + xhr.status + ").");
	var mapJsonData = xhr.responseText;
	
	// Analyse des données
	var mapData = JSON.parse(mapJsonData);
	
	this.tileset = new Tileset(mapData.tileset);
	this.terrain = mapData.terrain;
	
	// Liste des personnages présents sur le terrain.
	this.personnages = new Array();
	
	// Liste des bombes presentes sur le terrain.
	this.bombes = new Array();
	
	
}

// Pour récupérer la taille (en tiles) de la carte
Map.prototype.getHauteur = function() {
	return this.terrain.length;
}
Map.prototype.getLargeur = function() {
	return this.terrain[0].length;
}
Map.prototype.dessinerMap = function(context) {
	for(var i = 0, l = this.terrain.length ; i < l ; i++) {
		var ligne = this.terrain[i];
		var y = i * varProperties.pixelsUnitaireCarte;
		for(var j = 0, k = ligne.length ; j < k ; j++) {
			this.tileset.dessinerTile(ligne[j], context, j * varProperties.pixelsUnitaireCarte, y);
		}
	}
		// Dessin des bombes
	for(var i = 0, l = this.bombes.length ; i < l ; i++) {
		if (this.bombes[i]!== undefined) this.bombes[i].dessinerBombe(context);
	}
	// Dessin des personnages
	for(var i = 0, l = this.personnages.length ; i < l ; i++) {
		this.personnages[i].dessinerPersonnage(context);
	}

	
}
// Pour ajouter un personnage
Map.prototype.addPersonnage = function(perso) {
	this.personnages.push(perso);
}

Map.prototype.addBomb = function(bombe) {
	this.bombes.push(bombe);
}
