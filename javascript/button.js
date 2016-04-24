// UI Button.
function Button( x, y, w, h, text )
{
	this._x = 0;
	this._y = 0;
	this._w = 0;
	this._h = 0;

	// 1.normal, 2.down.
	this.state = 1;

	if ( x != null )
	{
		this._x = x;
	}

	if ( y != null )
	{
		this._y = y;
	}

	if ( w != null )
	{
		this._w = w;
	}

	if ( h != null )
	{
		this._h = h;
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

		this.polygon = new Polygon( {x:0, y:0}, {x:this._w, y:0}, {x:this._w, y:this._h}, {x:0, y:this._h});
		this.polygon.moveTo( this._x, this._y );

	}

	this.tick = 0;
	this.draw = function( )
	{
		Polygon.draw( this.polygon );
		if ( this.state == 1 )
		{
			if ( this.image1 != null )
			{
				this.image1.drawImage( this._x, this._y, this._w, this._h );
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
				this.image2.drawImage( this._x, this._y, this._w, this._h );
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

	// Called from parent.
	this.triggerResizeXY = function( intervalx, intervaly )
	{
		this.polygon.moveTo( this._x, this._y );
	}

	this.triggerMouseDown = function( b, x, y )
	{
		if ( this.insert( x, y ) == false )
			return false;

		this.state = 2;
		if ( this.click != null )
			this.click( );

		return true;
	}

	this.reset( );
	this.type = "Button";
	UISystem.buttons.push( this );
}

Button.prototype = Global.UI;

UISystem.isButton = function( obj )
{
	return obj.type == "Button";
}