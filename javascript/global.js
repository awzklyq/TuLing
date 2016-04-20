/*
	link:
	Global.wTransform
*/
function Global( )
{}

Global.matrix = new Array( );

Global.setWorldTransform = function( transform )
{
	if ( Global.wTransform != null )
	{
		delete Global.wTransform;
	}

	Global.wTransform = transform;
}

Global.pushMatrix = function( transform )
{
	Global.matrix.push( transform );
}

Global.popMatrix = function( )
{
	Global.matrix.pop( );
}

Global.getCurrentMatrix = function( transform )
{
	if ( Global.matrix.length > 0 )
	{
		if ( Global.wTransform != null )
		{
			var mat = new Matrix( Global.matrix[Global.matrix.length - 1] );
			mat:mulRight( Global.wTransform );
			return mat;
		}

		return Global.matrix[Global.matrix.length - 1];
	}

	if ( Global.wTransform != null )
	{
		return Global.wTransform;
	}

	return null;
}

Global.bindMatrixToContext = function( context, matrix )
{
	if ( context != null && matrix != null )
	{
		var mat = matrix.mat;
		context.setTransform( mat[0], mat[1], mat[3], mat[4], mat[6], mat[7] );
	}
}

Global.FONT = "60px Georgia";
Global.FILLSTYLE = 0x00000000;
Global.STROKESTYLE = 0x00000001;

Global.ALLSTYLE = 0x00000002;

// Global.LImage.typeid = 0x00000001;