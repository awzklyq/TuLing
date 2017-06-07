window.logEnable = true;

var emit = new ParticleEmitter( );
emit.duration = 10000;
emit.limit = 1;
emit.numbers1 = 1;
emit.numbers2 = 1;
emit.interival = 100;
emit.translation1 = new Vector( 200, 200 );
emit.translation2 = new Vector( 200, 200 );

emit.scale1 = new Vector( 1, 1 );
emit.scale2 = new Vector( 1, 1 );
emit.scalepower1 = 1.02;
emit.scalepower2 = 1.02;

emit.speed1 = 10;
emit.speed1 = 10;

emit.rotationpower1 = 0.1;
emit.rotationpower2 = 0.1;

emit.pfxLife1 = 2000;
emit.pfxLife2 = 3000;

emit.pfxNumber1 = 5;
emit.pfxNumber2 = 5;

emit.pfxSize1 = 15;
emit.pfxSize2 = 15;

emit.color1 = 0xffffff00;
emit.color2 = 0x0fffff00;
emit.image = new LImage( "res\\zhadan.png" );
emit.pfxType = Particle.ImageType;
emit.sportType = Particle.Target;

emit.emitterType = ParticleEmitter.AllDirection;

emit.bindMatrix.mulTranslationRight( 0, 0 );


emit.play( );

window.rendercallbackfunc = function(e)
{
	emit.update( e );
	emit.render( e );

	// emit1.update( e );
	// emit1.render( e );
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