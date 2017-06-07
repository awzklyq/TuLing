var geo = new Geometry( );
geo.vertexData =[ -0.5, 0.5,-0.5, 
				  -0.5,-0.5,-0.5, 
				  -0.5,-0.5, 0.5, 
				  -0.5, 0.5, 0.5, 
				                  
				  -0.5, 0.5, 0.5, 
				  -0.5,-0.5, 0.5, 
				   0.5,-0.5, 0.5, 
				   0.5, 0.5, 0.5, 
				                  
				   0.5, 0.5, 0.5, 
				   0.5,-0.5, 0.5, 
				   0.5,-0.5,-0.5, 
				   0.5, 0.5,-0.5, 
				                  
				   0.5, 0.5,-0.5, 
				   0.5,-0.5,-0.5, 
				  -0.5,-0.5,-0.5, 
				  -0.5, 0.5,-0.5, 
				                  
				  -0.5, 0.5,-0.5, 
				  -0.5, 0.5, 0.5, 
				   0.5, 0.5, 0.5, 
				   0.5, 0.5,-0.5, 
				                  
				  -0.5,-0.5, 0.5, 
				  -0.5,-0.5,-0.5, 
				   0.5,-0.5,-0.5, 
				   0.5,-0.5, 0.5 ]

geo.texcoords = [0.0, 0.0,
                1.0, 0.0,
                1.0, 1.0,
                0.0, 1.0,
                
                1.0, 0.0,
                1.0, 1.0,
                0.0, 1.0,
                0.0, 0.0,
                
                0.0, 1.0,
                0.0, 0.0,
                1.0, 0.0,
                1.0, 1.0,
                
                1.0, 1.0,
                0.0, 1.0,
                0.0, 0.0,
                1.0, 0.0,
                
                1.0, 0.0,
                1.0, 1.0,
                0.0, 1.0,
                0.0, 0.0,
                
                0.0, 0.0,
                1.0, 0.0,
                1.0, 1.0,
                0.0, 1.0]

geo.format = Geometry.VERTEX | Geometry.TEXCOORD0;
// var vdata = new Float32Array( vertices );

geo.indexData = [0,1,2,     0,2,3,
			  4,5,6,     4,6,7,
			  8,9,10,  8,10,11,
			12,13,14, 12,14,15,
			16,17,18, 16,18,19,
			20,21,22, 20,22,23];

 geo.texcoords = [0.0, 0.0,
				  1.0, 0.0,
				  1.0, 1.0,
				  0.0, 1.0,

				  1.0, 0.0,
				  1.0, 1.0,
				  0.0, 1.0,
				  0.0, 0.0,

				  0.0, 1.0,
				  0.0, 0.0,
				  1.0, 0.0,
				  1.0, 1.0,

				  1.0, 1.0,
				  0.0, 1.0,
				  0.0, 0.0,
				  1.0, 0.0,

				  1.0, 0.0,
				  1.0, 1.0,
				  0.0, 1.0,
				  0.0, 0.0,

				  0.0, 0.0,
				  1.0, 0.0,
				  1.0, 1.0,
				  0.0, 1.0]
				  
geo.combineVertexData( );
geo.createBufferData( );

// webgl.beginGBlur( );
geo.methonId = shader.buildShader( geo.format );
// webgl.endGBlur( );
webgl.useProgram( geo.methonId );

var cwidth = Global.getElementWidth( window.webglcanvas );
var cheight = Global.getElementHeight( window.webglcanvas );

var tempmat = new Matrix3D( );

if ( window.camera == null )
	window.camera = new Camera( );

window.camera.eye = new Vector3( 2, 0, 0 );
window.camera.look = new Vector3( 0, 0, 0 )
// camera.ortho = true;
var rendertarget = new RenderTarget( 64, 64 );

// For camera.
tempmat.reset();
tempmat.translate(0.0, 0.0, 0.0)
tempmat.setScaling( 2.0, 2.0, 2.0 )
var image = new LImage("webgl.png");
geo.setImage(0, image);
webgl.render = function( e )
{
	webgl.clearColor( webgl.bgColor );

	webgl.viewPort( 0, 0, cwidth, cheight );
	webgl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	webgl.enableState( webgl.DEPTH_TEST );
	glRender.pushWorldMatrix3D( tempmat );
	glRender.pushPerspectMatrix3D( camera.getCameraMatrix( ) );
	glRender.renderGeometry( geo );
	glRender.popWorldMatrix3D( );
	glRender.popPerspectMatrix3D( );
	webgl.disableState( webgl.DEPTH_TEST )
}	

window.onKeyDown[0] = function( key )
{
	if ( key == System.KeySpace )
	{
		// camera.eye.mul( camerahelper );
		// tempmat.reset();
		// tempmat.mulLeft( camera.getCameraMatrix( ) );
		//tempmat.mulRotationLeft( 0, 0, 1, 0.1 );
		camera.moveRadius( 0.1 );
	}
	return true;
	// log("key up event", key);
}