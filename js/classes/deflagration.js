var CARDINAL_ETAPE = {
	"ICI"    : 27,
	"NORD_MILIEU" : 3,
	"EST_MILIEU" : 7,
	"SUD_MILIEU"   : 3,
	"OUEST_MILIEU"   : 7,
	"NORD_FIN" : 11,
	"EST_FIN" : 23,
	"SUD_FIN"   : 19,
	"OUEST_FIN"   : 15
	
}

function Deflagration(url, bombe){
	this.x = eval(bombe.x);
	this.y = eval(bombe.y);
	this.etatAnimation = 0;
	this.temps=0;
	this.radius=bombe.radius;
	this.url=url;
	this.framesDeflagration = new Array();
	new Audio("resources/SOUND/EXPLOSION_01_1.ogg").play();
	this.cpt=-1;
	
	
	
}

Deflagration.prototype.dessinerDeflagration = function (context) {
	var radiusAffiche=this.radius;
	this.etatAnimation++;
	
	this.cpt++;
	this.framesDeflagration.push(new Array());
	
	if (this.temps++ >20){
		delete map.deflagrations[map.deflagrations.indexOf(this)];
	}
	
	switch(this.radius) {
		case 1 : 
			boostPuissance=0;
			break;
		case 2 : 
			boostPuissance=0;
			break;
		case 3 : 
			boostPuissance=1;
			break;
		case 4 : 
			boostPuissance=1;
			break;
		case 5 : 
			boostPuissance=2;
			break;
		case 6 : 
			boostPuissance=2;
			break;
		default : 
			boostPuissance=3;
			break;
	}
	if (this.etatAnimation <= this.radius){
		radiusAffiche=this.etatAnimation;
	}
	
	this.framesDeflagration[this.cpt].push(new FrameDeflagration(this.url, this.x,this.y, boostPuissance, CARDINAL_ETAPE.ICI));
	
	
	//nord
	for(var j = 1, l = radiusAffiche ; j <= l ; j++) {
		if(map.terrain[this.y-j][this.x]!=2)
		{
			
			j=radiusAffiche+1;
		}
		else{
			if (j==l||map.terrain[this.y-j-1][this.x]!=2){
				this.framesDeflagration[this.cpt].push(new FrameDeflagration(this.url,  this.x,this.y-j, boostPuissance, CARDINAL_ETAPE.NORD_FIN));}
			else {
				this.framesDeflagration[this.cpt].push(new FrameDeflagration(this.url,  this.x,this.y-j, boostPuissance, CARDINAL_ETAPE.NORD_MILIEU));
			}
		}
	}
	//est
	for(var j = 1, l = radiusAffiche ; j <= l ; j++) {
		if(map.terrain[this.y][this.x+j]!=2)
		{
			
			j=radiusAffiche+1;
		}
		else{
			if (j==l||map.terrain[this.y][this.x+j+1]!=2){
				this.framesDeflagration[this.cpt].push(new FrameDeflagration(this.url,  this.x+j,this.y, boostPuissance, CARDINAL_ETAPE.EST_FIN));
			}
			else {
				this.framesDeflagration[this.cpt].push(new FrameDeflagration(this.url,  this.x+j,this.y, boostPuissance, CARDINAL_ETAPE.EST_MILIEU));
			}
		}
	}
	//sud
	for(var j = 1, l = radiusAffiche ; j <= l ; j++) {
		if(map.terrain[this.y+j][this.x]!=2)
		{
			j=radiusAffiche+1;
		}
		else{
			if (j==l||map.terrain[this.y+j+1][this.x]!=2){
				this.framesDeflagration[this.cpt].push(new FrameDeflagration(this.url, this.x,this.y+j, boostPuissance, CARDINAL_ETAPE.SUD_FIN));}
			else {
				this.framesDeflagration[this.cpt].push(new FrameDeflagration(this.url, this.x,this.y+j, boostPuissance, CARDINAL_ETAPE.SUD_MILIEU));
			}
		}
	}
	//ouest
	for(var j = 1, l = radiusAffiche ; j <= l ; j++) {
		if(map.terrain[this.y][this.x-j]!=2)
		{
			
			j=radiusAffiche+1;
		}
		else{
			if (j==l||map.terrain[this.y][this.x-j-1]!=2){
				this.framesDeflagration[this.cpt].push(new FrameDeflagration(this.url, this.x-j,this.y, boostPuissance, CARDINAL_ETAPE.OUEST_FIN));}
			else {
				this.framesDeflagration[this.cpt].push(new FrameDeflagration(this.url, this.x-j,this.y, boostPuissance, CARDINAL_ETAPE.OUEST_MILIEU));
			}
		}
	}
	
	if(this.cpt>1){
		for(var i = 0, l = this.framesDeflagration[this.cpt-2].length ; i < l ; i++) {
			if (this.framesDeflagration[this.cpt-2][i]!== undefined) {
			this.framesDeflagration[this.cpt-2][i].dessinerFrameDeflagration(context);
			}
		}
	}
	

}