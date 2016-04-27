function LImage( )
{
	this.isLoad = false; 
	this.x = 0;
	this.y = 0;
	this.w = 0;
	this.h = 0;

	if ( arguments.length > 0 )
	{
		this.image = new Image( );
		this.image.src = arguments[0];
		var self = this;
		var issetwh = arguments.length < 4;
		this.image.onload = function( )
		{
			// This is LImage.image.
			this.isLoad = true;

			self.isLoad = true;
			if ( issetwh )
			{
				self.w = this.width;
				self.h = this.height;
			}

			if ( self.loadcallback != null )
			{
				self.loadcallback( );
				delete self.loadcallback;
			}
			
		}
	}

	if ( arguments.length > 1 )
	{
		this.x = arguments[1];
	}
	
	if ( arguments.length > 2 )
	{
		this.y = arguments[2];
	}
	
	if ( arguments.length > 3 )
	{
		this.w = arguments[3];
	}

	if ( arguments.length > 4 )
	{
		this.h = arguments[4];
	}

	this.setLoadCallBack = function( func )
	{
		if ( this.image.isLoad == true )
		{
			func( );
		}
		else
		{
			this.loadcallback = func;
		}
	}
	this.addResource = function( image, x, y, w, h )
	{
		if ( arguments.length == 1 )
		{
			this.resource = image.image || image.resource;
			this.rx = 0;
			this.ry = 0;
			this.rw = image.w;
			this.rh = image.h;
			this.w = image.w;
			this.h = image.h;
		}
		else if ( arguments.length == 5 )
		{
			this.resource = image.image;
			this.rx = x;
			this.ry = y;
			this.rw = w;
			this.rh = h;
			this.w = w;
			this.h = h;
			// log( this.resource, x, y, w, h)
		}
	}

	this.drawImage = function( x, y, w, h, sx, sy, sw, sh )
	{
		var context = window.context;
		var img = this.image
		context.save( );

		Global.bindMatrixToContext( context, Global.getCurrentMatrix( ) );

		if ( img != null && img.isLoad == true )
		{
			if ( arguments.length == 0 )
			{
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
		}
		else if ( this.resource != null && this.resource.isLoad == true )
		{
			if ( arguments.length == 0 )
			{
				context.drawImage(  this.resource, this.rx, this.ry, this.rw, this.rh, this.x, this.y, this.w, this.h );
			}
			else if ( arguments.length == 2 )
			{
				context.drawImage(  this.resource, this.rx, this.ry, this.rw, this.rh, x, y, this.w, this.h );
			}
			else if ( arguments.length == 4 )
			{
				context.drawImage( this.resource, this.rx, this.ry, this.rw, this.rh, x, y, w, h );
			}
			else if ( arguments.length == 8 )
			{
				context.drawImage( this.resource, this.rx + sx, this.ry + sy, this.rw + sw, this.rh + sh, x, y, w, h );
			}
		}
		context.restore( );
	}
}