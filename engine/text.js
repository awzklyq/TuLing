function Text( text, x, y, w, h )
{
	this._x = 0;
	this._y = 0;

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

	if ( text != null )
	{
		this.text = text;
	}
	else
	{
		this.text = "";
	}

	this.lineWidth = 2;
	this.font = Global.FONT;
	this.setFont = function( font )
	{
		this.font = font+"px Georgia";
	}

	if ( h != null )
	{
		this._h = h;
		this.setFont(this._h);
	}
	this.style = Global.FILLSTYLE;
	this.setStyle = function( style )
	{
		this.style = style;
	}

	this.setColor = function( color1, color2 )
	{
		var temp = Math.DecompressionRGBA( color1 );
		this.color1 = "rgba(" + temp.r + "," + temp.g + "," + temp.b + "," + temp.a + ")";
		temp = Math.DecompressionRGBA( color2 );
		this.color2 = "rgba(" + temp.r + "," + temp.g + "," + temp.b + "," + temp.a + ")";
	}

	this.draw = function( )
	{
		var context = window.context;
		context.save( );
		Global.bindMatrixToContext( context, Global.getCurrentMatrix( ) );

		context.font = this.font;
		context.lineWidth = this.lineWidth;
		context.textAlign = Global.textAlign;
		context.textBaseline = Global.textBaseline;
		if ( this.color1 != null )
		{
			context.fillStyle = this.color1;
		}

		if ( this.color2 != null )
		{
			context.strokeStyle = this.color2;
		}

		if ( this.style == Global.FILLSTYLE )
		{
			context.fillText( this.text, this._x, this._y, this._w );
		}
		else if ( this.style == Global.STROKESTYLE )
		{
			context.strokeText( this.text, this._x, this._y, this._w )
		}
		else
		{
			context.fillText( this.text, this._x, this._y, this._w );
			context.strokeText( this.text, this._x, this._y, this._w );
		}

		context.restore( );
	}

	this.type = "Text"
	UISystem.texts.push( this );
}

Text.prototype = Global.UI;

UISystem.isText = function( obj )
{
	return obj.type == "Text";
}

function TextArea( text, x, y, w, h )
{
	if ( x != null )
	{
		this._x = x;
	}
	else
	{
		this._x = 0;
	}
	
	if ( y != null )
	{
		this._y = y;
	}
	else
	{
		this._y = 0;
	}

	if ( w != null )
	{
		this._w = w;
	}
	else
	{
		this._w = 0;
	}
	
	if ( h != null )
	{
		this._h = h;
	}
	else
	{
		this._h = 0;
	}

	this.textList = new Array( );
	this.text = "";
	this.setText = function( text )
	{
		if ( this.text != null )
		{
			delete this.text ;
		}
	
		if ( this.textList != null )
		{
			delete this.textList;
			this.textList = new Array( );
		}

		this.text = new String( text );
		var context = window.context;
		var width = context.measureText( text ).width;
		
		if ( this._w != null  && width - this._w > 0 )
		{
		
			this.size = width * 2 / context.measureText( this.text.charAt( 0 ) ).width;
		
			var num = Math.ceil( width / this._w );
			var temp = Math.ceil( this.text.length / num );
			for ( var i = 0; i < num; i ++ )
			{
				this.textList[i] = this.text.substr( i * temp, temp );
			}	
		}
	}

	if ( text != null )
	{
		
		this.setText( text );
	}

	this.lineWidth = 2;
	this.font = Global.FONT;
	this.setFont = function( font )
	{
		this.font = font;
	}

	this.style = Global.FILLSTYLE;
	this.setStyle = function( style )
	{
		this.style = style;
	}

	this.setColor = function( color1, color2 )
	{
		var temp = Math.DecompressionRGBA( color1 );
		this.color1 = "rgba(" + temp.r + "," + temp.g + "," + temp.b + "," + temp.a + ")";
		temp = Math.DecompressionRGBA( color2 );
		this.color2 = "rgba(" + temp.r + "," + temp.g + "," + temp.b + "," + temp.a + ")";
	}

	this.draw = function( )
	{
		if ( this.textList == null && this.text == null )
		{
			return;
		}

		var context = window.context;
		context.save( );
		Global.bindMatrixToContext( context, Global.getCurrentMatrix( ) );

		context.font = this.font;
		context.lineWidth = this.lineWidth;

		if ( this.color1 != null )
		{
			context.fillStyle = this.color1;
		
		}

		if ( this.color2 != null )
		{
			context.strokeStyle = this.color2;
		}

		if ( this.style == Global.FILLSTYLE )
		{
			if ( this.textList.length > 0  )
			{
				for ( var i = 0; i < this.textList.length; i ++ )
				{
					context.fillText( this.textList[i], this._x, this._y + i * this.size, this._w );
				}
			}
			else
			{
				context.fillText( this.text, this._x, this._y, this._w );
			}
		}
		else if ( this.style == Global.STROKESTYLE )
		{
			if ( this.textList.length > 0  )
			{
				for ( var i = 0; i < this.textList.length; i ++ )
				{
					context.strokeText( this.textList[i], this._x, this._y + i * this.size, this._w );
				}
			}
			else
			{
				context.strokeText( this.text, this._x, this._y, this._w );
			}
		}
		else
		{
			if ( this.textList.length > 0  )
			{
				for ( var i = 0; i < this.textList.length; i ++ )
				{
					context.fillText( this.textList[i], this._x, this._y + i * this.size, this._w );
					context.strokeText( this.textList[i], this._x, this._y + i * this.size, this._w );
				}
			}
			else
			{
				context.fillText( this.text, this._x, this._y, this._w );
				context.strokeText( this.text, this._x, this._y, this._w );
			}
		}

		context.restore( );
	}

	this.type = "TextArea";
	UISystem.textareas.push( this );
}

TextArea.prototype = Global.UI;

UISystem.isTextArea = function( obj )
{
	return obj.type == "TextArea";
}