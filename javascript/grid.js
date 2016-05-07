function Grids6( x, y, side, w, h )
{
	if ( arguments.length < 5 )
		return;

	if ( side == 0 || w == 0 || h == 0 )
		return;

	var temp1 = Math.ceil( w * 0.5 / side );
	var temp2 = Math.ceil( h * 0.5 / side );
	this.grids = new ArrayEx( );

	var yy = Math.sqrt(3) * side;
	for ( var j = 0; j < temp2; j ++ )
	{
		this.grids.push( new ArrayEx( ) );
		for ( var i = 0; i < temp1; i ++ )
		{
			this.grids[j].push( Polygon.CreateRulePolygon( 6, side ) )
			this.grids[j][i].moveTo( i * side * 1.5, j * yy + ( i % 2 == 0 ? 0 : yy * 0.5 ) );
			this.grids[j][i].setColorStyle( 0x00 );
		}
	}

	this.getSelectGrid = function( x, y )
	{
		var jj = Math.MaxNumber;
		var jjj = -1;
		log(this.grids.length)
		for ( var j = 0; j < this.grids.length; j ++ )
		{
			var grid = this.grids[j];
			var temp = Math.abs( y - grid[0].matrix.mat[7] );
			if ( temp < jj )
			{
				jjj = j;
				jj = temp;
			}
		}

		// log(jjj)
		if ( jjj == -1 || jjj >= this.grids.length )
			return null;

		var ii = Math.MaxNumber;
		var iii = -1;
		for ( var i = 0; i < this.grids[jjj].length; i ++ )
		{
			var temp = Math.abs( x - this.grids[jjj][i].matrix.mat[6] );
			if ( temp < ii )
			{
				iii = i;
				ii = temp;
			}
		}

		if ( iii != -1 && iii < this.grids[jjj].length )
			return this.grids[jjj][iii];
	}

	this.draw = function( )
	{
		// Global.beginCombineRender( );
		for ( var j = 0; j < this.grids.length; j ++ )
		{
			var grid = this.grids[j];
			for ( var i = 0; i < grid.length; i ++ )
				Polygon.draw( grid[i] );
		}
		// Global.endCombineRender( Global.CombineRenderStroke );
	}
}