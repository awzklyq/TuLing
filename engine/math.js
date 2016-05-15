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
	return new Vector( x, y );
}

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
	var temp = a * 0x01000000 + r * 0x00010000 + g * 0x00000100 + b;
	return parseInt( temp.toString(16), 16);
}

Math.StringConvertNumberColor = function( color )
{
	return parseInt( StringEx.getRemoveAtResult( color, 0 ), 16 );
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

Math.MinNumber = 0.000000001;
Math.MaxNumber = 99999999.0;
Math.ARC = Math.PI * 2;