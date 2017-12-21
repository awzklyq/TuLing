function Quaternion( x, y, z, w )
{
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
	this.w = w || 1;
	
	this.identity = function( )
	{
		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.w = 1;
	}

	this.magnitude = function( )
	{ 
		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w ); 
	}

	this.normalize = function( )
	{
		var m = this.magnitude( );
		if ( m > 0 ) 
			{ this.x /= m; this.y /= m; this.z /= m; };

		return this
	}
	
	// aix->x, y, z  r->w.
	this.decompose = function( v4 )
	{
		var m = this.x * this.x + this.y * this.y + this.z * this.z;

		if ( m > Math.MinNumber )
		{
			m = Math.sqrt( m );

			v4.x = this.x / m;
			v4.y = this.y / m;
			v4.z = this.z / m;
			v4.w = 2.0f * Math.acos( this.w );
		}
		else
		{
			v4.x = 0.0f;
			v4.y = 0.0f;
			v4.z = 1.0f;
			v4.w = 0.0f;
		}

		v4.normalize( );
	}
	//Vector3 a, number r
	this.rotation = function( a, r )
	{
		var n = new Vector3( a.x, a.y, a.z );
		n.normalize( );
		var sinvalue = Math.sin( r * 0.5 );
		x = sinvalue * n.x;
		y = sinvalue * n.y;
		z = sinvalue * n.z;
		w = Math.cos( r * 0.5f );
		return this;
	}
}