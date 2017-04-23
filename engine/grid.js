function Grids6( x, y, w, h, side )
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
			//this.grids[j][i].resetCanvas( );
		}
	}

	this.getSelectGrid = function( x, y )
	{
		var jj = Math.MaxNumber;
		var jjj = -1;

		for ( var j = 0; j < this.grids.length; j ++ )
		{
			var grid = this.grids[j];
			var temp = Math.min( Math.abs( y - grid[0].matrix.mat[7] ), Math.abs( y - grid[1].matrix.mat[7] ) );
			if ( temp < jj )
			{
				jjj = j;
				jj = temp;
			}
		}

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

		if ( iii == -1 || iii >= this.grids[jjj].length )
			return null;

		// TODO.
		jj = Math.abs( y - this.grids[jjj][iii].matrix.mat[7] );
		if ( this.grids[jjj - 1] != null && jj > Math.abs( y - this.grids[jjj - 1][iii].matrix.mat[7] ) )
			return this.grids[jjj - 1][iii];

		if ( this.grids[jjj + 1] != null && jj > Math.abs( y - this.grids[jjj + 1][iii].matrix.mat[7] ) )
			return this.grids[jjj + 1][iii];

		return this.grids[jjj][iii];
	}

	this.draw = function( )
	{
		if ( this.canvas != null )
		{
			this.canvas.draw( 0, 0, window.canvas.width, window.canvas.height );
			return;
		}

		// Global.beginCombineRender( );
		for ( var j = 0; j < this.grids.length; j ++ )
		{
			var grid = this.grids[j];
			for ( var i = 0; i < grid.length; i ++ )
				Polygon.render( grid[i] );

		}
		// Global.endCombineRender( Global.CombineRenderStroke );
	}

	this.resetCanvas = function( )
	{
		if ( this.canvas != null )
			delete this.canvas;

		var canvas = new CanvasEx( );
		canvas.setAttribute( "width", window.canvas.width );
		canvas.setAttribute( "height", window.canvas.height );
		var context =  window.context;
		window.context = canvas.getContext( );
		this.draw( )
		window.context = context;
		this.canvas = canvas;
	}

	this.refreshGrid = function( grid )
	{
		if ( this.canvas == null )
			return null;

		var context =  window.context;
		window.context = this.canvas.getContext( );
		Polygon.render( grid );
		window.context = context;
	}
}

function Grids4( x, y, w, h, size, element )
{
	this.typeid = Global.Grid4_typeid;
	this.hgNum = h / size;
	this.wgNum = w / size;
	this.gridSize = size;
	this.grids = new ArrayEx( ); // state = -1: no path.
	for ( var i = 0; i < this.hgNum; i ++ )
	{
		this.grids.push( new ArrayEx( ) );
		for ( var j = 0; j < this.wgNum; j ++ )
			this.grids[i].push( {state:0, weight:0, color:0xffffffff} );
	}

	this.rect = new Rect( );

	this.randomGrid = function( datas )
	{
		if ( datas.length == 0 )
			return;

		for ( var i = 0; i < this.grids.length; i ++ )
		{
			for ( var j = 0; j < this.grids[i].length; j ++ )
				this.grids[i][j] = Global.copyObject( datas[Math.floor( Math.randomAt( datas.length ) )] );
		}
	}

	this.setGrids = function( grid )
	{
		Debug.assert( grid != null && Global.Grid4_typeid == grid.typeid, "The param is not right! ");

		delete this.grids;
		this.grids = new ArrayEx( );

		var grids = grid.grids;
		for ( var i = 0; i < grids.length; i ++ )
		{
			this.grids[i] = new ArrayEx( );
			for ( var j = 0; j < grids[i].length; j ++ )
				this.grids[i][j] = Global.copyObject( grids[i][j] );
		}

		this.hgNum = grid.hgNum;
		this.wgNum = grid.wgNum;
		this.gridSize = grid.gridSize;
	}

	this.selectAt = function( x, y )
	{
		x = Math.floor( x / this.gridSize );
		y = Math.floor( y / this.gridSize );

		return { row: y, column: x, element: this.grids[y][x] };
	}

	this.draw = function( )
	{
		for ( var i = 0; i < this.grids.length; i ++ )
		{
			for ( var j = 0; j < this.grids[i].length; j ++ )
			{
				if ( this.grids[i][j].color != null )
					this.rect.setColor( this.grids[i][j].color );

				this.rect.resetSize( j * this.gridSize, i * this.gridSize, this.gridSize, this.gridSize );
				this.rect.draw( );
			}
		}
	}
}