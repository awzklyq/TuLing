window.logEnable = true;

var test1 = Polygon.CreateRulePolygon( 6, 20 );
test1.buildBox( );
test1.moveTo( 100, 100 );

var test2 = Polygon.CreateRulePolygon( 4, 40 );
test2.buildBox( );
test2.moveTo( 200, 100 );

var collision = new Collision( );
window.rendercallbackfunc = function(e)
{
	Polygon.render( test1 );
	Polygon.render( test2 );
}

window.onMouseDown[window.onMouseDown.length] = function( b, x, y )
{
}

window.onMouseMove[0] = function( x, y )
{
	// log("event mousedown",x, y);
}

window.onMouseUp[0] = function( b, x, y )
{
	// log("event mouseup", b, x, y);
}

var keyDown = function( key )
{
	log( System.KeyDown )
	if ( key == System.KeyDown )
		test1.move( 0, 1 );
	else if ( key == System.KeyUp )
		test1.move( 0, -1 );
	else if ( key == System.KeyLeft )
		test1.move( -1, 0 );
	else if ( key == System.KeyRight )
		test1.move( 1, 0 );
	else if ( key == System.KeySpace )
		log( collision.checkPolygons( test1, test2, true ) );

	return true;
}

window.onKeyDown.push( keyDown );

window.onKeyUp[0] = function( key )
{
	// log("key up event", key);
}

// var net = require("net")
// log("bbbbbbbbbbbbbbbb")