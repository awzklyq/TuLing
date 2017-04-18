function Path( )
{
	
}

function PathFinder( grid )
{
	Debug.assert( grid == null || Global.Grid4_typeid != grid.typeid, "The param is not right! ");

	this.openList = new ArrayEx( );
	this.closeList = new ArrayEx( );
	this.current = {};
	this.target = {};

	this.grid = new Grid4( 0, 0, 0, 0 );
	this.grid.setGrids( grid );

	this.findPath = function( x1, y1, x2, y2 )
	{
		if ( Global.isNumber( x1 ) == false || Global.isNumber( y1 ) == false
			|| Global.isNumber( x2 ) == false || Global.isNumber( y2 ) == false )
		{
			Debug.assert( true, "The param is not number! ");
			return null;
		}

		this.current = this.grid.selectAt( x1, y1 );
		this.target = this.grid.selectAt( x2, y2 );
	}

	this.checkPath = function( source, target )
	{
		var x1 = source.column;
		var y1 = source.row;
		var x2 = target.column;
		var y2 = target.row;
		if ( source.element == target.element )
			return source;

		source.element.weight = Math.pow( x2 - x1, 2 ) + Math.pow( y2 - y1, 2 );
		this.openList.
		source.sons = new ArrayEx( );
		if ( x1 != 0 )
		{
			var temp = { column: x1 - 1, row: y1, element:this.grid.grids[y1][x1 - 1]};
			if ( temp.state != 1 )
			{
				temp.element.weight = Math.pow( x2 - x1 + 1, 2 ) + Math.pow( y2 - y1, 2 );
				source.sons.push( temp );
			}
		}

		if ( x1 + 1 != this.grids.length )
		{
			var temp = { column: x1 + 1, row: y1, element:this.grid.grids[y1][x1 + 1]};
			if ( temp.state != 1 )
			{
				temp.element.weight = Math.pow( x2 - x1 - 1, 2 ) + Math.pow( y2 - y1, 2 );
				source.sons.push( temp );
			}
		}

		if ( y1 - 1 != 0 )
		{
			var temp = { column: x1, row: y1, element:this.grid.grids[y1 - 1][x1]};
			if ( temp.state != 1 )
			{
				temp.element.weight = Math.pow( x2 - x1, 2 ) + Math.pow( y2 - y1 + 1, 2 );
				source.sons.push( temp );
			}
		}

		if ( y1 + 1 != this.grids[0].length )
		{
			var temp = { column: x1, row: y1 + 1, element:this.grid.grids[y1 + 1][x1]};
			if ( temp.state != 1 )
			{
				temp.element.weight = Math.pow( x2 - x1, 2 ) + Math.pow( y2 - y1 - 1, 2 );
				source.sons.push( temp );
			}
		}
	}
}