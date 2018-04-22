function Geometry( )
{
	this.vertexData = new ArrayEx( );
	this.indexData = new ArrayEx( );
	this.texcoords = new ArrayEx( );
	this.textures = new ArrayEx( null, null, null, null, null, null, null, null ); // TODO.
	this.finalData = new ArrayEx( );
	this.methodId = -1;

	this.offset = 0;
	// this.renderState = webgl.LINE_STRIP;
	this.renderState = webgl.TRIANGLES;

	this.format = 0;
	this.vertexBuffer = webgl.createBuffer( );
	this.indexBuffer = webgl.createBuffer( );

	this.combineVertexData = function( )
	{
		var temp = this.vertexData.length / 3;
		if ( temp == 0 )
			return;

		this.finalData.clear( );

		for ( var i = 0; i < temp; i ++ )
		{
			var vsize = i * 3;
			this.finalData.push( this.vertexData[vsize] );
			this.finalData.push( this.vertexData[vsize + 1] );
			this.finalData.push( this.vertexData[vsize + 2] );

			if ( this.texcoords.length > 0 )
			{
				vsize = i * 2;
				this.finalData.push( this.texcoords[vsize] );
				this.finalData.push( this.texcoords[vsize + 1] );
			}
		}
	}

	this.createBufferData = function( )
	{
		webgl.bindBufferVBO( this.vertexBuffer );
		webgl.bufferDataVBO( new Float32Array( this.finalData ) );
		webgl.bindBufferVBO( null );

		if ( this.indexData.length > 0 )
		{
			webgl.bindBufferIBO( this.indexBuffer );
			webgl.bufferDataIBO( new Uint16Array( this.indexData ) );
			webgl.bindBufferIBO( null );
		}

		if ( ( this.format & Geometry.VERTEX ) != 0  )
			this.offset += Geometry.dataSize * 3;

		if ( ( this.format & Geometry.TEXCOORD0 ) != 0  )
			this.offset += Geometry.dataSize * 2;
	}

	this.setImage = function( index, image )
	{
		if ( index > this.textures.length )
			return;

		console.assert( Global.LImage_typeid == image.typeid, "function setImage parame must be LImage!" );

		if ( this.textures[index] != null )
			this.textures[index] = null;

		if ( index == 0 )
		{
			if ( image == null )
				self.format &= ~Geometry.TEXTURE0;
		}

		var self = this;
		image.setLoadCallBack(function()
		{

			self.textures[index] = webgl.createTexture( );

			webgl.setTexture2D( self.textures[index], 0, gl.RGBA, -1, -1, gl.RGBA, gl.UNSIGNED_BYTE, image, true );

			if ( index == 0 )
				self.format |= Geometry.TEXTURE0;
		})
	}

	this.setTexture = function( index, texture )
	{
		if ( index > this.textures.length )
			return;

		if ( this.textures[index] != null )
			this.textures[index] = null;

		this.textures[index] = texture;

		if ( index == 0 )
		{
			if ( texture == null )
				self.format &= ~Geometry.TEXTURE0;
			else
				self.format |= Geometry.TEXTURE0;
		}
	}

	this.release = function( )
	{
		// TODO.
		webgl.deletebuffer( this.vertexBuffer );
		webgl.deletebuffer( this.indexBuffer );
	}

}

new Geometry( );
Geometry.VERTEX = 0x00000001;
Geometry.TEXCOORD0 = 0x00000002;
Geometry.TEXTURE0 = 0x00000004;
Geometry.TEXCOORD1 = 0x00000008;
Geometry.TEXTURE1 = 0x00000010;

Geometry.dataSize = (new Float32Array( 1 )).byteLength
