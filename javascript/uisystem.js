function UISystem( )
{
}

UISystem( );

UISystem.buttons = new ArrayEx( );

UISystem.textinputs = new ArrayEx( );

UISystem.fouseuis = new ArrayEx( );

UISystem.render = function( e )
{
	var buttons = UISystem.buttons;

	for ( var i = 0; i < buttons.length; i ++ )
	{
		buttons[i].draw( );
	}

	var textinputs = UISystem.textinputs;
	for ( var i = 0; i < textinputs.length; i ++ )
	{
		textinputs[i].draw( e );
	}
}

var mousedowncallback = window.onMouseDown;
mousedowncallback[mousedowncallback.length] = function( b, x, y )
{
	UISystem.fouseuis.clear( );
	var buttons = UISystem.buttons;
	for ( var i = 0; i < buttons.length; i ++ )
	{
		if ( buttons[i].insert( x, y ) )
		{
			buttons[i].state = 2;
			if ( buttons[i].click != null )
			{
				buttons[i].click( );
			}
		}
	}

	var textinputs = UISystem.textinputs;
	for ( var i = 0; i < textinputs.length; i ++ )
	{
		textinputs[i].fouse = false;
		if ( textinputs[i].insert( x, y ) )
		{
			textinputs[i].fouse = true;
			textinputs[i].setCursorPostion( x, y );
			UISystem.fouseuis.push( textinputs[i] );
			break;
		}
	}
}

window.onKeyDown[window.onKeyDown.length] = function( keyCode )
{
	var def = false;
	var fouseuis = UISystem.fouseuis;
	for ( var i = 0; i < fouseuis.length; i ++ )
	{
		if ( TextInput.isObject( fouseuis[i] ) )
		{
			TextInput.doActionForKeyDown( keyCode, fouseuis[i] );
			def = true;
			break;
		}
	}

	return def;
}

Global.UI = Object.create( Object.prototype, {
	x:{
	get:function( )
	{
		if ( this._parent != null )
			return this._x - this._parent._x;

		return this._x;
	},
	set:function( xx )
	{
		if ( Global.isNumber( xx ) == false )
			return;

		var oldx = this._x;
		if ( this._parent != null )
			this._x = this._parent._x + xx;
		else
			this._x = xx;

		if ( this.elements != null && Global.isArray( this.elements ) )
		{
			var temp = this.elements;
			for ( var i = 0; i < temp.length; i ++ )
				temp[i]._x += this._x - oldx;
		}
	}
	},// End x.
	y:{
	get:function( )
	{
		if ( this._parent != null )
			return this._y - this._parent._y;

		return this._y;
	},
	set:function( yy )
	{
		if ( Global.isNumber( yy ) == false )
			return;

		var oldy = this._y;
		if ( this._parent != null )
			this._y = this._parent._y + yy;
		else
			this._y = yy;

		if ( this.elements != null && Global.isArray( this.elements ) )
		{
			var temp = this.elements;
			for ( var i = 0; i < temp.length; i ++ )
				temp[i]._y += this._y - oldy;
		}
	}
	},// End y.
	_x:{writable:true},
	_y:{writable:true},
})
	
	//this.elements = new ArrayEx( );