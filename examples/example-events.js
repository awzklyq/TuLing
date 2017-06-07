
window.rendercallbackfunc = function(e)
{
}

window.onMouseDown[window.onMouseDown.length] = function( b, x, y )
{
	log("down keys is atl ctrl", System.isKeyDown( System.KeyAlt ), System.isKeyDown( System.KeyCtrl ) )
	log("event mousedown", b, x, y);
}

window.onMouseMove[0] = function( x, y )
{
	// log("event mousemove",x, y);
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
	log("key up event", key);
}