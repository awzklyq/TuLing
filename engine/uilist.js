function UIList( x, y, w, h )
{
	this._x = 0;
	this._y = 0;
	this._w = 0;
	this._h = 0;

	this.elements = new ArrayEx( );
	this.addView = function( ui )
	{
		if ( UISystem.isUIView( ui ) )
		{
			ui._parent = this;
			if ( this.elements.length != 0 )
			{
				var view = this.elements[this.elements.length - 1];
				ui.y = view.y + view.h;
			}
			this.elements.push( ui );
			UISystem.removeUI( ui );
		}
	}
	
	this.removeView = function( ui )
	{
		if ( UISystem.isUIView( ui ) == false || ui._parent != this )
			return

		this.elements.remove( ui );
		delete ui._parent;
	}

	this.draw = function( )
	{
		var elements = this.elements;
		for ( var i = 0; i < elements.length; i ++ )
			elements[i].draw( );
	}
	
	this.triggerMouseDown = function( b, x, y )
	{
		var elements = this.elements;
		for ( var i = 0; i < elements.length; i ++ )
		{
			if ( Global.isFunction( elements[i].triggerMouseDown ) && elements[i].triggerMouseDown( b, x, y ) )
				return true;
		}

		return false;
	}


	UISystem.uilists.push( this );
	this.type = "UIList";
}

UIList.prototype = Global.UI;

UISystem.isUIList = function( ui )
{
	return ui && ui.type && ui.type == "UIList";
}