// UI Button.
function Button( name, x, y, w, h, text )
{
	this._x = x || 0;
	this._y = y || 0;
	this._w = w || 0;
	this._h = h || 0;

	// 1.normal, 2.down.
	this.state = 1;

	this._name = name || "";
	this.text = new Text( );
	
	if ( text != null && text != "" )
	{
		this.text._x = this._x;
		this.text._y = this._y;
		this.text._w = this._w;
		this.text.setFont( this._h );
		this.text.text = text;
	}
	
	this.elements = new ArrayEx( );
	this.elements.push( this.text );
	this.addUI = function( ui )
	{
		if ( UISystem.isUIView( ui ) == false )
			return;

		ui._parent = this;
		this.elements.push( ui );
		UISystem.removeUI( ui );
	}

	this.removeUI = function( ui )
	{
		if ( UISystem.isUIView( ui ) == false || ui._parent != this )
			return

		this.elements.remove( ui );
		delete ui._parent;
	}

	this.color1 = 0xff888888;
	this.color2 = 0xffaaaaaa;
	this.setColor = function( color1, color2 )
	{
		if ( this.color1 )
			delete this.color1;

		if ( this.color2 )
			delete this.color2;

		this.color1 = color1;

		if ( color2 )
			this.color2 = color2;
	}

	this.setImage = function( normal, down )
	{
		if ( this.image1 != null )
			delete this.image1;

		if ( this.image2 != null )
			delete this.image2;

		this.image1 = new LImage( normal );

		if ( down != null )
			this.image2 = new LImage( down );
	}

	this.insert = function( x, y )
	{
		if ( this.renderType == Button.Polygon && this.polygon != null )
			return this.polygon.insert( x, y );
		else if ( this.renderType == Button.Circle && this.circle != null )
			return this.circle.insert( x, y );

		return false;
	}

	this.release = function( )
	{
		if ( this.polygon != null )
			delete this.polygon;

		if ( this.circle != null )
			delete this.circle;

		if ( this.click != null )
			delete this.click;

		for ( var i = 0; i < UISystem.buttons.length; i ++ )
		{
			if ( UISystem.buttons[i] == this )
			{
				UISystem.buttons.splice( i, 1 );
				break;
			}
		}

		this.removeUI( this.text );
	}

	this.renderType = 0x00000001;
	this.setRenderType = function( type )
	{
		this.renderType = type;
		this.reset( );
	}

	this.reset = function( )
	{
		if ( this.polygon != null )
			delete this.polygon;

		if ( this.circle != null )
			delete this.circle;

		if ( this.renderType == Button.Polygon )
		{
			this.polygon = new Polygon( {x:this._x, y:this._y}, {x:this._w + this._x, y:this._y}, {x:this._w + this._x, y:this._h + this._y}, {x:this._x, y:this._h + this._y});

			// TODO.
			// this.polygon.moveTo( this._x, this._y );
		}
		else if ( this.renderType == Button.Circle )
		{
			this.circle = new Circle( this._x, this._y, this._w * 0.5 );
		}

	}

	this.tick = 0;
	this.draw = function( )
	{		
		if ( this.state == 1 )
		{
			if ( this.image1 != null )
			{
				this.image1.drawImage( this._x, this._y, this._w, this._h );
			}
			else
			{
				if ( this.renderType == Button.Polygon && this.polygon != null )
				{
					this.polygon.setColorStyle( this.color1 );
					Polygon.render( this.polygon );
				}
				else if ( this.renderType == Button.Circle && this.circle != null )
				{
					this.circle.setColor( this.color1 );
					this.circle.draw( );
				}
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
				if ( this.renderType == Button.Polygon && this.polygon != null )
				{
					this.polygon.setColorStyle( this.color2 );
					Polygon.render( this.polygon );
				}
				else if ( this.renderType == Button.Circle && this.circle != null )
				{
					this.circle.setColor( this.color2 );
					this.circle.draw( );
				}
			}

			// The button is pressed.
			if ( ++this.tick % 10 == 0  )
			{
				this.state = 1;
				this.tick = 0;
			}
		}

		if ( this.text.text != "" )
			this.text.draw( );
	}

	// Called from parent.
	this.triggerResizeXY = function( intervalx, intervaly )
	{
		if ( this.renderType == Button.Polygon && this.polygon != null )
		{
			// TODO, Only for rect.
			this.polygon.moveTo( this._x + this.w * 0.5, this._y + this.h * 0.5 );
		}
		else if ( this.renderType == Button.Circle && this.circle != null )
		{
			this.circle.moveTo( this._x, this._y );
		}
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

// RenderType.
Button.Polygon = 0x00000001;
Button.Rect = 0x00000002;
Button.Circle = 0x00000003; 