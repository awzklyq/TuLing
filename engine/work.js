// Event.data struct:
// name: function -> parames;
self.onmessage = function( event )
{
	var msg = event.data;
	if ( msg.name == "function" )
	{
		if ( msg.func == null )
			return;

		var func = ( new Function( "return " + msg.func ) )( );

		if ( typeof(func) != "function" )
			return;
			
		var result = null;
		if ( msg.parame1 == null )
			result = func( );
		else if ( msg.parame2 == null )
			result = func( msg.parame1 );
		else if ( msg.parame3 == null )
			result = func( msg.parame1, msg.parame2 );
		else if ( msg.parame4 == null )
			result = func( msg.parame1, msg.parame2, msg.parame3 );
		else if ( msg.parame5 == null )
			result = func( msg.parame1, msg.parame2, msg.parame3, msg.parame4 );
		else if ( msg.parame6 == null )
			result = func( msg.parame1, msg.parame2, msg.parame3, msg.parame4, msg.parame5 );
		else
			result = func( msg.parame1, msg.parame2, msg.parame3, msg.parame4, msg.parame5, msg.parame6 );

		result.key = msg.key;
		if ( result != null )
			self.postMessage( result );
	}
}