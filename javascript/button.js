
// UI Button.
function Button( x, y, w, h, text )
{
	this.x = 0;
	this.y = 0;
	this.w = 0;
	this.h = 0;
	
	// 1.normal, 2.down.
	this.state = 1;

	if ( x != null )
	{
		this.x = x;
	}

	if ( y != null )
	{
		this.y = y;
	}

	if ( w != null )
	{
		this.w = w;
	}

	if ( h != null )
	{
		this.h = h;
	}

	this.setColor = function( color1, color2 )
	{
		if ( this.color1 )
		{
			delete this.color1;
		}

		if ( this.color2 )
		{
			delete this.color2;
		}

		this.color1 = color1;

		if ( color2 )
		{
			this.color2 = color2;
		}
	}

	this.setImage = function( normal, down )
	{
		if ( this.image1 != null )
		{
			delete this.image1;
		}

		if ( this.image2 != null )
		{
			delete this.image2;
		}

		this.image1 = new LImage( normal );

		if ( down != null )
		{
			this.image2 = new LImage( down );
		}
	}

	this.insert = function( x, y )
	{
		return this.polygon.insert( x, y );
	}

	this.release = function( )
	{
		if ( this.polygon != null )
		{
			delete this.polygon;
		}

		if ( this.click != null )
		{
			delete this.click;
		}

		for ( var i = 0; i < UISystem.buttons.length; i ++ )
		{
			if ( UISystem.buttons[i] == this )
			{
				UISystem.buttons.splice( i, 1 );
				break;
			}
		}
	}

	this.reset = function( )
	{
		if ( this.polygon != null )
		{
			delete this.polygon;
		}
		
		this.polygon = new Polygon( {x:this.x, y:this.y}, {x:this.x + this.w, y:this.y}, {x:this.x + this.w, y:this.y + this.h}, {x:this.x, y:this.y + this.h});

	}

	this.tick = 0;
	this.draw = function( )
	{
		Polygon.draw( this.polygon );

		if ( this.state == 1 )
		{
			if ( this.image1 != null )
			{
				this.image1.drawImage( this.x, this.y, this.w, this.h );
			}
			else
			{
				this.polygon.setColorStyle( this.color1 );
				Polygon.draw( this.polygon );
			}
		}
		else if ( this.state == 2 )
		{
			if ( this.image2 != null )
			{
				this.image2.drawImage( this.x, this.y, this.w, this.h );
			}
			else
			{
				this.polygon.setColorStyle( this.color2 );
				Polygon.draw( this.polygon );
			}

			// The button is pressed.
			if ( ++this.tick % 10 == 0  )
			{
				this.state = 1;
				this.tick = 0;
			}
		}
	}

	this.reset( );
	UISystem.buttons[UISystem.buttons.length] = this;
}