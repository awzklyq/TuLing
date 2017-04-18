function ArrayEx( )
{
	this.removeAt = function( i )
	{
		if ( Global.isNumber( i ) == false )
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
		if ( Global.isNumber( i ) == false || element == null )
			return;

		this.splice( i, 0, element );
	}

	this.insertBinary = function( element, start, end )
	{
		if ( this.length == 0 )
		{
			this.push( element );
			return;
		}

		var index = Math.floor( ( start + end ) * 0.5 );
		var temp1 = element;
		// TODO.. i don't know why.
		var temp2 = Global.isUndefined( arguments[3] ) ? this[index] : Global.copyObject( this[index] );
		for ( var i = 3; i < arguments.length; i ++ )
		{
			if ( Global.isUndefined( arguments[i] ) )
				break;

			temp1 = temp1[arguments[i]];
			temp2 = temp2[arguments[i]];
		}

		if ( start == end )
		{
			if ( temp1 > temp2 )
				this.insert( index + 1, element );
			else
				this.insert( index, element );
			return;
		}

		if ( temp1 == temp2 )
			this.insert( index, element );
		else if ( temp1 > temp2 )
			this.insertBinary( element, Math.clamp( index + 1, 0, end ), end, arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9] );
		else
			this.insertBinary( element, start, Math.clamp( index - 1, 0, end ), arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9] ); 
	}

}

ArrayEx.prototype = new Array( );