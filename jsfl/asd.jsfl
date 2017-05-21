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
		if ( obj[i] == null || obj[i] == 'undefined' )
		{
			log( i, 'null' );
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
			log( i, typeof(obj[i]) );
		}
	}

	log( );
}

// Global param.

// function getDocument( )
// {
	// return fl.getDocumentDOM( );
// }

var doc = fl.getDocumentDOM( );
doc.forceSimple = false
doc.selectAll( );
 
function getLayers( )
{
	return doc.getTimeline( ).layers;
}

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

function beginReadyEdges( edges )
{
	for ( var i = 0; i < edges.length; i ++ )
	{
		values += 'id' + edges[i].id + ':{';

		writeValue( 'strokeColor', edges[i].stroke.color );
		var hedge1 = edges[i].getHalfEdge( 0 );
		var vertex1 = hedge1.getVertex( );
		writeValue( 'vx1', vertex1.x );
		writeValue( 'vy1', vertex1.y );

		var hedge2 = edges[i].getHalfEdge( 1 );
		var vertex2 = hedge2.getVertex( );
		writeValue( 'vx2', vertex2.x );
		writeValue( 'vy2', vertex2.y, true );

		values += '}'

		if ( i != edges.length - 1 )
			values += ',';
	}
}

function beginReadyElement( elements, frame )
{
	for (var c = 0; c < elements.length; c ++ ) 
	{
		values += 'elements' + c + ':{';

		// logObject( 'elements' + c, elements[c], false );
		writeValue( 'name', elements[c].name ); // Instance name.

		writeValue( 'type', elements[c].elementType ); // shape text instance shapeObj shapeObj

		if ( elements[c].libraryItem )
			writeValue( 'typename', elements[c].libraryItem.name ); // Class name.

		if ( elements[c].edges )
		{
			values += 'edges' + c + ':{';
			beginReadyEdges( elements[c].edges );
			values += '},';
		}

		writeValue( 'x', elements[c].x ); 
		writeValue( 'y', elements[c].y );
		// log( 'elementType', elements[c].elementType ); // 元素的类型. "shape" 、 "text" 、 "instance" 或 "shapeObj" 
		writeValue( 'scaleX', elements[c].scaleX );
		writeValue( 'scaleY', elements[c].scaleY );
		writeValue( "matrix", elements[c].matrix );
		writeValue( "width", elements[c].width );
		writeValue( "height", elements[c].height );
		writeValue( "transformX", elements[c].transformX );
		writeValue( "transformy", elements[c].transformY );
		writeValue( "depth", elements[c].depth, true );

		// doc.selectNone( ); 
		// doc.selection = elements;
		// doc.enterEditMode('inPlace');
		// begineReadyLayers( getLayers( ), true, frame );
		// doc.exitEditMode();
		values += '}'

		if ( c != elements.length - 1 )
			values += ',';
	}
}

function begineReadyFrames( frames, disable, frame )
{
	var write = disable == null || disable == false;
	// log( 'frames length', frames.length )
	for ( var i = 0; i < frames.length; i ++ )
	{
		if ( frames[i].startFrame != i )
			continue;

		if ( frame != -1 && frame != i )
			continue;

		// log('the current frame', i );
		// logObject( 'frame', frames[i] )

		if ( write )
			values += 'frames' + i + ':{';

		beginReadyElement( frames[i].elements, i );

		values += '}'

		if ( write )
		{
			if ( frames[i].startFrame + frames[i].duration != frames.length )
				values += ',';
		}
	}
}

function begineReadyLayers( layers, disable, frame )
{
	var write = disable == null || disable == false;
	for ( var i = 0; i < layers.length; i ++ )
	{
		if ( write )
		{
			values += 'layers' + i + ':{';
			writeValue( "layercolor", layers[i].color );
		}

		begineReadyFrames( layers[i].frames, disable, frame );

		if ( write )
		{
			values += '}'

			if ( i != layers.length - 1 )
				values += ',';
		}
	}

}

begineReadyLayers( getLayers( ), false, -1 );
values += '}';
log( values )
// var filename = fl.browseForFileURL( "save", "Save file" );
// FLfile.write( filename, "ssssssssssss" );