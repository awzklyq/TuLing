function RenderTarget( w, h )
{
	this.texture = webgl.createTexture( 0, gl.RGBA, w, h, gl.RGBA, gl.UNSIGNED_BYTE, null );

	this.rbuffer = webgl.createRenderBuffer( w, h );

	this.fbuffer = webgl.createFrameBuffer( this.texture, this.rbuffer );

	this.release = function( )
	{
		// TODO.
	}
}