function Text( text, x, y, w, h )
{
	this.x = 0;
	this.y = 0;

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
			context.fillText( this.text, this.x, this.y, this.w );
		}
		else if ( this.style == Global.STROKESTYLE )
		{
			context.strokeText( this.text, this.x, this.y, this.w )
		}
		else
		{
			context.fillText( this.text, this.x, this.y, this.w );
			context.strokeText( this.text, this.x, this.y, this.w );
		}

		context.restore( );
	}
}

function TextArea( text, x, y, w, h )
{
	if ( x != null )
	{
		this.x = x;
	}
	else
	{
		this.x = 0;
	}
	
	if ( y != null )
	{
		this.y = y;
	}
	else
	{
		this.y = 0;
	}

	if ( w != null )
	{
		this.w = w;
	}
	else
	{
		this.w = 0;
	}
	
	if ( h != null )
	{
		this.h = h;
	}
	else
	{
		this.h = 0;
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
		
		if ( this.w != null  && width - this.w > 0 )
		{
		
			this.size = width * 2 / context.measureText( this.text.charAt( 0 ) ).width;
		
			var num = Math.ceil( width / this.w );
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
					context.fillText( this.textList[i], this.x, this.y + i * this.size, this.w );
				}
			}
			else
			{
				context.fillText( this.text, this.x, this.y, this.w );
			}
		}
		else if ( this.style == Global.STROKESTYLE )
		{
			if ( this.textList.length > 0  )
			{
				for ( var i = 0; i < this.textList.length; i ++ )
				{
					context.strokeText( this.textList[i], this.x, this.y + i * this.size, this.w );
				}
			}
			else
			{
				context.strokeText( this.text, this.x, this.y, this.w );
			}
		}
		else
		{
			if ( this.textList.length > 0  )
			{
				for ( var i = 0; i < this.textList.length; i ++ )
				{
					context.fillText( this.textList[i], this.x, this.y + i * this.size, this.w );
					context.strokeText( this.textList[i], this.x, this.y + i * this.size, this.w );
				}
			}
			else
			{
				context.fillText( this.text, this.x, this.y, this.w );
				context.strokeText( this.text, this.x, this.y, this.w );
			}
		}

		context.restore( );
	}
	
}