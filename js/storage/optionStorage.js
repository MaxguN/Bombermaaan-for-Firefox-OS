function OptionStorage (){
	if (localStorage) {
	  //on set les variables par dÈfaut
		
		if( localStorage['pad'] === undefined){
			localStorage['pad'] = "Yes";
		}
		if( localStorage['nickname'] == undefined){
			localStorage['nickname'] = "Player"
		}
		

	} else {
	  alert('votre système ne supporte pas locale storage.');
	  currentObject = menu;
	  optionsData = undefined;
	}
}

OptionStorage.prototype.savePad = function (value){
	localStorage['pad'] = value;

}

OptionStorage.prototype.loadPad = function (){
	return localStorage['pad'];

}

OptionStorage.prototype.saveNickName = function (value){
	localStorage['nickname'] = value;

}

OptionStorage.prototype.loadNickName = function (){
	return localStorage['nickname'];

}

