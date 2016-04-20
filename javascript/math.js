Math.randomAt = function( d )
{
	return Math.random() * d
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

Math.MinNumber = 0.000000001;
Math.MaxNumber = 99999999.0;