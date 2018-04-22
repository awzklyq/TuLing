function WebGl( )
{
	this.bgColor = 0xff000000;

	this.gBlur = false;
	this.beginGBlur = function( )
	{
		this.gBlur = true;
	}

	this.endGBlur = function( )
	{
		this.gBlur = false;
	}

	this.getGBlur = function( )
	{
		return this.gBlur;
	}

	this.clear = function( state )
	{
		if ( window.gl == null)
			return;

		gl.clear( state );
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

	this.disableState = function( state )
	{
		if ( window.gl == null)
			return;

		gl.disable( state );
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
            console.error(gl.getShaderInfoLog(shader));
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
            console.error(gl.getShaderInfoLog(shader));
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
			console.error('Could not initialise shaders');

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

	this.vertexAttribPointer = function( index, size, type, isnormalized, offset, pointer )
	{
		if ( window.gl == null && this.program != null )
			return;

		gl.vertexAttribPointer( index, size, type, isnormalized, offset, pointer );
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

		console.assert( index != null && value != null, "uniformMatrix4fv param is null");
		gl.uniformMatrix4fv( index, false, value );
	}

	this.uniformfv = function( index, value, count )
	{
		if ( window.gl == null && this.program != null )
			return;

		console.assert( index != null && value != null && count > 0, "uniformfv param is null");

		if ( count == 1 )
			gl.uniform1fv( index, value );
		else if ( count == 2 )
			gl.uniform2fv( index, value );
		else if ( count == 3 )
			gl.uniform3fv( index, value );
		else if ( count == 4 )
			gl.uniform4fv( index, value );
	}

	this.uniformi = function( index, value1, value2, value3, value4 )
	{
		if ( window.gl == null && this.program != null )
			return;

		console.assert( index != null && value1 != null, "uniformi param is unuseful!");

		if ( arguments.length == 2 )
			gl.uniform1i( index, value1 );
		else if ( arguments.length == 3 )
			gl.uniform2i( index, value1, value2 );
		else if ( arguments.length == 4 )
			gl.uniform3i( index, value1, value2, value3 );
		else
			gl.uniform4i( index, value1, value2, value3, value4 );
	}

	this.createTexture = function( level, internalformat, w, h, format, type, image )
	{
		if ( window.gl == null )
			return;

		var texture = gl.createTexture( );

		if ( arguments.length == 0 )
			return texture;

		this.setTexture2D( texture, level, internalformat, w, h, format, type, image, true )

		return texture;
	}

	this.deleteTexture = function( texture )
	{
		if ( window.gl == null )
			return;

		return gl.deleteTexture( texture );
	}

	this.bindTexture2D = function( texture )
	{
		if ( window.gl == null )
			return;

		gl.bindTexture( gl.TEXTURE_2D, texture );
	}

	this.texImage2D = function( level, internalformat, w, h, format, type, image )
	{
		if ( window.gl == null )
			return;

		gl.texImage2D( gl.TEXTURE_2D, level, internalformat, w, h, 0, format, type, image != null ? image.image : null );
	}

	this.setTexture2D = function( texture, level, internalformat, w, h, format, type, image, mip, repeat, stage )
	{
		if ( window.gl == null )
			return;

		// TODO...

		gl.bindTexture( gl.TEXTURE_2D, texture );
		if ( w <= 0 || h <= 0 )
			gl.texImage2D( gl.TEXTURE_2D, level, internalformat, format, type, image == null ? null : image.image );
		else
			gl.texImage2D( gl.TEXTURE_2D, level, internalformat, w, h, 0, format, type, image == null ? null : image.image );

		var state = 0;
		if ( stage == true )
			state += 1;

		if ( mip == true )
		{
			state += 2;
			gl.generateMipmap( gl.TEXTURE_2D );
		}

		var param = gl.LINEAR;
		if ( state == 1 )
			param = gl.NEAREST;
		else if ( state == 2 )
			param = gl.LINEAR_MIPMAP_LINEAR;
		else if ( state == 3 )
			param == gl.LINEAR_MIPMAP_NEAREST;

		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param );
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, state ? gl.NEAREST : gl.LINEAR );

		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, repeat ? gl.REPEAT : gl.CLAMP_TO_EDGE );

		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, repeat ? gl.REPEAT : gl.CLAMP_TO_EDGE );

		gl.bindTexture( gl.TEXTURE_2D, null );
	}

	this.createRenderBuffer = function( w, h )
	{
		if ( window.gl == null )
			return;

		var rbuffer = gl.createRenderbuffer( );
		gl.bindRenderbuffer( gl.RENDERBUFFER, rbuffer );
		gl.renderbufferStorage( gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, w, h );
		return rbuffer;
	}

	this.bindRenderBuffer = function( rbuffer )
	{
		if ( window.gl == null )
			return;

		gl.bindRenderbuffer( gl.RENDERBUFFER, rbuffer );
	}

	this.createFrameBuffer = function( texture, rbuffer )
	{
		if ( window.gl == null )
			return;

		var fbuffer = gl.createFramebuffer( );
		gl.bindFramebuffer( gl.FRAMEBUFFER, fbuffer );
		gl.framebufferTexture2D( gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0 );
		gl.framebufferRenderbuffer( gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, rbuffer );
		gl.bindFramebuffer( gl.FRAMEBUFFER, null );
		return fbuffer;
	}

	this.bindFrameBuffer = function( fbuffer )
	{
		if ( window.gl == null )
			return;

		gl.bindFramebuffer( gl.FRAMEBUFFER, fbuffer );
	}

	this.drawArrays = function( mode, first, count )
	{
		if ( window.gl == null )
			return;

		gl.drawArrays( mode, first, count );
	}

	this.drawElements = function( mode, count, type, offset )
	{
		if ( window.gl == null )
			return;

		gl.drawElements( mode, count, type, offset );
	}

	if ( window.gl != null )
	{
		// Enable state.
		this.DEPTH_TEST = gl.DEPTH_TEST;

		// Draw type.
		this.POINTS			= gl.POINTS;
		this.LINE_STRIP		= gl.LINE_STRIP;
		this.LINE_LOOP		= gl.LINE_LOOP;
		this.LINES			= gl.LINES;
		this.TRIANGLE_STRIP	= gl.TRIANGLE_STRIP;
		this.TRIANGLE_FAN	= gl.TRIANGLE_FAN;
		this.TRIANGLES		= gl.TRIANGLES;
		this.QUAD_STRIP		= gl.QUAD_STRIP;
		this.POLYGON		= gl.POLYGON;

		// WebGl data type.
		this.UNSIGNED_BYTE = gl.UNSIGNED_BYTE;
		this.UNSIGNED_SHORT = gl.UNSIGNED_SHORT;
		this.UNSIGNED_INT = gl.UNSIGNED_INT;

		this.FLOAT = gl.FLOAT;

		// Clear buffer.
		this.COLOR_BUFFER_BIT = gl.COLOR_BUFFER_BIT;
		this.DEPTH_BUFFER_BIT = gl.DEPTH_BUFFER_BIT;
	}
}
