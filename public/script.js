var socket = io.connect();

function addMessage(msg, username) {
    $("#chatEntries").append('<div class="message"><p>' + username + ' : ' + msg + '</p></div>');
}

function scrollDown(element) {
    var objDiv = document.getElementById(element);
    objDiv.scrollTop = objDiv.scrollHeight;
}

function sentMessage() {
    if ($('#messageInput').val() != "") 
    {
        socket.emit('message', $('#messageInput').val());
        addMessage($('#messageInput').val(), "Me", new Date().toISOString(), true);
        scrollDown('chatEntries');
        $('#messageInput').val('');
    }
}

function setUsername(username) {
    socket.emit('setUsername', username);
    $('#chatControls').show();
}

socket.on('message', function(data) {
    addMessage(data['message'], data['username']);
    scrollDown('chatEntries');
});

$(function() {
    var username = prompt("Please enter your name:");
    if (username != "" && username !== null){
        $("#messageInput").focus();
        setUsername(username);
        $("#submit").click(function() {sentMessage();});
        $("#messageInput").keypress(function(e) {
            if (e.keyCode == '13') {
                sentMessage();
            }
        });
    }
    else {
        location.reload();
    }
});

