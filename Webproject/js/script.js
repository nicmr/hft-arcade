
(function ($) {
    $.fn.serializeFormJSON = function () {

        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
})(jQuery);

$('form').submit(function (e) {
    e.preventDefault();
    var data = $(this).serializeFormJSON();
    console.log(data);

    /* Object
        email: "value"
        name: "value"
        password: "value"
     */
});



var newuser = { "name":"John", "password":"12345"}





function wsconnect(){
    //send data to server
    var uuid = 123 //unused
    var messagecount = 0
    console.log("attempting to connect...")
    var exampleSocket = new WebSocket("ws://localhost:8765/ws/")


    exampleSocket.onopen = function(){
        console.log("connection opened")
        exampleSocket.send(newuser)
        console.log(newuser)

    }



    //log reply from server and close connection
    exampleSocket.onmessage = function (event) {
        messagecount += 1
        console.log("received message from server")
        console.log("eventdata: " + event.data)


        if(messagecount>=5){
            exampleSocket.close()
            console.log("websocket closed")
        }
    }
}

