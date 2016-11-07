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
		
		var offset = 0;
		if ( ( geo.format & Geometry.VERTEX ) != 0 )
		{
			geo.methonId.vertex = webgl.getAttribLocation('vertex');
			webgl.vertexAttribPointer( geo.methonId.vertex, 3, webgl.FLOAT, false, geo.offset, offset );
			webgl.enableVertexAttribArray( geo.methonId.vertex );
			offset += 3 * Geometry.dataSize;
		}

		if ( ( geo.format & Geometry.TEXCOORD0 ) != 0 && ( geo.format & Geometry.TEXTURE0 ) != 0 && geo.textures[0] != null )
		{		
			geo.methonId.texcoord = webgl.getAttribLocation('texcoord');
			webgl.vertexAttribPointer( geo.methonId.texcoord, 2, webgl.FLOAT, false, geo.offset, offset );
			webgl.enableVertexAttribArray( geo.methonId.texcoord );

			gl.activeTexture( gl.TEXTURE0 );
			webgl.bindTexture2D( geo.textures[0] );

			geo.methonId.layer0 = webgl.getUniformLocation('layer0');
			gl.uniform1i( geo.methonId.layer0, 0 );
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

window.glRender = new RenderWebgl( );