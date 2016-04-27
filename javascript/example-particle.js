window.logEnable = true;

var emit = new ParticleEmitter( );
emit.duration = 10000;
emit.limit = 30;
emit.numbers = 1;
emit.interival = 1000;

emit.translation1 = new Vector( 300, 300 );
emit.translation2 = new Vector( 300, 300 );

emit.scale1 = new Vector( -1, 1 );
emit.scale2 = new Vector( 2, 3 );
emit.scalepower1 = 1;
emit.scalepower1 = 4;

emit.speed1 = 10;
emit.speed1 = 30;

emit.rotationpower1 = 0.1;
emit.rotationpower2 = 0.5;

emit.pfxLife1 = 3000;
emit.pfxLife2 = 3000;

emit.pfxNumber1 = 5;
emit.pfxNumber2 = 5;

emit.pfxSize1 = 5;
emit.pfxSize2 = 15;

emit.color1 = 0xffffff00;
emit.color2 = 0xffff00ff;

emit.pfxType = Particle.ImageType;//Particle.PolygonType2;
emit.sportType = Particle.Translation | Particle.Target;
emit.image = new LImage( "jinbi.png" );

// emit.pfxType = Particle.PolygonType1;
emit.emitterType = ParticleEmitter.AllDirection;

emit.bindMatrix.mulScalingLeft( 0.5, 0.5 );
emit.bindMatrix.mulTranslationRight( 100, 100 );

// emit.addTargetEvent( 0.99, "test" );

var emit1 = new ParticleEmitter( );
emit1.emitterType = ParticleEmitter.AllDirection;
emit1.duration = 500;
emit1.limit = 1;
emit1.numbers = 1;
emit1.interival = 0;
emit1.pfxLife1 = 500;
emit1.pfxLife2 = 500;
emit1.bindMatrix.mulTranslationRight( 400, 400 );
emit1.pfxType = Particle.ImageType;
var image = new LImage( "qq.png" );
emit1.image.addResource( image, 0, 0, 42, 42 ) 
emit1.pfxNumber1 = 4;
emit1.pfxNumber2 = 4;

emit1.pfxSize1 = 20;
emit1.pfxSize2 = 20;

emit1.sportType = Particle.Translation;
emit1.translation1 = new Vector( 0, -1 );
emit1.translation2 = new Vector( 0, -1 );
emit1.speed1 = 5;
emit1.speed2 = 5;
emit1.color1 = 0xffff0000;
emit1.color2 = 0xffff0000;
// emit1.play()
emit.addTargeName(0.99, "test");
emit.addTargetEvent( function( e ){
	if ( e == "test" )
		emit1.play( );
});

emit.play( );

var anima = new ImageAnimation( window.ImageAnimationData[1] );
anima.play( );
window.rendercallbackfunc = function(e)
{
	emit.update( e );
	emit.render( e );

	emit1.update( e );
	emit1.render( e );
	

	ImageAnimation.Update( anima, e );
	
	ImageAnimation.Render( anima, e );
}

window.onMouseDown[window.onMouseDown.length] = function( b, x, y )
{
	// log("event mousedown", b, x, y);
}

window.onMouseMove[0] = function( x, y )
{
	// log("event mousedown",x, y);
}

window.onMouseUp[0] = function( b, x, y )
{
	// log("event mouseup", b, x, y);
}

window.onKeyDown[window.onKeyDown.length] = function( key )
{
	// log("key down event", key);

	if ( key == System.KeySpace )
	{
		emit.play( );
		anima.play( );
		log("play emitters !");
	}

	return true;
}

window.onKeyUp[0] = function( key )
{
	// log("key up event", key);
}

// var net = require("net")
// log("bbbbbbbbbbbbbbbb")

var ii = new Image( );
ii.src = "asd.png"
log("11111111111111");
ii.onload = function( )
{
	var context = window.context;
	var data = context.getImageData( 0, 0, ii.width, ii.height );
	log("222222222222222222");
	log( "333333333333333333", data.data[0], data.data[1], data.data[2], data.data[3] )
}		
