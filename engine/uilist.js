function UIList( x, y, w, h )
{
	this._x = x || 0;
	this._y = y || 0;
	this._w = w || 0;
	this._h = h || 0;

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

UIList.prototype = new UIView( );

UISystem.isUIList = function( ui )
{
	return ui && ui.type && ui.type == "UIList";
}