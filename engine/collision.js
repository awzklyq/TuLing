function Collision( )
{
	// Get project aixs.
	this.getPolygonProjectAxis = function( obj )
	{
		var aixs = new Array( );
		if ( obj.typeid != Polygon.typeid )
			return aixs;
		
		var res = obj.resource;

		if ( res.length < 2 )
			return aixs;

		var temp = new Vector( );
		for( var i = 1; i < res.length; i ++ )
		{
			temp.x = res[i].x - res[i - 1].x;
			temp.y = res[i - 1].y - res[i].y;
			// TODO.
			// temp.normalsize( );
			aixs.push( { x : temp.x, y : temp.y } );
		}

		return aixs;
	}

	// Use project aixs checking collision.
	this.isPolygonsCollisionOnAix = function( obj1, obj2, aix )
	{
		if ( obj1.typeid != Polygon.typeid || obj2.typeid != Polygon.typeid )
			return false;

		var points1 = obj1.points;
		var points2 = obj2.points;

		var k = aix.y / aix.x;

		var max1 = Math.MinNumber;
		var min1 = Math.MaxNumber;
		for ( var i = 0; i < points1.length; i ++ )
		{
			if ( aix.x == 0 )
			{
				if ( max1 < points1[i].y )
					max1 = points1[i].y;

				if ( min1 > points1[i].y )
					min1 = points1[i].y;
			}
			else if ( aix.y == 0 )
			{
				if ( max1 < points1[i].x )
					max1 = points1[i].x;

				if ( min1 > points1[i].x )
					min1 = points1[i].x;
			}
			else
			{
				var temp = k * ( ( points1[i].x + k * points1[i].y ) / ( 1 + k * k ) );

				if ( max1 < temp )
					max1 = temp;

				if ( min1 > temp )
					min1 = temp;
			}
		}

		var max2 = Math.MinNumber;
		var min2 = Math.MaxNumber;
		for ( var i = 0; i < points2.length; i ++ )
		{
			if ( aix.x == 0 )
			{
				if ( max2 < points2[i].y )
					max2 = points2[i].y;

				if ( min2 > points2[i].y )
					min2 = points2[i].y;
			}
			else if ( aix.y == 0 )
			{
				if ( max2 < points2[i].x )
					max2 = points2[i].x;

				if ( min2 > points2[i].x )
					min2 = points2[i].x;
			}
			else
			{
				var temp = k * ( ( points2[i].x + k * points2[i].y ) / ( 1 + k * k ) );

				if ( max2 < temp )
					max2 = temp;

				if ( min2 > temp )
					min2 = temp;
			}
		}
		// log("33333333333", max1, min2, max2, min1);
		// The result is true -> intersect.
		return ( max1 < min2 || max2 < min1 ) == false;
	}

	this.checkPolygons = function( obj1, obj2, deep )
	{
		if ( obj1.typeid != Polygon.typeid || obj2.typeid != Polygon.typeid )
			return false;

		if ( Global.isNumber( obj1.range ) == false || Global.isNumber( obj2.range ) == false )
			return false;

		var x1 = obj1.matrix.mat[6];
		var y1 = obj1.matrix.mat[7];
		var x2 = obj2.matrix.mat[6];
		var y2 = obj2.matrix.mat[7];

		var ref = Math.pow( x1 - x2, 2 ) + Math.pow( y1 - y2, 2 ) < Math.pow( obj1.range + obj2.range, 2 );
		
		if ( deep == null || deep == false )
		{
			if ( ref == true && this.callbac != null )
				this.callbac( );
			
			return ref;
		}

		if ( ref == false )
			return false;

		var aixs1 = this.getPolygonProjectAxis( obj1 );
		var aixs2 = this.getPolygonProjectAxis( obj2 );

		for ( var i = 0; i < aixs1.length; i ++ )
		{
			if ( this.isPolygonsCollisionOnAix( obj1, obj2, aixs1[i] ) == false )
				return false;
		}

		for ( var i = 0; i < aixs2.length; i ++ )
		{
			if ( this.isPolygonsCollisionOnAix( obj1, obj2, aixs2[i] ) == false )
				return false;
		}

		if ( this.callbac != null )
			this.callbac( );

		return true;
	}

	this.setCallback = function( func )
	{
		if ( this.callback != null )
			delete this.callback;

		if ( Global.isFunction( func ) )
			this.callbac = func;
	}
}