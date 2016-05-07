function System( )
{
}

System.isClip = false;

System.OS =  "IOS"; // Androind, IOS.

if ( System.OS == "win32" )
{
	System.KeySpace		= 32;
	System.KeyDel 		= 46;
	System.KeyBack		= 8;
	System.KeyLeft 		= 37;
	System.KeyRight 	= 39;
	System.KeyUp 		= 38;
	System.KeyDown 		= 40;
	System.KeyA 		= 65;
	System.KeyZ 		= 90;
}

// Clip x.
System.getClipX = function( )
{
	return window.pageXOffset || document.documentElement.scrollLeft;
}

// Clip x.
System.getClipY = function( )
{
	return window.pageYOffset || document.documentElement.scrollTop;
}

// Clip w.
System.getClipW = function( )
{
	return screen.width || document.body.clientWidth;
}

// Clip h.
System.getClipH = function( )
{
	return screen.height || document.body.clientHeight;
}

System.checkInClipArea = function ( x1, y1, x2, y2 )
{
	// Ignore frame..
	var clipx1 = window.pageXOffset || document.documentElement.scrollLeft;
	var clipy1 = window.pageYOffset || document.documentElement.scrollTop;
	var clipx2 = clipx1 + screen.width || document.body.clientWidth;
	var clipy2 = clipy1 + screen.height || document.body.clientHeight;
	return x1 > clipx1 && y1 > clipy1 && x2 < clipx2 && y2 < clipy2;
}

System( );