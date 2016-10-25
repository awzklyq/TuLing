window.webglcanvas = Global.createElementOnly( "canvas", "webgl"); //obj, id, type, name, value
Global.setElementWidth( window.webglcanvas, 800 );
Global.setElementHeight( window.webglcanvas, 800 );

// Get webgl.
var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
for ( var i = 0; i < names.length; i ++ )
{
	window.gl = webglcanvas.getContext(names[i])
	if ( window.gl != null )
	{
		log("create gl successful;")
		break;
	}
}

console.assert( window.gl != null, "gl is null!" );

window.webgl = new WebGl( );

window.webglrendercallbackfunc = function(context, e)
{
	webgl.clearColor( 0xffff0000 );
	webgl.clear( );
	webgl.viewPort( 0, 0, 100, 100 );
	context.drawImage( webglcanvas, 0, 0, 100, 100 );
	// TODO.
}