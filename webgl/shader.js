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
		{
			shr += "vcolor *= texture2D(layer0, vtexcoord);\n";
			shr += "vec2 blurSize = vec2((1.0/64.0),(1.0/64.0));\n";
			shr += "vec4 sum = vec4(0.0);\n";
			shr += "float gb = 2.611865626182648;"
			shr += "for(int i = -4; i <= 4; i ++ )\n";
			shr += "{\n";
			shr += "	float gstemp = exp(-pow(abs(float(i)), 2.0) / ( 2.0 * pow(gb, 2.0) )) / ( sqrt(2.0 * 3.14) * gb);\n";
			shr += "	sum += texture2D(layer0, vtexcoord+float(i)*blurSize) * gstemp;\n";
			shr += "}\n";
			shr += "vcolor = sum;\n";
		}

		shr += "gl_FragColor = vcolor;}";
		return webgl.createFrameShader( shr );
	}

	this.createProgram = function( vshr, fshr )
	{
		return webgl.createProgram( vshr, fshr )
	}
}

window.shader = new Shader( );