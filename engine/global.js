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
	if ( Global.matrix.length == 0 && Global.wTransform == null )
		return;

	if ( Global.tempMatrix == null )
		Global.tempMatrix = new Matrix( );

	if ( Global.matrix.length > 0 )
	{
		for ( var i = Global.matrix.length - 1; i >= 0; i -- )
		{
			if ( i == Global.matrix.length - 1 )
			{
				Global.tempMatrix.set( Global.matrix[i].mat );
			}
			else
			{
				Global.tempMatrix.mulRight( Global.matrix[i] );
			}
		}
	}

	if ( Global.wTransform != null )
		Global.tempMatrix.mulRight( Global.wTransform );

	return Global.tempMatrix;
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

Global.clips = new Array( );
Global.pushClip = function( x, y, w, h )
{
	Global.clips.push( {x: x, y: y, w: w, h: h} );
}

Global.useClip = function( context )
{
	if ( Global.clips.length == 0 )
		return;

	var clip = Global.clips[ Global.clips.length - 1 ];
	context.rect( clip.x, clip.y, clip.w, clip.h );
	context.clip( );
}

Global.popClip = function( )
{
	Global.clips.pop( );
} 

Global.canvass = new Array( );
Global.pushCanvas = function ( canvas )
{
	var can = canvas.getCanvasData( );
	// window.canvas = can;
	// window.context = can.getContext("2d");
	// Global.canvass.push(can)
}

Global.popCanvas = function ( )
{
	var canvas = Global.canvass.pop( );
	if ( canvas == null )
	{
		// window.canvas = Global.canvas;
		// window.context = Global.context;
	}
	else
	{
		// window.canvas = canvas;
		// window.context = canvas.context;
	}
}

Global.loadJSFile = function( url, async, func )
{
	var script = document.createElement("script");

	// TODO.
	script.async = async || false;
	script.defer = async || false; 
	script.src = url;
	script.type = "text/javascript"; 
	var parent = document.getElementsByTagName("script")[0].parentNode;
	parent.appendChild( script );

	// TODO.
	if ( async == false || func == null )
		return;

	script.onload = function( )
	{
		if ( Global.isFunction( func ) )
			func( );

		script.onload = null;	
	}
}

Global.createElementOnly = function( obj, id, type, name, value )
{
	var element = document.createElement( obj );
	console.assert( element != null, "createElement faild!!" );

	if ( id != null )
		element.id = id;

	if ( type != null )
		element.type = type;

	if ( name != null )
		element.name = name;

	if ( value != null )
		element.value = value;

	return element;
}

Global.createElement = function( obj, id, type, name, value )
{
	var element = Global.createElementOnly( obj, id, type, name, value )

	// Insert first.
	document.body.insertBefore( element, document.body.firstChild );

	return element;
}

Global.deleteElement = function( element )
{
	console.assert( element != null, "deleteElement faild!!" );

	// Delete first.
	document.body.removeChild( element );
}

Global.getElementById = function( id )
{
	var element = document.getElementById( id )
	console.assert( element != null, "getElementById faild!!" );
	return element;
}

Global.getElementByName = function( name )
{
	var element = document.getElementByName( name )
	console.assert( element != null, "getElementByName faild!!" );
	return element;
}

Global.showElement = function( element, show )
{
	console.assert( element != null && element.style != null, "showElement faild!!" );

	if ( show == null )
	{
		element.style.visibility = "none";
		return
	}

	element.style.visibility = show ?  "visible": "hidden" ;
}

Global.setElementX = function( element, x )
{
	console.assert( element != null && element.style != null, "setElementX faild!!" );
	element.style.position = "absolute";
	element.style.left = x;
}

Global.getElementX = function( element )
{
	console.assert( element != null && element.style != null, "getElementX faild!!" );
	return element.style.left;
}

Global.setElementY = function( element, y )
{
	console.assert( element != null && element.style != null, "setElementY faild!!" );
	element.style.position = "absolute";
	element.style.top = y;
}

Global.getElementY = function( element )
{
	console.assert( element != null && element.style != null, "getElementY faild!!" );
	return element.style.top;
}

Global.setElementWidth = function( element, w )
{
	console.assert( element != null && element.style != null, "setElementWidth faild!!" );
	element.style.width = w;
}

Global.getElementWidth = function( element )
{
	console.assert( element != null && element.style != null, "getElementWidth faild!!" );
	
	return parseInt( element.style.width );
}

Global.setElementHeight = function( element, h )
{
	console.assert( element != null && element.style != null, "setElementHeight faild!!" );
	element.style.height = h;
}

Global.getElementHeight = function( element )
{
	console.assert( element != null && element.style != null, "getElementHeight faild!!" );

	return parseInt( element.style.height );
}

Global.setElementValue = function( element, value )
{
	console.assert( element != null , "setElementValue faild!!" );
	log(element.value, value)
	element.value = value;
}

Global.getElementValue = function( element )
{
	console.assert( element != null && element.value != null , "getElementValue faild!!" );
	return element.value;
}

Global.setElementOnClickEvent = function( element, func )
{
	console.assert( element != null && ( Global.isFunction( func ) || func == null ), "setElementOnClickEvent faild!!" );
	element.onclick = func;
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

Global.isObject = function( param )
{
	return typeof( param ) == "object";
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

Global.getMilliseconds = function( )
{
	return (new Date( )).getMilliseconds( );
}

Global.CombineRenderFill = 0x00000001;
Global.CombineRenderStroke = 0x00000002;

Global.windowToCanvas = function( canvas, x, y )
{
	var bbox = canvas.getBoundingClientRect( );
	return { x: ( x - bbox.left ) * ( canvas.width / bbox.width ),
		y : ( y - bbox.top ) * ( canvas.height / bbox.height ) };
}

Global.getClientWidth = function( )
{
	return document.body.clientWidth;
}

Global.getClientHeight = function( )
{
	return document.body.clientHeight;
}

Global.copyObject = function( source, deep )
{
	var temp = {};
	for ( var key in source )
		temp[key] = Global.isObject( source[key] ) && Global.isObject( source[key] ) != null ? Global.copyObject( source[key] ) : source[key];

	return temp;

	// Deep.
}

Global.copyArray = function( source )
{
	var temp = source.typeid == Global.Array_typeid ? new ArrayEx( ) : {};

	// For array.
	for ( var i = 0; i < source.length; i ++ )
	{
		if (  Global.isObject( source[key] ) )
			temp.push( Global.copyArray( source[key] ) )
		else
			temp.push( source[key] )
	}

	// For hash.
	for ( var key in source )
	{
		if ( source.typeid == Global.Array_typeid )
		{
			if ( source.find( source[key] ) != -1 )
				continue;
		}
		
		temp[key] = Global.isObject( source[key] ) && Global.isObject( source[key] ) != null ? Global.copyArray( source[key] ) : source[key];
	}

	return temp;
}

Global.logInfo = function( ret )
{
	if ( typeof( ret ) == 'object' )
	{
		// log("~~~~~~~~~~~~~~~~~~~~")
		for ( let i in ret )
		{
			log(i, ret[i], typeof( ret[i] ) );
			// Global.logInfo( ret[i] );
		}
	}
}

Global.FILLSTYLE = 0x00000000;
Global.STROKESTYLE = 0x00000001;

Global.ALLSTYLE = 0x00000002;

Global.LImage_typeid = 1;

// For 3D.
Global.Vector3_typeid = 2;
Global.AmbientLight_typeid = 3;
Global.SkyLight_typeid = 4;
Global.PointLight_typeid = 5;

Global.Grid6_typeid = 6;
Global.Grid4_typeid = 7;

Global.Array_typeid = 8;

Global.bgColor = Math.getRGBA( 0xff000000 );

Global.OBJECTID = 0x00000000;

// Set Font
Global.FONT = "60px Georgia";
Global.textAlign = "center"; // start, center, end, left, right.
Global.textBaseline = "middle"; // top, bottom, middle, alphabetic, ideographic, hanging.
// window.context.textAlign = Global.textAlign;