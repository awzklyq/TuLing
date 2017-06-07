function Matrix( mat )
{
	this.mat = new Array( );

	this.set = function( mat )
	{
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
		this.mat[0] = Math.cos(r);
		this.mat[1] = Math.sin(r);
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
		var matrix = new Matrix( );
		matrix.mat[0] = Math.cos(r);
		matrix.mat[1] = Math.sin(r);
		matrix.mat[3] = -Math.sin(r);
		matrix.mat[4] = Math.cos(r);
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
		var matrix = new Matrix( );
		matrix.mat[0] = Math.cos(r);
		matrix.mat[1] = Math.sin(r);
		matrix.mat[3] = -Math.sin(r);
		matrix.mat[4] = Math.cos(r);
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
		var dir = new Vector( x, y );
		dir.normalsize( );
		var vv = new Vector( this.mat[0], this.mat[1] );
		vv.normalsize( );
		if ( Math.abs( dir.x - vv.x ) < Math.MinNumber && Math.abs( dir.y - vv.y ) < Math.MinNumber )
			return;

		var r = Vector.angle( vv, new Vector( 1, 0 ) );
		this.mulRotationLeft( r );
	}

	// Set y aixs to direction.
	this.setYDirection = function( x, y )
	{
		var dir = new Vector( x, y );
		dir.normalsize( );
		var vv = new Vector( this.mat[3], this.mat[4] );
		vv.normalsize( );
		if ( Math.abs( dir.x - vv.x ) < Math.MinNumber && Math.abs( dir.y - vv.y ) < Math.MinNumber )
			return;

		var r = Vector.angle( vv, dir );
		this.mulRotationLeft( r );
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