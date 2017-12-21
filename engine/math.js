Math.cot = function( r )
{
	return 1 / Math.tan( r );
}

Math.convertRadian = function( r )
{
	return r * Math.PI / 180;
}
Math.randomAt = function( d )
{
	return Math.random() * d
}

Math.randomAToB = function( a, b )
{
	return a + ( b - a ) * Math.random( );
}

Math.Linear = function( a, b, p )
{
	return a * ( 1 - p ) + b * p;
}

Math.LinearColor = function( color1, color2, t )
{
	var c1 = Math.DecompressionRGBA( color1 );
	var c2 = Math.DecompressionRGBA( color2 );

	var a = Math.Linear( c1.a, c2.a, t );
	var r = Math.Linear( c1.r, c2.r, t );
	var g = Math.Linear( c1.g, c2.g, t );
	var b = Math.Linear( c1.b, c2.b, t );
	return Math.CompressionRGBA( a * 255, r, g, b );
}


Math.randomVector = function( v1, v2, v3 )
{
	var x = Math.randomAToB( v1.x, v2.x );
	var y = Math.randomAToB( v1.y, v2.y );

	if ( v3 != null )
	{
		v3.x = x;
		v3.y = y;
		return v3;
	}
	return new Vector2( x, y );
}

// Note: a/255.
Math.DecompressionRGBA = function( argb )
{
	var bb = argb % 0x100;
	var gg = ( argb % 0x10000 - bb ) / 0x100;
	var rr = ( argb % 0x1000000 - argb % 0x10000 ) / 0x10000;
	var aa = ( argb - argb % 0x1000000 ) / 0x1000000;
	aa /= 255;
	return{r:rr, g:gg, b:bb, a:aa}
}

Math.CompressionRGBA = function( a, r, g, b )
{
	var temp = Math.ceil( a ) * 0x01000000 + Math.ceil( r ) * 0x00010000 + Math.ceil( g ) * 0x00000100 + Math.ceil( b );
	return parseInt( temp.toString(16), 16);
}

Math.StringConvertNumberColor = function( color )
{
	return parseInt( StringEx.getRemoveAtResult( color, 1 ), 16 );
}

Math.NumberConvertStringColor = function( color )
{
	return "#"+color.toString(16)
}

Math.randomColor = function( color1, color2 )
{
	var c1 = Math.DecompressionRGBA( color1 );
	var c2 = Math.DecompressionRGBA( color2 );

	var a = Math.randomAToB( c1.a, c2.a );
	var r = Math.randomAToB( c1.r, c2.r );
	var g = Math.randomAToB( c1.g, c2.g );
	var b = Math.randomAToB( c1.b, c2.b );

	return Math.CompressionRGBA( a * 255, r, g, b );
}

Math.getRGBA = function( color )
{
	var temp = Math.DecompressionRGBA( color );
	return "rgba(" + temp.r + "," + temp.g + "," + temp.b + "," + temp.a + ")";
}

Math.getRGBAFromStr = function( colorstyle )
{
	return Math.DecompressionRGBA( Math.StringConvertNumberColor( colorstyle ) );
}

Math.clamp = function( value, min, max )
{
	if ( value < min )
		value = min;
	else if ( value > max )
		value = max;

	return value;
}
Math.MinNumber = 0.000001;
Math.MaxNumber = 999999.0;
Math.ARC = Math.PI * 2;