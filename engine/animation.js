// Data type:
// window.ImageAnimationData[0] = {x:0, y:0, w:0, h:0, image:"4.jpg", name:"test", cutx:9, cuty:4,framestime:200}

function ImageAnimation( data )
{
	// x, y, w, h, scr, time, name, event.
	this.x = 0;
	this.y = 0;
	this.w = 0;
	this.h = 0;
	this.data = data;
	this.length = 0;
	this.duration = 0;
	if ( isNaN( data.image ) )
	{
		this.length =  data.cuty *  data.cutx;
		this.image = new LImage( data.image );
		var self = this;
		
		this.image.setLoadCallBack( function( )
		{
			if ( isNaN( self.data ) )
			{
				if ( self.data.w != 0 && self.data.h != 0 )
				{
					self.image.w = data.w;
					self.image.h = data.h;
				}
				var w = self.image.w / self.data.cutx;
				var h = self.image.h / self.data.cuty;
				self.w = w;
				self.h = h;
				// TODO.. create.
				if ( self.data.frames == null )
				{
					self.data.frames = new ArrayEx( self.data.cutx * self.data.cuty );
				}

				var frames = self.data.frames;
				var index = 0;
				for ( var i = 0; i < self.data.cutx; i++ )
				{
					for ( var j = 0; j < self.data.cuty; j++ )
					{
						if ( Global.isUndefined( frames[index]  ) )
						{
							frames.push( { time:0, tick:0, src:null } );
							frames[index].time = self.data.framestime;
						}

						self.duration += frames[index].time;
						frames[index].tick = self.duration;
						frames[index].src =  new LImage( );
						frames[index].src.addResource( self.image, j * w, i * h, w, h );
						index ++;
					}
				}
			}

			if ( self.callbackfunc != null )
			{
				self.callbackfunc( );
				delete self.callbackfunc;
			}
		})
	}

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
	this.name = this.data.name;
	this.state = 0; // 0,stop; 1,play
	this.play = function( )
	{
		this.state = 1;
		this.current = 0;
		this.curindex = 0;
	}

	this.stop = function( )
	{
		anima.state = 0;
	}

	this.moveTo = function( x, y )
	{
		this.x = x || 0;
		this.y = y || 0;
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
}

ImageAnimation.update = function( anima, e )
{
	if ( anima.state != 1 || anima.pause == true || anima.duration == 0 )
		return;

	anima.current += e;
	if ( anima.current > anima.duration )
	{
		if ( anima.loop == false )
		{
			anima.current = anima.duration;
			anima.curindex = anima.length - 1;
			anima.state = 0;
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
		if ( frames[i].tick >= anima.current)
		{
			anima.curindex = i;
			break;
		}
	}
}

ImageAnimation.render = function( anima, e )
{
	if ( anima.state == 0 )
		return;

	if ( anima.curindex < anima.length )
	{
		var frames = anima.data.frames;
		if ( frames[anima.curindex].src )
			frames[anima.curindex].src.drawImage( anima.x, anima.y, anima.w, anima.h );
	}
}