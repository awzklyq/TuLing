window.SWFGroup = {}

function SWFManager( name, func )
{
	UISystem.removeUI( this );
	this.type = "SWF";

	if ( window.SWFGroup[name] == null )
		Global.loadJSFile( name );

	this.swfdata = window.SWFGroup[name];

	this.loadLayers = function( layers, ui )
	{
		for ( var i in layers )
		{
			if ( StringEx.findSubString( i, "layer" ) != -1 )
				this.loadFrames( layers[i], ui );
		}
	}
	
	this.loadFrames = function( layer, ui )
	{
		for ( var i in layer )
		{		
			if ( StringEx.findSubString( i, "frame" ) != -1 )
				this.loadElements( layer[i], ui );
		}
	}
	
	this.loadElements = function( frame, ui )
	{
		var startFrame = frame.startFrame;
		var endFrame = frame.endFrame;
		var duration = frame.duration;
		for ( var i in frame )
		{
			if ( StringEx.findSubString( i, "element" ) == -1 )
				continue;

			var e = frame[i];

			// Load ui data from instance.
			if ( e.type == 'instance' )
			{
				var mc = null;
				if ( e.instanceType == 'symbol' )
				{
					if ( e.typename == 'Button' )
					{
						mc = new Button( 0, 0, e.width, e.height , '', e.name );
					}
					else
					{
						mc = new UIView( 0, 0, e.width, e.height, e.name );
					}
				}
				else if ( e.instanceType == 'compiled clip' )
				{
					if ( e.typename == 'Button' )
					{
						mc = new Button( 0, 0, e.width, e.height , e.label || '', e.name );
					}
				}
				else if ( e.instanceType == 'bitmap' )
				{
					var res = e.typename;
					mc = new UIView( 0, 0, e.width, e.height, e.name );
					mc.setImage( new LImage( res ) );
				}

				if ( mc != null )
				{
					mc._depth = e.depth;
					mc._order = e.order;
					mc.typename = e.typename;
					mc.mat.mat[0] = e.matrix.a;
					mc.mat.mat[1] = e.matrix.b;
					mc.mat.mat[3] = e.matrix.c;
					mc.mat.mat[4] = e.matrix.d;
					mc.mat.mat[6] = e.matrix.tx;
					mc.mat.mat[7] = e.matrix.ty;

					mc.interval = 1;

					mc.startFrame = startFrame;
					mc.endFrame = endFrame;
					mc.duration = duration;
					mc.tick = 0;
					mc.swf = true;
					mc.needUpdate = false;
					mc.loop = true;
					if ( Matrix.isIdentity( mc.mat ) ) 
					{
						mc.x = e.x;
						mc.y = e.y;
					}
					else
					{
						mc.useMatrix = true;
					}

					ui.addUI( mc, true );
					if ( e.layers != null )
					{
						this.loadLayers( e.layers, mc );
					}
				}
			} // end instance.
			else
			{
				
			}
		}
	}

	this.tick = 0;
	this.startFrame = 0;
	this.endFrame = 0;
	this.duration = 0;
	this.needUpdate = false;
	this.loop = true;
	this.swf = true;
	this.loadLayers( this.swfdata, this );
	// TODO..
	this.reverse( );

	this.updateFrames( );
	
	UISystem.addUI( this );
}

SWFManager.prototype = new UIView( );