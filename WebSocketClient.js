function Listener(){
	this.init=function(bwss){
		bwss.requestSendSelfData(bwss);
		bwss.requestRefreshOutGameData(bwss);
		
		bwss.requestMessage(bwss,"!!!aa!!!",TO_ALL,null,"Nekro");
		bwss.requestMessage(bwss,"!!!gfzgze!!!",TO_ALL,null,"Nekro");
		bwss.requestMessage(bwss,"!!!zfzfzgtgg!!!",TO_ALL,null,"Nekro");
		bwss.requestMessage(bwss,"!!!aazfdzsdd&!!!",TO_ALL,null,"Nekro");
	}
}

var listener = new Listener();

var bwss = new BWSS("ws://localhost:9002","Nekro",listener);
