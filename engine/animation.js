// Data type:
// window.ImageAnimationData[0] = {x:0, y:0, w:0, h:0, image:"4.jpg", name:"test", cutx:9, cuty:4,framestime:200}

function ImageAnimation( data )
{
	// x, y, w, h, scr, time, name, event.
	this.x = 0;
	this.y = 0;
	this.w = 0;
	this.h = 0;
	this.x1 = 0;
	this.y1 = 0;
	this.x2 = 0;
	this.y2 = 0;
	this.show = true;
	this.moveTick = 0;
	this.moveTime = 0;
	this.length = 0;
	this.duration = 0;
	this.loaded = false;

	this.bindDataHelper1 = function( self )
	{
		if ( self.data.w != 0 && self.data.h != 0 )
		{
			self.image.w = data.w;
			self.image.h = data.h;
		}
		var w = self.image.getWidth( ) / self.data.cutx;
		var h = self.image.getHeight( ) / self.data.cuty;
		self.w = w;
		self.h = h;

		// TODO.. create.
		if ( self.data.frames == null )
			self.data.frames = new ArrayEx( self.data.cutx * self.data.cuty );

		var frames = self.data.frames;
		var index = 0;
		for ( var i = 0; i < self.data.cutx; i++ )
		{
			for ( var j = 0; j < self.data.cuty; j++ )
			{
				if ( Global.isUndefined( frames[index] ) )
					frames.push( { tick:0, src:null } );

				self.duration += self.data.framestime;
				frames[index].tick = self.duration;
				frames[index].src =  new LImage( );
				frames[index].src.addResource( self.image, j * w, i * h, w, h );
				index ++;
			}
		}

		self.loaded = true;

		if ( self.callbackfunc != null )
		{
			self.callbackfunc( );
			delete self.callbackfunc;
		}
	}

	this.bindDataHelper2 = function( self )
	{
		if ( self.data.w != 0 && self.data.h != 0 )
		{
			self.image.w = data.w;
			self.image.h = data.h;
		}

		self.w = self.image.w;
		self.h = self.image.h ;

		// TODO.. create.
		if ( self.data.frames == null )
			self.data.frames = new ArrayEx( self.data.cutx * self.data.cuty );

		var frames = self.data.frames;
		self.duration = frames[frames.length - 1].tick;
		for ( var i = 0; i < frames.length; i++ )
		{
			if ( self.image != null && self.data.image != null && self.data.image != "" )
			{
				frames[i].src =  new LImage( );
				frames[i].src.addResource( self.image, frames[i].x,frames[i].y, frames[i].w || self.w, frames[i].h || self.h );
			}
			else if ( frames[i].src != null && frames[i].src != "" )
			{
				frames[i].src =  new LImage( frames[i].src );
			}
			else
			{
				frames[i].src =  new LImage( );
			}
		}

		self.loaded = true;

		if ( self.callbackfunc != null )
		{
			self.callbackfunc( );
			delete self.callbackfunc;
		}
	}

	this.bindData = function( data )
	{
		if ( this.data != null || data == null )
			return;

		this.data = data;
		if ( this.data.loop == true )
			this.loop = true;

		this.name = this.data.name;
		this.length = this.data.type == 1 ? data.cuty *  data.cutx : data.frames.length;
		if ( Global.isString( data.image ) )
			this.image = new LImage( data.image );
		else
			this.image = data.image || new LImage( );

		var self = this;
		if ( this.image.isLoad || data.image == null || data.image == "" )
			self.data.type == 1 ? this.bindDataHelper1( self ) : this.bindDataHelper2( self );
		else
			this.image.setLoadCallBack( function(){ self.data.type == 1 ? self.bindDataHelper1( self ) : self.bindDataHelper2( self ); });
	}

	this.bindData( data );

	this.setImageLoadCallBack = function( func )
	{
		if ( this.callbackfunc )
			delete this.callbackfunc;

		if ( Global.isFunction( func ) == false )
			return;

		if ( this.image && this.image.isLoad == true )
			func( );
		else
			this.callbackfunc = func;
	}

	this.curindex = 0;
	this.visible = true;
	this.isPlaying = false;
	this.current = 0;
	this.loop = false;
	this.pause = false;
	this.state = 0; // 0,stop; 1,play
	this.play = function( )
	{
		this.state = 1;
		this.current = 0;
		this.curindex = 0;
		this.pause = false;
	}

	this.stop = function( )
	{
		this.state = 0;
		if ( this.stopFunc != null && Global.isFunction( this.stopFunc ) )
			this.stopFunc( );
	}

	this.setStopCallBack = function( func )
	{
		if ( this.stopFunc != null )
		{
			delete this.stopFunc
			this.stopFunc = null;
		}

		this.stopFunc = func;
	}

	this.moveTo = function( x, y, time )
	{
		if ( Global.isNumber( time ) )
		{
			this.x1 = this.x;
			this.y1 = this.y;
			this.x2 = Global.isNumber( x ) ? x : this.x;
			this.y2 = Global.isNumber( y ) ? y : this.y;
			this.moveTime = time;
			this.moveTick = 0;
		}
		else
		{
			this.x = x || 0;
			this.y = y || 0;
		}
	}

	this.setMoveToCallBack = function( func )
	{
		if ( this.moveFunc != null )
		{
			delete this.moveFunc
			this.moveFunc = null;
		}

		this.moveFunc = func;
	}

	this.getNextFrame = function( )
	{
		return ( ( ++ this.curindex)  % this.data.frames.length );
	}

	this.reset = function( )
	{
		var frames = this.data.frames;
		for ( var i = 0; i < frames.length; i ++ )
			frames[i].src.reset( );
	}

	this.addColor = function( color, x, y, w, h )
	{
		var frames = this.data.frames;
		for ( var i = 0; i < frames.length; i ++ )
			frames[i].src.addColor( color, 0, 0, w || this.w, h || this.h );
	}

	this.subColor = function( color, x, y, w, h )
	{
		var frames = this.data.frames;
		for ( var i = 0; i < frames.length; i ++ )
			frames[i].src.subColor( color, 0, 0, w || this.w, h || this.h );
	}

	this.mulColor = function( color, x, y, w, h )
	{
		var frames = this.data.frames;
		for ( var i = 0; i < frames.length; i ++ )
			frames[i].src.mulColor( color, 0, 0, w || this.w, h || this.h );
	}
	
	this.blendColor = function( color, x, y, w, h )
	{
		var frames = this.data.frames;
		for ( var i = 0; i < frames.length; i ++ )
			frames[i].src.blendColor( color, 0, 0, w || this.w, h || this.h );
	}

	this.release = function( )
	{
		if ( this.moveFunc != null )
			delete this.moveFunc;

		if ( this.stopFunc != null )
			delete this.stopFunc;

		var frames = this.data.frames;
		for ( var i = 0; i < frames.length; i ++ )
				delete this.data.frames[i].scr;

		delete this.image;
			
	}
}

ImageAnimation.update = function( anima, e )
{
	if ( anima.loaded == false || anima.state == 0 || anima.pause == true || anima.duration == 0 )
		return;

	anima.current += e;

	if ( anima.moveTime != anima.moveTick )
	{
		anima.moveTick += e;
		if ( anima.moveTick >= anima.moveTime )
		{
			anima.moveTick = anima.moveTime;
			if ( anima.moveFunc )
				anima.moveFunc( anima.x2, anima.y2 );
		}

		var temp = anima.moveTick / anima.moveTime;
		anima.x = Math.Linear( anima.x1, anima.x2, temp );
		anima.y = Math.Linear( anima.y1, anima.y2, temp );
	}

	if ( anima.current > anima.duration )
	{
		if ( anima.loop == false )
		{
			anima.current = anima.duration;
			anima.curindex = anima.length - 1;
			anima.state = 0;

			if ( anima.stopFunc != null && Global.isFunction( anima.stopFunc ) )
				anima.stopFunc( );

			return;
		}
		else
		{
			anima.current = 0;
			anima.curindex = 0;
		}
	}

	var frames = anima.data.frames;
	for ( var i = anima.curindex; i < frames.length; i ++ )
	{
		if ( frames[i].tick >= anima.current )
		{
			anima.curindex = i;
			break;
		}
	}
}

ImageAnimation.render = function( anima, e )
{
	if ( anima.state == 0 || anima.loaded == false || anima.show == false )
		return;

	if ( anima.curindex < anima.length )
	{
		var frames = anima.data.frames;
		if ( frames[anima.curindex].src )
			frames[anima.curindex].src.drawImage( anima.x, anima.y, anima.w, anima.h );
	}
}