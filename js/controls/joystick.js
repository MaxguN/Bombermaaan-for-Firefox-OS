/*function setupProportionalCanvas() {
      var $container = $("#container"), $canvas = $("#game"),
          h = window.innerHeight, w = window.innerWidth;

      $container.css('height',h*2);
      window.scrollTo(0,1);

      h = window.innerHeight + 2
      $canvas.attr({width: w, height: h});
      $container.css({ height: h, width: w, padding: 0, margin: 0});

  }*/

  var $canvas = $("#game");
  var joypadSize = 50,
          joypadCenterSize = 25,
          joypadTouch = null,
          joypad = {};

  function JoyStick() {
      console.log("Appelle de Joystick");
  }

  JoyStick.prototype.bind = function () {
    binder.bind($canvas, "touchstart", function (e) {
    //e.stopPropagation();
      if(joypadTouch===null) {
          var evt = e.originalEvent,
          touch = evt.changedTouches[0],
          loc = targetLocation(this,touch);

          joypadTouch = touch.identifier;
          joypad = { centerX: loc.x, centerY: loc.y };
        }
    }, false);

    binder.bind($canvas, "touchmove", function (e) {
    //e.stopPropagation();
      if(joypadTouch !== null) {
          var evt = e.originalEvent,
              touch = evt.changedTouches[0],
              loc = targetLocation(this,touch);


          // Make sure we're on the right touch
          if(touch.identifier == joypadTouch) {
            joypad.x = loc.x;
            joypad.y = loc.y;

            var distX = joypad.x - joypad.centerX,
                distY = joypad.y - joypad.centerY;
            joypad.dist = Math.sqrt(distX * distX + distY * distY),
            joypad.ang = Math.atan2(distY,distX);

            if(joypad.dist > joypadSize) {
              joypad.x = joypad.centerX + (distX / joypad.dist * joypadSize);
              joypad.y = joypad.centerY + (distY / joypad.dist * joypadSize);
              joypad.dist = joypadSize;
            }
            joypad.dist *= 100 / joypadSize;
          }


        }
        e.preventDefault();
    }, false);

    binder.bind($canvas, "touchend", function (e) {
    //e.stopPropagation();
      if(joypadTouch !== null) {
          var evt = e.originalEvent,
              touch = evt.changedTouches[0],
              loc = targetLocation(this,touch);


          // Make sure we're on the right touch
          if(touch.identifier == joypadTouch) {
            joypad.x = loc.x;
            joypad.y = loc.y;

            var distX = joypad.x - joypad.centerX,
                distY = joypad.y - joypad.centerY;
            joypad.dist = Math.sqrt(distX * distX + distY * distY),
            joypad.ang = Math.atan2(distY,distX);

            if(joypad.dist > joypadSize) {
              joypad.x = joypad.centerX + (distX / joypad.dist * joypadSize);
              joypad.y = joypad.centerY + (distY / joypad.dist * joypadSize);
              joypad.dist = joypadSize;
            }
            joypad.dist *= 100 / joypadSize;
          }


        }
        e.preventDefault();
    }, false);

  }

  JoyStick.prototype.targetLocation = function (element, touch){
    var $elem = $(element),
        touchX = $elem.attr('width') * 
                (touch.pageX - $elem.position().left) / $elem.width(),
        touchY = $elem.attr('height') * 
                (touch.pageY - $elem.position().top) / $elem.height();
        return { x: touchX, y: touchY };

  }

  JoyStick.prototype.joypadCircle = function (x,y,color,size) {
    ctx.beginPath();
          ctx.globalAlpha=0.5;
          ctx.fillStyle = color;
          ctx.arc(x, y, size, 0, Math.PI*2, true); 
          ctx.closePath();
          ctx.fill();

  }

  JoyStick.prototype.render = function () {
      ctx.clearRect(0,0,$canvas.width(),$canvas.height());
        if(joypadTouch !== null) {
          ctx.fillStyle = "#000";
          ctx.font = "20px arial";
          ctx.fillText("Angle:" + Math.round(joypad.ang*180/Math.PI) + 
                       " Dist:" + Math.round(joypad.dist),0,30);

          joypadCircle(joypad.centerX,joypad.centerY,"#000",joypadSize);
          joypadCircle(joypad.x,joypad.y,"#ccc",joypadCenterSize);

        }
  }


  
  


  /*$(function() {
      //setupProportionalCanvas();


      function targetLocation(element,touch) {
        var $elem = $(element),
        touchX = $elem.attr('width') * 
                (touch.pageX - $elem.position().left) / $elem.width(),
        touchY = $elem.attr('height') * 
                (touch.pageY - $elem.position().top) / $elem.height();
        return { x: touchX, y: touchY };
      }

      var joypadSize = 50,
          joypadCenterSize = 25,
          joypadTouch = null,
          joypad = {};

      $("#game").on('touchstart',function(e) {

        if(joypadTouch===null) {
          var evt = e.originalEvent,
          touch = evt.changedTouches[0],
          loc = targetLocation(this,touch);

          joypadTouch = touch.identifier;
          joypad = { centerX: loc.x, centerY: loc.y };
        }
      });

      $("#game").on('touchmove',function(e) {
        if(joypadTouch !== null) {
          var evt = e.originalEvent,
              touch = evt.changedTouches[0],
              loc = targetLocation(this,touch);


          // Make sure we're on the right touch
          if(touch.identifier == joypadTouch) {
            joypad.x = loc.x;
            joypad.y = loc.y;

            var distX = joypad.x - joypad.centerX,
                distY = joypad.y - joypad.centerY;
            joypad.dist = Math.sqrt(distX * distX + distY * distY),
            joypad.ang = Math.atan2(distY,distX);

            if(joypad.dist > joypadSize) {
              joypad.x = joypad.centerX + (distX / joypad.dist * joypadSize);
              joypad.y = joypad.centerY + (distY / joypad.dist * joypadSize);
              joypad.dist = joypadSize;
            }
            joypad.dist *= 100 / joypadSize;
          }


        }
        e.preventDefault();

      });


      $("#game").on('touchend',function(e) {
          var evt = e.originalEvent,
              touch = evt.changedTouches[0];

          // Make sure we're on the right touch
          if(touch.identifier === joypadTouch) {
            joypadTouch = null;
          }
          e.preventDefault();
      });


      function joypadCircle(x,y,color,size) {
          ctx.beginPath();
          ctx.globalAlpha=0.5;
          ctx.fillStyle = color;
          ctx.arc(x, y, size, 0, Math.PI*2, true); 
          ctx.closePath();
          ctx.fill();

      }

      function loop() {
        ctx.clearRect(0,0,$canvas.width(),$canvas.height());
        if(joypadTouch !== null) {
          ctx.fillStyle = "#000";
          ctx.font = "20px arial";
          ctx.fillText("Angle:" + Math.round(joypad.ang*180/Math.PI) + 
                       " Dist:" + Math.round(joypad.dist),0,30);

          joypadCircle(joypad.centerX,joypad.centerY,"#000",joypadSize);
          joypadCircle(joypad.x,joypad.y,"#ccc",joypadCenterSize);

        }


        //setTimeout(loop,1000/60);
      }

      //loop();

  });*/