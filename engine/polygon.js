// Point: x, y

function PolygonType( )
{
	this.typeid = Polygon.typeid;
}

function Polygon( )
{
	this.points = new Array( );
	var x = 0, y = 0;
	for (var i = 0; i < arguments.length; i ++)
	{
		this.points[i] = {x:arguments[i].x, y:arguments[i].y}
		x += arguments[i].x;
		y += arguments[i].y;
	}

	if ( arguments.length > 0 )
	{
		x /= arguments.length;
		y /= arguments.length;
	}

	this.resource = new Array( );

	for (var i = 0; i < arguments.length; i ++)
	{
		this.resource[i] = {x:arguments[i].x - x, y:arguments[i].y - y}
	}

	this.lineWidth = "2";
	this.matrix = new Matrix( );
	this.matrix.mulTranslationRight(x, y);
	this.move = function(x, y)
	{
		this.matrix.mulTranslationRight(x, y);
		Polygon.mul(this, this.matrix);
	}

	this.moveTo = function(x, y)
	{
		this.matrix.mulTranslationRight(x - this.matrix.mat[6], y - this.matrix.mat[7]);
		Polygon.mul(this, this.matrix);
	}

	// TODO.
	this.rotation = function(r, x, y)
	{
		this.matrix.mulRotationLeft(r);
		Polygon.mul(this, this.matrix);
	}

	this.scale = function(x, y)
	{
		this.matrix.mulScalingLeft(x, y);
		Polygon.mul(this, this.matrix);
	}

	this.add = function(x, y, isroot)
	{
		if (isroot == true)
		{
			this.resource.push( {x:x, y:y} );
		}
		else
		{
			var trans = this.matrix.getTranslation( );
			this.resource.push( {x:x - trans.x, y:y - trans.y} );
		}

		this.points.push( {x:0, y:0} );
	}

	this.finish = function( )
	{
		var x = 0, y = 0;
		var res = this.resource;
		for (var i = 0; i < res.length; i ++)
		{
			x += res[i].x;
			y += res[i].y;
		}

		x /= res.length;
		y /= res.length;
		for (var i = 0; i < res.length; i ++)
			res[i] = {x:res[i].x - x, y:res[i].y - y};

		Polygon.mul(this, this.matrix);
	}

	this.buildBox = function( )
	{
		this.range = 0;
		for (var i = 0; i < this.resource.length; i ++)
		{
			var dis = Math.sqrt(Math.pow(this.resource[i].x, 2) +  Math.pow(this.resource[i].y, 2));
			if (dis > this.range)
				this.range = dis;
		}
	}

	this.buildBox( );
	this.releasBox = function( )
	{
		delete this.range;
	}

	// style: 1.liner, 2.radial.
	// type: 1.w, 2.h, 3, w+h;
	this.setColorStyle = function( color, style, type )
	{
		if ( this.colorStyle != null )
		{
			delete this.colorStyle;
		}
	
		if ( style == 1 )
		{
			// if ( this.range == null )
			// {
				// this.buildBox( );
			// }
			// var context = window.context;
			// var x = this.matrix.mat[6];
			// var y = this.matrix.mat[7];
			// var gradient = context.createLinearGradient( x - this.range, y - this.range, x + this.range, y + this.range );
			// gradient.addColorStop( 0, "blue" );
			// gradient.addColorStop( 0.5, "red" );
			// gradient.addColorStop( 1, "yellow" );
			
		}
		else if ( style == 2 )
		{
			
		}
		else
		{
			this.colorStyle = Math.getRGBA( color );
		}
	}

	// Add by 2016.01.19.
	this.insert = function( x, y )
	{
		if ( this.points.length < 3 )
		{
			return false;
		}
		
		if ( this.range == null )
		{
			this.buildBox( );
		}

		var xy0 = this.matrix.getTranslation( );
		var v0 = {x:x, y:y};
		if ( Vector.distance( v0, xy0 ) > this.range )
		{
			return false;
		}
	
		var points = this.points;
		var length = points.length;

		// TODO.
		var v1 = {x:0, y:0};
		var tick = 0;
		for(var i = 0; i < this.points.length; i ++)
		{
			if ( Vector.Intersect( v0, v1, points[i], points[ (i + 1) % length] ) )
			{
				tick ++;
			}
		}

		return tick % 2 != 0;
	}
}

Polygon.mul = function(polygon, matrix)
{
	var mat = matrix.mat;
	var resource = polygon.resource;
	var points = polygon.points;

	for ( var i = 0; i < resource.length; i ++ )
	{
		var x = resource[i].x;
		var y = resource[i].y;
		points[i].x = x * mat[0] + y * mat[3] + mat[6];
		points[i].y = x * mat[1] + y * mat[4] + mat[7];
	}
}

Polygon.render = function(polygon)
{
	var points = polygon.points;
	var length = points.length;
	if ( length < 2 )
		return;

	// TODO.
	var x = polygon.matrix.mat[6];
	var y = polygon.matrix.mat[7];
	if ( System.isClip && System.checkInClipArea( x + polygon.range, y + polygon.range, x - polygon.range, y - polygon.range ) == false )
	{
		Global.clipPolygonCount ++;
		return;
	}

	Global.renderPolygonCount ++;
	var context = window.context;
	if ( Global.combineRender == false )
	{
		context.save( );
		context.beginPath( );
	}

	context.lineWidth = polygon.lineWidth

	if ( polygon.colorStyle != null )
		context.fillStyle = polygon.colorStyle;

	context.moveTo(points[0].x, points[0].y);
	for(var i = 1; i < length; i ++)
		context.lineTo(points[i].x, points[i].y);

	context.lineTo(points[0].x, points[0].y);

	if ( Global.combineRender == false )
	{
		context.closePath( );

		if ( polygon.colorStyle != null )
			context.fill( );

		context.stroke( );
		context.restore( );
	}
}

// pn: 边数. d: 长度.
Polygon.CreateRulePolygon = function(pn, d)
{
	if ( pn == null || d == null )
		return new Polygon( );

	var v = new Vector(d, 0);

	var r = Math.PI * 2 / pn;
	var pol = new Polygon( );

	pol.add(v.x, v.y, true);
	var matrix = new Matrix( );
	for (var i = 1; i < pn; i ++)
	{
		matrix.mulRotationLeft(r);
		var trans = matrix.mul(v);
		pol.add(trans.x, trans.y, true );
	}

	pol.finish( );
	pol.buildBox( );
	return pol;
}

// pn: 角数. d1: 长角长度, d2: 短角长度.
Polygon.CreateRulestar = function(pn, d1, d2)
{
	if ( pn == null || d1 == null || d2 == null)
	{
		return new Polygon( );
	}

	pn *= 2;
	var v = new Vector(d1, 0);

	var r = Math.PI * 2 / pn;
	var pol = new Polygon( );

	pol.add(v.x, v.y, true);
	var matrix = new Matrix( );
	for (var i = 1; i < pn; i ++)
	{
		v.x = i % 2 == 0 ? d1 : d2;
		matrix.mulRotationLeft(r);
		var trans = matrix.mul(v);
		pol.add(trans.x, trans.y, true );
	}

	pol.finish( );
	pol.buildBox( );
	return pol;
}

Polygon.typeid = Global.OBJECTID ++;
Polygon.prototype = new PolygonType( );