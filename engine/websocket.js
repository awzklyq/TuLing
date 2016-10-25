function LWebSocket( url, subprotocol )
{
	this.ws = new WebSocket( url, subprotocol );
	// If debug...
	this.ws.onerror = function( error ){ log( error.data ); }
	// 0: Not connet, 1: Connect;
	this.state = 0;
	this.messages = new Array( );

	this.onOpen = function( func )
	{
		if ( this.ws == null )
			return;

		var self = this;
		this.ws.onopen = function( event )
		{
			func( event );
			
			for ( var i = 0; i < self.messages.length; i ++ )
			{
				self.ws.send( this.messages[i] );
			}

			delete self.messages;
			delete self.ws.onopen;
			delete self.onOpen;
		}
	}

	this.send = function( msg )
	{
		if ( this.ws == null )
			return;

		if ( this.state == 0 )
		{
			this.messages.push( msg );
		}
		else
		{
			this.ws.send( msg );
		}
	}

	this.onMessage = function( func )
	{
		if ( this.ws == null )
			return;

		// Parame : event( event.data ).
		this.ws.onmessage = func;
	}

	this.close = function( )
	{
		if ( this.ws == null )
			return;

		this.ws.close( );
	}

	this.onClose = function( func )
	{
		if ( this.ws == null )
			return;

		// Paramm : event. 
		this.ws.onclose = func;
	}
}

LWebSocket.release = function( obj )
{
	if ( ( obj instanceof LWebSocket ) == false )
		return;

	// Release property.
	delete obj.state;
	delete obj.messages;
	delete obj.ws;

	// Release function.
	delete obj.onOpen;
	delete obj.send;
	delete obj.onMessage;
	delete obj.close;
	delete obj.onClose;
}