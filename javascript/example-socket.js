window.logEnable = true;
var http = new HTTPRequest( );
http.onLoadEvent( function( msg ){ log(msg); } );
var btn = new Button(50, 100, 100, 75, "sssssss");
btn.setImage( "q1.png", 'q2.png' );
var socket = new WebSocket( "ws://127.0.0.1:8080" );
socket.onopen = function( event ) { log( "connect ok!" ); }
socket.onmessage = function (evt) { log( "qqqqqqqqqqq",evt.data ); }
btn.click = function( )
{
	log( " test btn.click !" );
	socket.send( "test web socket is Ok! ");
}

// var btn2 = new Button(50, 200, 100, 100, "sssssss");
// btn2.setImage( "q1.png", 'q2.png' );
// btn2.click = function( )
// {
	// socket.send( "test web socket send is Ok! ");
// }

var btn2 = new Button(50, 200, 100, 100, "sssssss");
btn2.setImage( "q1.png", 'q2.png' );
btn2.click = function( )
{
	log( " test btn2.click !" );
	//socket.send( "test web socket close is Ok! ");
	socket:close( );
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