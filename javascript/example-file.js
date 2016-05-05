window.logEnable = true;


// var fso = new ActiveXObject("Scripting.FileSystemObject"); 

var btn = new Button( 150, 200, 80, 40, "test" );
btn.setColor( 0xff888800, 0xffffff00 );

btn.click = function( )
{
	//view.removeUI(textinput1);
	// var f = fso.BuildPath("c://tmp", "a.txt"); 
// f.writeLine("wo shi di yi hang"); 
// f.close(); 
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

window.onKeyDown[window.onKeyDown.length] = function( key )
{
	return true;
}

window.onKeyUp[0] = function( key )
{
	// log("key up event", key);
}

// var net = require("net")
// log("bbbbbbbbbbbbbbbb")