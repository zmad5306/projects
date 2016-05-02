var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	//socket.broadcast.emit('hi');
	//io.emit('chat message', 'user connected')
  	console.log('a user connected');

	socket.on('disconnect', function(){
		//io.emit('chat message', 'user disconnected')
		console.log('user disconnected');
	});

	socket.on('chat message', function(msg){
		console.log('message: ' + msg);
		socket.broadcast.emit('chat message', msg);
  	});

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});