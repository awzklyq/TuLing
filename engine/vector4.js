function Vector4(x, y, z, w)
{
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
	this.w = w || 0;
	this.normaliz3 = function( )
	{ 
		var m = this.magnitude3( );
		if ( m > 0 )
			{ this.x /= m; this.y /= m; this.z /= m; }
		return this; 
	}
	this.magnitude3 = function( )
	{ 
		return Math.sqrt( x * x + y * y + z * z ); 
	}
}