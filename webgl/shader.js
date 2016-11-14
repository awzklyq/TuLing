function Shader( )
{
	this.state = 0;
	this.createVertexShaderVS = function( format )
	{
		var shr = "attribute vec3 vertex;\n";

		if ( ( format & Geometry.TEXCOORD0 ) != 0 )
			shr += "attribute vec2 texcoord;\n";

		shr += "uniform mat4 wmat;\n";
		shr += "uniform mat4 vmat;\n";

		if ( ( format & Geometry.TEXCOORD0 ) != 0 )
			shr += "varying vec2 vtexcoord;\n";

		shr += "void main(void) {\n";

		if ( ( format & Geometry.TEXCOORD0 ) != 0 )
			shr += "vtexcoord = texcoord;\n";

		shr += "gl_Position = vmat * wmat * vec4(vertex, 1.0);\n";
		shr += "}";
		return webgl.createVertexShader( shr );
	}

	this.createVertexShaderPS = function( format )
	{
		var shr = "#ifdef GL_ES\n";
		shr += "precision highp float;\n";
		shr += "#endif\n";

		if ( ( format & Geometry.TEXTURE0 ) != 0 )
			shr += "uniform sampler2D layer0;\n";

		if ( ( format & Geometry.TEXCOORD0 ) != 0 )
			shr += "varying vec2 vtexcoord;\n";

		shr += "void main(void) {\n";
		shr += "vec4 vcolor = vec4(1.0, 1.0, 1.0, 1.0);\n"
		if ( ( format & Geometry.TEXTURE0 ) != 0 && ( format & Geometry.TEXCOORD0 ) != 0 )
			shr += "vcolor *= texture2D(layer0, vtexcoord);\n";

		shr += "gl_FragColor = vcolor;}";
		return webgl.createFrameShader( shr );
	}

	this.createProgram = function( vshr, fshr )
	{
		return webgl.createProgram( vshr, fshr )
	}
}

window.shader = new Shader( );