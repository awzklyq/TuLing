function Blender( )
{
	this.alpha1 = 1.0;
	this.alpha2 = 1.0;
	this.time = 0;
	this.tick = 0;
	this.state = 0;

	this.setEnabelAlpha = function( enabel )
	{
		if ( enabel )
			this.state |= Blender.USEALPHA;
		else
			this.state &= ~Blender.USEALPHA;
	}

	this.useAlpha = function( a1, a2, t )
	{
		// TODO.
		this.alpha1 = a1 == null ? 1.0 : a1;
		this.alpha2 = a2 == null ? 1.0 : a2;
		this.time = t | 0;
	}

	this.getCurrentAlpha = function( )
	{
		if ( ( this.state & Blender.USEALPHA ) == 0 )
			return 1;

		if ( this.time == 0 )
			return this.alpha2;

		var k = this.tick / this.time;
		return this.alpha2 * k + ( 1 - k ) * this.alpha1;
	}
	
	this.update = function( e )
	{
		if ( this.tick == this.time )
			return;

		this.tick += e;

		if ( this.tick > this.time )
			this.tick = this.time; 
	}
}

Blender.typeid = Global.OBJECTID ++;

Blender.USEALPHA = 0x00000001;