var express = require('express');
var app=express();
var http = require('http').Server(app); //http.createServer() only does one thing: it calls http.Server() internally and returns the resulting instance.

var io = require('socket.io')(http);
//Socket.IO is composed of two parts:
//A server that integrates with (or mounts on) the Node.JS HTTP Server: socket.io
//A client library that loads on the browser side: socket.io-client

var path = require('path');
 
// Initialize appication with route / (that means root of the application)
app.get('/', function(req, res){
  //var express=require('express');
  app.use(express.static(path.join(__dirname))); //__dirname is always the directory in which the currently executing script resides,
                                                // while '.' gives you the directory from which you ran the node command in your terminal window
  res.sendFile(path.join(__dirname,'../MyChat','index.html'));
})
 
// Register events on socket connection or listening on the connection event for incoming sockets.
io.on('connection', function(socket){
  socket.on('chatMessage', function(from, msg){
    io.emit('chatMessage', from, msg); //events chatMessage and notifyUser are used to listen the requests from events emitted by client side scripts. 
                                      //and based on that server emits the respective events which are being then listen by client side scripts.
  });
  socket.on('notifyUser', function(user){
    io.emit('notifyUser', user);
  });
});
 
// Listen application request on port 3000
http.listen(3000, function(){
  console.log('listening on *:3000');
});

