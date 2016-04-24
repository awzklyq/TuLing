function Particle( )
{
	this.pfxType = 0;
	this.direction = new Vector( );
	this.current = 0;
	this.duration = 0;

	this.sportType = 0; // Rotation, scale, move.
	this.showType = 0; //  Show, hide, show and hide.

	this.gravityDirection = new Vector( );
	this.gravityPower = 0;
}

Particle.ImageType = 1;
Particle.ImageAnimaType = 2;
Particle.PolygonType = 3;
Particle.PolygonAnimaType = 4;