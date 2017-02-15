function Shader( )
{
	this.state = 0;
	this.methods = {};
	this.buildShader = function( format )
	{
		if ( format & Geometry.TEXCOORD0 )
			this.state = Shader.TEXCOORD0;

		if ( format & Geometry.TEXTURE0 )
			this.state |= Shader.TEXTURE0;

		if ( webgl.getGBlur( ) )
			this.state |= Shader.GBLUR;

		if ( this.methods[this.state] != null )
			return this.methods[this.state];

		var date = Global.getMilliseconds( );
		this.methods[this.state] = webgl.createProgram( this.createVertexShaderVS (this.state), this.createVertexShaderPS(this.state) );
		log("build shader take time:", Global.getMilliseconds( ) - date, this.state);
		return this.methods[this.state];
	}

	this.createVertexShaderVS = function( state )
	{
		var shr = "attribute vec3 vertex;\n";

		if ( ( state & Shader.TEXCOORD0 ) != 0 )
			shr += "attribute vec2 texcoord;\n";

		shr += "uniform mat4 wmat;\n";
		shr += "uniform mat4 vmat;\n";

		if ( ( state & Shader.TEXCOORD0 ) != 0 )
			shr += "varying vec2 vtexcoord;\n";

		shr += "void main(void) {\n";

		if ( ( state & Shader.TEXCOORD0 ) != 0 )
			shr += "vtexcoord = texcoord;\n";

		shr += "gl_Position = vmat * wmat * vec4(vertex, 1.0);\n";
		shr += "}";
		return webgl.createVertexShader( shr );
	}

	this.createVertexShaderPS = function( state )
	{
		var shr = "#ifdef GL_ES\n";
		shr += "precision highp float;\n";
		shr += "#endif\n";

		if ( ( state & Shader.TEXTURE0 ) != 0 )
			shr += "uniform sampler2D layer0;\n";

		if ( ( state & Shader.TEXCOORD0 ) != 0 )
			shr += "varying vec2 vtexcoord;\n";

		shr += "void main(void) {\n";
		shr += "vec4 vcolor = vec4(1.0, 1.0, 1.0, 1.0);\n"
		if ( ( state & Shader.TEXTURE0 ) != 0 && ( state & Shader.TEXCOORD0 ) != 0 )
		{
			if ( ( state & Shader.GBLUR ) == 0 )
			{
				shr += "vcolor *= texture2D(layer0, vtexcoord);\n";
			}
			else
			{
				shr += "vec2 blurSize = vec2((1.0/64.0),(1.0/64.0));\n";
				shr += "vec4 sum = vec4(0.0);\n";
				shr += "float gb = 2.611865626182648;"
				shr += "for(int i = -4; i <= 4; i ++ )\n";
				shr += "{\n";
				shr += "	float gstemp = exp(-pow(abs(float(i)), 2.0) / ( 2.0 * pow(gb, 2.0) )) / ( sqrt(2.0 * 3.14) * gb);\n";
				shr += "	sum += texture2D(layer0, vtexcoord+float(i)*blurSize) * gstemp;\n";
				shr += "}\n";
				shr += "vcolor *= sum;\n";
			}
		}

		shr += "gl_FragColor = vcolor;}";
		return webgl.createFrameShader( shr );
	}
}

window.shader = new Shader( );
Shader.TEXCOORD0 = 0x00000001;
Shader.TEXTURE0 = 0x00000002;
shader.GBLUR = 0x00000004;