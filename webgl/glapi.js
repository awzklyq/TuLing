function WebGl( )
{
	this.clear = function( )
	{
		if ( window.gl == null)
			return;

		gl.clear( gl.COLOR_BUFFER_BIT );
	}

	this.clearColor = function( color )
	{
		if ( window.gl == null)
			return;

		var cc = Math.DecompressionRGBA( color );
		gl.clearColor( cc.r / 255, cc.g / 255, cc.b / 255, cc.a );
	}
	
	this.viewPort = function( x, y, w, h )
	{
		if ( window.gl == null)
			return;

		gl.viewport( x, y, w, h );
	}
}