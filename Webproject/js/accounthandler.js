var newSocket = new WebSocket("ws://localhost:8765/acc/ws/");
var notherSocket = new WebSocket("ws://localhost:8765/login/ws/");
var loggedInUser;
var logincounter;

var button_login = document.getElementById("mod");
var button_logout = document.getElementById("loggeduserbutton");
document.getElementById("loggeduserbutton").textContent = localStorage.user;

if (logincounter === 0) {
    button_logout.style.display = "hide";
    button_login.style.display = "block";

} else if (logincounter ===1) {

    button_logout.style.display = "block";
    button_login.style.display = "none";
}
function createUser() {


    var newuser_name = document.getElementById("register_username").value;
    var newuser_password = document.getElementById("register_password").value;
    var encoded_newuser_pass = window.btoa(newuser_password);
    var newuser_json = {
        "name": newuser_name,
        "password": encoded_newuser_pass,
        "pongrounds": 0,
        "pongwins": 0,
        "maawins": 0,
        "maarounds": 0,
        "4winswins": 0,
        "4winsrounds": 0,
        "ticwins": 0,
        "ticrounds": 0,
    };
    newSocket.send(JSON.stringify(newuser_json));
    console.log("user created");


}

function getUser() {


    var username = document.getElementById("login_username").value;
    var password = document.getElementById("login_password").value;
    var encodedpass = window.btoa(password);
    var user_json = {
        "name": username,
        "password": encodedpass,
    };
    notherSocket.send(JSON.stringify(user_json));

    notherSocket.onmessage = function (evt) {
        loggedInUser = evt.data
        console.log(loggedInUser)
        localStorage.user = loggedInUser;
        logincounter = 1;
        console.log(logincounter)
    }

}




// logout funktion.
function logOut() {
    logincounter = 0;
   localStorage.clear();
   location.reload();

}



