// var mouse = {mousex = 0, mousey = 0};
// _app.onMouseMove(function(x, y)
	// if _sys.isKeyDown(_System.MouseMiddle) then
		// if _sys.isKeyDown(_System.KeyAlt) then
			// window.camera.movePhi(-(mouse.mousex - x) * 0.005)
			// window.camera.moveTheta(-(mouse.mousey - y) * 0.005)
		// else
			// var dir = Vector3.sub(window.camera.look, window.camera.eye)
			// var vx = Vector3.cross(dir,  window.camera.up).normalize()
			// var vy = Vector3.cross(dir, vx).normalize()
			// var nearx = Vector3.mul(vx, -(mouse.mousex - x) * 0.001)
			// var neary = Vector3.mul(vy,  (mouse.mousey - y) * 0.001)
			// var movex = Vector3.mul(nearx, dir.magnitude() / window.camera.viewNear)
			// var movey = Vector3.mul(neary, dir.magnitude() / window.camera.viewNear)
			// var move = Vector3.add(movex , movey)
			// window.camera.moveEye(window.camera.eye.x + move.x, window.camera.eye.y + move.y, window.camera.eye.z + move.z)
			// window.camera.moveLook(window.camera.look.x + move.x, window.camera.look.y + move.y, window.camera.look.z + move.z)
		// end
	// end

	// mouse.mousex = x
	// mouse.mousey = y
// end)

// _app.onMouseWheel(function(d)
	// window.camera.moveRadius(d * -0.1 * window.camera.radius)
// end)
if ( window.camera == null )
	window.camera = new Camera( );

function mouseDown( b, x, y )
{
	return true;
}

window.onMouseDown.push(mouseDown);

var mouse = {mousex: 0, mousey: 0};
var mouseMove = function( x, y )
{
	// log(System.isKeyDown(System.MouseMiddle))
	if ( System.isKeyDown(System.MouseMiddle) )
	{
		if ( System.isKeyDown(System.KeyAlt) )
		{
			window.camera.movePhi(-(mouse.mousex - x) * 0.0001)
			window.camera.moveTheta(-(mouse.mousey - y) * 0.0001)
		}
		else
		{
			var dir = Vector3.ssub(window.camera.look, window.camera.eye)
			var vx = Vector3.scross(dir,  window.camera.up).normalize()
			var vy = Vector3.scross(dir, vx).normalize()
			var nearx = Vector3.smul(vx, -(mouse.mousex - x) * 0.001)
			var neary = Vector3.smul(vy,  (mouse.mousey - y) * 0.001)
			var movex = Vector3.smul(nearx, dir.magnitude() / window.camera.near)
			var movey = Vector3.smul(neary, dir.magnitude() / window.camera.near)
			var move = Vector3.sadd(movex , movey)
			window.camera.moveEye(window.camera.eye.x + move.x, window.camera.eye.y + move.y, window.camera.eye.z + move.z)
			// window.camera.moveLook(window.camera.look.x + move.x, window.camera.look.y + move.y, window.camera.look.z + move.z)
		}
	}

	mouse.mousex = x
	mouse.mousey = y
}

window.onMouseMove.push(mouseMove);

log("camera look", window.camera.look.x, window.camera.look.y, window.camera.look.z )
log("camera eye", window.camera.eye.x, window.camera.eye.y, window.camera.eye.z )

window.camera.radiuslimit.y = 100;
var mousewheel = function( d )
{
	log("move redius", window.camera.getRadius( ), d )
	log("camera look", window.camera.look.x, window.camera.look.y, window.camera.look.z )
	log("camera eye", window.camera.eye.x, window.camera.eye.y, window.camera.eye.z )
	window.camera.moveRadius( d * -0.1 * window.camera.getRadius( ) );
	return true;
}

window.onMouseWheel.push(mousewheel);