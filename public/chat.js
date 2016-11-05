window.onload = function() {

    var messages = [];
    var socket = io.connect('http://localhost:3700');
    var field = document.getElementsByClassName("field");
    var sendButton = document.getElementsByClassName("send");
    var content = document.getElementById("content");
     var name = document.getElementById("name");
    
    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
                html += messages[i].message + '<br />';
            }
            content.innerHTML = html;
        } else {
            console.log("There is a problem:", data);
        }
    });

    sendButton[0].onclick = function() {
        if(name.value == "") {
            alert("Please type your name!");
        } else {
            var text = field[0].value;
            socket.emit('send', { message: text, username: name.value });
        }
    };

}