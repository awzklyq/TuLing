function CanvasEx( )
{
	this.x = 0;
	this.y = 0;
	this.w = 0;
	this.h = 0;
	this.canvas = document.createElement( 'canvas' );
	this.canvas.setAttribute( "id", CanvasEx.id ++ ); 

	this.setAttribute = function( key, value )
	{
		this.canvas.setAttribute( key, value );
	}

	this.bindImageData = function( imagedata, x, y )
	{
		if ( imagedata == null )
			return;

		var context = this.canvas.getContext('2d');
		context.putImageData( imagedata, x || 0, y || 0 );
	}

	this.getContext = function( )
	{
		return this.canvas.getContext('2d');
	}
	
	this.getCanvasData = function( )
	{
		return this.canvas;
	}

	this.release = function( )
	{
		document.deleteElement( 'canvas' );

		delete this.canvas;
	}

	this.canvas.release = function( )
	{
		delete this.canvas.release( );
		this.release( );
	}

	this.release = function( )
	{
		document.removeChild( this.canvas );

		delete this.canvas;
	}

	this.bindImage = function( limge, x, y, w, h, sx, sy, sw, sh )
	{
		var self = this;
		limge.setLoadCallBack(function( )
		{
			self.canvas.setAttribute( "width", limge.w ); 
			self.canvas.setAttribute( "height", limge.h );  
			var context = window.context;
			window.context = self.canvas.getContext('2d');
			if ( sh != null )
			{
				limge.drawImage( x, y, w, h, sx, sy, sw, sh );
			}
			else if ( sw != null )
			{
				limge.drawImage( x, y, w, h, sx, sy, sw );
			}
			else if ( sy != null )
			{
				limge.drawImage( x, y, w, h, sx, sy );
			}
			else if ( sx != null )
			{
				limge.drawImage( x, y, w, h, sx );
			}
			else if ( h != null )
			{
				limge.drawImage( x, y, w, h );
			}
			else if ( w != null )
			{
				limge.drawImage( x, y, w );
			}
			else if ( y != null )
			{
				limge.drawImage( x, y );
			}
			else if ( x != null )
			{
				limge.drawImage( x );
			}
			else
			{
				limge.drawImage( );
			}

			window.context = context;
		});
		
	}

	this.draw = function( x, y, w, h, sx, sy, sw, sh )
	{
		var context = window.context;
		var img = this.canvas
		if ( img == null )
			return;

		context.save( );
		context.beginPath( );
		Global.bindMatrixToContext( context, Global.getCurrentMatrix( ) );

		var blender = Global.getCurrentBlender( );
		context.globalAlpha = blender.alpha;

		if ( arguments.length == 0 )
		{
			if ( this.w == 0 || this.h == 0 )
				context.drawImage( img, this.x, this.y );
			else
				context.drawImage( img, this.x, this.y, this.w, this.h );
		}
		else if ( arguments.length == 2 )
		{
			context.drawImage( img, x, y );
		}
		else if ( arguments.length == 4 )
		{
			context.drawImage( img, x, y, w, h );
		}
		else if ( arguments.length == 8 )
		{
			context.drawImage( img, x, y, w, h, sx, sy, sw, sh );
		}
		context.closePath( );
		context.restore( );
	}
}

CanvasEx.id = 0;