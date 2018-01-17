var jsonAcc1 = {
  "name" : "Hannes",
  "maarounds" :  "5" , "maawins" : "3" ,
  "ballrounds" : "2",
  "Vierrounds" : "15" , "Vierwins" : "14",
  "pongrounds" : "7", "pongwins" : "5",
  "tttrounds" : "8", "tttwins" : "4"};
var jsonAcc2 = {
  "name" : "Daniel",
  "maarounds" :  "8" , "maawins" : "3" ,
  "ballrounds" : "500",
  "Vierrounds" : "30" , "Vierwins" : "29",
  "pongrounds" : "15", "pongwins" : "5",
  "tttrounds" : "6", "tttwins" : "5"};
var jsonAcc3 = {
    "name" : "Felix",
    "maarounds" :  "1" , "maawins" : "1" ,
    "ballrounds" : "3",
    "Vierrounds" : "30" , "Vierwins" : "14",
    "pongrounds" : "15", "pongwins" : "5",
    "tttrounds" : "6", "tttwins" : "5"};

var everything = [
  [ (jsonAcc1.maawins / jsonAcc1.maarounds) ,
    (jsonAcc1.ballrounds) ,
    (jsonAcc1.Vierwins / jsonAcc1.Vierrounds) ,
    (jsonAcc1.pongwins / jsonAcc1.pongrounds) ,
    (jsonAcc1.tttwins / jsonAcc1.tttrounds),
    (jsonAcc1.name)
  ],
  [ (jsonAcc2.maawins / jsonAcc2.maarounds) ,
    (jsonAcc2.ballrounds) ,
    (jsonAcc2.Vierwins / jsonAcc2.Vierrounds) ,
    (jsonAcc2.pongwins / jsonAcc2.pongrounds) ,
    (jsonAcc2.tttwins / jsonAcc2.tttrounds),
    (jsonAcc2.name)
  ],
  [ (jsonAcc3.maawins / jsonAcc3.maarounds) ,
    (jsonAcc3.ballrounds) ,
    (jsonAcc3.Vierwins / jsonAcc3.Vierrounds) ,
    (jsonAcc3.pongwins / jsonAcc3.pongrounds) ,
    (jsonAcc3.tttwins / jsonAcc3.tttrounds),
    (jsonAcc3.name)
  ]
];
for (var k = 0; k < everything.length; k++) {
  for (var i = 0; i < everything[0].length - 1; i++) {
      everything[k][i] = Number(Number(everything[k][i]).toFixed(2));
      // console.log(everything[k][i]);
  }

}
{/* <th id="1maa"> Bester in Mount'Axe</th> <!-- Siegesanzahl / Spieleanzahl -->
<th id="1ball"> Bester in Roll a Ball</th> <!-- Spieleanzahl -->
<th id="14"> Bester in 4 Gewinnt</th> <!-- Siegesanzahl / Spieleanzahl -->
<th id="1pong"> Bester in Pong</th> <!-- Siegesanzahl / Spieleanzahl -->
<th id="1ttt"> Bester in TicTacToe</th> <!-- Siegesanzahl / Spieleanzahl --> */}
var amountOfGames = 5;
var positions = 3;
var temp;
var tableCells = [
  "1maa","1ball","14","1pong","1ttt",
  "2maa","2ball","24","2pong","2ttt",
  "3maa","3ball","34","3pong","3ttt",
]
// 1. Plätze
// console.log(tableCells[i]);
var firstRow = [
    "1maa","1ball","14","1pong","1ttt"
];
var secondRow = [
    "2maa","2ball","24","2pong","2ttt"
];
var thirdRow = [
    "3maa","3ball","34","3pong","3ttt"
];
// for (var i = 0; i < 3; i++) {
//
// }

for (var cellCounter = 0; cellCounter < firstRow.length; cellCounter++) { //cell counter = spielcounter
  temp = 0;
  for (var userCounter = 0; userCounter < everything.length; userCounter++) {
    // console.log(everything[userCounter][5]);
    // console.log(everything[userCounter][cellCounter] +  ">" + temp + (everything[userCounter][cellCounter] > temp));
    if (everything[userCounter][cellCounter] > temp) {
      document.getElementById(firstRow[cellCounter]).innerHTML = everything[userCounter][5] + "<br>" + "mit " + "<br>" +everything[userCounter][cellCounter];
      temp = everything[userCounter][cellCounter];
    }
  }
}
// for (var cellCounter = 0; cellCounter < secondRow.length; cellCounter++) { //cell counter = spielcounter
//   temp = 0;
//   for (var userCounter = 0; userCounter < everything.length; userCounter++) {
//     // console.log(everything[userCounter][5]);
//     // console.log(everything[userCounter][cellCounter] +  ">" + temp + (everything[userCounter][cellCounter] > temp));
//     if (everything[userCounter][cellCounter] > temp) {
//       document.getElementById(secondRow[cellCounter]).innerHTML = everything[userCounter][5] + "<br>" + "mit " + "<br>" +everything[userCounter][cellCounter];
//       temp = everything[userCounter][cellCounter];
//     }
//   }
// }
// for (var cellCounter = 0; cellCounter < thirdRow.length; cellCounter++) { //cell counter = spielcounter
//   temp = 0;
//   for (var userCounter = 0; userCounter < everything.length; userCounter++) {
//     // console.log(everything[userCounter][5]);
//     // console.log(everything[userCounter][cellCounter] +  ">" + temp + (everything[userCounter][cellCounter] > temp));
//     if (everything[userCounter][cellCounter] > temp) {
//       document.getElementById(thirdRow[cellCounter]).innerHTML = everything[userCounter][5] + "<br>" + "mit " + "<br>" +everything[userCounter][cellCounter];
//       temp = everything[userCounter][cellCounter];
//     }
//   }
// }

//
// // 6 Spiele everything[0].length - 1, das letzte ist name
// for (var gameCounter = 0; gameCounter < everything[0].length; gameCounter++) {
//   // Füllen der 15 Tribünenplätze
//   for (var cellCounter = 0; cellCounter < tableCells.length; cellCounter++) {
//     // 3 Spieler
//     for (var userCounter = 0; userCounter < everything.length; userCounter++) {
//       document.getElementById(tableCells[cellCounter]).innerHTML = everything[userCounter][gameCounter];
//       }
//     }
//   }
//
//   // for (var j = 1; j < everything.length; j++) {
//   //   if (Number(document.getElementById(tableCells[i]).innerHTML) < everything[j][2]){
//   //     document.getElementById(tableCells[i]).innerHTML = "Number(everything[j][2 + i]).toFixed(2)";
//   //   }
//   // }
// }
// console.log(everything[0][3]);
{/* <tr>
    <th><img src="images/silver.png" alt="1. Platz"></th>
    <th id="2maa">2. Bester in Mount'Axe</th> <!-- Siegesanzahl / Spieleanzahl -->
    <th id="2ball">2. Bester in Roll a Ball</th> <!-- Spieleanzahl -->
    <th id="24">2. Bester in 4 Gewinnt</th> <!-- Siegesanzahl / Spieleanzahl -->
    <th id="2pong">2. Bester in Pong</th> <!-- Siegesanzahl / Spieleanzahl -->
    <th id="2ttt">2. Bester in TicTacToe</th> <!-- Siegesanzahl / Spieleanzahl -->
  </tr>
  <tr>
    <th><img src="images/bronze.png" alt="1. Platz"></th>
    <th id="3maa">3. Bester in Mount'Axe</th> <!-- Siegesanzahl / Spieleanzahl -->
    <th id="3ball">3. Bester in Roll a Ball</th> <!-- Spieleanzahl -->
    <th id="34">3. Bester in 4 Gewinnt</th> <!-- Siegesanzahl / Spieleanzahl -->
    <th id="3pong">3. Bester in Pong</th> <!-- Siegesanzahl / Spieleanzahl -->
    <th id="3ttt">3. Bester in TicTacToe</th> <!-- Siegesanzahl / Spieleanzahl -->
  </tr> */}
