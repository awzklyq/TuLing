function UISystem( )
{
}

UISystem( );

UISystem.buttons = new Array( );

UISystem.textinputs = new Array( );

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
		if ( textinputs[i].insert( x, y ) )
		{
			textinputs[i].fouse = true;
			textinputs[i].setCursorPostion( x, y );
		}
	}
}