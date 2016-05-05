/*
	link:
	Global.wTransform
*/
function Global( )
{}

Global.matrix = new Array( );

Global.setWorldTransform = function( transform )
{
	if ( Global.wTransform != null )
	{
		delete Global.wTransform;
	}

	Global.wTransform = transform;
}

Global.pushMatrix = function( transform )
{
	Global.matrix.push( transform );
}

Global.popMatrix = function( )
{
	Global.matrix.pop( );
}

Global.getCurrentMatrix = function( transform )
{
	if ( Global.matrix.length > 0 )
	{
		if ( Global.wTransform != null )
		{
			var mat = new Matrix( Global.matrix[Global.matrix.length - 1] );
			mat:mulRight( Global.wTransform );
			return mat;
		}

		return Global.matrix[Global.matrix.length - 1];
	}

	if ( Global.wTransform != null )
	{
		return Global.wTransform;
	}

	return null;
}

Global.bindMatrixToContext = function( context, matrix )
{
	if ( context != null && matrix != null )
	{
		var mat = matrix.mat;
		context.setTransform( mat[0], mat[1], mat[3], mat[4], mat[6], mat[7] );
	}
}

Global.loadJSFile = function( url, async, func )
{
	var script = document.createElement("script");

	// TODO.
	script.async = async;
	// script.defer = false; 

	script.src = url;
	var parent = document.getElementsByTagName("script")[0].parentNode;
	parent.appendChild( script );

	// TODO.
	script.onload = function( )
	{
		if ( Global.isFunction(func ) )
			func( );

		script.onload = null;	
	}
}

Global.isString = function( param )
{
	return typeof( param ) == "string";
}

Global.isNumber = function( param )
{
	return typeof( param ) == "number";
}

Global.isBool = function( param )
{
	return typeof( param ) == "boolean";
}

Global.isUndefined = function( param )
{
	return typeof( param ) == "undefined";
}

Global.isFunction = function( param )
{
	return typeof( param ) == "function";
}

Global.isArray = function( param )
{
	return ( param instanceof Array ) || ( param instanceof ArrayEx );
}

Global.FONT = "60px Georgia";
Global.FILLSTYLE = 0x00000000;
Global.STROKESTYLE = 0x00000001;

Global.ALLSTYLE = 0x00000002;

// Global.LImage.typeid = 0x00000001;

Global.bgColor = Math.getRGBA( 0xff000000 );