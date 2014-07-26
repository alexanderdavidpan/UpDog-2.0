var socket = io.connect();

function addMessage(msg, pseudo) {
    $("#chatEntries").append('<div class="message"><p>' + pseudo + ' : ' + msg + '</p></div>');
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

function setPseudo(psuedo) {
    socket.emit('setPseudo', psuedo);
    $('#chatControls').show();
    $('#pseudoInput').hide();
    $('#pseudoSet').hide();
}

socket.on('message', function(data) {
    addMessage(data['message'], data['pseudo']);
    scrollDown('chatEntries');
});

$(function() {
    var psuedo = prompt("Please enter your name:");
    if (psuedo != "" && psuedo !== null){
        setPseudo(psuedo);
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

