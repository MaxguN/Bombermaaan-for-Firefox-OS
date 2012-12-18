function OptionStorage (){
	if (localStorage) {
	  //on set les variables par d�faut
		
		if( localStorage['sound'] === undefined){
			localStorage['sound'] = "Yes";
		}
		if( localStorage['nickname'] === undefined){
			localStorage['nickname'] = "Player"
		}

		if( localStorage['color'] === undefined){
			localStorage['color'] = 0;
		}
		

	} else {
	  alert('votre syst�me ne supporte pas locale storage.');
	  currentObject = menu;
	  optionsData = undefined;
	}
}

OptionStorage.prototype.saveSound = function (value){
	localStorage['sound'] = value;

}

OptionStorage.prototype.loadSound = function (){
	return localStorage['sound'];

}

OptionStorage.prototype.saveNickName = function (value){
	localStorage['nickname'] = value;

}

OptionStorage.prototype.loadNickName = function (){
	return localStorage['nickname'];

}

OptionStorage.prototype.saveColor = function (value){
	localStorage['color'] = value;

}

OptionStorage.prototype.loadColor = function (){
	return localStorage['color'];

}

