window.logEnable = true;
System.isClip = true;
var emit = new ParticleEmitter( );
emit.duration = 10000;
emit.limit = 60;
emit.numbers1 = 15;
emit.numbers2 = 15;
emit.interival = 100;
emit.translation1 = new Vector2( -1, 1 );
emit.translation2 = new Vector2( 1, -1 );

emit.scale1 = new Vector2( -1, 1 );
emit.scale2 = new Vector2( 2, 3 );
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
emit.sportType = Particle.Translation | Particle.Rotation;
emit.emitterType = ParticleEmitter.AllDirection;

emit.bindMatrix.mulTranslationRight( 50, 30 );

emit.play( );

window.rendercallbackfunc = function(e)
{
	emit.update( e );
	emit.render( e );
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