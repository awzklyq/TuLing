function Camera( )
{
	this.eye = new Vector3( 10, 10, 10);
	this.look = new Vector3( 0, 0, 0 );
	this.up = new Vector3( 0, 0, 1 );
	this.near = 1.0;
	this.far = 5000.0;
	this.fov = 45;
	this.w = Global.getClientWidth( );
	this.h = Global.getClientHeight( );
	this.ortho = false;

	this.radiuslimit = new Vector2( );
	this.radiuslimit.x = Math.MinNumber;
	this.radiuslimit.y = Math.MaxNumber;

	this.cameramat = new Matrix3D( );
	this.perspectivemat = new Matrix3D( );

	this.movePhi = function( r )
	{
		if ( r == 0 )
			return;

		this.cameramat.setTranslation( this.eye.x, this.eye.y, this.eye.z );
		this.cameramat.mulTranslationRight( -this.look.x, -this.look.y, -this.look.z );
		this.cameramat.mulRotationRight( this.up.x, this.up.y, this.up.z, r );
		this.cameramat.mulTranslationRight( this.look.x, this.look.y, this.look.z );
		this.cameramat.getTranslation( this.eye );
	}

	this.moveTheta = function( r )
	{
		if ( r == 0 )
			return;

		var cross = Vector3.scross( Vector3.ssub( this.look, this.eye ), this.up );
		cross.normalize( );

		var v1 = Vector3.scross( Vector3.ssub( this.eye, this.look ), cross );

		this.cameramat.setTranslation( this.eye.x, this.eye.y, this.eye.z );
		this.cameramat.mulTranslationRight( -this.look.x, -this.look.y, -this.look.z );
		this.cameramat.mulRotationRight( cross.x, cross.y, cross.z, r );
		this.cameramat.mulTranslationRight( this.look.x, this.look.y, this.look.z );
		this.cameramat.getTranslation( this.eye );

		var v2 = Vector3.scross( Vector3.ssub( this.eye, this.look ), cross );

		if ( Vector3.sdot( v1, this.up ) * Vector3.sdot( v2, this.up ) < 0 )
			this.up.negative( );
	}

	this.moveRadius = function( radius )
	{
		if ( radius == 0 )
			return;

		if ( this.eye.equal( this.look ) )
			return;

		if ( this.radiuslimit.x != Math.MinNumber || this.radiuslimit.y != Math.MaxNumber )
		{
			var temp = this.getRadius( );
			if ( temp + radius < this.radiuslimit.x )
				radius = this.radiuslimit.x - temp;
			else if ( temp + radius > this.radiuslimit.y )
				radius = this.radiuslimit.y - temp;
		}

		var dir = Vector3.ssub( this.eye, this.look );
		dir.normalize( );
		dir.mul( radius );
		this.eye.add( dir );
	}

	this.getRadius = function( )
	{
		return Vector3.ssub( this.eye, this.look ).magnitude( );
	}

	this.moveEye = function( x, y, z )
	{
		this.eye.x = x || this.eye.x;
		this.eye.y = y || this.eye.y;
		this.eye.z = z || this.eye.z;
	}

	this.moveLook = function( x, y, z )
	{
		this.look.x = x || this.look.x;
		this.look.y = y || this.look.y;
		this.look.z = z || this.look.z;
	}

	this.getCameraMatrix = function( )
	{
		this.cameramat.setCameraAt( this.eye, this.look, this.up );
		if ( this.ortho )
			this.perspectivemat.setOrtho( this.w, this.h, this.near, this.far );
		else
			this.perspectivemat.setPerspectiveFov( this.fov, this.w / this.h, this.near, this.far );

		this.perspectivemat.mulLeft( this.cameramat );
		return this.perspectivemat;

		// return this.cameramat;
	}
}