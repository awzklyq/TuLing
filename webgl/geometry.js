function Geometry( )
{
	this.vertexData = new ArrayEx( );
	this.indexData = new ArrayEx( );
	this.texcoords = new ArrayEx( );
	this.textures = new ArrayEx( null, null, null, null, null, null, null, null ); // TODO.
	this.methodId = -1;

	this.offset = 0;
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
  
		if ( ( this.format & Geometry.VERTEX ) != 0  )
			this.offset += Geometry.dataSize * 3;	

		if ( ( this.format & Geometry.TEXCOORD0 ) != 0  )
			this.offset += Geometry.dataSize * 2;
	}

	this.setTexture = function( index, image )
	{
		if ( index > this.textures.length )
			return;

		var texture = webgl.createTexture( );
		var self = this;
		image.setLoadCallBack(function()
		{
			if ( self.textures[index] != null )
			{
				webgl.deleteTexture( self.textures[index] );
				self.textures[index] = null;
			}

			self.textures[index] = webgl.createTexture( );
			webgl.bindTexture2D( self.textures[index] );
			
			// TODO.
			// w, h, level, internalformat, format, type
			// webgl.texImage2D( image.image, image.w, image.h, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE );
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image.image);
			gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
			gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );

			webgl.bindTexture2D( null );

			if ( index == 0 )
				self.format |= Geometry.TEXTURE0 = 0x00000004;
		})
	}
	
}

new Geometry( );
Geometry.VERTEX = 0x00000001;
Geometry.TEXCOORD0 = 0x00000002;
Geometry.TEXTURE0 = 0x00000004;

Geometry.dataSize = (new Float32Array( 1 )).byteLength