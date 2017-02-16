function Camera( )
{
	this.eye = new Vector3( 10, 10, 10);
	this.look = new Vector3( 0, 0, 0 );
	this.up = new Vector3( 0, 0, 1 );
	this.near = 1.0;
	this.far = 5000.0;
	this.fov = 45;
	this.w = Global.getElementWidth( window.webglcanvas );
	this.h = Global.getElementHeight( window.webglcanvas );
	this.ortho = false;

	this.cameramat = new Matrix3D( );
	this.perspectivemat = new Matrix3D( );

	this.movePhi = function( r )
	{
		this.cameramat.setTranslation( this.eye.x, this.eye.y, this.eye.z );
		this.cameramat.mulRotationRight( this.up.x, this.up.y, this.up.z, r );
		this.cameramat.mulTranslationRight( this.look.x, this.look.y, this.look.z );
		this.cameramat.getTranslation( this.eye );
	}

	this.moveTheta = function( r )
	{
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

	this.moveRadius = function( d )
	{
		var dir = Vector3.ssub( this.eye, this.look );
		dir.normalize( );
		dir.mul( d );
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