window.logEnable = true;
System.isClip = true;
var grids6 = new Grids6( 0, 0, 60, 1920, 1080 );
grids6.resetCanvas( );
// var test = Polygon.CreateRulePolygon( 6, 20 );
// test.moveTo( 100, 100 );
var grid = null;

window.rendercallbackfunc = function(e)
{
	grids6.draw( );
	// Polygon.render( test );
}

window.onMouseDown[window.onMouseDown.length] = function( b, x, y )
{
	// log("event mousedown", b, x, y);
	if ( grid != null )
	{
		grid.setColorStyle(0xff888888);
		grids6.refreshGrid( grid );
	}

	grid = grids6.getSelectGrid( x, y );
	if ( grid != null )
	{
		grid.setColorStyle(0xff0000ff);
		grids6.refreshGrid( grid );
	}
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
	// if ( key == System.KeyDown )
		// test.move( 0, 10 );
	return true;
}

window.onKeyUp[0] = function( key )
{
	// log("key up event", key);
}

// var net = require("net")
// log("bbbbbbbbbbbbbbbb")