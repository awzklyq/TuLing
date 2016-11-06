function Shader( )
{
	this.state = 0;
	this.createVertexShaderVS = function( )
	{
		var shr = "attribute vec3 vertex;\n";
		shr += "uniform mat4 wmat;\n";
		shr += "uniform mat4 vmat;\n";
		shr += "void main(void) {\n";
		shr += "gl_Position = vmat * wmat * vec4(vertex, 1.0);\n";
		shr += "gl_PointSize = 1.0;}";
		return webgl.createVertexShader( shr );
	}

	this.createVertexShaderPS = function( )
	{
		var shr = "#ifdef GL_ES\n";
		shr += "precision highp float;\n";
		shr += "#endif\n";
		shr += "void main(void) {\n";
		shr += "gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);}";
		return webgl.createFrameShader( shr );
	}

	this.createProgram = function( vshr, fshr )
	{
		return webgl.createProgram( vshr, fshr )
	}
}

window.shader = new Shader( );