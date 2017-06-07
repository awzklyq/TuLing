window.logEnable = true;

var data = {x:0, y:0, w:0, h:0, image:"explosion.png", name:"test", cutx:4, cuty:4,framestime:30, loop:false};
data.image = new LImage( "explosion.png" )
var anima = new ImageAnimation( );
// data.image.setLoadCallBack( function(){
	// anima.bindData( data );
// });

var baozha = new ParticleEmitter( );
baozha.duration = 1;
baozha.limit = 1;
baozha.numbers1 = 1;
baozha.numbers2 = 1;
baozha.interival = 0;
baozha.translation1 = new Vector( 0, 0 );
baozha.translation2 = new Vector( 0, 0 );
baozha.imageAnimaData = data;

baozha.speed1 = 10;
baozha.speed1 = 15;

baozha.pfxLife1 = data.cutx * data.cuty * data.framestime * 2;
baozha.pfxLife2 = baozha.pfxLife1;

baozha.pfxType = Particle.ImageAnimaType;
baozha.sportType =  Particle.Translation;

baozha.emitterType = ParticleEmitter.AllDirection;

baozha.bindMatrix.mulTranslationRight( 300, 300 );

baozha.play()
window.rendercallbackfunc = function(e)
{
	baozha.update( e );
	baozha.render( e );

	ImageAnimation.update( anima, e );
	ImageAnimation.render( anima, e );
}

window.onMouseDown[window.onMouseDown.length] = function( b, x, y )
{
	// log("event mousedown", b, x, y);
	baozha.play()
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
		baozha.play( );
		// anima.play( );
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