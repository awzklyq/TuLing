window.logEnable = true;
window.context.fillStyle = "rgba(120,255,255,10)";
var color = Math.getRGBAFromStr( window.context.fillStyle );
log(color.a, color.r, color.g, color.b)
log(window.context.fillStyle )