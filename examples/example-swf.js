window.logEnable = true;
window.limitLog = 500;

Global.loadJSFile( 'myhead.js', true, function( ){
	var swf = new SWFManager( 'myhead' );
	// swf.x += 100;
	// swf.y += 100;
	swf.gotoAndPlay( 1 );
	// swf.pause = false;
	// swf.loop = false;
	swf.speed = 0.2;
} );

window.rendercallbackfunc = function(e)
{
	UISystem.render( e );
}

function mouseDown( b, x, y )
{
	// log("event mousedown", b, x, y);
}

window.onMouseDown.push(mouseDown);

window.onMouseMove[0] = function( x, y )
{
	// log("event mousedown",x, y);
}

window.onMouseUp[0] = function( b, x, y )
{
	// log("event mouseup", b, x, y);
}

function keyDown( key )
{
	// log("key down event", key);
	// if ( key == System.KeyLeft )
		// view.x = view.x - 5;
	// else if ( key == System.KeyRight )
		// view.x = view.x + 5;

	return true;
}

// window.onKeyDown.push( keyDown );

window.onKeyUp[0] = function( key )
{
	// log("key up event", key);
}

// var net = require("net")
// log("bbbbbbbbbbbbbbbb")