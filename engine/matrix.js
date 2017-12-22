function Matrix( mat )
{
	this.mat = new Array( );

	this.typeid = Matrix.typeid;

	this.set = function( mat )
	{
		if ( mat.typeid == Matrix.typeid )
			mat = mat.mat

		this.mat[0] = mat[0];
		this.mat[1] = mat[1];
		this.mat[2] = mat[2];
                      
		this.mat[3] = mat[3];
		this.mat[4] = mat[4];
		this.mat[5] = mat[5];
                      
		this.mat[6] = mat[6];
		this.mat[7] = mat[7];
		this.mat[8] = mat[8];

		if ( this.callback != null && Global.isFunction( this.callback ) )
			this.callback( );
	}

	this.reset = function( )
	{
		this.mat[0] = 1;
		this.mat[1] = 0;
		this.mat[2] = 0;

		this.mat[3] = 0;
		this.mat[4] = 1;
		this.mat[5] = 0;

		this.mat[6] = 0;
		this.mat[7] = 0;
		this.mat[8] = 1;

		if ( this.callback != null && Global.isFunction( this.callback ) )
			this.callback( );
	}

	this.setTranslation = function(x, y)
	{
		this.reset( );
		this.mat[6] = x;
		this.mat[7] = y;

		if ( this.callback != null && Global.isFunction( this.callback ) )
			this.callback( );
	}

	this.getTranslation = function( )
	{
		return {x:this.mat[6], y:this.mat[7]};
	}

	this.setRotation = function(r)
	{
		this.reset( );

		r = Math.convertRadian(r);

		this.mat[0] = Math.cos(r);
		this.mat[1] = Math.sin(r);
		this.mat[3] = -Math.sin(r);
		this.mat[4] = Math.cos(r);

		if ( this.callback != null && Global.isFunction( this.callback ) )
			this.callback( );
	}

	this.setRotationX = function(r)
	{
		this.reset( );

		r = Math.convertRadian(r);
		this.mat[0] = Math.cos(r);
		this.mat[1] = Math.sin(r);

		if ( this.callback != null && Global.isFunction( this.callback ) )
			this.callback( );
	}

	this.setRotationY = function(r)
	{
		this.reset( );

		r = Math.convertRadian(r);
		this.mat[3] = -Math.sin(r);
		this.mat[4] = Math.cos(r);

		if ( this.callback != null && Global.isFunction( this.callback ) )
			this.callback( );
	}

	this.setScaling = function(x, y)
	{
		this.reset( );
		this.mat[0] = x;
		this.mat[4] = y;

		if ( this.callback != null && Global.isFunction( this.callback ) )
			this.callback( );
	}

	this.getScaling = function( )
	{
		return {
			x : Math.sqrt( this.mat[0] * this.mat[0] + this.mat[1] * this.mat[1] ),
			y : Math.sqrt( this.mat[3] * this.mat[3] + this.mat[4] * this.mat[4] ) };
	}

	this.mulTranslationRight = function(x, y)
	{
		var matrix = new Matrix( );
		matrix.mat[6] += x;
		matrix.mat[7] += y;
		this.mulRight(matrix);
	}

	this.mulRotationRight = function(r)
	{
		r = Math.convertRadian(r);

		var matrix = new Matrix( );
		matrix.mat[0] = Math.cos(r);
		matrix.mat[1] = Math.sin(r);
		matrix.mat[3] = -Math.sin(r);
		matrix.mat[4] = Math.cos(r);
		this.mulRight(matrix);
	}

	this.mulRotationXRight = function(r)
	{
		r = Math.convertRadian(r);

		var matrix = new Matrix( );
		matrix.mat[0] = Math.cos(r);
		matrix.mat[1] = Math.sin(r);
		this.mulRight(matrix);
	}

	this.mulRotationYRight = function(r)
	{
		r = Math.convertRadian(r);

		var matrix = new Matrix( );
		matrix.mat[3] = -Math.sin(r);
		matrix.mat[4] = Math.cos(r);
		this.mulRight(matrix);
	}

	this.mulRotationXYRight = function(rx, ry)
	{
		rx = Math.convertRadian(rx);
		ry = Math.convertRadian(ry);

		var matrix = new Matrix( );
		matrix.mat[0] = Math.cos(rx);
		matrix.mat[1] = Math.sin(rx);
		matrix.mat[3] = -Math.sin(ry);
		matrix.mat[4] = Math.cos(ry);
		this.mulRight(matrix);
	}

	this.mulScalingRight = function(x, y)
	{
		var matrix = new Matrix( );
		matrix.mat[0] = x;
		matrix.mat[4] = y;
		this.mulRight(matrix);
	}

	this.mulTranslationLeft = function(x, y)
	{
		var matrix = new Matrix( );
		matrix.mat[6] += x;
		matrix.mat[7] += y;
		this.mulLeft(matrix);
	}

	this.mulRotationLeft = function(r)
	{
		r = Math.convertRadian(r);

		var matrix = new Matrix( );
		matrix.mat[0] = Math.cos(r);
		matrix.mat[1] = Math.sin(r);
		matrix.mat[3] = -Math.sin(r);
		matrix.mat[4] = Math.cos(r);
		this.mulLeft(matrix);
	}

	this.mulRotationXLeft = function(r)
	{
		r = Math.convertRadian(r);

		var matrix = new Matrix( );
		matrix.mat[0] = Math.cos(r);
		matrix.mat[1] = Math.sin(r);
		this.mulLeft(matrix);
	}

	this.mulRotationYLeft = function(r)
	{
		r = Math.convertRadian(r);

		var matrix = new Matrix( );
		matrix.mat[3] = -Math.sin(r);
		matrix.mat[4] = Math.cos(r);
		this.mulLeft(matrix);
	}

	this.mulRotationXYLeft = function(rx, ry)
	{
		rx = Math.convertRadian(rx);
		ry = Math.convertRadian(ry);

		var matrix = new Matrix( );
		matrix.mat[0] = Math.cos(rx);
		matrix.mat[1] = Math.sin(rx);
		matrix.mat[3] = -Math.sin(ry);
		matrix.mat[4] = Math.cos(ry);
		this.mulLeft(matrix);
	}

	this.mulScalingLeft = function(x, y)
	{
		var matrix = new Matrix( );
		matrix.mat[0] = x;
		matrix.mat[4] = y;
		this.mulLeft(matrix);
	}

	this.mulRight = function(matrix)
	{
		var mat00 = this.mat[0], mat01 = this.mat[1], mat02 = this.mat[2], mat10 = this.mat[3], mat11 = this.mat[4], mat12 = this.mat[5], mat20 = this.mat[6], mat21 = this.mat[7], mat22 = this.mat[8];

		var temp = matrix.mat;

		this.mat[0] = mat00 * temp[0] + mat01 * temp[3] +  mat02 * temp[6];
		this.mat[1] = mat00 * temp[1] + mat01 * temp[4] +  mat02 * temp[7];
		this.mat[2] = mat00 * temp[2] + mat01 * temp[5] +  mat02 * temp[8];

		this.mat[3] = mat10 * temp[0] + mat11 * temp[3] +  mat12 * temp[6];
		this.mat[4] = mat10 * temp[1] + mat11 * temp[4] +  mat12 * temp[7];
		this.mat[5] = mat10 * temp[2] + mat11 * temp[5] +  mat12 * temp[8];

		this.mat[6] = mat20 * temp[0] + mat21 * temp[3] +  mat22 * temp[6];
		this.mat[7] = mat20 * temp[1] + mat21 * temp[4] +  mat22 * temp[7];
		this.mat[8] = mat20 * temp[2] + mat21 * temp[5] +  mat22 * temp[8];

		if ( this.callback != null && Global.isFunction( this.callback ) )
			this.callback( );
	}

	this.mulLeft = function(matrix)
	{
		var mat00 = this.mat[0], mat01 = this.mat[1], mat02 = this.mat[2], mat10 = this.mat[3], mat11 = this.mat[4], mat12 = this.mat[5], mat20 = this.mat[6], mat21 = this.mat[7], mat22 = this.mat[8];
		
		var temp = matrix.mat;

		this.mat[0] = temp[0] * mat00 + temp[1] * mat10 + temp[2] * mat20; 
		this.mat[1] = temp[0] * mat01 + temp[1] * mat11 + temp[2] * mat21; 
		this.mat[2] = temp[0] * mat02 + temp[1] * mat12 + temp[2] * mat22; 

		this.mat[3] = temp[3] *  mat00 + temp[4] * mat10 + temp[5] * mat20; 
		this.mat[4] = temp[3] *  mat01 + temp[4] * mat11 + temp[5] * mat21; 
		this.mat[5] = temp[3] *  mat02 + temp[4] * mat12 + temp[5] * mat22; 
        
		this.mat[6] = temp[6] *  mat00 + temp[7] * mat10 + temp[8] * mat20; 
		this.mat[7] = temp[6] *  mat01 + temp[7] * mat11 + temp[8] * mat21; 
		this.mat[8] = temp[6] *  mat02 + temp[7] * mat12 + temp[8] * mat22;

		if ( this.callback != null && Global.isFunction( this.callback ) )
			this.callback( );
	}

	this.mul = function(v)
	{
		return {
				x:v.x * this.mat[0] + v.y * this.mat[3] + this.mat[6],
				y:v.x * this.mat[1] + v.y * this.mat[4] + this.mat[7],
				}
	}

	// Set x aixs to direction.
	this.setXDirection = function( x, y )
	{
		var dir = new Vector2( x, y );
		dir.normalsize( );
		var vv = new Vector2( this.mat[0], this.mat[1] );
		vv.normalsize( );
		if ( Math.abs( dir.x - vv.x ) < Math.MinNumber && Math.abs( dir.y - vv.y ) < Math.MinNumber )
			return;

		var r = Vector2.angle( vv, new Vector2( 1, 0 ) );
		this.mulRotationLeft( r );
	}

	// Set y aixs to direction.
	this.setYDirection = function( x, y )
	{
		var dir = new Vector2( x, y );
		dir.normalsize( );
		var vv = new Vector2( this.mat[3], this.mat[4] );
		vv.normalsize( );
		if ( Math.abs( dir.x - vv.x ) < Math.MinNumber && Math.abs( dir.y - vv.y ) < Math.MinNumber )
			return;

		var r = Vector2.angle( vv, dir );
		this.mulRotationLeft( r );
	}

	this.inverse = function( )
	{
		var d = this.determinant( );

		if ( d != 0 )
		{
			this.adjoint( );

			d = 1 / d;
			this.mat[0] *= d; this.mat[1] *= d; this.mat[2] *= d;
			this.mat[3] *= d; this.mat[4] *= d; this.mat[5] *= d;
			this.mat[6] *= d; this.mat[7] *= d; this.mat[8] *= d;

		}

		return this;
	}

	this.adjoint = function( )
	{
		var m00 = this.mat[0], m01 = this.mat[1], m02 = this.mat[2]; 
		var m10 = this.mat[3], m11 = this.mat[4], m12 = this.mat[5];
		var m20 = this.mat[6], m21 = this.mat[7], m22 = this.mat[8];

		this.mat[0] = m11 * m22 - m12 * m21; this.mat[1] = m02 * m21 - m01 * m22; this.mat[2] = m01 * m12 - m02 * m11;
		this.mat[3] = m12 * m20 - m10 * m22; this.mat[4] = m00 * m22 - m02 * m20; this.mat[5] = m02 * m10 - m00 * m12;
		this.mat[6] = m10 * m21 - m11 * m20; this.mat[7] = m01 * m20 - m00 * m21; this.mat[8] = m00 * m11 - m01 * m10;

		return this;
	}

	this.determinant = function( )
	{
		return this.mat[0] * this.mat[4] *this.mat[8] + this.mat[1] * this.mat[5] * this.mat[6] + this.mat[2] * this.mat[3] * this.mat[7] - this.mat[0] * this.mat[5] * this.mat[7] - this.mat[1] * this.mat[3] * this.mat[8] - this.mat[2] *this.mat[4] *this.mat[6];
	}

	this.toString = function( )
	{
		return 'm00:' + this.mat[0] + ' m01:' + this.mat[1] + ' m02:' +  this.mat[2] + '\nm10:' + this.mat[3] + ' m11:' + this.mat[4] + ' m12:' +  this.mat[5] +'\nm20:' + this.mat[6] + ' m21:' + this.mat[7] + ' m22:' +  this.mat[8];
	}

	this.resetTranslation = function( )
	{
	}

	this.resetRoation = function( )
	{
	}

	this.resetScaling = function( )
	{
	}

	this.getRotation = function( )
	{
		var q = new Quaternion( )
		this.decompose( q );
		var v = new Vector4( );
		q.decompose( v );
		return Math.convertAngle(v.w);
	}
	//Quaternion q 
	this.rotation = function( q )
	{
		var xx = q.x * q.x * 2.0, yy = q.y * q.y * 2.0, zz = q.z * q.z * 2.0;
		var xy = q.x * q.y * 2.0, zw = q.z * q.w * 2.0, xz = q.x * q.z * 2.0;
		var yw = q.y * q.w * 2.0, yz = q.y * q.z * 2.0, xw = q.x * q.w * 2.0;

		var m = this.mat
		m[0] = 1.0 - yy - zz; m[1] = xy + zw; m[2] =  xz - yw;
		m[3] = xy - zw; m[4] = 1.0 - xx - zz; m[5] = yz + xw;
		m[6] = xz + yw; m[7] = yz - xw; m[8] = 1.0 - xx - yy;

		return this;
	}

	//Quaternion q
	this.decompose = function( q )
	{
		var m = this.mat
		// Determine which of w, x, y, or z has the largest absolute value.
		var fourWSquaredMinus1 = m[0] + m[4] + m[8];
		var fourXSquaredMinus1 = m[0] - m[4] - m[8];
		var fourYSquaredMinus1 = m[4] - m[0] - m[8];
		var fourZSquaredMinus1 = m[8] - m[0] - m[4];

		var biggestIndex = 0;
		var fourBiggestSquaredMinus1 = fourWSquaredMinus1;

		if ( fourXSquaredMinus1 > fourBiggestSquaredMinus1 )
		{
			fourBiggestSquaredMinus1 = fourXSquaredMinus1;
			biggestIndex = 1;
		}

		if ( fourYSquaredMinus1 > fourBiggestSquaredMinus1 )
		{
			fourBiggestSquaredMinus1 = fourYSquaredMinus1;
			biggestIndex = 2;
		}

		if ( fourZSquaredMinus1 > fourBiggestSquaredMinus1 )
		{
			fourBiggestSquaredMinus1 = fourZSquaredMinus1;
			biggestIndex = 3;
		}

		var biggestVal = Math.sqrt( fourBiggestSquaredMinus1 + 1 ) * 0.5;
		var mult = 0.25 / biggestVal;

		// Apply table to compute quaternion values.
		switch ( biggestIndex )
		{
			case 0:
				q.w = biggestVal;
				q.x = ( m[5] - m[7] ) * mult;
				q.y = ( m[6] - m[2] ) * mult;
				q.z = ( m[1] - m[3] ) * mult;
				break;

			case 1:
				q.x = biggestVal;
				q.w = (m[5] - m[7] ) * mult;
				q.y = ( m[1] + m[3] ) * mult;
				q.z = ( m[6] + m[2] ) * mult;
				break;

			case 2:
				q.y = biggestVal;
				q.w = ( m[6] - m[2] ) * mult;
				q.x = ( m[2] + m[3] ) * mult;
				q.z = ( m[5] + m[7] ) * mult;
				break;

			case 3:
				q.z = biggestVal;
				q.w = ( m[1] - m[3] ) * mult;
				q.x = ( m[6] + m[2] ) * mult;
				q.y = ( m[5] + m[7] ) * mult;
				break;
		}
		
		return q;
	}

	if ( mat != null )
		this.set( mat );
	else
		this.reset( );
}

Matrix.isIdentity = function( mat )
{
	var mm = mat.mat;
	return mm[0] == 1 && mm[1] == 0 && mm[3] == 0 &&
		mm[4] == 1 && mm[6] == 0 && mm[7] == 0;
}

Matrix.cIdentity = new Matrix( );

Matrix.typeid = Global.OBJECTID ++;