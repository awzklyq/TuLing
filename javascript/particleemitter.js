// Temp variables. TODO...

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

	this.play = function( tick )
	{
		// if ( Global.isNumber( tick ) )
			// this.tick = tick;

		this.state = 1;
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

		// Test.
		pfx.numbers = 3;
		pfx.size = 10;

		pfx.createResources( );

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

		var pfxs = this.pfxs;
		if ( this.tick >= this.interival && isdead == false )
		{
			this.duration -= this.interival;
			this.tick -= this.interival;
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
			if ( pfxs[i].update( e ) )
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

ParticleEmitter.AllDirection = 1;