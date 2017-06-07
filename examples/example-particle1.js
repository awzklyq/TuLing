window.logEnable = true;

var emit = new ParticleEmitter( );
emit.duration = 10000;
emit.limit = 60;
emit.numbers = 15;
emit.interival = 100;
emit.translation1 = new Vector( -1, 1 );
emit.translation2 = new Vector( 1, -1 );

emit.scale1 = new Vector( -1, 1 );
emit.scale2 = new Vector( 2, 3 );
emit.scalepower1 = -1;
emit.scalepower1 = 2;

emit.speed1 = 10;
emit.speed1 = 30;

emit.rotationpower1 = 0.1;
emit.rotationpower2 = 0.5;

emit.pfxLife1 = 2000;
emit.pfxLife2 = 3000;

emit.pfxNumber1 = 3;
emit.pfxNumber2 = 6;

emit.pfxSize1 = 5;
emit.pfxSize2 = 15;

emit.color1 = 0xffffff00;
emit.color2 = 0xffff00ff;

emit.pfxType = Particle.PolygonType2;
emit.sportType = Particle.Translation | Particle.Rotation | Particle.Scale;
// log(emit.sportType, ( emit.sportType & Particle.Translation ) != 0,  ( emit.sportType & Particle.Rotation ) != 0, ( emit.sportType & Particle.Scale ) != 0);
// emit.pfxType = Particle.PolygonType1;
emit.emitterType = ParticleEmitter.AllDirection;

emit.bindMatrix.mulTranslationRight( 500, 300 );

// emit.addTargetEvent( 0.99, "test" );

// var emit1 = new ParticleEmitter( );
// emit1.emitterType = ParticleEmitter.AllDirection;
// emit1.duration = 500;
// emit1.limit = 1;
// emit1.numbers = 1;
// emit1.interival = 0;
// emit1.pfxLife1 = 500;
// emit1.pfxLife2 = 500;
// emit1.bindMatrix.mulTranslationRight( 400, 400 );
// emit1.pfxType = Particle.PolygonType1;
// emit1.pfxNumber1 = 4;
// emit1.pfxNumber2 = 4;

// emit1.pfxSize1 = 20;
// emit1.pfxSize2 = 20;

// emit1.sportType = Particle.Translation;
// emit1.translation1 = new Vector( 0, -1 );
// emit1.translation2 = new Vector( 0, -1 );
// emit1.speed1 = 5;
// emit1.speed2 = 5;
// emit1.color1 = 0xffff0000;
// emit1.color2 = 0xffff0000;
// // emit1.play()
// emit.addTargeName(0.99, "test");
// emit.addTargetEvent( function( e ){
	// // if ( e == "test" )
		// // emit1.play( );
// });

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