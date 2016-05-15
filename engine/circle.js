function Circle( x, y, r )
{
	this.x = x || 0;
	this.y = y || 0;
	this.r = r || 0;
	this.line = "2";

	this.xx1 = this.x;
	this.yy1 = this.y;
	this.xx2 = this.x;
	this.yy2 = this.y;
	this.tick = 0;
	this.time = 0;

	this.startAngle = 0;
	this.endAngle = Math.ARC;
	this.lineColorStyle = Math.getRGBA( 0xff000000 );
	this.colorStyle = Math.getRGBA( 0x00ffffff );

	this.setLineColor = function( color )
	{
		this.lineColorStyle = Math.getRGBA( color );
	}
	
	this.setColor = function( color )
	{
		this.colorStyle = Math.getRGBA( color );
	}

	this.moveTo = function( x, y, t )
	{
		this.time = t || 0;
		this.tick = 0;

		if ( t == null || t == 0 )
		{
			this.x = x || 0;
			this.y = y || 0;
		}
		else
		{
			this.xx1 = this.x;
			this.yy1 = this.y;
			this.xx2 = x;
			this.yy2 = y;
		}
	}

	this.move = function( x, y, t )
	{
		this.time = t || 0;
		this.tick = 0;

		if ( t == null || t == 0 )
		{
			this.x += x || 0;
			this.y += y || 0;
		}
		else
		{
			this.xx1 = this.x;
			this.yy1 = this.y;
			this.xx2 = this.x + x;
			this.yy2 = this.y + y;
		}
	}

	this.stopMove = function( )
	{
		this.time = 0;
		this.tick = 0;
	}

	this.insert = function( x, y )
	{
		return Math.pow( x - this.x, 2 ) + Math.pow( y - this.y, 2 ) < Math.pow( this.r, 2 ); 
	}
	
	this.update = function( e )
	{
		// Update.
		if ( this.time <= this.tick )
			return;

		this.tick += e;
		if ( this.tick > this.time )
			this.tick = this.time;

		var temp = this.tick / this.time;
		this.x = Math.Linear( this.xx1, this.xx2, temp );
		this.y = Math.Linear( this.yy1, this.yy2, temp );
	}
	
	this.draw = function( )
	{
		// Render.
		var context = window.context;
		context.save( );
		context.beginPath( );
		context.lineWidth = this.line;
		context.fillStyle = this.colorStyle;
		context.strokeStyl = this.lineColorStyle;
		context.arc( this.x, this.y, this.r, this.startAngle, this.endAngle );
		context.closePath( );
		context.fill( );
		context.stroke( );
		context.restore( );
	}
	
}