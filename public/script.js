var socket = io.connect();

function addMessage(msg, pseudo) {
    $("#chatEntries").append('<div class="message"><p>' + pseudo + ' : ' + msg + '</p></div>');
}