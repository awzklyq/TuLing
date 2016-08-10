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

	this.blendmode = "source-over";
	this.setEnabelBlendMode = function( enabel )
	{
		if ( enabel )
			this.state |= Blender.USEBLENDMODE;
		else
			this.state &= ~Blender.USEBLENDMODE;
	}

	this.setBlendMode = function( mode )
	{
		this.blendmode = mode;
	}
	
	this.getBlendMode = function( )
	{
		if ( ( this.state & Blender.USEBLENDMODE ) == 0 )
			return "source-over";

		return this.blendmode;
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
Blender.USEBLENDMODE = 0x00000004;

// source-over 默认。在目标图像上显示源图像。 
// source-atop 在目标图像顶部显示源图像。源图像位于目标图像之外的部分是不可见的。 
// source-in 在目标图像中显示源图像。只有目标图像内的源图像部分会显示，目标图像是透明的。 
// source-out 在目标图像之外显示源图像。只会显示目标图像之外源图像部分，目标图像是透明的。 
// destination-over 在源图像上方显示目标图像。 
// destination-atop 在源图像顶部显示目标图像。源图像之外的目标图像部分不会被显示。 
// destination-in 在源图像中显示目标图像。只有源图像内的目标图像部分会被显示，源图像是透明的。 
// destination-out 在源图像外显示目标图像。只有源图像外的目标图像部分会被显示，源图像是透明的。 
// lighter 显示源图像 + 目标图像。 
// copy 显示源图像。忽略目标图像。 
// source-over 使用异或操作对源图像与目标图像进行组合。 
