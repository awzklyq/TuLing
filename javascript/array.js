function ArrayEx( )
{
	this.removeAt = function( i )
	{
		if ( Golbal.isNumber( i ) == false )
			return;

		this.splice( i, 1 );
	}
	
	this.remove = function( element )
	{
		if ( element == null )
			return;

		var index = this.find( element );
		if ( index != -1 )
			this.splice( index, 1 );
	}

	this.clear = function( )
	{
		this.splice( 0, this.length );
	}

	this.find = function( element )
	{
		for ( var i = 0; i < this.length; i ++ )
		{
			if ( this[i] == element )
				return i;
		}

		return -1;
	}

	this.insert = function( i, element )
	{
		if ( Golbal.isNumber( i ) == false || element == null )
			return;

		this.splice( i, 0, element );
	}
}

ArrayEx.prototype = new Array( );