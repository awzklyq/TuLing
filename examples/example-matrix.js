window.logEnable = true;
System.isClip = true;
window.limitLog = 5000;
var image = new LImage('../res/Dragon_tex.png');
var mat1 = new Matrix( );
mat1.mulRotationLeft(1000)
var r = mat1.getRotation()
// mat1.mulTranslationRight(-100, -100)
log(image.getWidth(), image.getHeight())
mat1.mulTranslationRight(-image.getWidth()*0.5, -image.getHeight()*0.5);
// mat1.mulRotationLeft(3);
// mat1.mulTranslationRight(image.getWidth()*0.5+50, image.getHeight()*0.5+50 );
// mat1.mulTranslationRight(100, 100)
var mat2 = new Matrix( );
// mat2.mulRotationLeft(0.5);
mat2.mulRight(mat1);
var mat3 = new Matrix( );
// mat3.mulTranslationRight(image.getWidth()*0.5, image.getHeight()*0.5);
mat3.mulRight(mat2);
// var canvas = new CanvasEx( );
// canvas.setWidth(image.getWidth());
// canvas.setHeight(image.getHeight());

var canvastest = new CanvasEx( );
// CanvasEx.resetWindowCanvas( );
canvastest.setAttribute( "width", window.canvas.width );
canvastest.setAttribute( "height", window.canvas.height );

var context =  window.context;
window.context = canvastest.getContext( );
image.drawImage();
window.context = context;
window.rendercallbackfunc = function(e)
{
	
	// Global.pushCanvas(canvas);
	Global.pushMatrix(mat3);
	// image.drawImage();
	Global.popMatrix();
	// Global.popCanvas();
}

window.onMouseMove[0] = function( x, y )
{
	// log("event mousedown",x, y);
}

window.onMouseUp[0] = function( b, x, y )
{
	// log("event mouseup", b, x, y);
}

var keyDown = function( key )
{
	log( key, System.KeySpace )

	return true;
}

window.onKeyDown.push( keyDown );

window.onKeyUp[0] = function( key )
{
	// log("key up event", key);
}

var mousewheel = function( d )
{
	return true;
}

window.onMouseWheel.push(mousewheel);