window.logEnable = true;

var context = window.context;
context.fillStyle = 'cornflowerblue';
context.strokeStyle = 'yellow';

context.lineWidth = 4;
context.lineCap = 'round';
window.rendercallbackfunc = function( e )
{
	context.beginPath( );
	context.moveTo( 100, 100 );
	context.quadraticCurveTo( 150, -50, 200, 100 );
	context.stroke( );
}