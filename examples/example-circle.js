window.logEnable = true;

var circle = new Circle( 100, 100, 20 );
var rect = new Rect( 200, 100, 50, 50 );
rect.setLineColor( 0x88ff0000 );
rect.setColor( 0x00ffff00 );

window.rendercallbackfunc = function(e)
{
	circle.draw( e );
	rect.draw( e );
}

window.onMouseDown[window.onMouseDown.length] = function( b, x, y )
{
	// log("event mousedown", b, x, y);
}

window.onMouseMove[0] = function( x, y )
{
	// log("event mousedown",x, y);
}

window.onMouseUp[0] = function( b, x, y )
{
	// log("event mouseup", b, x, y);
}

window.onKeyDown[window.onKeyDown.length] = function( key )
{
	if ( key == System.KeySpace )
		circle.move( 150, 150, 2000 );

	return true;
}

window.onKeyUp[0] = function( key )
{
	// log("key up event", key);
}

// var net = require("net")
// log("bbbbbbbbbbbbbbbb")