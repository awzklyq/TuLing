window.logEnable = true;

var temp = new ArrayEx( );

// temp.insertBinary( {index:0}, 0, temp.length, 'index' );
// temp.insertBinary( {index:10}, 0, temp.length, 'index' );
// temp.insertBinary( {index:5}, 0, temp.length, 'index' );
// temp.insertBinary( {index:29}, 0, temp.length, 'index' );
// temp.insertBinary( {index:17}, 0, temp.length, 'index' );
// temp.insertBinary( {index:4}, 0, temp.length, 'index' );
// temp.insertBinary( {index:99}, 0, temp.length, 'index' );
// temp.insertBinary( {index:20}, 0, temp.length, 'index' );
// temp.insertBinary( {index:44}, 0, temp.length, 'index' );

 // for ( var i = 0; i < temp.length; i ++ )
	 // log( i, temp[i].index );
 
temp.insertBinary( 0, 0, temp.length );
temp.insertBinary( 10, 0, temp.length );
temp.insertBinary( 5, 0, temp.length );
temp.insertBinary( 29, 0, temp.length );
temp.insertBinary( 17, 0, temp.length );
temp.insertBinary( 4, 0, temp.length );
temp.insertBinary( 99, 0, temp.length );
temp.insertBinary( 20, 0, temp.length );
temp.insertBinary( 44, 0, temp.length );

 for ( var i = 0; i < temp.length; i ++ )
	 log( i, temp[i] );
