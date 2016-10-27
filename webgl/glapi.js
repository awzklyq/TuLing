function WebGl( )
{
	this.bgColor = 0xff000000;

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

	this.enableState = function( state )
	{
		if ( window.gl == null)
			return;
		
		gl.enable( state );
	}
	
	this.createBuffer = function( )
	{
		if ( window.gl == null)
			return;

		return gl.createBuffer( );
	}

	this.deleteBuffer = function( buffer )
	{
		if ( window.gl == null)
			return;

		return gl.deleteBuffer( buffer );
	}

	this.bindBufferVBO = function( buffer )
	{
		if ( window.gl == null)
			return;

		gl.bindBuffer( gl.ARRAY_BUFFER, buffer );
	}

	this.clearBindBufferVBO = function( )
	{
		if ( window.gl == null)
			return;

		gl.bindBuffer( gl.ARRAY_BUFFER, null );
	}

	// data must be Float32Array.
	this.bufferDataVBO = function( data )
	{
		if ( window.gl == null)
			return;

		gl.bufferData( gl.ARRAY_BUFFER, data, gl.STATIC_DRAW );
	}

	this.bindBufferIBO = function( buffer )
	{
		if ( window.gl == null)
			return;

		gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, buffer );
	}

	this.clearBindBufferIBO = function( )
	{
		if ( window.gl == null)
			return;

		gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, null );
	}

	// data must be Uint16Array.
	this.bufferDataIBO = function( data )
	{
		if ( window.gl == null)
			return;

		gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW );
	}
	
	this.createVertexShader = function( str )
	{
		if ( window.gl == null)
			return;

		var shader = gl.createShader( gl.VERTEX_SHADER );
		
		gl.shaderSource(shader, str);

        gl.compileShader(shader);

		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
		{
            console.alert(gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
	}

	this.createFrameShader = function( str )
	{
		if ( window.gl == null)
			return;

		var shader = gl.createShader( gl.FRAGMENT_SHADER );
		
		gl.shaderSource(shader, str);

        gl.compileShader(shader);

		if ( !gl.getShaderParameter( shader, gl.COMPILE_STATUS ) )
		{
            console.alert(gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
	}

	this.createProgram = function( vshr, fshr )
	{
		if ( window.gl == null)
			return;

		var program = gl.createProgram( );

		gl.attachShader( program, vshr );
		gl.attachShader( program, fshr );
		gl.linkProgram( program );

		if ( !gl.getProgramParameter( program, gl.LINK_STATUS ) ) 
			console.alert('Could not initialise shaders');

		return program;
	}

	this.program = null;
	this.useProgram = function( program )
	{
		if ( window.gl == null)
			return;

		gl.useProgram( program );
		this.program = program;
	}

	this.getAttribLocation = function( name )
	{
		if ( window.gl == null && this.program != null )
			return;

		return gl.getAttribLocation( this.program, name );
	}

	this.vertexAttribPointer = function( index, size, type, isnormal, offset, pointer )
	{
		if ( window.gl == null && this.program != null )
			return;

		gl.vertexAttribPointer( index, size, type, isnormal, offset, pointer );
	}
	
	this.enableVertexAttribArray = function( index )
	{
		if ( window.gl == null && this.program != null )
			return;

		gl.enableVertexAttribArray( index );
	}

	this.getUniformLocation = function( name )
	{
		if ( window.gl == null && this.program != null )
			return;

		return gl.getUniformLocation( this.program, name );
	}

	this.uniformMatrix4fv = function( index, value )
	{
		if ( window.gl == null && this.program != null )
			return;

		gl.uniformMatrix4fv( index, false, value );
	}

	// Enable state.
	this.DEPTH_TEST = gl.DEPTH_TEST;
}
