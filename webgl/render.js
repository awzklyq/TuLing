function RenderWebgl( )
{
	this.wmat = new ArrayEx( );
	new Matrix3D( );
	this.vmat = new ArrayEx( );

	this.pushWorldMatrix3D = function( mat )
	{
		this.wmat.push( mat );
	}

	this.popWorldMatrix3D = function( )
	{
		this.wmat.pop( );
	}

	this.pushPerspectMatrix3D = function( mat )
	{
		this.vmat.push( mat );
	}

	this.popPerspectMatrix3D = function( )
	{
		this.vmat.pop( );
	}

	this.renderGeometry = function( geo )
	{
		this.linkProgram( geo )

		webgl.drawElements( geo.renderState, geo.indexData.length, webgl.UNSIGNED_SHORT, 0 );

		this.finishRender( )
	}

	this.linkProgram = function( geo )
	{
		webgl.bindBufferVBO( geo.vertexBuffer );
		webgl.bindBufferIBO( geo.indexBuffer );

		webgl.useProgram( geo.methonId );

		if ( ( geo.format & Geometry.VERTEX ) != 0 )
		{
			geo.methonId.vertex = webgl.getAttribLocation('vertex');
			webgl.vertexAttribPointer( geo.methonId.vertex, 3, webgl.FLOAT, false, 0, 0 );
			webgl.enableVertexAttribArray( geo.methonId.vertex );
		}

		if ( this.wmat.length > 0 )
		{
			geo.methonId.wmat = webgl.getUniformLocation('wmat');
			webgl.uniformMatrix4fv(geo.methonId.wmat, this.wmat[this.wmat.length - 1].mat);
		}

		if ( this.vmat.length > 0 )
		{
			geo.methonId.vmat = webgl.getUniformLocation('vmat');
			webgl.uniformMatrix4fv(geo.methonId.vmat, this.vmat[this.vmat.length - 1]); // TODO.
		}
	}

	this.finishRender = function( )
	{
		webgl.bindBufferVBO( null );
		webgl.bindBufferIBO( null );

		webgl.useProgram( null );
	}
}

window.render = new RenderWebgl( );