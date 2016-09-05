function MultButton( x, y, w, h)
{
	this.view = new UIView( );
	this.left = new Button( 0, 0, 50, 30);
	this.textview = new TextInput( 25, -15, 50, 30, "0" );
	this.right = new Button( 100, 0, 50, 30);
	this.view = new UIView( );

	this.view.addUI(this.left);
	this.view.addUI(this.right);
	this.view.addUI(this.textview );

	this.view.x = x || 0;
	this.view.y = y || 0;
	this.view.w = w || 0;
	this.view.h = h || 0;
}

log("load multbutton.js file!");