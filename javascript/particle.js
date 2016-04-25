// Temp variables.
var polygon = null;

function Particle( )
{
	this.pfxType = 0;
	this.direction = new Vector( );
	this.scale = new Vector( );
	this.scalepower = 1;
	this.rotationpower = 1;
	this.tick = 0;
	this.duration = 0;
	this.speed = 0;

	this.numbers = 0;
	this.size = 0;
	
	this.sportType = 0; // Rotation, scale, move.
	this.showType = 0; //  Show, hide, show and hide.

	this.gravityDirection = new Vector( );
	this.gravityPower = 0;

	this.color = 0xffffffff;

	this.matrix = new Matrix( );

	this.createResources = function( )
	{
		if ( this.pfxType == Particle.PolygonType1 )
		{
			if ( this.numbers <= 0 || this.size <= 0 )
				return;

			this.polygon = Polygon.CreateRulePolygon( this.numbers, this.size );
			this.polygon.setColorStyle( this.color );
		}

		if ( ( this.sportType & Particle.Scale ) != 0 )
		{
			this.scale.normalsize( );
			Vector.mul( this.scale, this.scalepower, this.scale );
		}

		if ( ( this.sportType & Particle.Translation ) != 0 )
		{
			this.direction.normalsize( );
			Vector.mul( this.direction, this.speed, this.direction );
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

	}

	this.changeMartix = function( )
	{
		if ( this.pfxType == Particle.PolygonType1 || this.pfxType == Particle.PolygonType2 )
		{
			polygon = this.polygon;
			if ( polygon != null )
				Polygon.mul( polygon, this.matrix )
		}
	}

	this.render = function( e )
	{
		polygon = this.polygon;
		if ( this.pfxType == Particle.PolygonType1 && polygon != null )
		{
			// Global.bindMatrixToContext( context, this.mat );
			Polygon.draw( polygon );
		}
	}

	this.update = function( e )
	{
		this.tick += e;
	
		if ( this.tick >= this.duration && this.duration != -1 )
			return true;

		if ( this.pfxType == Particle.PolygonType1 && this.polygon != null )
		{
			var isneedupdate = false;
			if ( ( this.sportType & Particle.Scale ) != 0 )
			{
				isneedupdate = true;
				this.matrix.mulScalingLeft( this.scale );
			}

			if ( ( this.sportType & Particle.Rotation ) != 0 )
			{
				isneedupdate = true;
				this.matrix.mulRotationLeft( this.scale );
			}

			if ( ( this.sportType & Particle.Translation ) != 0 )
			{
				isneedupdate = true;
				this.matrix.mulTranslationRight( this.direction.x, this.direction.y );
			}

			if ( isneedupdate )
				Polygon.mul( this.polygon, this.matrix );
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