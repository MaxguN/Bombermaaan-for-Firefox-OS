/* Constantes de nommage des requettes */
const 	REFRESH_OUT_GAME_DATA = "REFRESH_OUT_GAME_DATA",
        MESSAGE               = "MESSAGE",
        SEND_SELF_DATA        = "SEND_SELF_DATA",
        CREATE_GAME           = "CREATE_GAME",
        NOTIFY_PLAYER_JOINED  = "NOTIFY_PLAYER_JOINED",
        NOTIFY_MESSAGE_SENT   = "NOTIFY_MESSAGE_SENT",
        NOTIFY_GAME_CREATED   = "NOTIFY_GAME_CREATED",
        NOTIFY_GAME_REMOVED   = "NOTIFY_GAME_REMOVED",
        NOTIFY_PLAYER_EXITED  = "NOTIFY_PLAYER_EXITED",
        NOTIFY_ERROR          = "NOTIFY_ERROR",
        NOTIFY_ENTERING_ROOM  = "NOTIFY_ENTERING_ROOM";
		/* ... */
		
/* Constantes de typage des messages */
const	TO_ALL       = "TO_ALL",
        TO_PLAYER    = "TO_PLAYER",
        TO_ROOM      = "TO_ROOM";
		/* ... */
function BWSS(address,playerName,listener){
	this.connection = new WebSocket(address);
	this.listener=listener;
	this.playerName=playerName;
	
	
	this.initWS=function(bwss){
		this.connection.onopen = function(){
			listener.init(bwss);
		}

		this.connection.onerror = function(error){
		   console.log('Error detected: ' + error);
		}

		this.connection.onmessage = function(event){
			/**	
			**	Les evenements de cette section sont identifi�s puis un appel est fait � la m�thode correspondante du listener
			**	Le traitement � effectuer par le client est donc d�finis dans le listener, une m�thode existe pour chaque type
			** 	de message pouvant �tre envoy� par le serveur
			**/

			try{
				var received = JSON.parse(event.data);
				
				switch(received.type){
					//{"type":"REFRESH_OUT_GAME_DATA","value":{"games":["gameID",...],"players":[{"name":"name","id":"id"},...],"messages":[{"message":"message","authorName":"authorName","authorID":"authorID","submitTime":"submitTime"},..]}} 
					case REFRESH_OUT_GAME_DATA:
						listener.refreshOutGameData(received.value);
						break;
					//{"type":"NOTIFY_PLAYER_JOINED","value":{"name":"name","id":"id"}}
					case NOTIFY_PLAYER_JOINED:
						listener.playerJoined(received.value);
						break;
					//{"type":"NOTIFY_MESSAGE_SENT","value":{"message":"message","author":"author","id":"id","submitTime":"submitTime"}}
					case NOTIFY_MESSAGE_SENT:
						listener.messageSent(received.value);
						break;
					//{"type":"NOTIFY_GAME_CREATED","value":{"id":"id","author":"authorName"}}
					case NOTIFY_GAME_CREATED:
						listener.gameCreated(received.value);
						break;
					//{"type":"NOTIFY_PLAYER_EXITED","value":{"id":"id"}}
					case NOTIFY_PLAYER_EXITED:
						listener.playerExited(received.value);
						break;
					//{"type":"NOTIFY_ERROR","value":{"error":"error"}}
					case NOTIFY_ERROR:
						listener.error(received.value);
						break;
					//{"type":"NOTIFY_ENTERING_ROOM","value":{"name":"name","id":"id","gameID":"gameID"}}
					case NOTIFY_ENTERING_ROOM:
						listener.enteringRoom(received.value);
						break;
					//{"type":"NOTIFY_GAME_REMOVED","value":{"id":"gameID"}}
					case NOTIFY_GAME_REMOVED:
						listener.gameRemoved(received.value);
						break;
					/* ... */
					default:
						console.log("unknown received message from server : "+received.type);
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
	this.requestMessage=function(bwss,message,messageType,target,author){
		var request               = new Object();
		request.type              = MESSAGE;
		request.value             = new Object();
		request.value.message     = message
		request.value.author      = author;
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
	
	/* creation d'une partie */
	this.requestCreateGame=function(bwss){
		var request         = new Object();
		request.type        = CREATE_GAME;
		
		bwss.connection.send(JSON.stringify(request));
	}
	
	/* demande d'entr�e dans une partie */
	this.requestJoinGame=function(bwss,id){
		var request         = new Object();
		request.type        = JOIN_GAME;
		request.value       = new Object();
		request.value.id    = id;
		
		bwss.connection.send(JSON.stringify(request));
	}
	
	/* ... */
	
	this.initWS(this);
}