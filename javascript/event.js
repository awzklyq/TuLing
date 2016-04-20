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
canvas.addEventListener( "mousedown", function( event ) { // mouseevent.
	for ( var i = 0; i < mousedowncallback.length; i ++ )
	{
		mousedowncallback[i]( event.button, event.x, event.y );
	}
}, false );

window.onMouseMove = new Array( );
var mousemovecallback = window.onMouseMove
canvas.addEventListener( "mousemove", function( event ) { // mouseevent.
	for ( var i = 0; i < mousemovecallback.length; i ++ )
	{
		mousemovecallback[i]( event.x, event.y );
	}
}, false );

window.onMouseUp = new Array( );
var mouseupcallback = window.onMouseUp
canvas.addEventListener( "mouseup", function( event ) { // mouseevent.
	for ( var i = 0; i < mouseupcallback.length; i ++ )
	{
		mouseupcallback[i]( event.button, event.x, event.y );
	}
}, false );

//??????
window.onKeyDown = new Array( );
var keydowncallback = window.onKeyDown;
document.addEventListener("keydown", function( event ){
	for ( var i = 0; i < keydowncallback.length; i ++ )
	{
		keydowncallback[i]( event.keyCode );
	}
}, false);

window.onKeyUp = new Array( );
var keyupcallback = window.onKeyUp
document.addEventListener("keyup", function( event ){
	for ( var i = 0; i < keyupcallback.length; i ++ )
	{
		keyupcallback[i]( event.keyCode );
	}
}, false);