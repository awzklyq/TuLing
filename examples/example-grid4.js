window.logEnable = true;
System.isClip = true;
window.limitLog = 5000;
var grids4 = new Grids4( 0, 0, Global.getClientWidth( ), Global.getClientHeight( ), 30 );
// grids6.resetCanvas( );
// var grid = null;
var elements = new ArrayEx( );
elements.push( {state:0, weight:0, color:0xffffffff} );
elements.push( {state:1, weight:0, color:0x00000000} );
grids4.randomGrid( elements );

var pathFinder = new PathFinder( grids4 );
window.rendercallbackfunc = function(e)
{
	// grids6.draw( );
	pathFinder.draw( );
}

var source = null;
var target = null;
function mousedown( b, x, y )
{
	if ( source == null )
	{
		source = pathFinder.selectAt( x, y );
		source.element.color = 0xffff0000;
		source.xx = x;
		source.yy = y;
	}
	else if ( target == null )
	{
		target = pathFinder.selectAt( x, y );

		for ( var i = 0; i < pathFinder.openList.length; i ++ )
		{
			var temp = pathFinder.openList[i];
			if ( temp.element.color != 0xff00ff00 )
				temp.element.color = 0xffff0000;
		}

		for ( var i = 0; i < pathFinder.pathList.length; i ++ )
		{
			var temp = pathFinder.pathList[i];
			if ( temp.element.color != 0xff00ff00 )
			temp.element.color = 0xffffff00;
		}


		for ( var i = 0; i < pathFinder.closeList.length; i ++ )
		{
			var temp = pathFinder.closeList[i];
			if ( temp.element.color != 0xff00ff00 )
			temp.element.color = 0xff0000ff;
		}
	}
}

window.onMouseDown.push(mousedown);

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
	log( key, System.KeySpace )
	if ( key == System.KeySpace )
	{
		if ( source != null )
			source.element.color = source.state == 1 ? 0x00000000 : 0xffffffff;

		if ( target != null )
			target.element.color = target.state == 1 ? 0x00000000 : 0xffffffff;
		source = null;
		target = null;

		pathFinder.setGrids( grids4 );
	}

	return true;
}

window.onKeyDown.push( keyDown );

window.onKeyUp[0] = function( key )
{
	// log("key up event", key);
}

var mousewheel = function( d )
{
	return true;
}

window.onMouseWheel.push(mousewheel);