window.logEnable = true;

var image = new LImage("anima2.jpg");
var img = new LImage("explosion.png");

var data = {x:0, y:0, w:0, h:0, image:"anima2.jpg", name:"test", cutx:3, cuty:2, framestime:200}
var anima = new ImageAnimation( data );
anima.setImageLoadCallBack( function( )
{
	// anima.blendColor( 0xaa888888 );
	//anima.addColor( 0xaa333333 );
})
anima.moveTo( 200, 200 );
anima.play( );

// anima.loop = true;
var blender = new Blender( );
// blender.setEnabelColor( true );
// blender.useColor( 0x88ffffff );
blender.setEnabelBlendMode( true );
blender.setBlendMode( "source-over" );// source-atop 在目标图像顶部显示源图像。源图像位于目标图像之外的部分是不可见的。 
// source-in 在目标图像中显示源图像。只有目标图像内的源图像部分会显示，目标图像是透明的。 
// source-out 在目标图像之外显示源图像。只会显示目标图像之外源图像部分，目标图像是透明的。 
// destination-over 在源图像上方显示目标图像。 
// destination-atop 在源图像顶部显示目标图像。源图像之外的目标图像部分不会被显示。 
// destination-in 在源图像中显示目标图像。只有源图像内的目标图像部分会被显示，源图像是透明的。 
// destination-out 在源图像外显示目标图像。只有源图像外的目标图像部分会被显示，源图像是透明的。 
// lighter 显示源图像 + 目标图像。 
// copy 显示源图像。忽略目标图像。 
// source-over 使用异或操作对源图像与目标图像进行组合。 

img.setLoadCallBack( function( )
{
	// img.subColor( 0x00888888 );
})

window.rendercallbackfunc = function(e)
{
	// blender.update( e );
	img.drawImage( );
	Global.pushBlender( blender );
	image.drawImage( );
	Global.popBlender( );
	// img.drawImage( 200, 200 );
	ImageAnimation.update( anima, e );
	ImageAnimation.render( anima, e );
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
	if ( key == System.KeySpace )
		anima.play( );
	return true;
}

window.onKeyDown.push( keyDown );

window.onKeyUp[0] = function( key )
{
	// log("key up event", key);
}
