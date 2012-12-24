var CARDINAL_ETAPE = {
	"ICI"    : 28,
	"NORD_MILIEU" : 4,
	"EST_MILIEU" : 8,
	"SUD_MILIEU"   : 4,
	"OUEST_MILIEU"   : 8,
	"NORD_FIN" : 12,
	"EST_FIN" : 24,
	"SUD_FIN"   : 20,
	"OUEST_FIN"   : 16
	
}

function Deflagration(url, bombe){
	this.x = bombe.x;
	this.y = bombe.y;
	this.etatAnimation = 0;
	this.dureeAnimation = 16;
	this.temps=0;
	this.radius=bombe.radius;
	this.url=url;

	
	
	this.framesDeflagration = new Array();
	
}

Deflagration.prototype.dessinerDeflagration = function (context) {
	var boostPuissance=4;
	switch(this.radius) {
		case 1 : 
			boostPuissance=0;
			
			break;
		case 2 : 
			boostPuissance=1;
			break;
		case 3 : 
			boostPuissance=2;
			break;
		case 4 : 
			boostPuissance=3;
			break;
	}
	this.framesDeflagration.push(new FrameDeflagration(this.url, this.x,this.y, boostPuissance, CARDINAL_ETAPE.ICI));
	//nord
	this.framesDeflagration.push(new FrameDeflagration(this.url,  this.x,this.y-1, boostPuissance, CARDINAL_ETAPE.NORD_FIN));
	//est
	this.framesDeflagration.push(new FrameDeflagration(this.url,  this.x+1,this.y, boostPuissance, CARDINAL_ETAPE.EST_FIN));
	//sud
	this.framesDeflagration.push(new FrameDeflagration(this.url, this.x,this.y+1, boostPuissance, CARDINAL_ETAPE.SUD_FIN));
	//ouest
	this.framesDeflagration.push(new FrameDeflagration(this.url, this.x-1,this.y, boostPuissance, CARDINAL_ETAPE.OUEST_FIN));
	
	for(var i = 0, l = this.framesDeflagration.length ; i < l ; i++) {
		if (this.framesDeflagration[i]!== undefined) this.framesDeflagration[i].dessinerFrameDeflagration(context);
	}
	

}