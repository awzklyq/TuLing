function HTTPRequest( )
{
	if ( window.XMLHttpRequest )
	{
		this.http = new window.XMLHttpRequest( );
	}
	else if ( window.ActiveXObject )
	{
		this.http = new window.ActiveXObject( "Msxml2.XMLHTTP" );
		if ( this.http == null )
		{
			this.http = new window.ActiveXObject( "Microsoft.XMLHTTP" );
		}
	}

	this.parames = new Array( );
	this.addParame = function( key, value )
	{
		if ( key != null && value != null )
		{
			this.parames.push( key );
			this.parames.push( value );
		}
	}
	
	this.clearParames = function( )
	{
		this.parames.splice( 0, this.parames.length ); 
	}

	this.async = false;
	this.method = "GET";
	this.open = function( url, usename, pwd )
	{
		if ( this.http == null )
			return;

		var parames = this.parames;
		if ( parames.length > 0 && parames.length % 2 == 0 )
		{
			url += "?";
			for ( var i = 0; i < parames.length; i ++ )
			{
				if ( i != 0 )
					url += "&";
				url += parames[i] + "=" + parames[++i];
			}
		}

		log(url);
		this.http.open( this.method, url, this.async, usename, pwd );
	}

	this.send = function( context )
	{
		if ( this.http == null )
			return;

		if ( context != null )
		{
			if ( this.method == "POST" )
				this.http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		}

		this.http.send( context );
	}

	this.stateChangeEvent = null;
	this.loadEvent = null;
	this.onChangeState = function( func )
	{
		var http = this.http;
		if ( http == null )
			return;

		if ( this.stateChangeEvent != null )
			delete this.stateChangeEvent;

		this.stateChangeEvent = func;

		var loadEvent = this.loadEvent;
		http.onreadystatechange = function()
		{
			if ( func != null )
				func( );

			if ( loadEvent != null && http.readyState == HTTPRequest.DONE && http.status == HTTPRequest.OK )
			{
				loadEvent( http.responseText );
			}
		}
	}

	this.onLoadEvent = function( func )
	{
		var http = this.http;
		if ( http == null )
			return;

		if ( this.loadEvent != null )
			delete this.loadEvent;

		this.loadEvent = func;

		var stateChangeEvent = this.stateChangeEvent;
		http.onreadystatechange = function()
		{

			if ( stateChangeEvent != null )
				stateChangeEvent( );

			log( func != null, http.readyState == HTTPRequest.DONE, http.status == HTTPRequest.OK );
			if ( func != null && http.readyState == HTTPRequest.DONE && http.status == HTTPRequest.OK )
			{
				func( http.responseText );
			}
		}
	}

	this.setRequesHeader = function( header, value )
	{
		if ( this.http == null )
			return;

		this.http.setRequesHeader( header, value );
	}

	this.getRequesHeader = function( header )
	{
		if ( this.http == null )
			return;

		return this.http.getRequesHeader( header );
	}

	this.getAllRequesHeaders = function( )
	{
		if ( this.http == null )
			return;

		return this.http.getAllRequesHeaders( );
	}

	// Lift states.
	HTTPRequest.INITING	= 0;
	HTTPRequest.LOADING	= 1;
	HTTPRequest.LOAD	= 2;
	HTTPRequest.DOING	= 3;
	HTTPRequest.DONE	= 4;

	// Status.
	HTTPRequest.OK = 200;
}