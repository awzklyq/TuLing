window.logEnable = true;

var btn = new Button( 150, 200, 80, 40, "test" );
btn.setColor( 0xffffff00, 0xff888800 );
var audio = new AudioEx( "res\\asd.mp3" );

btn.click = function( )
{
	audio.duration  = 2;
	log( "test btn click!", audio.duration );
	audio.play();
}

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
	if ( key == System.KeyUp )
		audio.volume += 0.05;
	else if ( key == System.KeyDown )
		audio.volume -= 0.05;
	return true;
}

window.onKeyDown.push( keyDown );

window.onKeyUp[0] = function( key )
{
	// log("key up event", key);
}

// var net = require("net")
// log("bbbbbbbbbbbbbbbb")