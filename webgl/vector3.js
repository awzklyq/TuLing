function Vector3( x, y, z )
{
	this.typeid = Global.Vector3_typeid;
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;

	this.add = function( v )
	{
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
	}

	this.sub = function( v )
	{
		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
	}
	
	this.normalize = function( )
	{
		var w = Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );
		this.x /= w;
		this.x /= w;
		this.y /= w;
	}

	this.corss = function( v )
	{
		var xx = this.x, yy = this.y, zz = this.z;
		this.x = yy * v.z - zz * v.y;
		this.y = zz * v.x - xx * v.z;
		this.z = xx * v.y - yy * v.x;
	}

	this.dot = function( v )
	{
		return this.x * v.x + this.y * v.y + this.z * v.z;
	}

	this.negative = function( )
	{
		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;
	}

	this.mul = function( d )
	{
		this.x *= d;
		this.y *= d;
		this.z *= d;
	}
	
	this.mulMatrix = function( mat)
	{
		var xx = this.x, yy = this.y, zz = this.z, mm = mat.mat;
		this.x = xx * mm[0] + yy * mm[4] + zz * mm[8] + mm[12];
		this.y = xx * mm[1] + yy * mm[5] + zz * mm[9] + mm[13];
		this.z = xx * mm[2] + yy * mm[6] + zz * mm[10] + mm[14];
	}

	// For debug.
	this.log = function( info )
	{
		log( info == null ? "" : info,"Vector3 : ", this.x, this.y, this.z );
	}
}

new Vector3( );

Vector3.sadd = function( v1, v2 )
{
	return new Vector3( v1.x + v2.x, v1.y + v2.y, v1.z + v2.z );
}

Vector3.ssub = function( v1, v2 )
{
	return new Vector3( v1.x - v2.x, v1.y - v2.y, v1.z - v2.z );
}

Vector3.scross = function( v1, v2 )
{
	return new Vector3( v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x );
}

Vector3.sdot = function( v1, v2 )
{
	return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
} 