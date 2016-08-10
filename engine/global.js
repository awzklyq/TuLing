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

Global.getCurrentMatrix = function( )
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

Global.blenders = new Array( );
Global.pushBlender = function( blender )
{
	Global.blenders.push(blender);
}

Global.popBlender = function( )
{
	Global.blenders.pop( );
}

Global.getCurrentBlender = function( )
{
	var blender = { alpha: 1, color: 0x00, mode: "source-over" };
	if ( Global.blenders.length > 0 )
	{
		for ( var i = 0; i < Global.blenders.length; i ++ )
		{
			blender.alpha *= Global.blenders[i].getCurrentAlpha( );
			blender.color += Global.blenders[i].getCurrentColor( );
		}
		blender.mode = Global.blenders[Global.blenders.length - 1].getBlendMode( );
	}

	return blender;
}

Global.bindBlenderToContext = function( context, blender )
{
	if ( context != null && matrix != null )
	{
		var mat = matrix.mat;
		context.setTransform( mat[0], mat[1], mat[3], mat[4], mat[6], mat[7] );
	}
}

Global.affects = new Array( );
Global.pushAffect = function( affect )
{
	Global.affects.push( affect );
}

Global.popAffect = function( )
{
	Global.affects.pop( );
}

Global.bindAffectToContext = function( context, t )
{
	if ( Global.affects.length == 0 ) return;

	if ( t == null )
		t = -1;

	var affect = Global.affects[ Global.affects.length - 1 ];
	if ( ( affect.state & Affect.COLOR ) != 0 )
	{
		var color1 = affect.getValue( Affect.COLOR, t );
		context.fillStyle = Math.getRGBA( color1 );
		// log(context.fillStyle)
	}
	else
	{	
		var color2 = Math.getRGBAFromStr( context.fillStyle );

		// TODO.. context.fillStyle's alpha is 0x00..
		if ( color2.a == 0x00 )
			color2.a = context.globalAlpha;

		// TODO.. globalAlpha or fillStyle alpha.
		if ( ( affect.state & Affect.COLORA ) != 0 )
		{
			var alpha = affect.getValue( Affect.COLORA, t );
			if ( alpha != Affect.NONE )
				context.globalAlpha = alpha;
		}

		if ( ( affect.state & Affect.COLORRGB ) != 0 )
		{
			var color1 = affect.getValue( Affect.COLORRGB, t );
			context.fillStyle = Math.getRGBA( color2.a * 0xff000000 + color1 );
		}
		else
		{
			var r = color2.r;
			if ( ( affect.state & Affect.COLORR ) != 0 )
			{
				var rr = affect.getValue( Affect.COLORR, t );
				if ( rr != Affect.NONE )
					r = rr;
			}

			var g = color2.g;
			if ( ( affect.state & Affect.COLORG ) != 0 )
			{
				var gg = affect.getValue( Affect.COLORG, t );
				if ( gg != Affect.NONE )
					g = gg;
			}

			var b = color2.b;
			if ( ( affect.state & Affect.COLORB ) != 0 )
			{
				var bb = affect.getValue( Affect.COLORB, t );
				if ( bb != Affect.NONE )
					b = bb;
			}

			context.fillStyle = "rgba(" + r + "," + g + "," + b + "," + color2.a + ")";
		}
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
		if ( Global.isFunction( func ) )
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

Global.combineRender = false;

Global.renderPolygonCount = 0;
Global.clipPolygonCount = 0;

Global.beginCombineRender = function( )
{
	Global.combineRender = true;
	context.save( );
	window.context.beginPath( );	
}

Global.endCombineRender = function( mode )
{
	Global.combineRender = false;
	window.context.closePath( );
	if ( ( mode & Global.CombineRenderFill ) != 0 )
		window.context.fill( );

	if ( ( mode & Global.CombineRenderStroke ) != 0 )
		window.context.stroke( );
	
	context.restore( );
}

Global.CombineRenderFill = 0x00000001;
Global.CombineRenderStroke = 0x00000002;

Global.windowToCanvas = function( canvas, x, y )
{
	var bbox = canvas.getBoundingClientRect( );
	return { x: ( x - bbox.left ) * ( canvas.width / bbox.width ),
		y : ( y - bbox.top ) * ( canvas.height / bbox.height ) };
}

Global.FONT = "60px Georgia";
Global.FILLSTYLE = 0x00000000;
Global.STROKESTYLE = 0x00000001;

Global.ALLSTYLE = 0x00000002;

// Global.LImage.typeid = 0x00000001;

Global.bgColor = Math.getRGBA( 0xff000000 );

Global.OBJECTID = 0x00000000;