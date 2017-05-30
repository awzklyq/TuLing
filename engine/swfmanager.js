window.SWFGroup = {}

function SWFManager( name, func )
{
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
			{
				this.loadElements( layer[i], ui );
				break;
			}
		}
	}
	
	this.loadElements = function( frame, ui )
	{
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
						mc = new Button( e.x, e.y, e.width, e.height , '', e.name );
					}
					else
					{
						mc = new UIView( e.x, e.y, e.width, e.height, e.name );
					}
				}
				else if ( e.instanceType == 'bitmap' )
				{
					var res = e.typename;
					mc = new UIView( e.x, e.y, e.width, e.height, e.name );
					mc.setImage( new LImage( res ) );
				}

				if ( mc != null )
				{
					mc.depth = e.depth;
					ui.addUI( mc );

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

	this.loadLayers( this.swfdata, this );
}

SWFManager.prototype = new UIView( );