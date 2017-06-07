window.logEnable = true;

var btn = new Button( 150, 200, 80, 40, "test" );
btn.setColor( 0xffffff00, 0xff888800 )
btn.click = function( )
{
	log( "test btn click!" );
}

var circlebutton = new Button( 150, 300, 80, 40, "circlebutton" );
circlebutton.setColor( 0xff0000ff, 0xff000088 );
circlebutton.setRenderType( Button.Circle );
circlebutton.click = function( )
{
	log( "test circlebutton click!" );
}

var cir = new Circle( 200, 300, 50 );
cir.setColor( 0xff0000ff );
window.rendercallbackfunc = function(e)
{
	cir.draw( );
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

	return true;
}

window.onKeyDown.push( keyDown );

window.onKeyUp[0] = function( key )
{
	// log("key up event", key);
}

// var net = require("net")
// log("bbbbbbbbbbbbbbbb")