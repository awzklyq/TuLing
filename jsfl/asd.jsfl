function log( )
{
	var str = "";
	for ( var i = 0; i < arguments.length; i ++ )
	{
		if ( i != 0 )
			str += ", ";
		str += arguments[i];
	}

	flash.trace( str );
}

var doc = fl.getDocumentDOM( );
var timeline = doc.getTimeline( );
// var allframes = timeline.selectAllFrames( );
var layers = timeline.layers;

log( 'fla name', doc.name );
log( 'layers length', layers.length );
doc.selectAll();
var theElems = doc.selection;

function beginReadyElement( elements )
{
	for (var c = 0; c < elements.length; c++ ) 
	{
		log( 'name', elements[c].name ); // Instance name.
		log( 'libraryItem.name', elements[c].libraryItem.name ); // Class name.
		log( 'x', elements[c].x ); 
		log( 'y', elements[c].y );
		log( 'elementType', elements[c].elementType ); // 元素的类型. "shape" 、 "text" 、 "instance" 或 "shapeObj" 
		log( 'scaleX', elements[c].scaleX );
		log( 'scaleY', elements[c].scaleY );
		log( "matrix", elements[c].matrix.a, elements[c].matrix.b, elements[c].matrix.c, elements[c].matrix.d, elements[c].matrix.tx, elements[c].matrix.ty );
		log( "width, height", elements[c].width, elements[c].height );
		log( "transformX, transformy", elements[c].transformX, elements[c].transformY );
		log( "depth", elements[c].depth );
	}

	if ( elements.length > 0 )
		log( "end beginReadyElement \n" );
}

function begineReadyFrames( frames )
{
	for ( var i = 0; i < frames.length; i ++ )
	{
		log('frame name', frames[i].name );
		beginReadyElement( frames[i].elements );
	}

	if ( frames.length > 0 )
		log( "end begineReadyFrames \n" );
}

function begineReadyLayers( layers )
{
	for ( var i = 0; i < layers.length; i ++ )
	{
		begineReadyFrames( layers[i].frames );
	}

	if ( layers.length > 0 )
		log( "end begineReadyLayers \n" );
}

begineReadyLayers( layers );
// beginReadyElement( theElems );