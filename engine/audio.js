function AudioEx( name )
{
	this.audio = new Audio( );
	this.audio.src = name;
	this.audio.autoplay = false;
	this.isloaded = false;
	var self = this;
	this.audio.oncanplaythrough = function( )
	{
		self.isloaded = true;
	}

	this.play = function( )
	{
		if ( this.isloaded )
			this.audio.play( );
		else
			this.audio.autoplay = true;
	}

	this.release = function( )
	{
		delete this.audio;
	}
}

AudioEx.prototype = Object.create( Object.prototype, {
		pause:{
			set:function( value )
			{
				this.audio.pause = value;
			},
			get:function( )
			{
				return this.audio.pause;
			}
		},
		loop:{
			set:function( value )
			{
				this.audio.loop = value;
			},
			get:function( )
			{
				return this.audio.loop;
			}
		},
		current:{
			set:function( value )
			{
				this.audio.CurrentTime = value;
			},
			get:function( )
			{
				return this.audio.CurrentTime;
			}
		},
		duration:{
			set:function( value )
			{
				log( "can't set duration !" );
			},
			get:function( )
			{
				return this.audio.duration;
			}
		},
		speed:{
			set:function( value )
			{
				this.audio.playbackRate = value;
			},
			get:function( )
			{
				return this.audio.playbackRate;
			}
		},
		volume:
		{
			set:function( value )
			{
				this.audio.volume = value;
			},
			get:function( )
			{
				return this.audio.volume;
			}
		},
		loop:
		{
			set:function( value )
			{
				this.audio.loop = value;
			},
			get:function( )
			{
				return this.audio.loop;
			}
		}
	}
);