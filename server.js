var http = require("http"),
    fs = require("fs"),
    path = require('path'),
    url = require('url');

/**
 * Actual Server Code
 */

var serverPort = 8888;

var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "csv": "text/csv",
    "css": "text/css"};

var server = http.createServer(function(req, res) {

//digest.apply(req, res, function(username) {

  var uri = url.parse(req.url).pathname;
  console.log("uri = "+unescape(uri));

  if(uri == "/"){ //if request for homepage, then serve index.html
    res.writeHead(200, {'Content-Type': 'text/html'});
  	var contents = fs.readFileSync("./index.html", "UTF-8");
  	res.end(contents);
		return;
  } else{ //else server the appropriate file
		var filename = path.join(process.cwd(), unescape(uri));
		var stats;

		try {
		  stats = fs.lstatSync(filename); // throws if path doesn't exist
		} catch (e) {
		  res.writeHead(404, {'Content-Type': 'text/plain'});
		  res.write('404 Not Found\n'+uri+' doesnt exist on server.');
		  res.end();
		  return;
		}

		if (stats.isFile()) {
		  // path exists, is a file
		  var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
		  res.writeHead(200, {'Content-Type': mimeType} );

		  var fileStream = fs.createReadStream(filename);
		  fileStream.pipe(res);
		} else if (stats.isDirectory()) {
		  // path exists, is a directory
		  console.log("path is a directory");
		  res.writeHead(200, {'Content-Type': 'text/plain'});
		  res.write('Index of '+uri+'\n');
		  res.end();
		} else {
		  // Symbolic link, other?
		  // TODO: follow symlinks?  security?
		  console.log("Symbolic link, other? follow symlinks?  security?");
		  res.writeHead(500, {'Content-Type': 'text/plain'});
		  res.write('500 Internal server error\n');
		  res.end();
		}
	}
//});
}).listen(serverPort, function(){
  
  console.log("Server listening on port "+serverPort);
});

/**
 * Server and socket started, below are all my listeners and emitters
*/

var io = require('socket.io').listen(server);
var updateio = require('socket.io').listen(8000);

var receivedSerial;
 
io.sockets.on('connection', function(socket){
  console.log("Socket connected"); 
  io.sockets.emit('connected', 123);
});

updateio.sockets.on('connection', function(socket){
  console.log("Rpi Socket connected"); 
  updateio.sockets.emit('connected', 123);


 	socket.on('data', function(data) {
    		//console.log("Client sent us message: " + data);

		received= new Buffer(data);
		received= received.toString();
		console.log("\nReceived data:\n",received)
		io.sockets.emit('coordinates', received);
     });
  

});
 



 
