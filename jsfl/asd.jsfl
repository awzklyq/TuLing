function log( )
{
	var str = arguments.length == 0 ? ' ' : '';
	for ( var i = 0; i < arguments.length; i ++ )
	{
		if ( i != 0 )
			str += ', ';

		str += arguments[i];
	}

	flash.trace( str );
}

function logObject( name, obj, dp )
{
	log( 'The object name is', name )
	var i;
	for ( i in obj )
	{
		if ( obj[i] == null )
		{
			log( i, 'null' );
		}
		else if ( typeof(obj[i]) == 'function' )
		{
			log( i, 'function' );
		}
		else if ( typeof(obj[i]) == 'object' && dp )
		{
			log( );
			log( "the parent is", name);
			logObject( i, obj[i], false );
			log( );
		}
		else
		{
			log( i, typeof(obj[i]), obj[i] )
		}
	}

	log( );
}

var doc = fl.getDocumentDOM( );

doc.selectAll();

var timeline = doc.getTimeline( );
var layers = timeline.layers;

log( 'fla name', doc.name );
log( 'layers length', layers.length  );

var values = doc.name + '={';

function writeValue( key, value, end )
{
	if ( typeof( value ) == 'function' || typeof( value ) == 'null' || typeof( value ) == 'undefined' )
		return;

	if ( typeof( value ) == 'string' )
	{
		values += key + ':\''+ value + '\'';
	}
	else if ( typeof( value ) == 'boolean' )
	{
		values += key + ':'+ ( value ? 'true' : 'false' );
	}
	else if ( typeof( value ) == 'object' )
	{
		values += key + ':{';
		var i;
		for ( i in value )
		{
			writeValue( i, value[i] );
		}
		values += '}';
	}
	else
	{
		values += key + ':'+ value;
	}

	if ( end == null || end == false )
		values += ',';
}

function beginReadyElement( elements )
{
	for (var c = 0; c < elements.length; c ++ ) 
	{
		values += 'elements' + c + ':{';

		// logObject( 'elements' + c, elements[c], true );
		writeValue( 'name', elements[c].name ); // Instance name.
		writeValue( 'typename', elements[c].libraryItem.name ); // Class name.
		writeValue( 'x', elements[c].x ); 
		writeValue( 'y', elements[c].y );
		// log( 'elementType', elements[c].elementType ); // 元素的类型. "shape" 、 "text" 、 "instance" 或 "shapeObj" 
		writeValue( 'scaleX', elements[c].scaleX );
		writeValue( 'scaleY', elements[c].scaleY );
		writeValue( "matrix", elements[c].matrix );
		writeValue( "width", elements[c].width, elements[c].height );
		writeValue( "height", elements[c].height );
		writeValue( "transformX", elements[c].transformX );
		writeValue( "transformy", elements[c].transformY );
		writeValue( "depth", elements[c].depth, true );
		values += '}'

		if ( c != elements.length - 1 )
			values += ',';
	}
}

function begineReadyFrames( frames )
{
	// log( 'frames length', frames.length )
	for ( var i = 0; i < frames.length; i ++ )
	{
		if ( frames[i].startFrame == i )
		{
			// log('the current frame', i );
			// logObject( 'frame', frames[i] )

			values += 'frames' + i + ':{';

			beginReadyElement( frames[i].elements );

			values += '}'

			if ( frames[i].startFrame + frames[i].duration != frames.length )
				values += ',';
		}
	}
}

function begineReadyLayers( layers )
{
	for ( var i = 0; i < layers.length; i ++ )
	{
		values += 'layers' + i + ':{';

		begineReadyFrames( layers[i].frames );

		values += '}'

		if ( i != layers.length - 1 )
			values += ',';
	}

}

begineReadyLayers( layers );

values += '}';
log( values )
// var filename = fl.browseForFileURL( "save", "Save file" );
// FLfile.write( filename, "ssssssssssss" );