function UIView( x, y, w, h, name, backimage )
{

	this._x = x || 0;
	this._y = y || 0;
	this._w = w || 0;
	this._h = h || 0;

	// For swf.
	this.depth = 1;

	this._name = name || "";
	this.image = backimage;

	this.setImage = function( img )
	{
		if ( this.image )
			delete this.image;

		this.image = img;
	}

	this.elements = new ArrayEx( );
	this.addUI = function( ui )
	{
		if ( UISystem.isUIView( ui ) )
		{
			ui._parent = this;
			this.elements.push( ui );
			UISystem.removeUI( ui );
			ui._x += this._x;
			ui._y += this._y;
		}

		if ( ui._name != null && ui._name != "" )
			this[ui._name] = ui;
	}

	this.removeUI = function( ui )
	{
		if ( UISystem.isUIView( ui ) == false || ui._parent != this )
			return

		this.elements.remove( ui );

		if ( this[ui._name] != null )
			delete this[ui._name];

		delete ui._parent;
		ui._parent = null;
	}

	this.clearUIs = function( )
	{
		for ( var i = 0; i < this.elements.length; i ++ )
			delete this.elements._parent;

		this.elements.clear( );
	}

	this.draw = function( )
	{
		if ( this.image != null )
		{
			this.image.drawImage( this._x, this._y, this._w, this._h );	
		}

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