function Collision( )
{
	this.group = new Array( );
	
	this.add = function(element)
	{
		if(element.range == null)
		{
			element.buildBox( );
		}

		this.group.push(element)
	}
	
	this.rebuild = function( )
	{
		// Memoery todo.
		if (this.elements)
		{
			delete this.elements;
		}

		var group = this.group;
		var len = group.length;
		this.elements = new Array( );
		for (var i = 0; i < len; i ++)
		{
			elements[i] = new Array( );
		}

		for (var i = 0; i < len; i ++)
		{
			for (var j = i; j < len; j ++)
			{
				if (i == j)
				{
					elements[i][j] = 0; // TOOD.
				}
				else
				{
					elements[j][i] = Math.pow(group[i].range + group[j].range, 2);
					var x1 = group[i].matrix.mat[6], y1 = group[i].matrix.mat[7], x2 = group[j].matrix.mat[6], y2 = group[j].matrix.mat[7];
					elements[i][j] = Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2);
				}
			}
		}
	}

	// a, b are Polygon.
	this.checkforce = function(a, b)
	{
		return true; // TODO.
	}

	this.update = function( )
	{
		if (this.elements == null && this.callback)
		{
			return;
		}

		
		var group = this.group;
		var len = group.length;

		for (var i = 0; i < len; i ++)
		{
			for (var j = i; j < len; j ++)
			{
				var x1 = group[i].matrix.mat[6], y1 = group[i].matrix.mat[7], x2 = group[j].matrix.mat[6], y2 = group[j].matrix.mat[7];
				elements[i][j] = Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2);
				if (elements[i][j] < elements[j][i] && this.checkforce(a, b))
				{
					this.callback(group[i], group[j]);
				}
			}
		}
	}
}