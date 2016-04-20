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
	var fouseuis = UISystem.fouseuis;
	for ( var i = 0; i < fouseuis.length; i ++ )
	{
		if ( TextInput.isObject( fouseuis[i] ) )
		{
			log( fouseuis[i].text, StringEx.getUnicode( keyCode ) );
			fouseuis[i].text = StringEx.insert( fouseuis[i].text, fouseuis[i].curindex, StringEx.getUnicode( keyCode ) )
		}
	}
}