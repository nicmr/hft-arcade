// function wsconnect(){
//   console.log("Pong attempts to connect...");
//   exampleSocket = new WebSocket("ws://localhost:8765/pong/ws/");
//
//   exampleSocket.onopen = function(){
//     console.log("connection opened (exampleSocket)");
//   }
// }
var game = "pong";
var pongSocket;
var xTemp;
var yTemp;
var movementX;
var movementY;
var racketLeftY;
var racketRightY;
var posX;
var posY;
var id;
var won;
var classGame = document.getElementsByClassName("game");

$(document).ready(function(){
    $("#endButton").click(function(){
        $("#startButton").text("start");
        $("#startButton").prop('disabled',false);
        $("#endButton").prop('disabled',true);
        endGame();
    });
    $("#startButton").click(function(){
      startGame();
    });
});

// document.getElementById("startButton").onclick = function() {startGame()};

// function toggleDisplay() {
//   if (classGame[0].style.display == 'none') {
//     for (var i = 0; i < classGame.length; i++) {
//       classGame[i].style.display = "block";
//     }
//   } else {
//     for (var i = 0; i < classGame.length; i++) {
//       classGame[i].style.display = "none";
//     }
//   }
// }
var racketLeft = $("#racketLeft");
var racketRight = $("#racketRight");
var ball = $("#ball");
function step(){
  posX += movementX;
  posY += movementY;
  ball.css("top",posY + "px");
  ball.css("left",posX + "px");

  var key;
  for (key in keysPressed){
    switch (Number(key)) {
      case 38: { //up
        if(racketRightY > -6){
          racketRightY -= 5;
        }
        break;
      }
      case 40: { //down
        if (racketRightY < 286) {
          racketRightY += 5;
        }
        break;
      }
      case 87: { //w
        if (racketLeftY > -6) {
          racketLeftY -= 5;
        }
        break;
      }
      case 83: { //s
        if (racketLeftY < 286) {
          racketLeftY += 5;
        }
        break;
      }
    }
  }
  racketLeft.css("top", racketLeftY + "px");
  racketRight.css("top", racketRightY + "px");
  console.log(posX);
  if(posY > 379 || posY < -7){
    movementY *= -1;
  }
  if(posX < 51 && posX > 39 && posY > racketLeftY && posY < racketLeftY+100){
    movementX *= -1;
  }
  if(posX < 731 && posX > 719 && posY > racketRightY && posY < racketRightY+100){
    movementX *= -1;
  }
  var gameOver = false;
  var winner;
  if(posX > 769){
    won = 1;
    gameOver = true;
    winner = localStorage.user;//"hannes";
  }
  if(posX < -4){
    won = 0;
    gameOver = true;
    winner = "Gast";
  }
  if (gameOver){
    clearInterval(id);
    pongSocket = new WebSocket("ws://localhost:8765/local/ws/");
    pongSocket.onopen = function (){
      var update = JSON.stringify({"name" : localStorage.user}, {"$inc": {"pongrounds": 1, "pongwins": won} });
      console.log(update);

      pongSocket.send(update);
      // ich sende den aktuellen Spieler, dann inc für pongrounds (alle spiele), dann inc für pongwins + (wert von won (1 bei sieg, 0 bei niederlage))
    }
  }
}

function startGame() {
  posX = 375;
  posY = 175;

  racketLeftY = 150;
  racketRightY = 150;

  xTemp = (Math.random() * 5) * ((Math.random() > 0.49) ? 1 : -1);
  yTemp = (Math.random() * 5) * ((Math.random() > 0.49) ? 1 : -1);
  movementX = (xTemp / Math.sqrt((xTemp * xTemp) + (yTemp * yTemp))) * 5;
  movementY = (yTemp / Math.sqrt((xTemp * xTemp) + (yTemp * yTemp))) * 3;

  $("#startButton").text("running");
  $("#startButton").prop('disabled',true);
  $("#endButton").prop('disabled',false);
  $("#ball").css("top",posY + "px");
  $("#ball").css("left",posX + "px");
  id = setInterval(step, 16);


  // element.style.top = ;
  // element.style.left = posX + "px";
  // toggleDisplay();
  // clearInterval(id); // nur für SnakeOption
}
function endGame() {
  clearInterval(id);
}
var keysPressed = {};

$(document).keydown(function (e) {
    keysPressed[e.which] = true;
});

$(document).keyup(function (e) {
    delete keysPressed[e.which];
})

// window.onkeydown = function(e) {
//   var key = e.keyCode ? e.keyCode : e.which;
//   switch (key) {
//     case 38: { //up
//       racketRightY -= 5;
//       console.log("up");
//       break;
//     }
//     case 40: { //down
//       racketRightY += 5;
//       console.log("down");
//       break;
//     }
//     case 87: { //w
//       racketLeftY -= 5;
//       console.log("w");
//       break;
//     }
//     case 83: { //s
//       racketLeftY += 5;
//       console.log("s");
//       break;
//     }
//   }
// }

//Geradeaus bis Änderung

// window.onkeyup = function(e){
//   clearInterval(id);
//   var stepX;
//   var stepY;
//   var key = e.keyCode ? e.keyCode : e.which;
//   switch (key) {
//     case 65: { //a
//       stepX = -5;
//       break;
//     }
//     case 68: { //d
//       stepX = 5;
//       break;
//     }
//     case 83: { //s
//       stepY = 5;
//       break;
//     }
//     case 87: { //w
//       stepY = -5;
//       break;
//     }
//   }
//   id = setInterval(step, 50);
//   function step() {
//     if (posX < 400 && posX > 0 && posY > 0 && posY < 400) {
//       posX += stepX;
//       posY += stepY;
//       element.style.top = posY + "px";
//       element.style.left = posX + "px";
//     } else {
//       // endGame();
//       // startGame();
//     }
//   }
// }
//Einzelne Schritte
