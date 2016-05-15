function Blender( )
{
	this.alpha1 = 1.0;
	this.alpha2 = 1.0;
	this.color1 = 0x0;
	this.color2 = 0x0;
	this.time = 0;
	this.tick = 0;
	this.state = 0;

	this.setEnabelColor = function( enabel )
	{
		if ( enabel )
			this.state |= Blender.USECOLOR;
		else
			this.state &= ~Blender.USECOLOR;
	}

	this.useColor = function( c1, c2, t )
	{
		// TODO.
		this.color1 = c1 == null ? 0x00 : c1;
		this.color2 = c2 == null ? 0x00 : c2;
		this.time = t | 0;
		this.tick = 0;
	}

	this.getCurrentColor = function( )
	{
		if ( ( this.state & Blender.USECOLOR ) == 0 )
			return 0x00;

		if ( this.tick == 0 )
			return this.color1;

		if ( this.time == 0 )
			return this.color2;

		return Math.LinearColor( this.color1, this.color2, this.tick / this.time );
	}

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
		this.tick = 0;
	}

	this.getCurrentAlpha = function( )
	{
		if ( ( this.state & Blender.USEALPHA ) == 0 )
			return 1;

		if ( this.tick == 0 )
			return this.alpha1;

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
Blender.USECOLOR = 0x00000002;