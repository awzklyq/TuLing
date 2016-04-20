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
	this.cursorX = this.x + StringEx.getStringPixelSize( this.text );
	this.curindex = this.text.length - 1;
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
		return ( x > this.x ) && ( x < this.x + this.w + this.borderWidth ) && ( y > this.y - this.borderWidth ) && ( y < this.y + this.h + this.borderWidth );
	}

	this.setCursorPostion = function( x, y )
	{
		var xx = x - this.x;
		var textwidth = StringEx.getStringPixelSize( this.text );
		if ( xx > textwidth )
		{
			this.curindex = this.text.length - 1;
			this.cursorX = this.x + textwidth;
		}
		else
		{
			this.curindex = TextInput.setCursorPostionEx( xx, 0, this.text.length, this.text );
			this.cursorX = this.x + StringEx.getStringPixelSize( StringEx.getSubString( this.text, 0, this.curindex ) );
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

TextInput.setCursorPostionEx = function( dis, start, end, text )
{
	var temp = Math.floor( 0.5 * ( start + end ) );
	if ( temp == start || temp + 1 == end )
		return temp;

	var size1 = StringEx.getStringPixelSize( StringEx.getSubString( text, 0, temp ) );
	var size2 = StringEx.getStringPixelSize( StringEx.getSubString( text, 0, temp + 1 ) );
	if ( size1 <= dis && size2 >= dis )
	{
		return temp;
	}
	else if ( size1 > dis )
	{
		return TextInput.setCursorPostionEx( dis, start, temp, text );
	}
	// if ( size2 < dis ).
	return TextInput.setCursorPostionEx( dis, temp + 1, end, text );
}

TextInput.isObject = function( obj )
{
	return obj instanceof TextInput;
}