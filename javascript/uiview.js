function UIView( x, y, w, h )
{
	this._x = x || 0;
	this._y = y || 0;
	this._w = w || 0;
	this._h = h || 0;

	this.elements = new ArrayEx( );
	this.add = function( ui )
	{
		if ( UIView.isObject( ui ) )
		{
			ui._parent = this;
			this.elements.push( ui );
		}
	}
	this.type = "UIView";
}

UIView.prototype = Global.UI;

UIView.isObject = function( obj, isview )
{
	if ( isview == true )
	{
		if ( obj instanceof UIView )
			return;
	}

	return ( obj instanceof UIView ) || Button.isObject( obj ) || Text.isObject( obj ) || TextArea.isObject( obj ) || TextInput.isObject( obj );
}