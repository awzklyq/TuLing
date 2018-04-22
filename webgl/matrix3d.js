function Matrix3D( )
{
	this.mat = new Float32Array( 16 );

	this.reset = function( )
	{
		this.mat[0] = 1.0, this.mat[1] = 0.0, this.mat[2] = 0.0, this.mat[3] = 0.0;
		this.mat[4] = 0.0, this.mat[5] = 1.0, this.mat[6] = 0.0, this.mat[7] = 0.0;
		this.mat[8] = 0.0, this.mat[9] = 0.0, this.mat[10] = 1.0, this.mat[11] = 0.0;
		this.mat[12] = 0.0, this.mat[13] = 0.0, this.mat[14] = 0.0, this.mat[15] = 1.0;
	}

	this.reset( );

	this.translate = function( x, y, z )
	{
		this.mat[12] = x, this.mat[13] = y, this.mat[14] = z, this.mat[15] = 1.0;
	}

	this.setTranslation = function( x, y, z )
	{
		var isvec = arguments.length == 1 && arguments[0].typeid == Global.Vector3_typeid;
		var xx = isvec ? arguments[0].x : x;
		var yy = isvec ? arguments[0].y : y;
		var zz = isvec ? arguments[0].z : z;
		this.mat[0] = 1.0, this.mat[1] = 0.0, this.mat[2] = 0.0, this.mat[3] = 0.0;
		this.mat[4] = 0.0, this.mat[5] = 1.0, this.mat[6] = 0.0, this.mat[7] = 0.0;
		this.mat[8] = 0.0, this.mat[9] = 0.0, this.mat[10] = 1.0, this.mat[11] = 0.0;
		this.mat[12] = xx, this.mat[13] = yy, this.mat[14] = zz, this.mat[15] = 1.0;
	}

	this.getTranslation = function( vec )
	{
		if ( vec != null && vec.typeid == Global.Vector3_typeid)
		{
			vec.x = this.mat[12];
			vec.y = this.mat[13];
			vec.z = this.mat[14];
			return;
		}

		return new Vector3( this.mat[12], this.mat[13], this.mat[14] );
	}

	this.mulTranslationRight = function( x, y, z )
	{
		var mat = new Matrix3D( );
		mat.mat[12] = x, mat.mat[13] = y, mat.mat[14] = z, mat.mat[15] = 1.0;
		this.mulRight( mat );
	}

	this.mulTranslationLeft = function( x, y, z )
	{
		var mat = new Matrix3D( );
		mat.mat[12] = x, mat.mat[13] = y, mat.mat[14] = z, mat.mat[15] = 1.0;
		this.mulLeft( mat );
	}

	this.scale = function( x, y, z )
	{
		this.mat[0] *= x, this.mat[1] *= x, this.mat[2] *= x;
		this.mat[4] *= y, this.mat[5] *= y, this.mat[6] *= y;
		this.mat[8] *= z, this.mat[9] *= z, this.mat[10] *= z;
	}

	this.mulScalingLeft = this.scale;

	this.mulScalingRight = function( x, y, z )
	{
		var mat = new Matrix3D( );
		mat.mat[0] = x;
		mat.mat[5] = y;
		mat.mat[10] = z;

		this.mulRight( mat );
	}

	this.setScaling = function( x, y, z )
	{
		this.mat[0] = x, this.mat[1] = 0.0, this.mat[2] = 0.0, this.mat[3] = 0.0;
		this.mat[4] = 0.0, this.mat[5] = y, this.mat[6] = 0.0, this.mat[7] = 0.0;
		this.mat[8] = 0.0, this.mat[9] = 0.0, this.mat[10] = z, this.mat[11] = 0.0;
		this.mat[12] = 0.0, this.mat[13] = 0.0, this.mat[14] = 0.0, this.mat[15] = 1.0;
	}

	this.rotation = function( x, y, z, r )
	{
		r = Math.convertRadian(r);
		var sinvalue = Math.sin( r ), cosvalue = Math.cos( r );
		var cosreverse = 1.0 - cosvalue;

		var m = Math.sqrt(x*x + y*y + z*z);
		x /= m;
		y /= m;
		z /= m;

		var mat = new Matrix3D( );
		var mm = mat.mat;
		mm[0] = cosreverse * x * x + cosvalue;
		mm[1] = cosreverse * x * y + sinvalue * z;
		mm[2] = cosreverse * x * z - sinvalue * y;
		mm[3] = 0.0;

		mm[4] = cosreverse * x * y - sinvalue * z;
		mm[5] = cosreverse * y * y + cosvalue;
		mm[6] = cosreverse * y * z + sinvalue * x;
		mm[7] = 0.0;

		mm[8] = cosreverse * x * z + sinvalue * y;
		mm[9] = cosreverse * y * z - sinvalue * x;
		mm[10] = cosreverse * z * z + cosvalue;
		mm[11] = 0.0;

		mm[12] = 0.0;
		mm[13] = 0.0;
		mm[14] = 0.0;
		mm[15] = 1.0;

		return mat;
	}

	this.mulRotationLeft = function( x, y, z, r )
	{
		this.mulLeft( this.rotation( x, y, z, r ) )
	}

	this.mulRotationRight = function( x, y, z, r )
	{
		this.mulRight( this.rotation( x, y, z, r ) )
	}

	this.rotationX = function( r )
	{
		r = Math.convertRadian(r);
		var sinvalue = Math.sin( r ), cosvalue = Math.cos( r );

		var mat = new Matrix3D( );
		var mm = mat.mat;
		mm[0] = 1.0;
		mm[1] = 0.0;
		mm[2] = 0.0;
		mm[3] = 0.0;

		mm[4] = 0.0;
		mm[5] = cosvalue;
		mm[6] = sinvalue;
		mm[7] = 0.0;

		mm[8] = 0.0;
		mm[9] = -sinvalue;
		mm[10] = cosvalue;
		mm[11] = 0.0;

		mm[12] = 0.0;
		mm[13] = 0.0;
		mm[14] = 0.0;
		mm[15] = 1.0;

		return mat;
	}

	this.mulRotationXLeft = function( r )
	{
		this.mulLeft( this.rotationX( r ) )
	}

	this.mulRotationXRight = function( r )
	{
		this.mulRight( this.rotationX( r ) )
	}

	this.rotationY = function( r )
	{
		r = Math.convertRadian(r);
		var sinvalue = Math.sin( r ), cosvalue = Math.cos( r );

		var mat = new Matrix3D( );
		var mm = mat.mat;
		mm[0] = cosvalue;
		mm[1] = 0.0;
		mm[2] = -sinvalue;
		mm[3] = 0.0;

		mm[4] = 0.0;
		mm[5] = 1.0;
		mm[6] = 0.0;
		mm[7] = 0.0;

		mm[8] = sinvalue;
		mm[9] = 0.0;
		mm[10] = cosvalue;
		mm[11] = 0.0;

		mm[12] = 0.0;
		mm[13] = 0.0;
		mm[14] = 0.0;
		mm[15] = 1.0;

		return mat;
	}

	this.mulRotationYLeft = function( r )
	{
		this.mulLeft( this.rotationY( r ) )
	}

	this.mulRotationYRight = function( r )
	{
		this.mulRight( this.rotationY( r ) )
	}

	this.rotationZ = function( r )
	{
		r = Math.convertRadian(r);
		var sinvalue = Math.sin( r ), cosvalue = Math.cos( r );

		var mat = new Matrix3D( );
		var mm = mat.mat;
		mm[0] = cosvalue;
		mm[1] = sinvalue;
		mm[2] = 0.0;
		mm[3] = 0.0;

		mm[4] = -sinvalue;
		mm[5] = cosvalue;
		mm[6] = 0.0;
		mm[7] = 0.0;

		mm[8] = 0.0;
		mm[9] = 0.0;
		mm[10] = 0.0;
		mm[11] = 0.0;

		mm[12] = 0.0;
		mm[13] = 0.0;
		mm[14] = 0.0;
		mm[15] = 1.0;

		return mat;
	}

	this.mulRotationZLeft = function( r )
	{
		this.mulLeft( this.rotationZ( r ) )
	}

	this.mulRotationZRight = function( r )
	{
		this.mulRight( this.rotationZ( r ) )
	}

	this.mulRight = function( mat3d )
	{
		var mm1 = new Float32Array( 16 );
		for ( var i = 0; i < 16; i ++ )
			mm1[i] = this.mat[i];

		var mm2 = mat3d.mat;

		this.mat[0] = mm1[0] * mm2[0] + mm1[1] * mm2[4] + mm1[2] * mm2[8] + mm1[3] * mm2[12];
		this.mat[1] = mm1[0] * mm2[1] + mm1[1] * mm2[5] + mm1[2] * mm2[9] + mm1[3] * mm2[13];
		this.mat[2] = mm1[0] * mm2[2] + mm1[1] * mm2[6] + mm1[2] * mm2[10] + mm1[3] * mm2[14];
		this.mat[3] = mm1[0] * mm2[3] + mm1[1] * mm2[7] + mm1[2] * mm2[11] + mm1[3] * mm2[15];

		this.mat[4] = mm1[4] * mm2[0] + mm1[5] * mm2[4] + mm1[6] * mm2[8] + mm1[7] * mm2[12];
		this.mat[5] = mm1[4] * mm2[1] + mm1[5] * mm2[5] + mm1[6] * mm2[9] + mm1[7] * mm2[13];
		this.mat[6] = mm1[4] * mm2[2] + mm1[5] * mm2[6] + mm1[6] * mm2[10] + mm1[7] * mm2[14];
		this.mat[7] = mm1[4] * mm2[3] + mm1[5] * mm2[7] + mm1[6] * mm2[11] + mm1[7] * mm2[15];

		this.mat[8] = mm1[8] * mm2[0] + mm1[9] * mm2[4] + mm1[10] * mm2[8] + mm1[11] * mm2[12];
		this.mat[9] = mm1[8] * mm2[1] + mm1[9] * mm2[5] + mm1[10] * mm2[9] + mm1[11] * mm2[13];
		this.mat[10] = mm1[8] * mm2[2] + mm1[9] * mm2[6] + mm1[10] * mm2[10] + mm1[11] * mm2[14];
		this.mat[11] = mm1[8] * mm2[3] + mm1[9] * mm2[7] + mm1[10] * mm2[11] + mm1[11] * mm2[15];

		this.mat[12] = mm1[12] * mm2[0] + mm1[13] * mm2[4] + mm1[14] * mm2[8] + mm1[15] * mm2[12];
		this.mat[13] = mm1[12] * mm2[1] + mm1[13] * mm2[5] + mm1[14] * mm2[9] + mm1[15] * mm2[13];
		this.mat[14] = mm1[12] * mm2[2] + mm1[13] * mm2[6] + mm1[14] * mm2[10] + mm1[15] * mm2[14];
		this.mat[15] = mm1[12] * mm2[3] + mm1[13] * mm2[7] + mm1[14] * mm2[11] + mm1[15] * mm2[15];
	}

	this.mulLeft = function( mat3d )
	{
		var mm2 = new Float32Array( 16 );
		for ( var i = 0; i < 16; i ++ )
			mm2[i] = this.mat[i];

		var mm1 = mat3d.mat;

		this.mat[0] = mm1[0] * mm2[0] + mm1[1] * mm2[4] + mm1[2] * mm2[8] + mm1[3] * mm2[12];
		this.mat[1] = mm1[0] * mm2[1] + mm1[1] * mm2[5] + mm1[2] * mm2[9] + mm1[3] * mm2[13];
		this.mat[2] = mm1[0] * mm2[2] + mm1[1] * mm2[6] + mm1[2] * mm2[10] + mm1[3] * mm2[14];
		this.mat[3] = mm1[0] * mm2[3] + mm1[1] * mm2[7] + mm1[2] * mm2[11] + mm1[3] * mm2[15];

		this.mat[4] = mm1[4] * mm2[0] + mm1[5] * mm2[4] + mm1[6] * mm2[8] + mm1[7] * mm2[12];
		this.mat[5] = mm1[4] * mm2[1] + mm1[5] * mm2[5] + mm1[6] * mm2[9] + mm1[7] * mm2[13];
		this.mat[6] = mm1[4] * mm2[2] + mm1[5] * mm2[6] + mm1[6] * mm2[10] + mm1[7] * mm2[14];
		this.mat[7] = mm1[4] * mm2[3] + mm1[5] * mm2[7] + mm1[6] * mm2[11] + mm1[7] * mm2[15];

		this.mat[8] = mm1[8] * mm2[0] + mm1[9] * mm2[4] + mm1[10] * mm2[8] + mm1[11] * mm2[12];
		this.mat[9] = mm1[8] * mm2[1] + mm1[9] * mm2[5] + mm1[10] * mm2[9] + mm1[11] * mm2[13];
		this.mat[10] = mm1[8] * mm2[2] + mm1[9] * mm2[6] + mm1[10] * mm2[10] + mm1[11] * mm2[14];
		this.mat[11] = mm1[8] * mm2[3] + mm1[9] * mm2[7] + mm1[10] * mm2[11] + mm1[11] * mm2[15];

		this.mat[12] = mm1[12] * mm2[0] + mm1[13] * mm2[4] + mm1[14] * mm2[8] + mm1[15] * mm2[12];
		this.mat[13] = mm1[12] * mm2[1] + mm1[13] * mm2[5] + mm1[14] * mm2[9] + mm1[15] * mm2[13];
		this.mat[14] = mm1[12] * mm2[2] + mm1[13] * mm2[6] + mm1[14] * mm2[10] + mm1[15] * mm2[14];
		this.mat[15] = mm1[12] * mm2[3] + mm1[13] * mm2[7] + mm1[14] * mm2[11] + mm1[15] * mm2[15];
	}

	this.setPerspectiveFov = function( fovy, aspect, znear, zfar)
	{
		// var ys = Math.cot( Math.convertRadian( fovy ) / 2.0 );
		// var xs = ys / aspect;
		// var zf = ( zfar + znear ) / ( znear - zfar );
		// var zn = ( 2 * znear * zfar ) / ( znear - zfar );

			var ys = 1.0 / Math.tan(Math.convertRadian( fovy ) * 0.5)
			var xs = ys / aspect
			var zf = zfar / (zfar - znear)
			var zn = - znear * zf

		// var zf = zfar / ( znear - zfar );
		// var zn = -znear * zf;
//		TODO.
		this.mat[0] = xs, this.mat[1] = 0.0, this.mat[2] = 0.0, this.mat[3] = 0.0;
		this.mat[4] = 0.0, this.mat[5] = ys, this.mat[6] = 0.0, this.mat[7] = 0.0;
		// this.mat[8] = 0.0, this.mat[9] = 0.0, this.mat[10] = zf, this.mat[11] = -1.0;
		this.mat[8] = 0.0, this.mat[9] = 0.0, this.mat[10] = zf, this.mat[11] = 1.0;
		this.mat[12] = 0.0, this.mat[13] = 0.0, this.mat[14] = zn, this.mat[15] = 0.0;
	}

	this.setOrtho = function( width, height, znear, zfar )
	{
		var xs = 2.0 / width;
		var ys = 2.0 / height;
		var zf = 2.0 / ( znear - zfar );
		var zn = ( zfar + znear ) / ( znear - zfar );

		this.mat[0] = xs, this.mat[1] = 0.0, this.mat[2] = 0.0, this.mat[3] = 0.0;
		this.mat[4] = 0.0, this.mat[5] = ys, this.mat[6] = 0.0, this.mat[7] = 0.0;
		this.mat[8] = 0.0, this.mat[9] = 0.0, this.mat[10] = zf, this.mat[11] = 1.0;
		this.mat[12] = 0.0, this.mat[13] = 0.0, this.mat[14] = zn, this.mat[15] = 1.0;
	}

	this.setCameraAtLH = function( eye, look, up )
	{
		var n = Vector3.ssub( eye, look );
		n.normalize( );

		var u = Vector3.scross( up, n );
		u.normalize( );
		var v = Vector3.scross( n, u );


		this.mat[0] = u.x; this.mat[1] = v.x; this.mat[2] = n.x; this.mat[3] = 0.0;
		this.mat[4] = u.y; this.mat[5] = v.y; this.mat[6] = n.y; this.mat[7] = 0.0;
		this.mat[8] = u.z; this.mat[9] = v.z; this.mat[10] = n.z; this.mat[11] = 0.0;
		this.mat[12] = -eye.dot( u ); this.mat[13] = -eye.dot( v ); this.mat[14] = -eye.dot( n ); this.mat[15] = 1.0;
	}

// 	Matrix4 Matrix4::CreateLookAtRH( const Vector3& eye, const Vector3& lookat, const Vector3& upaxis )
// {
// 	Vector3 zaxis = ( eye - lookat ).Normalize( );
// 	Vector3 xaxis = Vector3::Cross( upaxis, zaxis ).Normalize( );
// 	Vector3 yaxis = Vector3::Cross( zaxis, xaxis );

// 	_float xeye = - Vector3::Dot( xaxis, eye );
// 	_float yeye = - Vector3::Dot( yaxis, eye );
// 	_float zeye = - Vector3::Dot( zaxis, eye );

// 	return Matrix4(
// 		xaxis.x, yaxis.x, zaxis.x, 0.0f,
// 		xaxis.y, yaxis.y, zaxis.y, 0.0f,
// 		xaxis.z, yaxis.z, zaxis.z, 0.0f,
// 		   xeye,    yeye,    zeye, 1.0f );
// }


	this.setCameraAtRH = function( eye, look, up)
	{
		var n = Vector3.ssub( look, eye );
		n.normalize( );

		var u = Vector3.scross( up, n );
		u.normalize( );
		var v = Vector3.scross( n, u );


		this.mat[0] = u.x; this.mat[1] = v.x; this.mat[2] = n.x; this.mat[3] = 0.0;
		this.mat[4] = u.y; this.mat[5] = v.y; this.mat[6] = n.y; this.mat[7] = 0.0;
		this.mat[8] = u.z; this.mat[9] = v.z; this.mat[10] = n.z; this.mat[11] = 0.0;
		this.mat[12] = -eye.dot( u ); this.mat[13] = -eye.dot( v ); this.mat[14] = -eye.dot( n ); this.mat[15] = 1.0;
	}

	// For debug.
	this.log = function( info )
	{
		log( info == null ? "" : info, "Matrix3D : ");
		log( this.mat[0] , this.mat[1], this.mat[2], this.mat[3] );
		log( this.mat[4] , this.mat[5], this.mat[6], this.mat[7] );
		log( this.mat[8] , this.mat[9], this.mat[10], this.mat[11] );
		log( this.mat[12] , this.mat[13], this.mat[14], this.mat[15] );
	}
}