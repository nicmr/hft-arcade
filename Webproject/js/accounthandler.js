var newSocket = new WebSocket("ws://localhost:8765/acc/ws/");
var notherSocket = new WebSocket("ws://localhost:8765/login/ws/");
var loggedInUser;


function createUser() {


    var newuser_name = document.getElementById("register_username").value;
    var newuser_password = document.getElementById("register_password").value;
    var encoded_newuser_pass = window.btoa(newuser_password);
    var newuser_json = {"name": newuser_name, "password": encoded_newuser_pass};
    newSocket.send(JSON.stringify(newuser_json));
    console.log("user created");


}

function getUser() {


        var username = document.getElementById("login_username").value;
        var password = document.getElementById("login_password").value;
        var encodedpass = window.btoa(password);
        var user_json = {"name": username, "password": encodedpass};
        notherSocket.send(JSON.stringify(user_json));

        notherSocket.onmessage = function (evt) {
            loggedInUser = evt.data
            console.log(loggedInUser)
            localStorage.user = loggedInUser;
        }



}

function loggedUser() {
    document.getElementById("storage").innerHTML = localStorage.user;
}
// logout funktion.
function logOut() {

    localStorage.clear();

}



