function sorthelper(a, b)
{
	return a.time < b.time;
}

function Affect( )
{
	this.duration = 0;
	this.tick = 0;
	this.loop = false;

	// value: color, color-a, color-r, color-g, color-b, color-rgb.
	// value: number.
	this.color = new ArrayEx( );
	this.colora = new ArrayEx( ); // TODO.
	this.colorr = new ArrayEx( ); // TODO.
	this.colorg = new ArrayEx( ); // TODO.
	this.colorb = new ArrayEx( ); // TODO.
	this.colorrgb = new ArrayEx( ); // TODO.
	this.nums = new ArrayEx( );

	this.state = 0;

	// value1:start, value2:end, value3:( t - t1 ) / ( t2 - t1 ).
	this.linear = function( ary, t )
	{
		var start = Affect.NONE, end = Affect.NONE;
		var t1 = 0, t2 = 0;

		if ( t == -1 )
			t = this.tick;

		for ( var  i = 0; i < ary.length; i ++ )
		{
			if ( ary[i].time < t )
			{
				t1 = ary[i].time;
				start = ary[i].value;
			}

			if ( ary[i].time >= t )
			{
				t2 = ary[i].time;
				end = ary[i].value;
				break;
			}
		}

		if ( start == Affect.NONE )
		{
			t1 = t2;
			start = end;
		}

		if ( end == Affect.NONE )
		{
			t2 = t1;
			end = start;
		}

		return {value1:start, value2:end, value3:t1 == t2 ? 1 : ( t - t1 ) / ( t2 - t1 )};
	}

	this.getValue = function( type, t )
	{
		if ( this.state & type == 0 )
			return Affect.NONE;

		if ( t == -1 )
			t = this.tick;

		if ( type == Affect.COLOR )
		{
			var temp = this.linear( this.color, t );
			if ( temp.value1 == Affect.NONE )
				return Affect.NONE;
			return Math.LinearColor( temp.value1, temp.value2, temp.value3 );

		}
		else if ( type == Affect.COLORA )
		{
			var temp = this.linear( this.colora, t );
			if ( temp.value1 == Affect.NONE )
				return Affect.NONE;
			
			return Math.Linear( temp.value1, temp.value2, temp.value3 );
		}
		else if ( type == Affect.COLORR )
		{
			var temp = this.linear( this.colorr, t );
			if ( temp.value1 == Affect.NONE )
				return Affect.NONE;
			
			return Math.Linear( temp.value1, temp.value2, temp.value3 );
		}
		else if ( type == Affect.COLORG )
		{
			var temp = this.linear( this.colorg, t );
			if ( temp.value1 == Affect.NONE )
				return Affect.NONE;
			
			return Math.Linear( temp.value1, temp.value2, temp.value3 );
		}
		else if ( type == Affect.COLORB )
		{
			var temp = this.linear( this.colorb, t );
			if ( temp.value1 == Affect.NONE )
				return Affect.NONE;
			
			return Math.Linear( temp.value1, temp.value2, temp.value3 );
		}
		else if ( type == Affect.NUMBER )
		{
			var temp = this.linear( this.nums, t );
			if ( temp.value1 == Affect.NONE )
				return Affect.NONE;
			
			return Math.Linear( temp.value1, temp.value2, temp.value3 );
		}

		return Affect.NONE;
	}

	this.addValue = function( value, t, type )
	{
		if ( type == Affect.COLOR )
		{
			this.color.push( {value:value, time:t} );
			this.color.sort( sorthelper );
		}
		else if ( type == Affect.COLORA )
		{
			this.colora.push( {value:value, time:t} );
			this.colora.sort( sorthelper );
		}
		else if ( type == Affect.COLORR )
		{
			this.colorr.push( {value:value, time:t} );
			this.colorr.sort( sorthelper );
		}
		else if ( type == Affect.COLORG )
		{
			this.colorg.push( {value:value, time:t} );
			this.colorg.sort( sorthelper );
		}
		else if ( type == Affect.COLORB )
		{
			this.colorb.push( {value:value, time:t} );
			this.colorb.sort( sorthelper );
		}
		else if ( type == Affect.COLORRGB )
		{
			this.colorrbb.push( {value:value, time:t} );
			this.colorrbb.sort( sorthelper );
		}
		else if ( type == Affect.NUMBER )
		{
			this.nums.push( {value:value, time:t} );
			this.nums.sort( sorthelper );
		}
	}

	this.update = function( e )
	{
		this.tick += e;
		
		if ( this.tick < this.duration ) return;

		if ( this.loop )
			this.tick %= this.duration;
		else
			this.tick = Math.min( this.tick, this.duration - 1 );
	}
}

Affect.NONE = null;
Affect.COLOR = 0x00000001;
Affect.COLORA = 0x00000002;
Affect.COLORR = 0x00000003;
Affect.COLORG = 0x00000004;
Affect.COLORB = 0x00000005;
Affect.COLORRGB = 0x00000006;
Affect.NUMBER = 0x00000007;