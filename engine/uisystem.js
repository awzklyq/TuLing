function UISystem( )
{
}

UISystem( );

UISystem.buttons = new ArrayEx( );

UISystem.textinputs = new ArrayEx( );

UISystem.texts = new ArrayEx( );

UISystem.textareas = new ArrayEx( );

UISystem.uiviews = new ArrayEx( );

UISystem.fouseuis = new ArrayEx( );

UISystem.uilists = new ArrayEx( );

// TODO.
UISystem.removeUI = function( ui )
{
	if ( UISystem.isButton( ui )	)
		UISystem.buttons.remove( ui );
	else if ( UISystem.isText( ui ) )
		UISystem.texts.remove( ui );
	else if ( UISystem.isTextArea( ui ) )
		UISystem.textareas.remove( ui );
	else if ( UISystem.isTextInput( ui ) )
		UISystem.textinputs.remove( ui );
	else if ( UISystem.isUIView( ui ) )
		UISystem.uiviews.remove( ui );
	else if ( UISystem.isUIList( ui ) )
		UISystem.uilists.remove( ui );
} 

UISystem.render = function( e )
{
	var buttons = UISystem.buttons;

	for ( var i = 0; i < buttons.length; i ++ )
		buttons[i].draw( );

	var texts = UISystem.texts;
	for ( var i = 0; i < texts.length; i ++ )
		texts[i].draw( );

	var textareas = UISystem.textareas;
	for ( var i = 0; i < textareas.length; i ++ )
		textareas[i].draw( );

	var textinputs = UISystem.textinputs;
	for ( var i = 0; i < textinputs.length; i ++ )
		textinputs[i].draw( );

	var uiviews = UISystem.uiviews;
	for ( var i = 0; i < uiviews.length; i ++ )
		uiviews[i].draw( );

	var uilists = UISystem.uilists;
	for ( var i = 0; i < uilists.length; i ++ )
		uilists[i].draw( );
}

function mouseDown( b, x, y )
{
	UISystem.fouseuis.clear( );
	var buttons = UISystem.buttons;
	for ( var i = 0; i < buttons.length; i ++ )
	{
		if ( buttons[i].triggerMouseDown( b, x, y ) )
			return true;
	}

	var textinputs = UISystem.textinputs;
	for ( var i = 0; i < textinputs.length; i ++ )
	{
		if ( textinputs[i].triggerMouseDown( b, x, y ) )
			return true;
	}

	var uiviews = UISystem.uiviews;
	for ( var i = 0; i < uiviews.length; i ++ )
	{
		if ( uiviews[i].triggerMouseDown( b, x, y ) )
			return true;
	}

	var uilists = UISystem.uilists;
	for ( var i = 0; i < uilists.length; i ++ )
	{
		if ( uilists[i].triggerMouseDown( b, x, y ) )
			return true;
	}

	return false;
}

window.onMouseDown.push( mouseDown );

function keyDown( keyCode )
{
	var fouseuis = UISystem.fouseuis;
	for ( var i = 0; i < fouseuis.length; i ++ )
	{
		if ( UISystem.isTextInput( fouseuis[i] ) )
		{
			TextInput.doActionForKeyDown( keyCode, fouseuis[i] );
			return true;
		}
	}

	return false;
}
window.onKeyDown.push( keyDown );

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
			var intervalx = this._x - oldx;
			for ( var i = 0; i < temp.length; i ++ )
			{
				temp[i].x += intervalx;
				if ( temp[i].triggerResizeXY != null && Global.isFunction( temp[i].triggerResizeXY ) )
					temp[i].triggerResizeXY( intervalx, 0 );
			}
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
			var intervaly = this._y - oldy;
			for ( var i = 0; i < temp.length; i ++ )
			{
				temp[i].y += intervaly;

				if ( temp[i].triggerResizeXY != null && Global.isFunction( temp[i].triggerResizeXY ) )
					temp[i].triggerResizeXY( 0, intervaly );
			}
		}
	}
	},// End y.
	w:{
	get:function( )
	{
		return this._w;
	},
	set:function( ww )
	{
		this._w = ww;
	}
	},// End w.
	h:{
	get:function( )
	{
		return this._h;
	},
	set:function( hh )
	{
		this._h = hh;
	}
	},// End h.
	name:{
	get:function( )
	{
		return this._name;
	},
	set:function( uiname )
	{
		if ( this._parent != null )
		{
			if ( this._parent[uiname] != null )
			{
				Debug.error( "The ui name is used ！");
				return
			}

			if ( this._parent[this._name] != null )
			{
				delete this._parent[this._name];
				log("This ui's name is alive!")
			}
		}

		this._name = uiname;

		if ( this._parent != null )
			this._parent[this._name] = this;
	}
	},// End name.
	_x:{writable:true},
	_y:{writable:true},
	_name:{writable:true}
})
	
	//this.elements = new ArrayEx( );