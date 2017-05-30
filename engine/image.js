function LImage( )
{
	this.isLoad = false; 
	this.x = 0;
	this.y = 0;
	this.w = 0;
	this.h = 0;

	this.typeid = Global.LImage_typeid;
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
		if ( Global.isFunction( this.loadcallback ) )
			delete this.loadcallback;

		if ( this.isLoad == true )
			func( );
		else
			this.loadcallback = func;
	}

	this.addResource = function( image, x, y, w, h )
	{
		this.isLoad = true;
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

	this.getWidth = function( )
	{
		if ( this.w != 0 )
			return this.w;

		if ( this.resource != null )
			return this.resource.width;

		if ( this.image != null )
			return this.image.width;

		return 0;
	}

	this.getHeight = function( )
	{
		if ( this.h != 0 )
			return this.h;

		if ( this.resource != null )
			return this.resource.height;

		if ( this.image != null )
			return this.image.height;

		return 0;
	}

	this.drawImage = function( x, y, w, h, sx, sy, sw, sh )
	{
		var context = window.context;
		var img = this.imagehelper || this.image;
		context.save( );
		context.beginPath( );
		Global.bindMatrixToContext( context, Global.getCurrentMatrix( ) );

		// Use blender.
		var blender = Global.getCurrentBlender( );
		context.globalAlpha = blender.alpha;
		context.globalCompositeOperation = blender.mode;
		var xx = 0, yy = 0, ww = 0, zz = 0;

		if ( img != null && img.isLoad == true )
		{
			if ( arguments.length == 0 )
			{
				context.drawImage( img, this.x, this.y, this.w, this.h );
				xx = this.x;
				yy = this.y;
				ww = this.w;
				hh = this.h;
			}
			else if ( arguments.length == 2 )
			{
				context.drawImage( img, x, y );
				xx = x;
				yy = y;
				ww = img.width;
				hh = img.height;
			}
			else if ( arguments.length == 4 )
			{
				context.drawImage( img, x, y, w, h );
				xx = x;
				yy = y;
				ww = w;
				hh = h;
			}
			else if ( arguments.length == 8 )
			{
				context.drawImage( img, x, y, w, h, sx, sy, sw, sh );
				xx = sx;
				yy = sy;
				ww = sw;
				hh = sh;
			}
		}
		else if ( this.resource != null && this.resource.isLoad == true )
		{
			if ( arguments.length == 0 )
			{
				context.drawImage(  this.resource, this.rx, this.ry, this.rw, this.rh, this.x, this.y, this.w, this.h );
				xx = this.x;
				yy = this.y;
				ww = this.w;
				hh = this.h;
			}
			else if ( arguments.length == 2 )
			{
				context.drawImage(  this.resource, this.rx, this.ry, this.rw, this.rh, x, y, this.w, this.h );
				xx = x;
				yy = y;
				ww = this.w;
				hh = this.h;
			}
			else if ( arguments.length == 4 )
			{
				context.drawImage( this.resource, this.rx, this.ry, this.rw, this.rh, x, y, w, h );
			}
			else if ( arguments.length == 8 )
			{
				context.drawImage( this.resource, this.rx + sx, this.ry + sy, this.rw + sw, this.rh + sh, x, y, w, h );
				xx = x;
				yy = y;
				ww = w;
				hh = h;
			}
		}

		if ( blender.color != 0x00 )
		{
			context.fillStyle = Math.getRGBA( blender.color );
			context.fillRect( xx, yy, ww, hh );
		}

		context.closePath( );
		context.restore( );
	}

	this.reset = function( )
	{
		if ( this.imagehelper )
		{
			this.imagehelper.release( );
			delete this.imagehelper;
		}
	}

	this.addColor = function( color, x, y, w, h )
	{
		var img = this.imagehelper || this.image || this.resource;
		if ( img == null )
			return;

		var canvas = new CanvasEx( );
		canvas.setAttribute( "width", w || img.width );
		canvas.setAttribute( "height", w || img.height );
		var context = canvas.getContext( );
		var cc = window.context;
		window.context = context;
		this.drawImage( x || 0, y || 0, w || img.width, h || img.height );
		window.context = cc;
		var imagedata = context.getImageData( x || 0, y || 0, w || img.width, h || img.height );

		var cc = Math.DecompressionRGBA( color );
		cc.a = cc.a * 255;

		var data = imagedata.data;
		for ( var i = 0; i < data.length - 4; i += 4 )
		{
			if ( data[i] != 0x0 )
			{
				data[i] += cc.a;
				data[i + 1] += cc.r;
				data[i + 2] += cc.g;
				data[i + 3] += cc.b;
			}
		}

		this.reset( );

		this.imagehelper = canvas.getCanvasData( );
		canvas.bindImageData( imagedata );
		this.imagehelper.isLoad = true;
	}

	this.subColor = function( color, x, y, w, h )
	{
		var img = this.imagehelper || this.image || this.resource;
		if ( img == null )
			return;

		var canvas = new CanvasEx( );
		canvas.setAttribute( "width", w || img.width );
		canvas.setAttribute( "height", w || img.height );
		var context = canvas.getContext( );
		var cc = window.context;
		window.context = context;
		this.drawImage( x || 0, y || 0, w || img.width, h || img.height );
		window.context = cc;
		var imagedata = context.getImageData( x || 0, y || 0, w || img.width, h || img.height );

		var cc = Math.DecompressionRGBA( color );
		cc.a = cc.a * 255;

		var data = imagedata.data;
		for ( var i = 0; i < data.length - 4; i += 4 )
		{
			if ( data[i] != 0x0 )
			{
				data[i] -= cc.a;
				data[i + 1] -= cc.r;
				data[i + 2] -= cc.g;
				data[i + 3] -= cc.b;
			}
		}

		this.reset( );

		this.imagehelper = canvas.getCanvasData( );
		canvas.bindImageData( imagedata );
		this.imagehelper.isLoad = true;
	}

	this.blendColor = function( color, x, y, w, h )
	{
		var img = this.imagehelper || this.image || this.resource;
		if ( img == null )
			return;

		var canvas = new CanvasEx( );
		canvas.setAttribute( "width", w || img.width );
		canvas.setAttribute( "height", w || img.height );
		var context = canvas.getContext( );
		var cc = window.context;
		window.context = context;
		this.drawImage( x || 0, y || 0, w || img.width, h || img.height );
		window.context = cc;
		var imagedata = context.getImageData( x || 0, y || 0, w || img.width, h || img.height );

		var cc = Math.DecompressionRGBA( color );

		var data = imagedata.data;
		var k = cc.a;
		for ( var i = 0; i < data.length - 4; i += 4 )
		{
			if ( data[i] != 0x0 )
			{
				data[i + 1] = data[i + 1] * ( 1 - k ) + cc.r * k;
				data[i + 2] = data[i + 2] * ( 1 - k ) + cc.g * k;
				data[i + 3] = data[i + 3] * ( 1 - k ) + cc.b * k;
			}
		}

		this.reset( );

		this.imagehelper = canvas.getCanvasData( );
		canvas.bindImageData( imagedata );
		this.imagehelper.isLoad = true;
	}

	this.mulColor = function( color, x, y, w, h )
	{
		var img = this.imagehelper || this.image || this.resource;
		if ( img == null )
			return;

		var canvas = new CanvasEx( );
		canvas.setAttribute( "width", w || img.width );
		canvas.setAttribute( "height", w || img.height );
		var context = canvas.getContext( );
		var cc = window.context;
		window.context = context;
		this.drawImage( x || 0, y || 0, w || img.width, h || img.height );
		window.context = cc;
		var imagedata = context.getImageData( x || 0, y || 0, w || img.width, h || img.height );

		var cc = Math.DecompressionRGBA( color );
		cc.a = cc.a * 255;

		var data = imagedata.data;
		for ( var i = 0; i < data.length - 4; i += 4 )
		{
			if ( data[i] != 0x0 )
			{
				data[i] *= cc.a;
				data[i + 1] *= cc.r;
				data[i + 2] *= cc.g;
				data[i + 3] *= cc.b;
			}
		}

		this.reset( );

		this.imagehelper = canvas.getCanvasData( );
		canvas.bindImageData( imagedata );
		this.imagehelper.isLoad = true;
	}
}

LImage.typeid