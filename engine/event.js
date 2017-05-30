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

window.onMouseDown = new ArrayEx( );
if ( System.OS == "win32" )
{
	canvas.addEventListener( "mousedown", function( event ) { // mouseevent.
		var temp = Global.windowToCanvas( window.canvas, event.x, event.y );

		var def = false;
		for ( var i = 0; i < window.onMouseDown.length; i ++ )
		{
			if ( window.onMouseDown[i]( event.button, temp.x, temp.y ) )
				def = true;
		}

		if ( def )
			event.preventDefault( );

		if ( System.keyDowns.find( event.button ) == -1 )
		{
			System.keyDowns.push( event.button )
		}
			// System.keyDowns.push( event.button )
	}, false );
}
else
{
	canvas.addEventListener( "touchstart", function( event ) { // touchevent.
		var temp = Global.windowToCanvas( window.canvas, event.pageX,  event.pageY);
		for ( var i = 0; i < mousedowncallback.length; i ++ )
			mousedowncallback[i]( System.MouseLeft, temp.x, temp.y );

		event.preventDefault( );
	}, false );
}

window.onMouseMove = new ArrayEx( );
if ( System.OS == "win32" )
{
	canvas.addEventListener( "mousemove", function( event ) { // mouseevent
		var temp = Global.windowToCanvas( window.canvas, event.x, event.y )

		var def = false;
		for ( var i = 0; i < window.onMouseMove.length; i ++ )
		{
			if ( window.onMouseMove[i]( temp.x, temp.y ) )
				def = true;
		}

		if ( def )
			event.preventDefault( event );
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

window.onMouseUp = new ArrayEx( );
if ( System.OS == "win32" || System.OS == "IOS")
{
	canvas.addEventListener( "mouseup", function( event ) { // mouseevent.
		var temp = Global.windowToCanvas( window.canvas, event.x, event.y ) 

		var def = false;
		for ( var i = 0; i < window.onMouseUp.length; i ++ )
		{
			if (window.onMouseUp[i]( event.button, temp.x, temp.y ) )
				def = true;
		}

		if ( def )
			event.preventDefault( event );

		System.keyDowns.remove( event.button );
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

window.onMouseWheel = new ArrayEx( );
if ( System.OS == "win32" || System.OS == "IOS")
{
	canvas.addEventListener( "mousewheel", function( event ) { // mouseevent.
		var def = false;
		var delta = event.wheelDelta ? ( event.wheelDelta / 120 ) : ( -event.detail / 3 );	
		for ( var i = 0; i < window.onMouseWheel.length; i ++ )
		{
			if (window.onMouseWheel[i]( delta ) )
				def = true;
		}

		if ( def )
			event.preventDefault( event );
	}, false );
}

//??????
window.onKeyDown = new ArrayEx( );
document.addEventListener("keydown", function( event ){
	var def = false;
	for ( var i = 0; i < window.onKeyDown.length; i ++ )
	{
		if ( window.onKeyDown[i]( event.keyCode ) )
			def = true;
	}

	if ( def )
		event.preventDefault( event );

	if ( System.keyDowns.find( event.keyCode ) == -1 )
		System.keyDowns.push( event.keyCode )
}, false);

window.onKeyUp = new ArrayEx( );
document.addEventListener("keyup", function( event ){
	var def = false;
	for ( var i = 0; i < window.onKeyUp.length; i ++ )
	{
		if ( window.onKeyUp[i]( event.keyCode ) )
			ref = true;
	}

	if ( def )
		event.preventDefault( event );

	System.keyDowns.remove( event.keyCode )
}, false);