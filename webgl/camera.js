function Camera( )
{
	this.eye = new Vector3( 10, 10, 10);
	this.look = new Vector3( 0, 0, 0 );
	this.up = new Vector3( 0, 0, 1 );

	this.mat = new Matrix3D( );

	this.getCameraMatrix = function( )
	{
		this.mat.setCameraAtForRight( this.eye, this.look, this.up );
		return this.mat;
	}
}