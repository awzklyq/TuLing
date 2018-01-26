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
			v4.w = 2 * Math.acos( this.w );
		}
		else
		{
			v4.x = 0;
			v4.y = 0;
			v4.z = 1;
			v4.w = 0;
		}

		v4.normaliz3( );
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
		w = Math.cos( r * 0.5 );
		return this;
	}
}

// Quaternion q1 q2
Quaternion.sdot = function( q1, q2 )
{
	return q1.x * q2.x + q1.y * q2.y + q1.z * q2.z + q1.w * q2.w; 
}

// Quaternion q1 q2, weight f
Quaternion.slerp = function( q1, q2, f )
{
	f = Math.clamp( f, 0, 1 );

	var dot = Quaternion.sdot( q1, q2 );

	var flip = dot < 0;

	if ( dot < 0 )
		dot = -dot;

	var d = 0;

	if ( 1 - dot < Math.cEpsilon )
	{
		d = 1 - f;
	}
	else
	{
		var theta = Math.acos( dot );
		var recipsqrt = 1 / Math.sin( theta );

		d = Math.sin( ( 1 - f ) * theta ) * recipsqrt;
		f = Math.sin( f * theta ) * recipsqrt;
	}

	if ( flip )
		f = -f;

	return new Quaternion(
		q1.x * d + q2.x * f,
		q1.y * d + q2.y * f,
		q1.z * d + q2.z * f,
		q1.w * d + q2.w * f );
}