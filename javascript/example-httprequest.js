window.logEnable = true;
var btn = new Button(50, 400, 500, 200, "sssssss");
btn.setImage( "q1.png", 'q2.png' );

var http = new HTTPRequest( );
window.logEnable = true;
http.onLoadEvent( function( rs ){ log( rs );  } );
btn.click = function( )
{
	http.clearParames( );
	http.addParame( "sqlhost", "127.0.0.1" );
	http.addParame( "sqluser", "root" );
	http.addParame( "sqlname", "mysql" );
	http.addParame( "sqlselecteclosemysql", "SELECT \n	`user`.`User`\nFROM\n`user`\nWHERE\n`user`.`User` = `user`.`User`" );
	log("sssssssssssss");
	http.open("php/test.php");
	http.send("test=ppppp");
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