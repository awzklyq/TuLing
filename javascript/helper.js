if ( window.webkitCancelAnimationFrame )
{
	location.href = "main.html";
}
else
{
	document.write( "<frameset cols = \"20%, 36%\">" );
	document.write( "<frame src = \"help.html\" name = \"help\">" );
	document.write( "<frame src = \"main.html\" name = \"index\">" );
	document.write( "</frameset>" );
}