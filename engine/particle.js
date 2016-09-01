// Temp variables.
var polygon = null;

// Host: ParticleEmitter.
function Particle( )
{
	this.pfxType = 0;
	this.direction = new Vector( );
	this.scale = new Vector( );
	this.scalepower = 1;
	this.rotationpower = 0;
	this.tick = 0;
	this.duration = 0;
	this.speed = 0;

	this.number = 0;
	this.size = 0;
	
	this.sportType = 0; // Rotation, scale, move.
	this.showType = 0; //  Show, hide, show and hide.

	this.gravityDirection = new Vector( );
	this.gravityPower = 0;

	this.color = 0xffffffff;

	this.alpha1 = 0xff;
	this.alpha2 = 0xff;
	this.image = new LImage( );
	this.imageAnima = new ImageAnimation( );

	this.blender = new Blender( );
	this.matrix = new Matrix( );
	this.polygon = new Polygon( );

	this.createResources = function( )
	{
		if ( this.pfxType == Particle.PolygonType1 || this.pfxType == Particle.PolygonType2 )
		{
			if ( this.number <= 0 || this.size <= 0 )
				return;

			if ( this.pfxType == Particle.PolygonType1 )
				this.polygon = Polygon.CreateRulePolygon( this.number, this.size );
			else
				this.polygon = Polygon.CreateRulestar( this.number, this.size, this.size * 0.5 ); // TODO.

			this.polygon.setColorStyle( this.color );
		}
		else if ( this.pfxType == Particle.ImageType )
		{
			var w = this.image.getWidth( );
			var h = this.image.getHeight( );
			this.polygon = new Polygon( { x: 0, y: 0}, { x: w, y: 0}, { x: w, y: h}, { x: h, y: h} );
		}
		else if ( this.pfxType == Particle.ImageAnimaType )
		{
			var w = this.imageAnima.w;
			var h = this.imageAnima.h;
			this.polygon = new Polygon( { x: 0, y: 0}, { x: w, y: 0}, { x: w, y: h}, { x: h, y: h} );
		}

		if ( ( this.sportType & Particle.Scale ) != 0 )
		{
			// this.scale.normalsize( );
			Vector.mul( this.scale, this.scalepower, this.scale );
		}

		if ( ( this.sportType & Particle.Target ) != 0 )
		{
			this.direction.x -= this.matrix.mat[6];
			this.direction.y -= this.matrix.mat[7];
		}
		else if ( ( this.sportType & Particle.Translation ) != 0 )
		{
			this.direction.normalsize( );
			Vector.mul( this.direction, this.speed, this.direction );
		}

		// TODO.
		if ( this.alpha1 != 1 || this.alpha2 != 1 )
		{
			this.blender.useAlpha( this.alpha1, this.alpha2, this.duration );
			log(this.alpha1, this.alpha2, this.duration);
			this.blender.setEnabelAlpha( true );
		}
	}

	this.release = function( )
	{
		if ( this.polygon != _null )
			delete this.polygon;

		delete this.direction;
		delete this.gravityDirection;
		delete this.matrix;
		delete this.scale;

		delete this.image;
		delete this.blender;

		delete this.host;
	}

	this.changeMartix = function( )
	{
		if ( this.pfxType == Particle.PolygonType1 || this.pfxType == Particle.PolygonType2 )
		{
			polygon = this.polygon;
			if ( polygon != null )
			{
				polygon.matrix.set( this.matrix );
				Polygon.mul( polygon, polygon.matrix )
			}
		}
	}

	this.render = function( e )
	{
		polygon = this.polygon;
		if ( ( this.pfxType == Particle.PolygonType1 || this.pfxType == Particle.PolygonType2 )&& polygon != null )
		{
			Global.pushBlender( this.blender );
			Polygon.render( polygon );
			Global.popBlender( );
		}
		else if ( this.pfxType == Particle.ImageType )
		{
			Global.pushMatrix( this.matrix );
			this.image.drawImage( );
			Global.popMatrix( );
		}
		else if ( this.pfxType == Particle.ImageAnimaType )
		{
			Global.pushMatrix( this.matrix );
			ImageAnimation.render( this.imageAnima, e );
			Global.popMatrix( );
		}
	}

	this.stop = function( )
	{
		this.tick = this.duration;
	}

	this.update = function( e )
	{
		this.tick += e;
	
		if ( this.tick >= this.duration && this.duration != -1 )
			return true;
		
		this.blender.update( e );
		var isneedupdate = 0;

		if ( ( this.sportType & Particle.Scale ) != 0 )
		{
			isneedupdate = 2;
			buildbox = true;
			this.matrix.mulScalingLeft( this.scale.x, this.scale.y );
		}

		if ( ( this.sportType & Particle.Rotation ) != 0 )
		{
			if ( isneedupdate == 0 )
				isneedupdate = 1;

			this.matrix.mulRotationLeft( this.rotationpower );
		}

		if ( ( this.sportType & Particle.Target ) != 0 )
		{
			if ( isneedupdate == 0 )
				isneedupdate = 1;

			if ( ( this.sportType & Particle.Direction ) != 0 )
				this.matrix.setYDirection( this.direction.x - this.matrix.mat[6], this.direction.y - this.matrix.mat[7] );

			var temp = e / this.duration;
			this.matrix.mulTranslationRight( this.direction.x * temp, this.direction.y * temp );
		}
		else if ( ( this.sportType & Particle.Translation ) != 0 )
		{
			if ( isneedupdate == 0 )
				isneedupdate = 1;

			if ( ( this.sportType & Particle.Direction ) != 0 )
				this.matrix.setYDirection( this.direction.x, this.direction.y );

			this.matrix.mulTranslationRight( this.direction.x, this.direction.y );
		}
			
		if ( isneedupdate > 0 && ( this.pfxType == Particle.PolygonType1 || this.pfxType == Particle.PolygonType2 || this.pfxType == Particle.ImageType || this.pfxType == Particle.ImageAnimaType ) && this.polygon != null )
		{
			this.polygon.matrix.set( this.matrix.mat );
			Polygon.mul( this.polygon, this.matrix );
		
			if ( isneedupdate > 1 )
				this.polygon.buildBox( );

			if ( this.pfxType == Particle.ImageAnimaType )
				ImageAnimation.update( this.imageAnima, e );
		}

		return false;
	}
}

Particle.ImageType = 1;
Particle.ImageAnimaType = 2;
Particle.PolygonType1 = 3; // 边数.
Particle.PolygonAnimaType1 = 4;
Particle.PolygonType2 = 5; // 角度.
Particle.PolygonAnimaType2 = 6;

Particle.Scale = 0x00000001;
Particle.Rotation = 0x00000002;
Particle.Translation = 0x00000004;
Particle.Target = 0x00000008;
Particle.BindTarget = 0x00000010;
Particle.Direction = 0x00000020;