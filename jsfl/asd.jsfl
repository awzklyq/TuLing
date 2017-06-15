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
var timeline = doc.getTimeline( );
var layers = timeline.layers

log( 'fla name', doc.name );
log( 'layers length', layers.length );

var flaname = doc.name;
var filename = flaname.substring( 0, flaname.indexOf( '.fla' ) );
var values = 'SWFGroup[\'' + filename + '\']={';

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

var bmpitems = new Array( );
function beginReadyElement( elements )
{
	for (var c = elements.length - 1; c >= 0; c -- ) 
	{
		values += 'elements' + c + ':{';

		// logObject( 'elements' + c, elements[c], true );
		writeValue( 'name', elements[c].name ); // Instance name.
		writeValue( 'order', c ); // Instance name.
		writeValue( 'type', elements[c].elementType ); // shape text instance shapeObj shapeObj
		// log('top', elements[c].libraryItem.name, elements[c].top, c)
		if ( elements[c].libraryItem )
			writeValue( 'typename', elements[c].libraryItem.name ); // Class name.

		if ( elements[c].edges )
		{
			values += 'edges' + c + ':{';
			beginReadyEdges( elements[c].edges );
			values += '},';
		}

		var item = elements[c].libraryItem;
		// "shape" 、 "text" 、 "instance" 或 "shapeObj" 。 "shapeObj" 
		if ( elements[c].elementType == "instance" )
		{
			// symbol 、 bitmap 、 embedded video 、 linked video 、 video 和 compiledclip
			writeValue( 'instanceType', elements[c].instanceType );
			
			if ( elements[c].instanceType == "symbol" )
			{
				writeValue( "blendMode", elements[c].blendMode );
				if ( item.timeline.layers.length > 0 )
				{
					values += 'layers:{';
					begineReadyLayers( item.timeline.layers );
					values += '},';
				}
				// trantimeline(item.timeline).layers
			}
			else if ( elements[c].instanceType == "bitmap" )
			{
				bmpitems.push( item );
			}
			else if ( elements[c].instanceType == "embedded video" )
			{
				
			}
			else if ( elements[c].instanceType == "linked video" )
			{
				
			}
			else if ( elements[c].instanceType == "compiledclip" )
			{
				
			}
		}
		else if ( elements[c].elementType == "text" )
		{
			
		}
		else if ( elements[c].elementType == "shape" )
		{
			
		}

		writeValue( 'x', elements[c].x ); 
		writeValue( 'y', elements[c].y );
		// log('isGroup', elements[c].isGroup );
		// log( 'elementType', elements[c].elementType ); // 元素的类型. "shape" 、 "text" 、 "instance" 或 "shapeObj" 
		// log( 'instanceType', elements[c].instanceType );
		writeValue( 'scaleX', elements[c].scaleX );
		writeValue( 'scaleY', elements[c].scaleY );
		writeValue( "matrix", elements[c].matrix );
		writeValue( "width", elements[c].width );
		writeValue( "height", elements[c].height );
		writeValue( "transformX", elements[c].transformX );
		writeValue( "transformy", elements[c].transformY );

		writeValue( "depth", elements[c].depth, true );
		values += '}'

		if ( c != 0 )
			values += ',';
	}
}

function begineReadyFrames( frames )
{
	for ( var i = 0; i < frames.length; i ++ )
	{
		if ( frames[i].startFrame != i )
			continue;

		values += 'frames' + i + ':{';
		writeValue( "labelType", frames[i].labelType );
		writeValue( "name", frames[i].name );
		writeValue( "startFrame", frames[i].startFrame );
		writeValue( "endFrame", frames[i].startFrame + frames[i].duration );
		writeValue( "duration", frames.length );
		beginReadyElement( frames[i].elements, i );

		values += '}'


		if ( frames[i].startFrame + frames[i].duration != frames.length )
			values += ',';
	}
}

function begineReadyLayers( layers )
{
	// layers.reverse( );
	for ( var i = 0; i < layers.length; i ++ )
	{

		values += 'layers' + i + ':{';
		writeValue( "layercolor", layers[i].color );

		begineReadyFrames( layers[i].frames );

		values += '}'

		if ( i != layers.length - 1 )
			values += ',';
	}

}

begineReadyLayers( layers );
values += '}';
// log( values )
var folder = fl.browseForFolderURL("Select a folder.", "file:///C|/Users/liuyongqi/Desktop/jsfl");
FLfile.write( folder + '/' + filename + '.js' , values );

for ( var i in bmpitems )
{
	bmpitems[i].exportToFile( folder + '/' + bmpitems[i].name )
}