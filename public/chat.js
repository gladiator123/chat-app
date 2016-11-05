window.onload = function() {

    var messages = [];
    var socket = io.connect('http://localhost:3700');
    var field = document.getElementsByClassName("field");
    var sendButton = document.getElementsByClassName("send");
    var content = document.getElementById("content");
    
    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data.message);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += messages[i] + '<br />';
            }
            content.innerHTML = html;
        } else {
            console.log("There is a problem:", data);
        }
    });

    sendButton[0].onclick = function() {
        var text = field[0].value;
        socket.emit('send', { message: text });
    };

}