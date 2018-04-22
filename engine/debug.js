function Debug( ) { }

Debug.getFunctionName = function( func )
{
	if (typeof func == 'function' || typeof func == 'object')
	{
		var name = ( '' + func ).match( /function\s*([\w\$]*)\s*\(/ );
		return name && name[1];
	}

	return "";
}

if ( window.console == null )
	window.console = { };

if ( console.trace == null )
{
	Debug.trace = function( )
	{
		var stack = [],
		caller = arguments.callee.caller;
		while (caller)
		{
			stack.unshift(getFunctionName(caller));
			caller = caller && caller.caller;
		}

		log('functions on stack:' + '\n' + stack.join('\n'));
	}
}
else
{
	Debug.trace = console.trace;
}

Debug.assert = function( param1, param2 )
{
	if ( param1 == false )
		Debug.trace( );

	console.assert( param1, param2 );
}
