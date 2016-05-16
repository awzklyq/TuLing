function CommonVector( )
{
	this.x = 0;
	this.y = 0;
}

var cv = new CommonVector( );

function Vector(x, y)
{
	this.x = 0;
	this.y = 0;

	if (x != null)
	{
		this.x = x;
	}

	if(y != null)
	{
		this.y = y;
	}
	
	this.normalsize = function()
	{
		var w =  Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
		if ( isNaN( w ) )
			return;

		this.x /= w;
		this.y /= w;

		if ( isNaN( this.x ) )
			this.x = 0;

		if ( isNaN( this.y ) )
			this.y = 0;
	}

	this.print = function( )
	{
		document.writeln("x : " + this.x + " y : " + this.y + '\n');
	}
}

Vector.add = function(v1, v2, out)
{
	if(out !=  null)
	{
		out.x = v1.x + v2.x;
		out.y = v1.y + v2.y;
		return out;
	}
	return new Vector(v1.x + v2.x, v1.y + v2.y)
}

Vector.sub = function(v1, v2, out)
{
	if(out !=  null)
	{
		out.x = v1.x - v2.x;
		out.y = v1.y - v2.y;
		return out;
	}
	return new Vector(v1.x - v2.x, v1.y - v2.y);
}

Vector.mul = function(v1, s, out)
{
	if(out !=  null)
	{
		out.x = v1.x * s;
		out.y = v1.y * s;
		return out;
	}
	return new Vector(v1.x * s, v1.y * s);
}

Vector.distance = function(v1, v2)
{
	return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2))
}

Vector.length = function(v1)
{
	return Math.sqrt(Math.pow(v1.x, 2) + Math.pow(v1.y, 2));
}

Vector.dot = function(v1, v2)
{
	return v1.x * v2.x + v1.y * v2.y;
}

Vector.angle = function(v1, v2)
{
	var v11 = new Vector(v1.x, v1.y);
	v11.normalsize( );

	var v22 = new Vector(v2.x, v2.y)
	v2.normalsize( );
	return Math.acos(Vector.dot(v11, v22))
}

// Add by 2016.01.19.
// Static intersect, v1 and v2, v3 and v4.
Vector.Intersect = function( v1, v2, v3, v4 )
{
	var k1 = Math.MaxNumber;
	if ( v2.x - v1.x != 0 )
	{
		k1 = ( v2.y - v1.y ) / ( v2.x - v1.x );
	}

	var k2 = Math.MaxNumber;
	if ( v4.x - v3.x != 0 )
	{
		k2 = ( v4.y - v3.y ) / ( v4.x - v3.x );
	}

	if ( Math.abs( k1 - k2 ) > Math.MinNumber )
	{
		var d1 = v1.y - v1.x * k1;
		var r1 = k1 * v3.x + d1;
		var r2 = k1 * v4.x + d1;
		var temp1 = ( r1 >= v3.y && r2 <= v4.y ) || ( r1 <= v3.y && r2 >= v4.y );

		var d2 = v3.y - v3.x * k2;
		r1 = k2 * v1.x + d2;
		r2 = k2 * v2.x + d2;
		var temp2 = ( r1 >= v1.y && r2 <= v2.y ) || ( r1 <= v1.y && r2 >= v2.y );
		return temp1 && temp2;
	}

	return false;
}