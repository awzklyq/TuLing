function TextInput( x, y, w, h, text )
{
	this.x = x || 0;
	this.y = y || 0;
	this.w = w || 0;
	this.h = h || 0;
	this.text = text || "";

	this.borderWidth = 2;

	this.textColor = "rgba(0, 0, 0, 255)";
	this.setTextColor = function( color )
	{
		var temp = Math.DecompressionRGBA( color );
		this.textColor = "rgba(" + temp.r + "," + temp.g + "," + temp.b + "," + temp.a + ")";
	}
	
	this.borderColor = "rgba(0, 0, 0, 255)";
	this.setBorderColor = function( color )
	{
		var temp = Math.DecompressionRGBA( color );
		this.borderColor = "rgba(" + temp.r + "," + temp.g + "," + temp.b + "," + temp.a + ")";
	}

	this.bgColor = "rgba(255, 255, 255, 255)";
	this.setBackgroundColor = function( color )
	{
		var temp = Math.DecompressionRGBA( color );
		this.bgColor = "rgba(" + temp.r + "," + temp.g + "," + temp.b + "," + temp.a + ")";
	}

	this.cursorColor = "rgba(0, 0, 0, 255)";
	this.cursorWidth = 1;
	this.setCursorColor = function( color )
	{
		var temp = Math.DecompressionRGBA( color );
		this.cursorColor = "rgba(" + temp.r + "," + temp.g + "," + temp.b + "," + temp.a + ")";
	}

	this.tick = 0;
	this.showCursorInterval = 500;
	this.showCursor = true;
	this.fouse = false;
	this.cursorX = this.x + TextInput.getTextWidth( this.text );
	this.draw = function( e )
	{
		var context = window.context;
		context.save( );
		context.beginPath( );

		context.lineWidth = this.borderWidth;
		context.strokeStyle = this.borderColor;
		
		context.strokeRect( this.x, this.y, this.w, this.h );

		context.fillStyle = this.bgColor;
		context.fillRect( this.x, this.y, this.w, this.h );

		context.fillStyle = this.textColor;
		context.fillText( this.text, this.x, this.y + this.h - this.borderWidth, this.w );

		this.tick += e;

		if ( this.tick >= this.showCursorInterval )
		{
			this.showCursor = !this.showCursor;
			this.tick = 0;
		}
		
		if ( this.fouse && this.showCursor )
		{
			context.lineWidth = this.cursorWidth;
			context.fillStyle = this.textColor;
			context.moveTo( this.cursorX, this.y );
			context.lineTo( this.cursorX, this.y + this.h );
		}
	
		context.closePath( );
		context.stroke( );
		context.fill( );
		context.restore( );
	}

	this.insert = function( x, y )
	{
		return ( x > this.x ) && ( x < this.x + this.w ) && ( y > this.y ) && ( y < this.y + this.h );
	}

	this.setCursorPostion = function( x, y )
	{
		var xx = x - this.x;
		var textwidth = TextInput.getTextWidth( this.text );
		if ( xx > textwidth )
		{
			this.cursorX = this.x + textwidth;
		}
		else
		{
			var temp = "";
			for ( var i = 0; i < this.text.length; i ++ )
			{
				textwidth = TextInput.getTextWidth( temp + this.text[i] );
				if ( xx <= textwidth )
				{
					this.cursorX = this.x + TextInput.getTextWidth( temp );
					break;
				}
				temp += this.text[i];
			}
		}
	}

	this.release = function( )
	{
		for ( var i = 0; i < UISystem.textinput.length; i ++ )
		{
			if ( UISystem.textinput[i] == this )
			{
				UISystem.textinput.splice( i, 1 );
				break;
			}
		}
	}

	UISystem.textinputs.push( this );
}

TextInput.getTextWidth = function( text )
{
	return window.context.measureText( text || "" ).width;
}