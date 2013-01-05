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
	this.dureeAnimation = 16;
	this.temps=0;
	this.radius=bombe.radius;
	this.url=url;
	this.framesDeflagration = new Array();
	
}

Deflagration.prototype.dessinerDeflagration = function (context) {
	this.etatAnimation++;
	if (this.temps++ >30){
			delete map.deflagrations[map.deflagrations.indexOf(this)];
	}
	
	var boostPuissance=1;
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
	this.framesDeflagration.push(new FrameDeflagration(this.url, this.x,this.y, boostPuissance, CARDINAL_ETAPE.ICI));
	
	
	//nord
	for(var j = 1, l = this.radius ; j <= l ; j++) {
		if(map.terrain[this.y-j][this.x]!=2)
		{
			
			j=this.radius+1;
		}
		else{
			if (j==l||map.terrain[this.y-j-1][this.x]!=2){
				this.framesDeflagration.push(new FrameDeflagration(this.url,  this.x,this.y-j, boostPuissance, CARDINAL_ETAPE.NORD_FIN));}
			else {
				this.framesDeflagration.push(new FrameDeflagration(this.url,  this.x,this.y-j, boostPuissance, CARDINAL_ETAPE.NORD_MILIEU));
			}
		}
	}
	//est
	for(var j = 1, l = this.radius ; j <= l ; j++) {
		if(map.terrain[this.y][this.x+j]!=2)
		{
			
			j=this.radius+1;
		}
		else{
			if (j==l||map.terrain[this.y][this.x+j+1]!=2){
				this.framesDeflagration.push(new FrameDeflagration(this.url,  this.x+j,this.y, boostPuissance, CARDINAL_ETAPE.EST_FIN));
			}
			else {
				this.framesDeflagration.push(new FrameDeflagration(this.url,  this.x+j,this.y, boostPuissance, CARDINAL_ETAPE.EST_MILIEU));
			}
		}
	}
	//sud
	for(var j = 1, l = this.radius ; j <= l ; j++) {
		if(map.terrain[this.y+j][this.x]!=2)
		{
			j=this.radius+1;
		}
		else{
			if (j==l||map.terrain[this.y+j+1][this.x]!=2){
				this.framesDeflagration.push(new FrameDeflagration(this.url, this.x,this.y+j, boostPuissance, CARDINAL_ETAPE.SUD_FIN));}
			else {
				this.framesDeflagration.push(new FrameDeflagration(this.url, this.x,this.y+j, boostPuissance, CARDINAL_ETAPE.SUD_MILIEU));
			}
		}
	}
	//ouest
	for(var j = 1, l = this.radius ; j <= l ; j++) {
		if(map.terrain[this.y][this.x-j]!=2)
		{
			
			j=this.radius+1;
		}
		else{
			if (j==l||map.terrain[this.y][this.x-j-1]!=2){
				this.framesDeflagration.push(new FrameDeflagration(this.url, this.x-j,this.y, boostPuissance, CARDINAL_ETAPE.OUEST_FIN));}
			else {
				this.framesDeflagration.push(new FrameDeflagration(this.url, this.x-j,this.y, boostPuissance, CARDINAL_ETAPE.OUEST_MILIEU));
			}
		}
	}
	
	for(var i = 0, l = this.framesDeflagration.length ; i < l ; i++) {
		if (this.framesDeflagration[i]!== undefined) this.framesDeflagration[i].dessinerFrameDeflagration(context);
	}
	

}