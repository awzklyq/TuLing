var net = require("net")

var server = net.createServer();

// server.on("connection", function(socket)
// {
	// socket.on("data", function(data){
		// socket.write("ni hao!");
	// })

	// socket.on("end", function(data){
		// console.log("ni gun!");
	// })

	// socket.write("in gun");
// })

server.on("data", function(data){
		console.log("ni hao!");
	})

	server.on("end", function(data){
		console.log("ni gun!");
	})

server.listen(8080, function( )
{
	console.log("jiba!");
});
	
console.log("test");

// var http = require("http");

// var server = http.createServer(function(req, res){
	// console.log("http createServer!!");
	// res.writeHead(200, {"Content-Type":"text/plain"});
	// res.end("hello world");
// });

// console.log("start listen!!");
// server.listen(8080, function( )
// {
	// console.log("listening!!");
// });
// console.log("end listen!!");

// server.on('upgrade', function(req, socket, upgradeHead){
	// console.log("trigger upgrade!!");
	// var head = new Buffer(upgradeHead.length);
	// upgradeHead.copy(head);
	// var key = req.heads["sec-websocket-key"];

	// var crypto = require("crypto");
	// var shasum = crypto.createHash("sha1");
	// key = shasum.update(key + "258EAFA5-E914-47DA-95CA-C5ABoDC85B11").digest("base64");
	// var headrs = [
	// "HTTP/1.1 101 Switching Protocols",
	// "Upgrade: Websocket",
	// "Connection: Upgrade",
	// "Sec-Websocket-Accept: " + key,
	// "Sec-Websocket-Protocol: " + protocol
	// ];

	// socket.setNoDelay(true);
	// socket.write(headers.concat(",").join('\r\n'));

	// var websocket = new WebSocket( );
	// websocket.setSocket(socket);
// });

// server.on('data', function(){
	// console.log("trigger upgrade!!");
// });
