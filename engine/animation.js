function ImageAnimation( data )
{
	// x, y, w, h, scr, time, name, event.
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
							frames[index] = { time:0, tick:0, src:null };
							frames[index].time = self.data.framestime;
						}

						self.duration += frames[index].time;
						frames[index].tick = self.duration;
						frames[index].src =  new LImage( );
						frames[index].src.addResource( self.image, i * w, j * h, w, h );
						index ++;
					}
				}
			}
		})
	}
	this.curindex = 0;
	this.visible = true;
	this.isPlaying = false;
	this.current = 0;
	this.loop = false;
	this.pause = false;
	this.behaviors = this.data.name;
	this.state = 0; // 0,stop; 1,play; 2,stop;
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
}

ImageAnimation.Update = function( anima, e )
{
	if ( anima.state != 1 || anima.pause == true || anima.duration == 0 )
	{
		return;
	}

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
	for ( var i = anima.curindex; i < anima.length; i ++ )
	{
		if ( frames[i].tick > anima.current)
		{
			anima.curindex = i;
			break;
		}
	}
}

ImageAnimation.Render = function( anima, e )
{
	if ( anima.curindex < anima.length )
	{
		var frames = anima.data.frames;
		if ( frames[anima.curindex].src )
		{
			frames[anima.curindex].src.drawImage( );
		}
	}
}