// Make Connection
// var socket = io.connect('http://192.168.0.31:3000');
var socket = io.connect('http://localhost:3000');
// var socket = io.connect('http://172.20.10.11:3000');
// var socket = io.connect('http://192.168.178.39:3000');




// Setting the variable for the html-elements
var message = document.getElementById('message');
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),

    btn11 = document.getElementById('Button11'),
    btn21 = document.getElementById('Button21'),
    btn31 = document.getElementById('Button31'),
    btn12 = document.getElementById('Button12'),
    btn22 = document.getElementById('Button22'),
    btn32 = document.getElementById('Button32'),
    btn13 = document.getElementById('Button13'),
    btn23 = document.getElementById('Button23'),
    btn33 = document.getElementById('Button33'),

    output = document.getElementById('output'),
    feedback = document.getElementById('feedback'),
    round = document.getElementById('Round'),
    
    field = document.getElementById('field'),
    player1 = document.getElementById('player1'),
    player2 = document.getElementById('player2'),
    start = document.getElementById('start'),
    plop1var = document.getElementById('plop1var'),
    plop2var = document.getElementById('plop2var'),
    plop3var = document.getElementById('plop3var'),
    plop4var = document.getElementById('plop4var'),
    plop5var = document.getElementById('plop5var'),
    plop6var = document.getElementById('plop6var'),
    plop7var = document.getElementById('plop7var'),
    started = document.getElementById('started');

// Creating a matrix for the playground area with the value 0.
var spielfeld=new Array(3);
    for (i=0; i<3; i++)
       {
       spielfeld[i] = new Array(3);
       for (j=0;j<3;j++)
          {
          spielfeld[i][j]=0;
          }
       }
// Round counter
var player = 1;

// Emit events

// Emit the id of the player who clicked the start button to the server
start.addEventListener('click', function() {
socket.emit('Player', {
    id: socket.id,
  })
})

// Gets the information from the server from the clicked start button
socket.on('Player', function(data) {
    started.value = data.id;
    startClicks ++;
    able();
})

// Emit the information of our chat values to the server after clicking the send button
btn.addEventListener('click', function() {
  socket.emit('chat', {
    message: message.value,
    handle: handle.value,
  })
})

// Gets the information of the server for the message Box

socket.on('chat', function(data){
  feedback.innerHTML = '';
  message.value = '';
  output.innerHTML +='<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
})

// Emit the column number and the players id after clicking a game button
btn11.addEventListener('click', function() {
  socket.emit('Button', {
    Button: 'Button11',
    id: socket.id,
    spalte: 1,
    zeile: 1,
  })
})

btn21.addEventListener('click', function() {
  socket.emit('Button', {
    Button: 'Button21',
    id: socket.id,
    spalte: 2,
    zeile: 1,
  })
})

btn31.addEventListener('click', function() {
  socket.emit('Button', {
    Button: 'Button31',
    id: socket.id,
    spalte: 3,
    zeile: 1,
  })
})

btn12.addEventListener('click', function() {
  socket.emit('Button', {
    Button: 'Button12',
    id: socket.id,
    spalte: 1,
    zeile: 2,
  })
})

btn22.addEventListener('click', function() {
  socket.emit('Button', {
    Button: 'Button22',
    id: socket.id,
    spalte: 2,
    zeile: 2,
  })
})

btn32.addEventListener('click', function() {
  socket.emit('Button', {
    Button: 'Button32',
    id: socket.id,
    spalte: 3,
    zeile: 2,
  })
})

btn13.addEventListener('click', function() {
  socket.emit('Button', {
    Button: 'Button13',
    id: socket.id,
    spalte: 1,
    zeile: 3,
  })
})

btn23.addEventListener('click', function() {
  socket.emit('Button', {
    Button: 'Button23',
    id: socket.id,
    spalte: 2,
    zeile: 3,
  })
})

btn33.addEventListener('click', function() {
  socket.emit('Button', {
    Button: 'Button33',
    id: socket.id,
    spalte: 3,
    zeile: 3,
  })
})



// Gets the information of the server which column is chosen by the player
socket.on('Button', function(data) {
    if(player==1)
    {
      document.getElementById(data.Button).style.background = "red";
      spielfeld[data.spalte-1][data.zeile-1] = 1;
    }
    else
    {
      document.getElementById(data.Button).style.background = "blue";
      spielfeld[data.spalte-1][data.zeile-1] = 2;
    };

    set();



    // Fires the move-function with the right column

    // Sets the value of an invisible html box to the players id
    started.value = data.id;
    able();
})


// Listen for keyPressEvent if someone is writing a message
message.addEventListener('keypress', function(){
  socket.emit('typing', handle.value)
})

// Showing in the message box that someone is writing
socket.on('typing', function(data){
  feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
})

// Start Click counter

var startClicks = 0;

// Color pictures

var rot = new Image();
rot.src = "rot.gif";
var blau = new Image();
blau.src = "blau.gif";
var leer = new Image();
leer.src = "leer.gif";

var list = ["Button11", "Button21", "Button31",
    "Button12", "Button22", "Button32",
    "Button13", "Button23", "Button33"];

// activate the Game Buttons for the next player
able = function () {

    // If the setted started id isn't equal to the players id
    // AND the start button got hit more then 1 time the game buttons get activated

    for (var i = 0; i < list.length; i++) {
      document.getElementById(list[i]).disabled = true;
    }


    if(started.value != socket.id && startClicks >= 2){
      for (var i = 0; i < list.length; i++) {
        document.getElementById(list[i]).disabled = false;
      }
      if (player == 1) {
        round.style.color = "red";
      } else {
        round.style.color = "blue";
      }
      round.innerHTML = '<p><em>Du bist dran</em></p>';
    }
    else {
      round.innerHTML = '';
    }

    var counter = 0;
    for (var i = 0; i < list.length; i++) {
      if(document.getElementById(list[i]).style.background == "red"
    || document.getElementById(list[i]).style.background == "blue"){
        document.getElementById(list[i]).disabled = true;
        counter++;
      }
    }
    if(counter == 9){
      feedback.innerHTML = '<div id="newDiv"><input id="new" type="button" value="Neustart" onClick="location.reload();"></div>';
    }else{
      counter = 0;
    }
}

// This function gets fired if someone clicked a Game Button

set = function (){

    var i;
    var fertig=0;

    // Setting the location to the player who clicked

    check();
    if(player==1)
    {
      player=2;
    }
    else
    {
      player=1;
    }
}

// Check if someone won
check = function ()
{

  for (var i = 0; i < 3; i++) {
    if(spielfeld[0][i] == spielfeld[1][i]
      && spielfeld[1][i] ==  spielfeld[2][i]
      && spielfeld[0][i] != 0
      && spielfeld[1][i] != 0
      && spielfeld[2][i] != 0)
      {
        console.log("1");
        won();
       return;
    }
  }

  for (var i = 0; i < 3; i++) {
    if(spielfeld[i][0] == spielfeld[i][1]
      && spielfeld[i][1] ==  spielfeld[i][2]
      && spielfeld[i][0] != 0
      && spielfeld[i][1] != 0
      && spielfeld[i][2] != 0)
      {
        console.log("2");
        won();
       return;
    }
  }

  if(spielfeld[0][0] == spielfeld[1][1]
    && spielfeld[2][2] ==  spielfeld[1][1]
    && spielfeld[0][0] != 0
    && spielfeld[1][1] != 0
    && spielfeld[2][2] != 0)
    {
      console.log("3");
      won();
     return;
  }

  if(spielfeld[0][2] == spielfeld[1][1]
    && spielfeld[2][0] == spielfeld[1][1]
    && spielfeld[0][2] != 0
    && spielfeld[1][1] != 0
    && spielfeld[2][0] != 0)
    {
      console.log("4");
      won();
     return;
  }
}

// This function gets fired if someone won;

won = function()
{
  // Who won?
    if ( player == 1 ){
      // Set the right color and text
        feedback.innerHTML = '<div><p><em>Rot hat gewonnen.</em></p></div><br><div id="newDiv"><input id="new" type="button" value="Neustart" onClick="location.reload();"></div>';

    }else{
        feedback.innerHTML = '<div><p><em>Blau hat gewonnen.</em></p></div><br><div id="newDiv"><input id="new" type="button" value="Neustart" onClick="location.reload();"></div>';

    }
    // Disable the Game Buttons

    btn11.disabled = true;
    btn21.disabled = true;
    btn31.disabled = true;
    btn12.disabled = true;
    btn22.disabled = true;
    btn32.disabled = true;
    btn13.disabled = true;
    btn23.disabled = true;
    btn33.disabled = true;

    btn.disabled = true;
    message.disabled = true;
    // Reset the startClicks
    startClicks = 0;
}


$(document).ready(function () {
    // Hide the falling stones
    $("#plop1").hide(),
    $("#plop2").hide(),
    $("#plop3").hide(),
    $("#plop4").hide(),
    $("#plop5").hide(),
    $("#plop6").hide(),
    $("#plop7").hide()
})
    // $("#player1").click(function () {
    //     $(this).fadeOut(1000);
    // }),
    // $("#player2").click(function () {
    //   $(this).fadeOut(1000);
    // })

    // $("#Button1").click(function () {
    //   jump = 47 + plop1var.innerHTML * 75;
    //   $("#plop1").show().animate({
    //     paddingTop: "+=" + jump + "px",
    //   }).fadeOut(10).animate({
    //     paddingTop: "= 71px",
    //   });
    // }),
    // $("#Button2").click(function () {
    //   jump = 47 + plop2var.innerHTML * 75;
    //   $("#plop2").show().animate({
    //     paddingTop: "+=" + jump + "px",
    //   }).fadeOut(10).animate({
    //     paddingTop: "= 71px",
    //   });
    //
    // }),
    // $("#Button3").click(function () {
    //   jump = 47 + plop3var.innerHTML * 75;
    //   $("#plop3").show().animate({
    //     paddingTop: "+=" + jump + "px",
    //   }).fadeOut(10).animate({
    //     paddingTop: "= 71px",
    //   });
    //
    // }),
    // $("#Button4").click(function () {
    //   jump = 47 + plop4var.innerHTML * 75;
    //   $("#plop4").show().animate({
    //     paddingTop: "+=" + jump + "px",
    //   }).fadeOut(10).animate({
    //     paddingTop: "= 71px",
    //   });
    //
    // }),
    // $("#Button5").click(function () {
    //   jump = 47 + plop5var.innerHTML * 75;
    //   $("#plop5").show().animate({
    //     paddingTop: "+=" + jump + "px",
    //   }).fadeOut(10).animate({
    //     paddingTop: "= 71px",
    //   });
    //
    // }),
    // $("#Button6").click(function () {
    //   jump = 47 + plop6var.innerHTML * 75;
    //   $("#plop6").show().animate({
    //     paddingTop: "+=" + jump + "px",
    //   }).fadeOut(10).animate({
    //     paddingTop: "= 71px",
    //   });
    //
    // }),
    // $("#Button7").click(function () {
    //   jump = 47 + plop7var.innerHTML * 75;
    //   $("#plop7").show().animate({
    //     paddingTop: "+=" + jump + "px",
    //   }).fadeOut(10).animate({
    //     paddingTop: "= 71px",
    //   });
    // })
