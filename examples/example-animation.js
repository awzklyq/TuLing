window.logEnable = true;
var btn = new Button(50, 400, 500, 200, "sssssss");
btn.setImage( "q1.png", 'q2.png' );
btn.click = function( )
{
	log( " test btn.click !" );
}

window.rendercallbackfunc = function(e)
{
	UISystem.render( e );
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

window.onKeyDown[0] = function( key )
{
	// log("key down event", key);
}

window.onKeyUp[0] = function( key )
{
	// log("key up event", key);
}

// var net = require("net")
// log("bbbbbbbbbbbbbbbb")