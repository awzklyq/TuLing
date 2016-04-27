// Temp variables. TODO...
//var tag = { time:0, name:"" };

function ParticleEmitter( )
{
	this.pfxs = new ArrayEx( );
	this.tick = 0;
	this.duration = 0;
	this.limit = 0;
	this.numbers = 0;
	this.interival = 0;
	this.delay = 0;
	this.pfxType = 0; // Particle Type.
	this.sportType; // Particle SportType.
	this.emitterType = 0; // 1 All Direction.

	this.state = 0; // 0 pause, 1 play, 2 stop.

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

	this.pfxNumbers1 = 0;
	this.pfxNumbers2 = 0;

	this.pfxSize1 = 0;
	this.pfxSize2 = 0;
	
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
		this.state = 1;
		this.pfxs.clear( );
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

		pfx.color = Math.randomColor( this.color1, this.color2 );

		pfx.rotationpower = Math.randomAToB( this.rotationpower1, this.rotationpower2 );

		pfx.number = Math.randomAToB( this.pfxNumber1, this.pfxNumber2 );
		pfx.size = Math.randomAToB( this.pfxSize1, this.pfxSize2 );

		pfx.createResources( );

		pfx.matrix.mulRight( this.bindMatrix );

		if ( pfx.pfxType == Particle.ImageType )
			pfx.image.addResource( this.image );

		// Add pfx.
		this.pfxs.push( pfx );
	}

	this.update = function( e )
	{
		if ( this.state == 0 )
			return;

		var isdead = this.tick >= this.duration;
		if ( isdead == false )
			this.tick += e;

		// if ( this.tick < this.delay )
			// return;
		
		var isneedcreate = false;
		
		if ( this.interival == 0 )
			isneedcreate = true;
		else
			isneedcreate = Math.floor( this.tick / this.interival ) > Math.floor( ( this.tick - e ) / this.interival );

		var pfxs = this.pfxs;
		if ( isneedcreate && isdead == false )
		{
			if ( pfxs.length < this.limit )
			{
				for ( var i = 0; i < this.numbers; i ++ )
				{
					if ( pfxs.length >= this.limit )
						break;

					this.createParticle( );
				}
			}
		}

		for ( var i = 0; i < pfxs.length; i ++ )
		{
			var isdead = pfxs[i].update( e );

			if ( this.targetEvent == null )
			{
				if ( isdead )
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
				{
					// log('1111111111', pfxs[i].tags[i].name);
					this.targetEvent( this.tags[j].name );
				}
			}

			if ( isdead )
			{
				pfxs.remove( pfxs[i] );
				-- i;
			}
		}

		if ( isdead && pfxs.length == 0 )
			this.state = 0;
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

ParticleEmitter.sortTags = function( a, b )
{
	return a.time > b.time;
}

ParticleEmitter.AllDirection = 1;