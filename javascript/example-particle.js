window.logEnable = true;

var emit = new ParticleEmitter( );
emit.duration = 10000;
emit.limit = 100;
emit.numbers = 10;
emit.interival = 100;
emit.translation1 = new Vector( -1, -1 );
emit.translation2 = new Vector( 1, 1 );
emit.scale1 = new Vector( -1, 1 );
emit.scale2 = new Vector( 2, 3 );
emit.scalepower1 = 1;
emit.scalepower1 = 4;
emit.speed1 = 10;
emit.speed1 = 30;
emit.pfxLife1 = 1000;
emit.pfxLife2 = 3000;
emit.color1 = 0xff00ffff;
emit.color2 = 0xffffff00;
emit.pfxType = Particle.PolygonType1;
emit.sportType = Particle.Translation;
emit.pfxType = Particle.PolygonType1;
emit.emitterType = ParticleEmitter.AllDirection;

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

	return true;
}

window.onKeyUp[0] = function( key )
{
	// log("key up event", key);
}

// var net = require("net")
// log("bbbbbbbbbbbbbbbb")