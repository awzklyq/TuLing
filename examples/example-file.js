window.logEnable = true;


// var fso = new ActiveXObject("Scripting.FileSystemObject"); 

var btn = new Button( 150, 200, 80, 40, "test" );
btn.setColor( 0xff888800, 0xffffff00 );
var file = new File( );
var reader = new LFileReader( );
reader.onLoad(function()
{
	log(reader.data);
});

file.loadFiled( function( files )
{
	for ( var i = 0; i < files.length; i ++ )
	{
		log( files[i].name );
		reader.readFile(files[i], "txt");
	}
});

btn.click = function( )
{
	//view.removeUI(textinput1);
	// var f = fso.BuildPath("c://tmp", "a.txt"); 
// f.writeLine("wo shi di yi hang"); 
// f.close(); 

}

var url = window.URL || window.webkitURL || window;
var blob = new Blob(
			  ["test txt"]
			, {type: "text/plain;charset=" + document.characterSet});
var object_url = url.createObjectURL(blob);
var saver = document.createElement("a");
saver.href = object_url;
saver.download = "test.txt";
var ee = document.createEvent("MouseEvents");
ee.initMouseEvent("click",true, true, document.defaultView, 0, 0, 0, 0, 0,false, false, false, false, 0, null);
saver.setAttribute("value", "点击测试下载");
// saver.setAttribute("height", 80);
document.body.insertBefore( saver, document.getElementById("cavan") );


window.rendercallbackfunc = function(e)
{
	// UISystem.render( e );
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