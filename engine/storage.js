function Storage( )
{
	console.assert( window.localStorage != null, "window.localStorage is null£¡");
	
	// Use cookie.
	if ( window.localStorage == null )
	{
		if ( navigator.cookieEnabled == false )
		{
			console.assert( navigator.cookieEnabled, "navigator.cookieEnablede is false");
			return;
		}

		window.storage = new ArrayEx( );
		var cookie = document.cookie;
		values = cookie.split("|");
		for ( var i = 0; i < values.length; i ++ )
		{
			var element = values[i].split(":=:");
			window.storage[element[0]] = element[1];
		}
	}
}

Storage( );

Storage.getItem = function( key )
{
	if ( window.localStorage )
		return window.localStorage.getItem( key )
	else if ( navigator.cookieEnabled )
		return window.storage[key];

	return "";
}

Storage.setItem = function( key, value )
{
	if ( window.localStorage )
		window.localStorage.setItem( key, value )
	else if ( navigator.cookieEnabled )
		window.storage[key] = value;
}

Storage.removeItem = function( key )
{
	if ( window.localStorage )
		window.localStorage.removeItem( key )
	else if ( navigator.cookieEnabled )
		window.storage.remove( key );
}

Storage.clear = function( )
{
	if ( window.localStorage )
	{
		window.localStorage.clear( );
	}
	else if ( navigator.cookieEnabled )
	{
		window.storage.clear( );
		document.cookie = "";
	}
}

Storage.save = function( )
{
	if ( window.localStorage && navigator.cookieEnabled )
		return;

	var cookie = "";
	for ( var p in window.storage )
	{
		if ( cookie != "" )
			cookie += "|";

		cookie += p + ":=:" + window.storage[p];
	}
	document.cookie = cookie;
}