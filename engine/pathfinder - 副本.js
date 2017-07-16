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
	this.grid.setGrids( grid );
	this.grids = this.grid.grids;

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

			if ( source.element.weight == 0 )
			{
				this.pathList.push( source );
				return true;
			}

			this.openList.insertBinary( source, 0, this.openList.length, "element", "weight" );
		}
		
		source.sons = new ArrayEx( );

		var isclose = false;
		if ( x1 - 1 >= 0 )
		{
			var temp = { column: x1 - 1, row: y1, element:this.grid.grids[y1][x1 - 1]};
			if ( temp.element.state != 1 )
			{
				if ( this.openList.findHelper( temp, 'element' ) == -1 )
				{
					temp.element.weight = Math.pow( x2 - x1 + 1, 2 ) + Math.pow( y2 - y1, 2 );

					if ( temp.element.weight == 0 )
						return true;

					this.openList.insertBinary( temp, 0, this.openList.length, "element", "weight" );
					source.sons.insertBinary( temp, 0, source.sons.length, "element", "weight" );
					isclose = true;
				}
			}
		}

		if ( x1 + 1 != this.grids.length )
		{
			var temp = { column: x1 + 1, row: y1, element:this.grid.grids[y1][x1 + 1]};
			if ( temp.element.state != 1 )
			{
				if ( this.openList.findHelper( temp, 'element' ) == -1 )
				{
					temp.element.weight = Math.pow( x2 - x1 - 1, 2 ) + Math.pow( y2 - y1, 2 );

					if ( temp.element.weight == 0 )
						return true;

					this.openList.insertBinary( temp, 0, this.openList.length, "element", "weight" );
					source.sons.insertBinary( temp, 0, source.sons.length, "element", "weight" );
					isclose = true;
				}
			}
		}

		if ( y1 - 1 >= 0 )
		{
			var temp = { column: x1, row: y1 - 1, element:this.grid.grids[y1 - 1][x1]};
			if ( temp.element.state != 1 )
			{
				if ( this.openList.findHelper( temp, 'element' ) == -1 )
				{
					temp.element.weight = Math.pow( x2 - x1, 2 ) + Math.pow( y2 - y1 + 1, 2 );

					if ( temp.element.weight == 0 )
						return true;

					this.openList.insertBinary( temp, 0, this.openList.length, "element", "weight" );
					source.sons.insertBinary( temp, 0, source.sons.length, "element", "weight" );
					isclose = true;
				}
			}
		}

		if ( y1 + 1 != this.grids[0].length )
		{
			var temp = { column: x1, row: y1 + 1, element:this.grid.grids[y1 + 1][x1]};

			if ( temp.element.state != 1 )
			{
				if ( this.openList.findHelper( temp, 'element' ) == -1 )
				{
					temp.element.weight = Math.pow( x2 - x1, 2 ) + Math.pow( y2 - y1 - 1, 2 );

					if ( temp.element.weight == 0 )
						return true;

					this.openList.insertBinary( temp, 0, this.openList.length, "element", "weight" );
					source.sons.insertBinary( temp, 0, source.sons.length, "element", "weight" );
					isclose = true;
				}
			}
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
	
}