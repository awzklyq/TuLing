var canvas = document.getElementById('canvas');

if ( canvas.addEventListener == null )
{
	canvas.addEventListener = canvas.attachEvent;
	log("use canvas.attachEvent event");
}
else
{
	log("use canvas.addEventListener event");
}

window.onMouseDown = new Array( );
var mousedowncallback = window.onMouseDown
if ( System.OS == "win32" )
{
	canvas.addEventListener( "mousedown", function( event ) { // mouseevent.
		var temp = Global.windowToCanvas( window.canvas, event.x, event.y );
		for ( var i = 0; i < mousedowncallback.length; i ++ )
			mousedowncallback[i]( event.button, temp.x, temp.y );
	}, false );
}
else
{
	canvas.addEventListener( "touchstart", function( event ) { // touchevent.
		var temp = Global.windowToCanvas( window.canvas, event.pageX,  event.pageY);
		for ( var i = 0; i < mousedowncallback.length; i ++ )
			mousedowncallback[i]( 1, temp.x, temp.y );

		event.preventDefault( );
	}, false );
}

window.onMouseMove = new Array( );
var mousemovecallback = window.onMouseMove
if ( System.OS == "win32" )
{
	canvas.addEventListener( "mousemove", function( event ) { // mouseevent.
		var temp = Global.windowToCanvas( window.canvas, event.x, event.y ) 
		for ( var i = 0; i < mousemovecallback.length; i ++ )
			mousemovecallback[i]( temp.x, temp.y );
	}, false );
}
else
{
	canvas.addEventListener( "touchmove", function( event ) { // touchevent.
		var temp = Global.windowToCanvas( window.canvas, event.pageX, event.pageY ) 
		for ( var i = 0; i < mousemovecallback.length; i ++ )
			mousemovecallback[i]( temp.x, temp.y );

		event.preventDefault( );
	}, false );
}

window.onMouseUp = new Array( );
var mouseupcallback = window.onMouseUp
if ( System.OS == "win32" || System.OS == "IOS")
{
	canvas.addEventListener( "mouseup", function( event ) { // mouseevent.
		var temp = Global.windowToCanvas( window.canvas, event.x, event.y ) 
		for ( var i = 0; i < mouseupcallback.length; i ++ )
			mouseupcallback[i]( event.button, temp.x, temp.y );
	}, false );
}
else
{
	canvas.addEventListener( "touchend", function( event ) { // touchevent.
		var temp = Global.windowToCanvas( window.canvas, event.pageX, event.pageY ) 
		for ( var i = 0; i < mouseupcallback.length; i ++ )
			mouseupcallback[i]( 1, temp.x, temp.y );
	}, false );
}


//??????
window.onKeyDown = new Array( );
var keydowncallback = window.onKeyDown;
document.addEventListener("keydown", function( event ){
	var def = false;
	for ( var i = 0; i < keydowncallback.length; i ++ )
	{
		if ( keydowncallback[i]( event.keyCode ) )
			def = true;
	}

	if ( def )
		event.preventDefault( event );
}, false);

window.onKeyUp = new Array( );
var keyupcallback = window.onKeyUp
document.addEventListener("keyup", function( event ){
	for ( var i = 0; i < keyupcallback.length; i ++ )
		keyupcallback[i]( event.keyCode );
}, false);