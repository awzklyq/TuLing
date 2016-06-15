// Temp variables. TODO...
//var tag = { time:0, name:"" };

function ParticleEmitter( )
{
	this.typeid = ParticleEmitter.typeid;
	this.pfxs = new ArrayEx( );
	this.tick = 0;
	this.duration = 0;
	this.limit = 0;
	this.interival = 0;
	this.interivalHelper = 0;
	this.delay = 0;
	this.pfxType = 0; // Particle Type.
	this.sportType; // Particle SportType.
	this.emitterType = 0; // 1 All Direction.

	this.pause = true; // 0 pause, 1 play, 2 stop.

	this.numbers1 = 0;
	this.numbers2 = 0;

	this.pfxLife1 = 0;
	this.pfxLife2 = 0;

	this.translation1 = new Vector( );
	this.translation2 = new Vector( );

	this.speed1 = 0;
	this.speed2 = 0;

	this.scale1 = new Vector( );
	this.scale2 = new Vector( );

	this.scalepower1 = 0;
	this.scalepower2 = 0;

	this.rotationpower1 = 0;
	this.rotationpower2 = 0;

	this.color1 = 0xffffffff;
	this.color2 = 0xffffffff;

	this.pfxNumber1 = 0;
	this.pfxNumber2 = 0;

	this.pfxSize1 = 0;
	this.pfxSize2 = 0;

	this.imageAnimaData = {};
	this.bindMatrix = new Matrix( );

	this.image = new LImage( );
	this.tags = new ArrayEx( );
	this.release = function( )
	{
		delete this.scale1;
		delete this.scale2;

		delete this.translation1;
		delete this.translation2;

		this.pfxs.clear( );
		delete this.pfxs;

		delete this.bindMatrix;

		delete this.image;
	}

	this.play = function( )
	{
		this.tick = 0;
		this.pause = false;
		this.interivalHelper = this.interival;
		this.pfxs.clear( );
	}

	this.stop = function( now )
	{
		this.tick = this.duration;

		if ( now == true )
		{
			this.pfxs.clear( );
			this.pause = true;
		}
	}

	this.addTargetEvent = function( func )
	{
		if ( this.targetEvent != null )
			delete this.targetEvent;

		if ( Global.isFunction( func ) )
			this.targetEvent = func;	
	}

	this.addTargeName = function( t, n )
	{
		this.tags.push( { time: t, name: n } );

		// this.tags.sort( ParticleEmitter.sortTags );
	}

	this.createParticle = function( )
	{
		var pfx = new Particle( );
		pfx.duration = Math.randomAToB( this.pfxLife1, this.pfxLife2 );

		pfx.pfxType = this.pfxType;
		pfx.sportType = this.sportType;

		Math.randomVector( this.translation1, this.translation2, pfx.direction );

		Math.randomVector( this.scale1, this.scale2, pfx.scale );

		pfx.speed = Math.randomAToB( this.speed1, this.speed2 );
		pfx.scalepower = Math.randomAToB( this.scalepower1, this.scalepower1 );

		var color1 = Math.DecompressionRGBA( this.color1 );
		var color2 = Math.DecompressionRGBA( this.color2 );
		pfx.color = Math.randomColor( Math.CompressionRGBA( 0xff, color1.r, color1.g, color1.b ), Math.CompressionRGBA( 0xff, color2.r, color2.g, color2.b ) );
		pfx.alpha1 = color1.a;
		pfx.alpha2 = color2.a;

		pfx.rotationpower = Math.randomAToB( this.rotationpower1, this.rotationpower2 );

		pfx.number = Math.randomAToB( this.pfxNumber1, this.pfxNumber2 );
		pfx.size = Math.randomAToB( this.pfxSize1, this.pfxSize2 );

		pfx.matrix.mulRight( this.bindMatrix );

		if ( pfx.pfxType == Particle.ImageType )
		{
			pfx.image.addResource( this.image );
			pfx.image.w = pfx.number;
			pfx.image.h = pfx.size;
		}
		else if ( pfx.pfxType == Particle.ImageAnimaType )
		{
			pfx.imageAnima.w = pfx.number;
			pfx.imageAnima.h = pfx.size;
			var self = this;
			this.imageAnimaData.image.setLoadCallBack( function(){
				pfx.imageAnima.bindData( self.imageAnimaData );
				pfx.imageAnima.play( );
			});
		}

		pfx.createResources( );

		// Add pfx.
		this.pfxs.push( pfx );
	}

	this.update = function( e )
	{
		if ( this.pause == true )
			return;

		var isdead = ( this.tick >= this.duration ) || ( this.duration == -1 );
		if ( isdead == false )
			this.tick += e;

		// if ( this.tick < this.delay )
			// return;
		
		var isneedcreate = false;
		
		if ( this.interivalHelper == 0 )
		{
			isneedcreate = true;
		}
		else
		{
			if ( this.tick > this.interivalHelper )
				isneedcreate = true;
		}

		var pfxs = this.pfxs;
		if ( isneedcreate && isdead == false )
		{
			if ( pfxs.length < this.limit )
			{
				var numbers = Math.randomAToB( this.numbers1, this.numbers2 );
				for ( var i = 0; i < numbers; i ++ )
				{
					if ( pfxs.length >= this.limit )
						break;

					this.interivalHelper = this.interival + this.tick;
					this.createParticle( );
				}
			}
		}

		for ( var i = 0; i < pfxs.length; i ++ )
		{
			var dead = pfxs[i].update( e );

			if ( this.targetEvent == null || this.duration == -1 )
			{
				if ( dead )
				{
					pfxs.remove( pfxs[i] );
					-- i;
				}
				continue;
			}

			// Do action form tags.
			for ( var j = 0; j < this.tags.length; j ++ )
			{
				if ( this.tags[j].time >= ( pfxs[i].tick - e ) / pfxs[i].duration && this.tags[j].time < pfxs[i].tick / pfxs[i].duration )
					this.targetEvent( this.tags[j].name );
			}

			if ( dead )
			{
				pfxs.remove( pfxs[i] );
				-- i;
			}
		}

		if ( isdead && pfxs.length == 0 )
			this.pause = true;
	}

	this.render = function( e )
	{
		var pfxs = this.pfxs;
		if ( pfxs.length == 0 )
			return;

		for ( var i = 0; i < pfxs.length; i ++ )
			pfxs[i].render( e );
	}
}

// ParticleEmitter( );
ParticleEmitter.sortTags = function( a, b )
{
	return a.time > b.time;
}

ParticleEmitter.copy = function( emit )
{
	if ( emit == null || emit.typeid != ParticleEmitter.typeid )
		return null;

	var result = new ParticleEmitter( );

	result.duration = emit.duration;
	result.limit = emit.limit;
	result.interival = emit.interival;
	result.delay = emit.delay;
	result.pfxType = emit.pfxType; // Particle Type.
	result.sportType = emit.sportType; // Particle SportType.
	result.emitterType = emit.emitterType; // 1 All Direction.

	result.pause = true; // 0 pause, 1 play, 2 stop.

	result.numbers1 = emit.numbers1;
	result.numbers2 = emit.numbers2;
	
	result.pfxLife1 = emit.pfxLife1;
	result.pfxLife2 = emit.pfxLife2;

	result.translation1 = emit.translation1;
	result.translation2 = emit.translation2;

	result.speed1 = emit.speed1;
	result.speed2 = emit.speed2;

	result.scale1 = emit.scale1;
	result.scale2 = emit.scale2;

	result.scalepower1 = emit.scalepower1;
	result.scalepower2 = emit.scalepower2;

	result.rotationpower1 = emit.rotationpower1;
	result.rotationpower2 = emit.rotationpower2;

	result.color1 = emit.color1;
	result.color2 = emit.color2;

	result.pfxNumber1 = emit.pfxNumber1;
	result.pfxNumber2 = emit.pfxNumber2;

	result.pfxSize1 = emit.pfxSize1;
	result.pfxSize2 = emit.pfxSize2;
	result.imageAnimaData = emit.imageAnimaData;
	// result.bindMatrix = new Matrix( );

	// TODO.
	result.image = emit.image;
	result.tags = emit.tags;
	return result;
}

ParticleEmitter.typeid = Global.OBJECTID ++;
ParticleEmitter.AllDirection = 1;