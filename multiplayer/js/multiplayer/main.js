      $(document).ready(function() {  
      	$("#players").hide();
      	var options = new OptionStorage();
      	var listener = new Listener();
      	var bwss = new BWSS("ws://82.234.92.81:27016",options.loadNickName(),listener);
      		$("#btnCreateGame").click(function () {
      			bwss.requestCreateGame(bwss,options.loadNickName());
    		});

    		$("#tabPlayers").click(function (){
    				$("#games").hide();
    				$("#players").show();
    				$("#tabPlayers").addClass("active");
    				$("#tabGames").removeClass("active");
    				
    		});
    		$("#tabGames").click(function (){
    				$("#games").show();
    				$("#players").hide();
    				$("#tabGames").addClass("active");
    				$("#tabPlayers").removeClass("active");
    				
    		});

    		$("#textSend").keypress(function(event) {
  				if ( event.which == 13 ) {
     				event.preventDefault();
     				if($("#textSend").val()!==""){
     					bwss.requestMessage(bwss,$("#textSend").val(),MESSAGE,null,options.loadNickName());
     					$("#textSend").val("");
     				}
     				
   				}
			});
    	listener.refreshOutGameData(bwss);
    	
      });

      function Listener(){
			this.init=function(bwss){
			bwss.requestSendSelfData(bwss);
			bwss.requestRefreshOutGameData(bwss);


			}
			this.refreshOutGameData=function(obj){
				var messages = "";
				obj.messages.forEach(function(message){
					messages += "<li>" + message.authorName + " > " + message.message +"</li>";	
				});
				$("#chat").html(messages);

				var players = "";
				players += "<tr style='font-weight: bold;' >" +
						 "<th>Id</th>" +
						 "<th>Player</th>"+
						 "</tr>";

				obj.players.forEach(function(player){
					players += "<tr><td>" + player.id + "</td><td>" + player.name + "</td></tr>";					
				});

				$("#tableauPlayers").html(players);
	}	
	}		
