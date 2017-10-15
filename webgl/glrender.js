function RenderWebgl( )
{
	this.wmat = new ArrayEx( );
	this.vmat = new ArrayEx( );
	this.lights = new ArrayEx( );

	this.renderflag = 0;

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

	this.pushLight = function( light )
	{
		this.lights.push( light );
	}

	this.popLight = function( )
	{
		this.lights.pop( );
	}

	this.renderGeometry = function( geo )
	{
		this.linkProgram( geo )

		webgl.drawElements( geo.renderState, geo.indexData.length, webgl.UNSIGNED_SHORT, 0 );

		this.finishRender( )
	}

	this.linkProgram = function( geo )
	{
		// Set light.
		var ambient = null;
		if ( this.lights.length > 0 )
		{
			for ( var i = 0; i < this.lights.length; i ++ )
			{
				if ( this.lights[i].typeid == AmbientLight.typeid && ( this.renderflag & RenderWebgl.AmbientLight ) == 0 )
				{
					this.renderflag |= RenderWebgl.AmbientLight;
					ambient = this.lights[i].convertColor( );
				}
			}
		}

		webgl.bindBufferVBO( geo.vertexBuffer );
		webgl.bindBufferIBO( geo.indexBuffer );
		webgl.useProgram( shader.buildShader( geo.format ) );

		var offset = 0;
		if ( ( geo.format & Geometry.VERTEX ) != 0 )
		{
			var vertex = webgl.getAttribLocation('vertex');
			webgl.vertexAttribPointer( vertex, 3, webgl.FLOAT, false, geo.offset, offset );
			webgl.enableVertexAttribArray( vertex );
			offset += 3 * Geometry.dataSize;
		}

		if ( ( geo.format & Geometry.TEXCOORD0 ) != 0 && ( geo.format & Geometry.TEXTURE0 ) != 0 && geo.textures[0] != null )
		{		
			var texcoord = webgl.getAttribLocation('texcoord');
			webgl.vertexAttribPointer( texcoord, 2, webgl.FLOAT, false, geo.offset, offset );
			webgl.enableVertexAttribArray( texcoord );

			gl.activeTexture( gl.TEXTURE0 );
			webgl.bindTexture2D( geo.textures[0] );

			var layer0 = webgl.getUniformLocation('layer0');
			gl.uniform1i( layer0, 0 );
		}

		if ( this.wmat.length > 0 )
		{
			var wmat = webgl.getUniformLocation('wmat');
			webgl.uniformMatrix4fv( wmat, this.wmat[this.wmat.length - 1].mat);
		}

		if ( this.vmat.length > 0 )
		{
			var vmat = webgl.getUniformLocation('vmat');
			webgl.uniformMatrix4fv( vmat, this.vmat[this.vmat.length - 1].mat); // TODO.
		}

		if ( ambient != null )
		{
			var localtion = webgl.getUniformLocation( 'ambient' );
			if ( localtion != null )
				webgl.uniformfv( localtion, ambient, 4 );
		}
	}

	this.finishRender = function( )
	{
		webgl.bindBufferVBO( null );
		webgl.bindBufferIBO( null );

		webgl.useProgram( null );

		if ( ( geo.format & Geometry.TEXCOORD0 ) != 0 && ( geo.format & Geometry.TEXTURE0 ) != 0 && geo.textures[0] != null )
			webgl.bindTexture2D( null );

		this.renderflag = 0;
	}

	this.setRenderTarget = function( target )
	{
		webgl.bindFrameBuffer( target == null ? null : target.fbuffer );
	}
}

RenderWebgl.AmbientLight = 0x00000001;

window.glRender = new RenderWebgl( );