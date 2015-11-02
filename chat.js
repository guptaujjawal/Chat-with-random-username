var socket = io(); //Initialize Socket IO 
function submitfunction(){ //On form submit get the value of input box and emit the chatMessage event along with text message.
  var from = $('#user').val();
  var message = $('#m').val();
  if(message != '') {
  socket.emit('chatMessage', from, message);
}
$('#m').val('').focus();
  return false;
}
 
function notifyTyping() { //On keypress event of input box emit the notifyUser along with name of user to display “xyz is typing” message to the user.
  var user = $('#user').val();
  socket.emit('notifyUser', user);
}
 
socket.on('chatMessage', function(from, msg){ //Register the event chatMessage which listens the request from server when user send chat message. 
                                              //Append chat message to the list (<ul>)
  var me = $('#user').val();
  var color = (from == me) ? 'green' : '#009afd';
  var from = (from == me) ? 'Me' : from;
  $('#messages').append('<li><b style="color:' + color + '">' + from + '</b>: ' + msg + '</li>');
});
 
socket.on('notifyUser', function(user){ //Register the event notifyUser which listens the request from server when user start typing chat message. 
                                        //Display “xyz is typing” message to the user.
  var me = $('#user').val();
  if(user != me) {
    $('#notifyUser').text(user + ' is typing ...');
  }
  setTimeout(function(){ $('#notifyUser').text(''); }, 10000);;
});
 
$(document).ready(function(){ //On document.ready function create unique user name and emit chatMessage event to send welcome message.
  var name = makeid();
  $('#user').val(name);
  socket.emit('chatMessage', 'System', '<b>' + name + '</b> has joined the discussion');
});
 
function makeid() { //Function makeid() is used to generate unique user name to be display.
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 
  for( var i=0; i < 5; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
