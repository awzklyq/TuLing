function ArrayEx( )
{
	this.typeid = Global.Array_typeid;
	this.type = ArrayEx.Normal;
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

	this.findHelper = function( element )
	{
		if ( arguments.length == 1 )
			return this.find( element );

		var temp1 = element;
		for ( var i = 1; i < arguments.length; i ++ )
			temp1 = temp1[arguments[i]];

		for ( var i = 0; i < this.length; i ++ )
		{
			var temp2 = this[i];
			for ( var j = 1; j < arguments.length; j ++ )
				temp2 = temp2[arguments[j]];

			if ( temp2 == temp1 )
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
		if ( start < 0 || end >= this.length || this.length == 0 || start >= this.length || Global.isUndefined( arguments[3] ) )
		{
			if ( this.type == ArrayEx.Normal )
				this.push( element );
			else
				this.unshift( element );
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
			temp2 = Global.isObject( temp2[arguments[i]] ) ? Global.copyObject( temp2[arguments[i]] ) : temp2[arguments[i]];
		}

		if ( start == end )
		{
			if ( this.type == ArrayEx.Normal )
			{
				if ( temp1 >= temp2 )
					this.insert( index + 1, element );
				else
					this.insert( index, element );
			}
			else
			{
				if ( temp1 >= temp2 )
					this.insert( index, element );
				else
					this.insert( index + 1, element );
			}

			return;
		}

		if ( temp1 == temp2 )
			this.insert( this.type == ArrayEx.Normal ? index + 1: index, element );
		else if ( temp1 > temp2 )
			this.insertBinary( element, Math.clamp( this.type == ArrayEx.Normal ? index + 1 : index - 1, 0, end ), end, arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9] );
		else
			this.insertBinary( element, start, Math.clamp( this.type == ArrayEx.Normal ? index - 1 : index + 1, 0, end ), arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9] ); 
	}
	
	this.insertSorting = function( element, start, end )
	{
		if ( start < 0 || end >= this.length || this.length == 0 || start >= this.length || Global.isUndefined( arguments[3] ) )
		{
			if ( this.type == ArrayEx.Normal )
				this.push( element );
			else
				this.unshift( element );
			return;
		}

		var index = Math.floor( ( start + end ) * 0.5 );
		var temp1 = element;
		// TODO.. i don't know why.
		var temp2 = this[index];
		for ( var i = 3; i < arguments.length; i ++ )
		{
			if ( Global.isUndefined( arguments[i] ) )
				break;

			temp1 = temp1[arguments[i]];
			temp2 = temp2[arguments[i]]
		}

		if ( start == end )
		{
			if ( this.type == ArrayEx.Normal )
			{
				if ( temp1 > temp2 )
					this.insert( index + 1, element );
				else
					this.insert( index, element );
			}
			else
			{
				if ( temp1 >= temp2 )
					this.insert( index, element );
				else
					this.insert( index + 1, element );
			}
			return;
		}

		if ( temp1 == temp2 )
			this.insert( this.type == ArrayEx.Normal ? index: index + 1, element );
		else if ( temp1 > temp2 )
			this.insertSorting( element, Math.clamp( this.type == ArrayEx.Normal ? index + 1 : index - 1, 0, end ), end, arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9] );
		else
			this.insertSorting( element, start, Math.clamp( this.type == ArrayEx.Normal ? index - 1 : index + 1, 0, end ), arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9] ); 
	}

}

ArrayEx.prototype = new Array( );
ArrayEx.Normal = 0;
ArrayEx.ReversSort = 1;