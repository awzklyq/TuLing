window.logEnable = true;

// var textinput1 = new TextInput( 100, 100, 100, 20, "textinput" );
// var textinput2 = new TextInput( 300, 100, 100, 20, "textinput" );
// var btn = new Button( 150, 200, 80, 40, "test" );
// btn.setColor( 0xff888800, 0xffffff00 );

// var view = new UIView( );
// view.addUI(textinput1);
// view.addUI(textinput2);
// view.addUI(btn);

// btn.click = function( )
// {
	// view.removeUI(textinput1);
// }

var mbtn = {};
Global.loadJSFile("tools\\multbutton.js", true, function( ){
	mbtn = new MultButton(200, 100);
	log("create mbtn!!!!!!!!");
});

// var mbtn = new MltButton(0, 0, 280, 60);
window.rendercallbackfunc = function(e)
{
	UISystem.render( e );
}

function mouseDown( b, x, y )
{
	// log("event mousedown", b, x, y);
}

window.onMouseDown.push(mouseDown);

window.onMouseMove[0] = function( x, y )
{
	// log("event mousedown",x, y);
}

window.onMouseUp[0] = function( b, x, y )
{
	// log("event mouseup", b, x, y);
}

function keyDown( key )
{
	// log("key down event", key);
	if ( key == System.KeyLeft )
	{
		view.x = view.x - 5;
	}
	else if ( key == System.KeyRight )
		view.x = view.x + 5;

	return true;
}

window.onKeyDown.push( keyDown );

window.onKeyUp[0] = function( key )
{
	// log("key up event", key);
}

// var net = require("net")
// log("bbbbbbbbbbbbbbbb")