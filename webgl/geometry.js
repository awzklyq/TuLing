function Geometry( )
{
	this.vertexData = new ArrayEx( );
	this.indexData = new ArrayEx( );
	this.methodId = -1;

	this.renderState = webgl.TRIANGLES;

	this.format = 0;
	this.vertexBuffer = webgl.createBuffer( );
	this.indexBuffer = webgl.createBuffer( );
	this.createBufferData = function( )
	{
		webgl.bindBufferVBO( this.vertexBuffer );
		webgl.bufferDataVBO( new Float32Array( this.vertexData ) );
		webgl.bindBufferVBO( null );

		webgl.bindBufferIBO( this.indexBuffer );
		webgl.bufferDataIBO( new Uint16Array( this.indexData ) );
		webgl.bindBufferIBO( null );

		this.format = Geometry.VERTEX = 0x0000001;
	}
}

new Geometry( );
Geometry.VERTEX = 0x0000001;