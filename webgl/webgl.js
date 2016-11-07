window.webglcanvas = Global.createElementOnly( "canvas", "webgl"); //obj, id, type, name, value
Global.setElementWidth( window.webglcanvas, 1400 );
Global.setElementHeight( window.webglcanvas, 600 );

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

var cwidth = Global.getElementWidth( window.webglcanvas );
var cheight = Global.getElementHeight( window.webglcanvas );

window.webglrendercallbackfunc = function(context, e)
{
	if ( webgl.update != null )
		webgl.update( e );

	if ( webgl.render != null )
		webgl.render( e );

	context.drawImage( webglcanvas, 0, 0, cwidth, cheight );
	// TODO.
}