window.requestNextAnimationFrame = (function () {
  var originalWebkitRequestAnimationFrame = undefined,
      wrapper = undefined,
      callback = undefined,
      geckoVersion = 0,
      userAgent = navigator.userAgent,
      index = 0,
      self = this;

  // Workaround for Chrome 10 bug where Chrome
  // does not pass the time to the animation function

  if (window.webkitRequestAnimationFrame) {
    // Define the wrapper

    wrapper = function (time) {
      if (time === undefined) {
        time = +new Date();
      }
      self.callback(time);
    };

    // Make the switch

    originalWebkitRequestAnimationFrame = window.webkitRequestAnimationFrame;

    window.webkitRequestAnimationFrame = function (callback, element) {
      self.callback = callback;

      // Browser calls the wrapper and wrapper calls the callback

      originalWebkitRequestAnimationFrame(wrapper, element);
    }
  }

  // Workaround for Gecko 2.0, which has a bug in
  // mozRequestAnimationFrame() that restricts animations
  // to 30-40 fps.

  if (window.mozRequestAnimationFrame) {
    // Check the Gecko version. Gecko is used by browsers
    // other than Firefox. Gecko 2.0 corresponds to
    // Firefox 4.0.

    index = userAgent.indexOf('rv:');

    if (userAgent.indexOf('Gecko') != -1) {
      geckoVersion = userAgent.substr(index + 3, 3);

      if (geckoVersion === '2.0') {
        // Forces the return statement to fall through
        // to the setTimeout() function.

        window.mozRequestAnimationFrame = undefined;
      }
    }
  }

  return  window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||

      function (callback, element) {
        var start,
            finish;

        window.setTimeout(function () {
          start = +new Date();
          callback(start);
          finish = +new Date();

          self.timeout = 1000 / 60 - (finish - start);

        }, self.timeout);
      };
}());


  window.cancelNextRequestAnimationFrame =  window.cancelRequestAnimationFrame
    || window.webkitCancelAnimationFrame
    || window.webkitCancelRequestAnimationFrame
    || window.mozCancelRequestAnimationFrame
    || window.oCancelRequestAnimationFrame
    || window.msCancelRequestAnimationFrame
    || clearTimeout;

var canvas = document.getElementById('canvas');

// Test.
if ( System.OS == "win32" )
{
	// canvas.width = screen.width * 2;
	// canvas.height = screen.height * 3;
}

window.canvas = canvas;
window.context = canvas.getContext("2d");
// Global.canvas = window.canvas;
// Global.context = window.context;
console.log(context)
var context = window.context;
// context.globalAlpha = 0.5;
// context.globalCompositeOperation = "source-out";
var debug = top.parent.frames["help"]
var logCount = 0;

window.tickTimer = 0;
window.startTimer = new Date( );

window.getTick = function( )
{
	var date = new Date( );
	window.tickTimer += date - window.startTimer;
	window.startTimer = date;
	return window.tickTimer;
}
window.log = function()
{
	if ( window.limitLog!= null && logCount >= window.limitLog )
		return;

	var newtick = new Date( )
	var message = newtick.getHours( ) + ":" + newtick.getMinutes( ) + ":" + newtick.getSeconds( ) + ": ";
	for(var i = 0; i < arguments.length; i ++)
	{
		message += arguments[i] + ', ';
	}

	logCount ++;
	if ( window.limitLog != null && logCount == window.limitLog )
		message += "The log limit " + window.limitLog;

	if ( window.webkitCancelAnimationFrame || debug == null )
	{
		console.log( message );
	}
	else
	{
		message += '<br>';
		if ( window.logEnable == true )
		{
			debug.log.innerHTML += message;
		}
	}
}

context.font = "16px Arial";

var tick = new Date( )
function render( )
{
	var newtick = new Date( );
	var elapse = newtick - tick;
	Global.elapse = elapse;
	var fps = Math.ceil(1000 / ( elapse ));

	if ( window.updatecallbackfunc != null )
	{
		window.updatecallbackfunc(elapse)
	}

	
	context.clearRect(0, 0, canvas.width, canvas.height);
	Global.renderPolygonCount = 0;
	Global.clipPolygonCount = 0;

	if ( window.webglrendercallbackfunc != null )
	{
		window.webglrendercallbackfunc(window.context, elapse);
	}

	if ( window.rendercallbackfunc != null )
	{
		window.rendercallbackfunc(elapse);
	}

	context.fillStyle = Math.getRGBA( 0xffffff00 );
	context.fillText("FPS: " + fps + " X: " + System.getClipX( ) + " Y: " + System.getClipY( ) +" CW: " + System.getClipW( ) + " CH: " + System.getClipH( ) + " PC: " + Global.renderPolygonCount + " CPC: " + Global.clipPolygonCount, System.getClipX( ) + 20, System.getClipY( ) + 20);
	tick = newtick
	window.requestNextAnimationFrame(render);
}

window.requestNextAnimationFrame(render);