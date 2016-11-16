function Camera( )
{
	this.eye = new Vector3( 10, 10, 10);
	this.look = new Vector3( 0, 0, 0 );
	this.up = new Vector3( 0, 0, 1 );

	// this.near = 0;
	// this.far = 0;
	// this.fov = 0;
	this.mat = new Matrix3D( );

	this.movePhi = function( r )
	{
		this.mat.setTranslation( this.eye.x, this.eye.y, this.eye.z );
		this.mat.mulTranslationRight( -this.look.x, -this.look.y, -this.look.z );
		this.mat.mulRotationRight( this.up.x, this.up.y, this.up.z, r );
		this.mat.mulTranslationRight( this.look.x, this.look.y, this.look.z );
		this.mat.getTranslation( this.eye );
	}

	this.moveTheta = function( r )
	{
		var cross = Vector3.scross( Vector3.ssub( this.look, this.eye ), this.up );
		cross.normalize( );

		var v1 = Vector3.scross( Vector3.ssub( this.eye, this.look ), cross );

		this.mat.setTranslation( this.eye.x, this.eye.y, this.eye.z );
		this.mat.mulTranslationRight( -this.look.x, -this.look.y, -this.look.z );
		this.mat.mulRotationRight( cross.x, cross.y, cross.z, r );
		this.mat.mulTranslationRight( this.look.x, this.look.y, this.look.z );
		this.mat.getTranslation( this.eye );

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

	this.getCameraMatrix = function( )
	{
		this.mat.setCameraAtForRight( this.eye, this.look, this.up );
		return this.mat;
	}
}