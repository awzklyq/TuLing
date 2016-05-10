function StringEx( )
{
	// TODO.
}

StringEx.prototype = new String( );

StringEx.getSubString = function( str, start, end )
{
	if ( Global.isString( str ) == false || Global.isNumber( start ) == false )
	{
		log( "StringEx.getSubString params is null !" );
		return "";
	}

	return str.substring( start, end );
}

StringEx.getStringPixelSize = function( str )
{
	if ( Global.isString( str ) == false )
	{
		log( "StringEx.getStringPixelSize params is null !" );
		return 0;
	}

	return window.context.measureText( str ).width;
}


StringEx.getCharAt = function( str, index )
{
	if ( Global.isString( str ) == false || Global.isNumber( index ) == false )
	{
		log( "StringEx.getCharAt params is null !" );
		return "";
	}

	return str.charAt( index );
}

StringEx.findSubString = function( parent, sub )
{
	if ( Global.isString( parent ) == false || Global.isString( sub ) == false )
	{
		log( "StringEx.findSubString params is null !" );
		return 0;
	}

	return parent.indexOf( sub );
}

StringEx.lastFindSubString = function( parent, sub )
{
	if ( Global.isString( parent ) == false || Global.isString( sub ) == false )
	{
		log( "StringEx.lastFindSubString params is null !" );
		return 0;
	}

	return parent.lastIndexOf( sub );
}

StringEx.getUnicode = function( param )
{
	if ( Global.isNumber( param ) == false )
		return '';

	return String.fromCharCode( param );
}

StringEx.getInsertResult = function( str, i, element )
{
	if ( Global.isString( str ) == false || Global.isNumber( i ) == false || Global.isString( element ) == false )
		return "";

	return str.substring( 0, i ) + element + str.substring( i, str.length );
}

StringEx.getRemoveAtResult = function( str, i )
{
	if ( Global.isString( str ) == false )
		return "";

	if ( Global.isNumber( i ) == false || i < 0 )
		return str;

	i = Math.max( i, 0 );
	
	return str.substring( 0, i - 1 ) + str.substring( i, str.length );
}

StringEx( );


