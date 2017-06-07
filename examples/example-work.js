window.logEnable = true;

var work = new Worker("engine\\work.js")

// var testdata = 1;
var testwork = function( )
{
	console.log("test work.js !")
	// return testdata ++;
}
var btn = new Button( 150, 200, 80, 40, "test" );
btn.setColor( 0xffffff00, 0xff888800 )
var data = {name:"function", func:testwork.toString()};
btn.click = function( )
{
	// log( "test btn click!" );
	work.postMessage(data);
}

var circlebutton = new Button( 150, 300, 80, 40, "circlebutton" );
circlebutton.setColor( 0xff0000ff, 0xff000088 );
circlebutton.setRenderType( Button.Circle );
circlebutton.click = function( )
{
	// log( "test circlebutton click!" );
	// log(data.func);
	log(testdata);
}

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

	return true;
}

window.onKeyDown.push( keyDown );

window.onKeyUp[0] = function( key )
{
	// log("key up event", key);
}

// var net = require("net")
// log("bbbbbbbbbbbbbbbb")