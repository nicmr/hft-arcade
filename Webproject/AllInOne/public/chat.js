// Make Connection
// var socket = io.connect('http://192.168.0.31:3000');
var socket = io.connect('http://localhost:3000');
// var socket = io.connect('http://172.20.10.11:3000');
// var socket = io.connect('http://192.168.178.39:3000');




// Setting the variable for the html-elements
var message = document.getElementById('message');
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    btn1 = document.getElementById('Button1'),
    btn2 = document.getElementById('Button2'),
    btn3 = document.getElementById('Button3'),
    btn4 = document.getElementById('Button4'),
    btn5 = document.getElementById('Button5'),
    btn6 = document.getElementById('Button6'),
    btn7 = document.getElementById('Button7'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback'),
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
    started = document.getElementById('started'),
    table = document.getElementById('table'),
    newButton = document.getElementById('new'),
    newDiv = document.getElementById('newDiv'),
    victory = document.getElementById('victory');

// Creating a matrix for the playground area with the value 0.
var spielfeld=new Array(7);
    for (i=0; i<7; i++)
       {
       spielfeld[i] = new Array(6);
       for (j=0;j<6;j++)
          {
          spielfeld[i][j]=0;
          }
       }
// Round counter
var player = 1;

// Counter for falling buttons
var plopvar1 = 6;
var plopvar2 = 6;
var plopvar3 = 6;
var plopvar4 = 6;
var plopvar5 = 6;
var plopvar6 = 6;
var plopvar7 = 6;

//Counter for ids
var started = 0;

//Counter for neustart-clicks
var neustart = 0;

// Emit events

// Emit the id of the player who clicked the start button to the server
start.addEventListener('click', function() {
socket.emit('Player', {
    id: socket.id,
  })
})

// Gets the information from the server from the clicked start button
socket.on('Player', function(data) {
    started = data.id;
    window.document.images[7].hidden = false;
    window.document.images[1].hidden = false;
    window.document.images[2].hidden = false;
    window.document.images[3].hidden = false;
    window.document.images[4].hidden = false;
    window.document.images[5].hidden = false;
    window.document.images[6].hidden = false;
    startClicks ++;
    if(startClicks == 2){
      start.disabled = true;
    }
    able();
})

newButton.addEventListener('click', function(){
  socket.emit('newGame', {
  })
})

socket.on('newGame', function(data) {
    neustart++;
    if(neustart == 2){
      location.reload();
    }
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
btn1.addEventListener('click', function() {
  socket.emit('Button', {
    Button: 0,
    id: socket.id,
  })
})

btn2.addEventListener('click', function() {
  socket.emit('Button', {
    Button: 1,
    id: socket.id,
  })
})

btn3.addEventListener('click', function() {
  socket.emit('Button', {
    Button: 2,
    id: socket.id,
  })
})

btn4.addEventListener('click', function() {
  socket.emit('Button', {
    Button: 3,
    id: socket.id,
  })
})

btn5.addEventListener('click', function() {
  socket.emit('Button', {
    Button: 4,
    id: socket.id,
  })
})

btn6.addEventListener('click', function() {
  socket.emit('Button', {
    Button: 5,
    id: socket.id,
  })
})

btn7.addEventListener('click', function() {
  socket.emit('Button', {
    Button: 6,
    id: socket.id,
  })
})

// Gets the information of the server which column is chosen by the player
socket.on('Button', function(data) {
    if(player==1)
    {
        window.document.images[data.Button+1].src= rot.src;
    }
    else
    {
        window.document.images[data.Button+1].src= blau.src;
    };

    // Fires the move-function with the right column
    move(data.Button);

    // Counting the setted locations in a invisible html area
    switch(data.Button){
      case 0:
      plopvar1--;
      break;
      case 1:
      plopvar2--;
      break;
      case 2:
      plopvar3--;
      break;
      case 3:
      plopvar4--;
      break;
      case 4:
      plopvar5--;
      break;
      case 5:
      plopvar6--;
      break;
      case 6:
      plopvar7--;
      break;
    }

    // Sets the value of an invisible html box to the players id
    started = data.id;
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

// activate the Game Buttons for the next player
able = function () {

    // If the setted started id isn't equal to the players id
    // AND the start button got hit more then 1 time the game buttons get activated
    if(started != socket.id && startClicks >= 2){
        document.getElementById('Button1').disabled = false;
        document.getElementById('Button2').disabled = false;
        document.getElementById('Button3').disabled = false;
        document.getElementById('Button4').disabled = false;
        document.getElementById('Button5').disabled = false;
        document.getElementById('Button6').disabled = false;
        document.getElementById('Button7').disabled = false;
        if (player == 1) {
          table.style.color = "red";
        } else {
          table.style.color = "blue";
        }
        table.innerHTML = '<p><em>Du bist dran</em></p>';
    } else {
      table.innerHTML = '';
    }
    // If a playground location in the toppes row is already set the game button for this column gets disabled
    for (var i = 0; i < 7; i++) {
      if(spielfeld[i][0] != 0){
        var spal = i + 1;
        var buttonDis = 'Button' + spal;
        document.getElementById(buttonDis).disabled = true;
      };
    }

}

// This function gets fired if someone clicked a Game Button

drop = function (Spalte){

    var i;
    var fertig=0;

    // Setting the location to the player who clicked

    for (i=5;i>=0;i--)
    {
        if (spielfeld[Spalte][i]==0 && fertig==0)
        {
            // chose the right color
            if(player==1)
            {
                window.document.images[i*7+ Spalte+9].src= rot.src;
                player1.style.background = "white";
                player2.style.background = "blue";
                player1.style.border = "1px solid white";
                player2.style.border = "1px solid #e9e9e9";
                // Setting the right matrix value to the players number
                spielfeld[Spalte][i]=1;
                window.document.images[Spalte+1].src= rot.src;
                window.document.images[8].src= blau.src;
                // Check if the player won
                check( Spalte, i, player);
                player=2;

            }
            else
            {
                window.document.images[i*7+Spalte+9].src= blau.src;
                player1.style.background = "red";
                player2.style.background = "white";
                player1.style.border = "1px solid #e9e9e9";
                player2.style.border = "1px solid white";
                spielfeld[Spalte][i]=2;
                window.document.images[Spalte+1].src= blau.src;
                window.document.images[8].src= rot.src;
                check( Spalte, i, player);
                player=1;
            }
            fertig=1;
        }
    }

    // activate the Game Buttons for the next player
    able();
}

// Check if someone won
check = function (Spalte,Zeile,Farbe)
{
    var senkrecht = 0,
        waagerecht = 0,
        z1 = 0,
        z2 = 0,
        z3 = 0,
        z4 = 0;

    // perpendicular
    for (i=6;i>=Zeile;i--)
    {
        if( spielfeld[Spalte][i]==Farbe)
        {
             senkrecht++;
             if ( senkrecht>=4)
             {
                  won();
                 return;
             }
        }
        else
        {
             senkrecht=0;
        }

    }

    // horizontal
    for (i=6;i>=0;i--)
    {
        if( spielfeld[i][Zeile]==Farbe)
        {
             waagerecht++;
             if ( waagerecht>=4)
             {
                  won();
                 return;
             }
        }
        else
        {
             waagerecht=0;
        }

    }


    // The lengths and the starting vaiable for the north east direction
    var zeile = Math.abs(Zeile - 5);
    var spalte = Math.abs(Spalte - 6);
    var abzug;

    if(Spalte <=  zeile)
         abzug = 0;
    else
         abzug = 1;
    var laengeNordOst = 6-Math.abs( zeile - (Spalte -  abzug));
    var startNordOstUnten;
    var startNordOstOben;

    if(Spalte -  zeile < 0)
         startNordOstUnten = 0;
    else
         startNordOstUnten = Spalte -  zeile;

    if( zeile - Spalte >= -1)
         startNordOstOben = 0;
    else
         startNordOstOben =  startNordOstUnten - 1;


    // Noth East
    for(i= laengeNordOst-1;i>=0;i--)
    {
        if( spielfeld[ startNordOstUnten + i][ startNordOstOben + ( laengeNordOst - i - 1)]==Farbe)
        {
             z1++;
             if( z1>=4 ||  z2 >=4)
             {
                  won();
                 return;
             }
        }
            else
        {
             z1=0;
        }

    }

    // The lengths and the starting vaiable for the north west direction
    var startNordWestUnten,
        startNordWestOben;
    if( spalte -  zeile < 0)
         startNordWestUnten = 6;
    else
         startNordWestUnten = Math.abs(6 - Math.abs( spalte -  zeile));

    if( zeile -  spalte >= -1)
         startNordWestOben = 0;
    else
         startNordWestOben = Math.abs(6- startNordWestUnten) - 1;

    if( spalte <=  zeile)
         abzug = 0;
    else
         abzug = 1;
     laengeNordWest = 6-Math.abs( zeile - ( spalte -  abzug));


    // North West
    for(i= laengeNordWest-1;i>=0;i--)
    {
        if( spielfeld[ startNordWestUnten - i][ startNordWestOben + ( laengeNordWest - i - 1)]==Farbe)
        {
             z2++;
             if( z1>=4 ||  z2 >=4)
             {
                  won();
                 return;
             }
        }
        else
        {
             z2=0;
        }
    }
}

// This function gets fired if someone won;

won = function()
{
// Frontend
  victory.hidden = false;
  newDiv.hidden = false;
  newButton.hidden = false;

  // Who won?
    if ( player == 1 ){
      // Set the right color and text
        // feedback.innerHTML = '<div><p><em>Rot hat gewonnen.</em></p></div><br><div id="newDiv"><input id="new" type="button" value="Neustart"></div>';
        victory.innerHTML = "<p><em>Rot hat gewonnen.</em></p>";
        player1.style.background = "red";
        player2.style.background = "white";
        player1.style.borderColor = "black";
        player2.style.borderColor = "white";
        window.document.images[8].src= rot.src;
    }else{
        // feedback.innerHTML = '<div><p><em>Blau hat gewonnen.</em></p></div><br><div id="newDiv"><input id="new" type="button" value="Neustart" onClick="location.reload();"></div>';
        victory.innerHTML = "<p><em>Blau hat gewonnen.</em></p>";
        player1.style.background = "white";
        player2.style.background = "blue";
        player1.style.borderColor = "white";
        player2.style.borderColor = "black";
        window.document.images[8].src= blau.src;
    }
    // Disable the Game Buttons
    document.getElementById('Button1').disabled = true;
    document.getElementById('Button2').disabled = true;
    document.getElementById('Button3').disabled = true;
    document.getElementById('Button4').disabled = true;
    document.getElementById('Button5').disabled = true;
    document.getElementById('Button6').disabled = true;
    document.getElementById('Button7').disabled = true;
    btn.disabled = true;
    message.disabled = true;
    // Reset the startClicks
    startClicks = 0;

    //Disable the start buttons
    start.disabled = true;
}

// This function moves the stones

move = function(Spalte){
  // Disable the Game Buttons
  document.getElementById('Button1').disabled = true;
  document.getElementById('Button2').disabled = true;
  document.getElementById('Button3').disabled = true;
  document.getElementById('Button4').disabled = true;
  document.getElementById('Button5').disabled = true;
  document.getElementById('Button6').disabled = true;
  document.getElementById('Button7').disabled = true;
  // Chose the right column
  var spal = Spalte + 1;
  var buttonDis = 'plop' + spal;
  var elem = document.getElementById(buttonDis);
  // Make the stone visible
  elem.style.marginLeft = -153 + (spal-1) * 51 + "px";
  // Move the right stone and the move it not too far
  var pos = 23;
  var diff = 51;
  switch (spal) {
    case 1:
        var to = pos + plopvar1 * diff;
        break;
    case 2:
        var to = pos + plopvar2 * diff;
        break;
    case 3:
        var to = pos + plopvar3 * diff;
        break;
    case 4:
        var to = pos + plopvar4 * diff;
        break;
    case 5:
        var to = pos + plopvar5 * diff;
        break;
    case 6:
        var to = pos + plopvar6 * diff;
        break;
    case 7:
        var to = pos + plopvar7 * diff;
        break;
  }
  var id = setInterval(frame, 1);
  // Lets do the moves
  function frame() {
    if( pos > to ){
      clearInterval(id);
      drop(Spalte);
      elem.style.top = to + 'px';
      elem.style.display = "none";
    } else {
      elem.style.display = "block";
      pos*=1.02;
      elem.style.top = pos + 'px';
    }
  }
}

// var jump = 0;

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
