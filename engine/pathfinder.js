function Path( )
{
	
}

function PathFinder( grid )
{
	Debug.assert( grid != null && Global.Grid4_typeid == grid.typeid, "The param is not right! ");

	this.pathList = new ArrayEx( );
	this.openList = new ArrayEx( );
	this.closeList = new ArrayEx( );
	this.current = {};
	this.target = {};

	this.grid = new Grids4( 0, 0, 0, 0 );

	this.setGrids = function( grid )
	{
		if ( this.grids != null )
			delete this.grids;

		this.grid.setGrids( grid );
		this.grids = this.grid.grids;
	}

	this.setGrids( grid );

	this.selectAt = function( x, y )
	{
		return this.grid.selectAt( x, y );
	}

	this.findPath = function( x1, y1, x2, y2 )
	{
		this.pathList.clear( );
		this.openList.clear( );
		this.closeList.clear( );

		if ( Global.isNumber( x1 ) == false || Global.isNumber( y1 ) == false
			|| Global.isNumber( x2 ) == false || Global.isNumber( y2 ) == false )
		{
			Debug.assert( true, "The param is not number! ");
			return null;
		}

		this.current = this.grid.selectAt( x1, y1 );
		this.target = this.grid.selectAt( x2, y2 );
		return this.checkPath( this.current, this.target );
	}

	this.checkPath = function( source, target )
	{
		if ( this.closeList.find( source ) != -1 )
			return false;

		var x1 = source.column;
		var y1 = source.row;
		var x2 = target.column;
		var y2 = target.row;

		if ( this.openList.findHelper( source, 'element' ) == -1 )
		{
			source.element.weight = Math.pow( x2 - x1, 2 ) + Math.pow( y2 - y1, 2 );

			this.openList.insertBinary( source, 0, this.openList.length, "element", "weight" );
		}

		if ( source.element.weight == 0 )
		{
			this.pathList.push( source );
			return true;
		}
		
		source.sons = new ArrayEx( );

		var isclose = false;
		if ( x1 - 1 >= 0 )
		{
			if ( this.checkPathHelper( source, x1 - 1, y1, x2, y2 ) )
				isclose = true;
		}

		if ( x1 + 1 < this.grids[0].length )
		{
			if ( this.checkPathHelper( source, x1 + 1, y1, x2, y2 ) )
				isclose = true;
		}

		if ( y1 - 1 >= 0 )
		{
			if ( this.checkPathHelper( source, x1, y1 - 1, x2, y2 ) )
				isclose = true;
		}

		if ( y1 + 1 < this.grids.length )
		{
			if ( this.checkPathHelper( source, x1, y1 + 1, x2, y2 ) )
				isclose = true;
		}

		if ( isclose == false )
		{
			this.closeList.push( source );
			this.openList.remove( source );
			return false;
		}

		for ( var i = 0; i < source.sons.length; i ++ )
		{
			if ( this.checkPath( source.sons[i], target ) )
			{
				this.pathList.push( source.sons[i] );
				return true;
			}
		}

		return false;	
	}

	this.checkPathHelper = function( element, x1, y1, x2, y2 )
	{
		if ( this.grids[y1][x1].state == 1 )
			return false;

		var temp = { column: x1, row: y1, element:this.grids[y1][x1]};

		if ( this.openList.findHelper( temp, 'element' ) != -1 )
			return false;

		temp.element.weight = Math.pow( x2 - x1, 2 ) + Math.pow( y2 - y1, 2 );

		this.openList.insertBinary( temp, 0, this.openList.length, "element", "weight" );
		element.sons.insertBinary( temp, 0, element.sons.length, "element", "weight" );
		return true;
	}

	this.draw = function( )
	{
		this.grid.draw( );
	}
}