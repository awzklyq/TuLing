window.logEnable = true;

var mat = new Matrix()
var image = new LImage("../res/asd.png");

var polygon = new Polygon({x: -200, y:200}, {x: 200, y:200}, {x: 200, y:-200}, {x: -200, y:-200})
//polygon.moveTo( 200, 100 );
//mat.mulTranslationLeft(0.5 * image.getWidth(), 0.5 * image.getHeight())
mat.mulRotationLeft(-32.19)//38.87
//mat.mulTranslationRight( -image.getWidth()*0.5, -image.getHeight()* 0.5)
//mat.mulTranslationRight( image.getWidth()*0.5, image.getHeight()* 0.5)
log('aaaaaaaaaaaaa', image.getWidth() * 0.5)
window.rendercallbackfunc = function(e)
{
	Global.pushMatrix(mat)
	// image.drawImage(-image.getWidth() * 0.5, -image.getHeight() * 0.5);
	// image.drawImage( );
	Polygon.render( polygon );
	Global.popMatrix( )
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

window.onKeyDown.push( keyDown );

window.onKeyUp[0] = function( key )
{
	// log("key up event", key);
}
