/* Constantes de nommage des requettes */
const 	REFRESH_OUT_GAME_DATA = "REFRESH_OUT_GAME_DATA",
        MESSAGE               = "MESSAGE",
        SEND_SELF_DATA        = "SEND_SELF_DATA";
		/* ... */
		
/* Constantes de typage des messages */
const	TO_ALL       = "TO_ALL",
        TO_PLAYER    = "TO_PLAYER",
        TO_ROOM      = "TO_ROOM";
		/* ... */

function BWSS(address,playerName,listener){
	this.connection = new WebSocket(address);
	
	/* fonction d'initialisation de la connection websocket */
	this.initws=function(bwss){
		bwss.connection.onopen = function(){
			bwss.requestSendSelfData(bwss);
			bwss.requestRefreshOutGameData(bwss);
		}

		bwss.connection.onerror = function(error){
		   console.log('Error detected: ' + error);
		}

		bwss.connection.onmessage = function(event){
			/**	
			**	Les evenements de cette section sont identifi�s puis un appel est fait � la m�thode correspondante du listener
			**	Le traitement � effectuer par le client est donc d�finit dans le listener, une m�thode existe pour chaque type
			** 	de message pouvant �tre envoy� par le serveur
			**/

			try{
				var received = JSON.parse(event.data);
				switch(received.type){
					case REFRESH_OUT_GAME_DATA:
						listener.refreshOutGameData(received.value);
						break;
					/* ... */
					default:
						console.log("unknown received message from server : "+event.data);
				}
			}catch(e){
				console.log(e+"\n unknown received message from server : "+event.data);
			}
		}
	}
	
	/**
	**	Definition des requetes.
	**	Les attributs des objets utilis�s pour former les requettes doivent �tre d�clar�s dans un ordre pr�cis afin d'am�liorer
	**	les performances cot� serveur.
	**	Il est donc recommand� de ne pas modifier cette section.
	**/
	
	/* rafraichissement des donn�es hors jeu (chat box, joueurs en lignes, sales de jeu disponibles) */
	this.requestRefreshOutGameData=function(bwss){
		var request	    = new Object();
		request.type    = REFRESH_OUT_GAME_DATA;
		
		bwss.connection.send(JSON.stringify(request));
	}
	
	/* envoi d'un message */
	this.requestMessage=function(bwss,message,messageType,target){
		var request               = new Object();
		request.type              = MESSAGE;
		request.value             = new Object();
		request.value.message     = message
		request.value.messageType = messageType;
		request.value.target      = target;
		
		bwss.connection.send(JSON.stringify(request));
	}
	
	/* envoi des donn�es personnelles au serveur (pseudo, ...) */
	this.requestSendSelfData=function(bwss){
		var request         = new Object();
		request.type        = SEND_SELF_DATA;
		request.value       = new Object();
		request.value.name  = playerName;
		
		bwss.connection.send(JSON.stringify(request));
	}
	/* ... */
	
	/* intialisation de connection websocket */
	this.initws(this);
}