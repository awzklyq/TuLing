function File( )
{
	this.file = document.createElement("input");
	this.file.setAttribute("type", "file");
	this.file.setAttribute("id", "file");
	this.file.setAttribute("width", 300);
	this.file.setAttribute("height", 80);
	document.body.insertBefore( this.file, document.getElementById('canvas') );
	var self = this;
	this.file.onchange = function( event )
	{
		if ( self.loaded != null  && Global.isFunction( self.loaded ) )
			self.loaded( event.target.files );
	}

	this.loadFiled = function( func )
	{
		if ( this.loaded != null )
			delete this.loaded;

		this.loaded = func;
	}

	this.close = function( )
	{
		document.body.removeElement( this.file );
	}
}

function LFileReader( )
{
	this.data = "";
	var self = this;
	this.readFile = function( file, type )
	{
		if ( this.reader != null )
			delete this.reader

		this.reader = new FileReader( );
		var self = this;
		this.reader.onload = function( event )
		{
			self.data = event.target.result;

			if ( self.loaded != null && Global.isFunction( self.loaded ) )
				self.loaded( );
		}

		if ( type == "txt" )
			this.reader.readAsText( file );

	}

	this.onLoad = function( func )
	{
		if ( this.loaded != null )
			delete this.loaded;

		this.loaded = func;
	}

	this.close = function( )
	{
		if ( this.reader != null )
			delete this.reader
	}
}