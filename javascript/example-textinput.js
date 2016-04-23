window.logEnable = true;

var textinput1 = new TextInput( 100, 100, 100, 20, "textinput" );
var textinput2 = new TextInput( 300, 100, 100, 20, "textinput" );
var btn = new Button( 150, 200, 80, 40, "test" );
btn.setColor( 0xff888800, 0xffffff00 )
var test = Object.create( Object.prototype, {x:{
	get:function(){ log("test get is ok!", this._x); return this._x;},
	set:function( param){ this._x = param; log("test set is ok!", this._x);  }},
	_x:{writable:true}});

var tt = test;
function test1()
{
}

test1.prototype = tt;
btn.click = function( )
{
	log("textinput1 : ", textinput1.text);
	log("textinput2 : ", textinput2.text);
	var ttt = new test1();
	var tttt = new test1();
	log(ttt.x, tttt.x);
	ttt.x = 8;
	tttt.x = 9;
	log(ttt.x, tttt.x);
} 

var view = new UIView( );
view.add(textinput1);
view.add(textinput2);
view.add(btn);

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
	// log("key down event", key);
	if ( key == System.KeyLeft )
	{
		view.x = view.x - 5;
	}
	else if ( key == System.KeyRight )
		view.x = view.x + 5;

	log( textinput1.x, textinput1._x, textinput2.x, textinput2._x, btn.x );
	return true;
}

window.onKeyUp[0] = function( key )
{
	// log("key up event", key);
}

// var net = require("net")
// log("bbbbbbbbbbbbbbbb")