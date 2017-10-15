function AmbientLight( )
{
	this.typeid = Global.AmbientLight_typeid;
	this.color = 0xffffff;
	this.colorValue = new Float32Array( 4 );

	this.convertColor = function( )
	{
		var color = Math.DecompressionRGBA( this.color );
		this.colorValue[0] = color.r / 255;
		this.colorValue[1] = color.g / 255;
		this.colorValue[2] = color.b / 255;
		this.colorValue[3] = color.a;
		return this.colorValue;
	}

	
}

AmbientLight.typeid = Global.AmbientLight_typeid;