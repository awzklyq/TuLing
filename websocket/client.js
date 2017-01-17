var net = require("net")

var client = net.connect({port:8080}, function(){
	console.log("asd!");
	client.write("world");
});

client.on("data", function(data){
	console.log(data.toString());
	client.end();
})

client.on("end", function(data){
	console.log("client stop!");
})

