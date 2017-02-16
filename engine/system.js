function System( )
{
}

System.isClip = false;

System.OS =  "win32"; // Androind, IOS.

if ( System.OS == "win32" )
{
	System.KeySpace		= 32;
	System.KeyDel 		= 46;
	System.KeyBack		= 8;
	System.KeyLeft 		= 37;
	System.KeyRight 	= 39;
	System.KeyUp 		= 38;
	System.KeyDown 		= 40;
	System.KeyCtrl 		= 17;
	System.KeyAlt 		= 18;
	System.KeyA 		= 65;
	System.KeyZ 		= 90;

	System.MouseLeft	= 0;
	System.MouseMiddle	= 1;
	System.MouseRight	= 2;
}

// Clip x.
System.getClipX = function( )
{
	return window.pageXOffset || document.documentElement.scrollLeft;
}

// Clip x. TODO.
System.getClipY = function( )
{
	return window.pageYOffset || document.documentElement.scrollTop;
}

// Clip w. TODO.
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

System.getWidth = function( )
{
	if ( System.OS == "win32" )
		return window.innerWidth;

	return screen.width
}

System.getHeight = function( )
{
	if ( System.OS == "win32" )
		return window.innerHeight;

	return screen.height
}

System.keyDowns = new ArrayEx( );
System.isKeyDown = function( value )
{
	return System.keyDowns.find( value ) != -1;
}