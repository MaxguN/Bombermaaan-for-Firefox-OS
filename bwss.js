/* Constantes de nommage des requettes */
		/** implementées **/
		/* out-room requests */
const 	REFRESH_OUT_GAME_DATA  = "REFRESH_OUT_GAME_DATA",
        MESSAGE                = "MESSAGE",
        SEND_SELF_DATA         = "SEND_SELF_DATA",
        CREATE_GAME            = "CREATE_GAME",
        NOTIFY_PLAYER_JOINED   = "NOTIFY_PLAYER_JOINED",
        NOTIFY_MESSAGE_SENT    = "NOTIFY_MESSAGE_SENT",
        NOTIFY_GAME_CREATED    = "NOTIFY_GAME_CREATED",
        NOTIFY_GAME_REMOVED    = "NOTIFY_GAME_REMOVED",
        NOTIFY_PLAYER_EXITED   = "NOTIFY_PLAYER_EXITED",
        NOTIFY_ERROR           = "NOTIFY_ERROR",
        NOTIFY_ENTERING_ROOM   = "NOTIFY_ENTERING_ROOM",
        NOTIFY_EXITING_ROOM    = "NOTIFY_EXITING_ROOM",
		/* in-room requests */
        GAME_MAP_LIST          = "GAME_MAP_LIST",
        GAME_MAP_DATA          = "GAME_MAP_DATA",
        LAUNCH_GAME            = "LAUNCH_GAME",
        NOTIFY_COLOR_CHANGED   = "NOTIFY_COLOR_CHANGED",
        SELECT_SERVER_MAP      = "SELECT_SERVER_MAP",
        CHOOSE_COLOR           = "CHOOSE_COLOR",
        NOTIFY_GAME_STARTED    = "NOTIFY_GAME_STARTED",
        NOTIFY_GAME_FINISHED   = "NOTIFY_GAME_FINISHED";
		
		/* in-game requests */
		
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
			**	Les evenements de cette section sont identifiés puis un appel est fait à la méthode correspondante du listener
			**	Le traitement à effectuer par le client est donc définis dans le listener, une méthode existe pour chaque type
			** 	de message pouvant être envoyé par le serveur
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
					//{"type":"NOTIFY_EXITING_ROOM","value":{"playerID":"playerID"}}
					case NOTIFY_EXITING_ROOM:
						listener.gameRemoved(received.value);
						break;
					//{"type":"GAME_MAP_LIST","value":{"maps":["smap1","smap2",...]}};
					case GAME_MAP_LIST:
						listener.mapListUpdated(received.value);
						break;
					//{"type":"GAME_MAP_DATA","value":{"id":"gameID","map":"smap"}}
					case GAME_MAP_DATA:
						listener.mapDataUpdated(received.value);
						break;
					//{"type":"NOTIFY_COLOR_CHANGED","value":{"gameID":"gameID","colors":[0,1,3,...]}}"
					case NOTIFY_COLOR_CHANGED:
						listener.colorChanged(received.value);
						break;
					//{"type":"NOTIFY_GAME_STARTED","value":{"gameID":"+gameID+"}}
					case NOTIFY_GAME_STARTED:
						listener.gameStarted(received.value);
						break;
					//{"type":"NOTIFY_GAME_FINISHED","value":{"gameID":"gameID"}}";
					case NOTIFY_GAME_FINISHED:
						listener.gameFinished(received.value);
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
	**	Les attributs des objets utilisés pour former les requettes doivent être déclarés dans un ordre précis afin d'améliorer
	**	les performances coté serveur.
	**	Il est donc recommandé de ne pas modifier cette section.
	**/
	
	/* rafraichissement des données hors jeu (chat box, joueurs en lignes, sales de jeu disponibles) */
	this.requestRefreshOutGameData=function(bwss){
		var request	              = new Object();
		request.type              = REFRESH_OUT_GAME_DATA;
		
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
	
	/* envoi des données personnelles au serveur (pseudo, ...) */
	this.requestSendSelfData=function(bwss){
		var request             = new Object();
		request.type            = SEND_SELF_DATA;
		request.value           = new Object();
		request.value.name      = playerName;
		
		bwss.connection.send(JSON.stringify(request));
	}
	
	/* creation d'une partie */
	this.requestCreateGame=function(bwss){
		var request             = new Object();
		request.type            = CREATE_GAME;
		
		bwss.connection.send(JSON.stringify(request));
	}
	
	/* demande d'entrée dans une partie */
	this.requestJoinGame=function(bwss,id){
		var request             = new Object();
		request.type            = JOIN_GAME;
		request.value           = new Object();
		request.value.id        = id;
		
		bwss.connection.send(JSON.stringify(request));
	}
	
	/* demande de lancement d'une partie (utilisable uniquement par l'hote) */
	this.requestLaunchGame=function(bwss,gameID){
		var request             = new Object();
		request.type            = LAUNCH_GAME;
		request.value           = new Object();
		request.value.gameID    = gameID;
		
		bwss.connection.send(JSON.stringify(request));
	}
	
	/* demande de selection de map (utilisable uniquement par l'hote) */
	this.requestSelectMap=function(bwss,mapID,gameID){
		var request             = new Object();
		request.type            = SELECT_SERVER_MAP;
		request.value           = new Object();
		request.value.mapID     = mapID;
		request.value.gameID    = gameID;
		
		bwss.connection.send(JSON.stringify(request));
	}
	
	/* demande de selection d'un couleur (utilisable uniquement par un joueur de la partie 'gameID') */
	this.requestChooseColor=function(bwss,gameID,color){
		var request             = new Object();
		request.type            = CHOOSE_COLOR;
		request.value           = new Object();
		request.value.mapID     = gameID;
		request.value.gameID    = color;
		
		bwss.connection.send(JSON.stringify(request));
	}
	/* ... */
	
	this.initWS(this);
}
