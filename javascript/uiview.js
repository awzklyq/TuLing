function UIView( x, y, w, h )
{
	this._x = x || 0;
	this._y = y || 0;
	this._w = w || 0;
	this._h = h || 0;

	this.elements = new ArrayEx( );
	this.addUI = function( ui )
	{
		if ( UISystem.isUIView( ui ) )
		{
			ui._parent = this;
			this.elements.push( ui );
			UISystem.removeUI( ui );
		}
	}

	this.removeUI = function( ui )
	{
		if ( UISystem.isUIView( ui ) == false && ui._parent != this )
			return

		this.elements.remove( ui );
		delete ui._parent;
	}

	this.clearUIs = function( )
	{
		for ( var i = 0; i < this.elements.length; i ++ )
			delete this.elements._parent;

		this.elements.clear( );
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

	UISystem.uiviews.push( this );
	this.type = "UIView";
}

UIView.prototype = Global.UI;

UISystem.isUIView = function( obj, isview )
{
	if ( isview == true )
	{
		if ( obj.type == "UIView" )
			return;
	}

	return ( obj.type == "UIView" ) || UISystem.isButton( obj ) || UISystem.isText( obj ) || UISystem.isTextArea( obj ) || UISystem.isTextInput( obj );
}