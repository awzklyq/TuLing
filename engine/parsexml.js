// File.
function XMLFile( name )
{
	if (window.XMLHttpRequest)
        this.xmlhandle = new XMLHttpRequest();
	// code for IE6, IE5
	else
        this.xmlhandle = new ActiveXObject("Microsoft.XMLHTTP");

	console.assert( this.xmlhandle != null, "this.xmlhandle is null!" );
}