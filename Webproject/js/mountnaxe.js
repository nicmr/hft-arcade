var img;
var rng;
var currentDiv;
var lastDiv;
var counter;
var playerList;
var player1, player2;
var roundCounter;
var activePlayer;
var castleField;
var castlePlayer1;
var castlePlayer2;
var axesPlayer1;
var chooseBuildingBoolean;
var moveUnitBoolean;
var attackUnitBoolean;
var activeField;
var activeDiv;
var inactivePlayer;
var availableFields;
var mountAndAxeSocket;
var game = "mountnaxe";

// function wsconnect(){
//   console.log("MountAndAxe attempts to connect...");
//   exampleSocket = new WebSocket("ws://localhost:8765/local/ws/");
//
//   exampleSocket.onopen = function(){
//     console.log("connection opened (exampleSocket)");
//   }
// }

function fillFields(size) {
  var field = document.getElementsByClassName("field");
  for (var i = 0; i < (size*6); i++){
    var background;
    var src;
    var alt;
    rng = Math.floor(Math.random() * 9 );
    switch (rng) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4: {
        background = "background:url(./images/trees.png)";
        src = "./images/empty.png";
        alt = "trees";
        break;
      }
      case 5:
      case 6: {
        background = "background:url(./images/grass.png)";
        src = "./images/empty.png";
        alt = "grass";
        break;
      }
      case 7: {
        background = "background:url(./images/stones.png)";
        src = "./images/empty.png";
        alt = "stones";
        break;
      }
      case 8: {
        background = "background:url(./images/lakes.png)";
        src = "./images/empty.png";
        alt = "lakes";
        break;
      }
    }
    var imgElement = document.createElement("img");
    imgElement.setAttribute("style",background);
    imgElement.setAttribute("src",src);
    imgElement.setAttribute("alt",alt);
    field[i].appendChild(imgElement);
    var buildingInformationDiv = document.createElement("div");
    buildingInformationDiv.setAttribute("id","buildingDiv" + (i+1));
    buildingInformationDiv.setAttribute("class","player0");
    field[i].appendChild(buildingInformationDiv);
    var elementInformationDiv = document.createElement("div");
    elementInformationDiv.setAttribute("id","unitDiv" + (i+1));
    elementInformationDiv.setAttribute("class","player0");
    field[i].appendChild(elementInformationDiv);
  }
}

function drawBoard(size){
  var board = document.getElementById("board");
  console.log(size);
  var rowDivElement;
  var singleFieldDiv;
  // var innerInnerDiv;
  for (var i = 0; i < size; i++) {
    rowDivElement = document.createElement("div");
    rowDivElement.setAttribute("class","fieldRow");
    for (var j = 0; j < 6; j++){
      singleFieldDiv = document.createElement("div");
      singleFieldDiv.setAttribute("class","field")
      singleFieldDiv.setAttribute("onclick","chooseField(this)")
      singleFieldDiv.setAttribute("id", ((i*6) + j)+1);
      // innerInnerDiv = document.createElement("div");
      // innerDiv.appendChild(innerInnerDiv);
      rowDivElement.appendChild(singleFieldDiv);
    }
    board.appendChild(rowDivElement);
  }
}

function eraseBoard(){
  var fieldRows = document.getElementsByClassName("fieldRow");
  console.log("fieldRows: " + fieldRows.length)
  var length = fieldRows.length
  for (var j = 0; j < length; j++) {
    var oneFieldRow = fieldRows[0];
    oneFieldRow.parentNode.removeChild(oneFieldRow);
  }
}

function activateButton(button){
  button.style.display = "block";
  button.className = "abledButton";
}

function deactivateButton(button){
  button.style.display = "none";
  button.className = "disabledButton";
}

function chooseBuilding(){
  chooseBuildingBoolean = true;
}


function clearVariables(){
  counter = 0;
  playerList = 0;
  roundCounter = 0;
  castleField = null;
  chooseBuildingBoolean = false;
  moveUnitBoolean = false;
  attackUnitBoolean = false;
}

function start(){
  clearVariables();
  var size = (document.getElementById("size").value > 5) ? document.getElementById("size").value : 6;
  eraseBoard();
  drawBoard(size);
  fillFields(size);
  createPlayers(size);
  nextRound();
}

function highlightChosenField(chosenDiv){
  // wenn neues feld gewählt, rot umrahmen. Wenn es ein altes gab, dieses wieder schwärzen
  if(chosenDiv !== currentDiv) {
    currentDiv = chosenDiv;
    currentDiv.style = "border: 1px solid yellow";
    if (typeof(lastDiv) != "undefined") {
      lastDiv.style = "border: 1px solid black;"
    }
    lastDiv = currentDiv;
  }
}

function getSourceFromBackground(childNodes){
  var pathBackground = childNodes[0].style.background;
  var stringStart = pathBackground.search('\\./'); // vielleicht wieder mit ('\\(\\"') + 2
  var stringEnd = pathBackground.search('\\"\\)');
  pathBackground = pathBackground.substring(stringStart,stringEnd);
  return pathBackground;
}

function clearElementInfo() {
  document.getElementById("pictureRight").src = "";
  document.getElementById("elementName").innerHTML = "";
  document.getElementById("healthpoints").innerHTML = "";
  document.getElementById("attackDamage").innerHTML = "";
}

function putFieldInfo(fieldDiv){
  // zeigt die info über dieses field im rechten UI an
  var childNode = fieldDiv.childNodes;
  document.getElementById("fieldName").innerHTML = "field nr: " +
    fieldDiv.getAttribute("id") + " " + childNode[0].getAttribute("alt");
}

function deactiveAllButtons() {
  deactivateButton(document.getElementById("attackButton"));
  deactivateButton(document.getElementById("moveButton"));
  deactivateButton(document.getElementById("chooseBuildingButton"));
  deactivateButton(document.getElementById("buildAxe"));
  deactivateButton(document.getElementById("buildSword"));
  deactivateButton(document.getElementById("buildCavalry"));
}

function checkOwner(fieldDiv){
  // prüft ob das elementDiv dem aktuellen Spieler gehört
  var childNodes = fieldDiv.childNodes;
  for (var i = 1; i < 3; i++){
    if (childNodes[i].className == document.getElementById("activePlayer").innerHTML) {
      return true;
    }
  }
  return false;
}

function getAvailableFields(fieldDiv){
  var temp;
  var result = [];
  var center = fieldDiv.getAttribute("id");
  center = Number(center);
  temp = [center+1, center+7, center+6, center+5, center-1, center-7, center-6, center-5];
  if ((center % 6) == 0) {
    temp = [center+6,center+5,center-1,center-7,center-6];
  }
  if ((center % 6) == 1) {
    temp = [center+1, center+7, center+6, center-6, center-5];
  }
  if (center < 7){
    temp = [center+1, center+7, center+6, center+5, center-1];
  }
  if (center > ((6 * document.getElementById("size").value) -6)){
    temp = [center+1, center-1, center-7, center-6, center-5];
  }
  if (center == 1) {
    temp = [center + 1, center + 6, center +7];
  }
  if (center == 6) {
    temp = [center +6, center + 5, center -1];
  }
  if (center == (6 * document.getElementById("size").value)){
    temp = [center -1, center -7, center -6];
  }
  if (center == (6 * document.getElementById("size").value) -5){
    temp = [center +1, center -6, center -5];
  }
  if(moveUnitBoolean == true){
    for (var i = 0; i< temp.length; i++){
      if (getFieldOwnership(temp[i])){
        result.push(temp[i]);
      }
    }
  }
  if(attackUnitBoolean == true){
    console.log("test Attackfield");
    for (var i = 0; i< temp.length; i++){
      console.log("fieldnr: " + temp[i]);
      if (getEnemyFields(temp[i])){
        result.push(temp[i]);
      }
    }
  }

  return result;
}

function getEnemyFields(fieldId){
  var fieldDiv = document.getElementById(fieldId);
  var childNodes = fieldDiv.childNodes;
  console.log("2"+childNodes[2].className);
  console.log("1"+childNodes[1].className);
  if (childNodes[2].className == inactivePlayer.name){
    return true;
  }
  if (childNodes[1].className == inactivePlayer.name){
    return true;
  }
  console.log("war false");
  return false;
}

function getFieldOwnership(fieldId){
  var fieldDiv = document.getElementById(fieldId);
  var childNodes = fieldDiv.childNodes;
  if (childNodes[2].className != "player0"){
    return false;
  }
  if (childNodes[1].className == inactivePlayer.name){
    return false;
  }
  return true;
}

function contains(array, element) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == element) {
            return true;
        }
    }
    return false;
}

function colorFields(color){
  for (var i = 0; i< availableFields.length; i++){
    var tempDiv = document.getElementById(availableFields[i]);
    tempDiv.style = "border: 1px solid " + color;
  }
}

function moveInterface(){
  var childNodes = activeDiv.childNodes;
  if (moveUnitBoolean == false){
      moveUnitBoolean = true;
      availableFields = getAvailableFields(activeDiv);
      colorFields("blue");
  }
  else {
    // deactivateButton(document.getElementById("moveButton"));
    moveUnitBoolean = false;
    colorFields("black");
  }
}

function attackInterface(){
  var childNodes = activeDiv.childNodes;
  if (attackUnitBoolean == false){
      attackUnitBoolean = true;
      availableFields = getAvailableFields(activeDiv);
      // console.log("felder sollten gefärbt werden: " + availableFields);
      colorFields("red");
  }
  else {
    deactivateButton(document.getElementById("moveButton"));
    attackUnitBoolean = false;
    colorFields("black");
  }
}

function attack(nextDiv){
  var attackerChildNodes = activeDiv.childNodes;
  var defenderChildNodes = nextDiv.childNodes;

  if (contains(availableFields, nextDiv.id)){
    if(defenderChildNodes[2].object != undefined){
      defenderChildNodes[2].object.healthpoints -= attackerChildNodes[2].object.attackDamage;
      if (checkAlive(defenderChildNodes)){
        attackerChildNodes[2].object.healthpoints -= (defenderChildNodes[2].object.attackDamage / 2);
        checkAlive(attackerChildNodes);
      }
    }
    else {
      defenderChildNodes[1].object.healthpoints -= attackerChildNodes[2].object.attackDamage;
      checkCastle(defenderChildNodes);
    }
    attackerChildNodes[2].object.hasNotAttacked = false;
  }
  attackInterface();
}

function clearField(childNodes){
  childNodes[2].object = undefined;
  childNodes[2].className = "player0";
  childNodes[0].src = "./images/empty.png";
}

function checkCastle(childNodes){
  if(childNodes[1].object.healthpoints <= 0){
    // var allUnits = document.getElementsByClassName(inactivePlayer.name);
    // for (var temp in allUnits){
    //   clearField(temp.childNodes);
    // }
    if (activePlayer.name  = localstorage.name){
      won = 1;
    }
    else {
      won = 0;
    }
    var winMessage = activePlayer.name + " has won!";
    alert(winMessage);
    MountAndAxeSocket = new WebSocket("ws://localhost:8765/local/ws/");
    MountAndAxeSocket.onopen = function (){
      MountAndAxeSocket.send(JSON.stringify({"playerOne" : localstorage.name, "$inc" : (game + "rounds") : 1 , "$inc" : (game + "wins") : won}));
    }
    start();
  }
}

function checkAlive(childNodes){
  if(childNodes[2].object.healthpoints <= 0){
    clearField(childNodes);
    return false;
  }
  return true;
}

function moveTo(nextDiv){
  // var oldField = document.getElementById("unitDiv"+activeDiv.id);
  // var newField = document.getElementById("unitDiv"+nextDiv.id);
  // newField.object = oldField.object;
  // newField.className = oldField.className;
  //
  var oldChildNodes = activeDiv.childNodes;
  var newChildNodes = nextDiv.childNodes;

  if (contains(availableFields, nextDiv.id)){
    newChildNodes[2].object = oldChildNodes[2].object;
    newChildNodes[2].className = oldChildNodes[2].className;
    newChildNodes[0].src = oldChildNodes[0].src;

    clearField(oldChildNodes);

    // oldChildNodes[2].object = undefined;
    // oldChildNodes[2].className = "player0";
    // oldChildNodes[0].src = "./images/empty.png";

    newChildNodes[2].object.stepCounter ++;

  }
  moveInterface();
}

function chooseField(fieldDiv){
  // field wird markiert. Field info im linken UI gespeichert. buttons & unitInfo gecleared
  // falls building -> buttons & unitInfo aktualisiert
  // falls unit -> buttons & unitInfo nochmal aktualisiert
  if (moveUnitBoolean){
    moveTo(fieldDiv);
  }
  if(attackUnitBoolean){
    attack(fieldDiv);
  }

  var childNodes = fieldDiv.childNodes;

  highlightChosenField(fieldDiv);
  putFieldInfo(fieldDiv);

  clearElementInfo();

  var childNodes = fieldDiv.childNodes;

  if (checkOwner(fieldDiv)) {
    checkButtons(childNodes);
    putElementInfo(childNodes);
    activeDiv = fieldDiv;
  } else {
    deactiveAllButtons();
  }

  if (chooseBuildingBoolean) {
    var array = [childNodes[0],childNodes[1]];
    if (checkOwner(fieldDiv)) {
      checkButtons(array);
      putElementInfo(array);
      chooseBuildingBoolean = false;
    } else {
      deactiveAllButtons();
    }
  }
}

function putElementInfo(childNodes){
  //wenn das field dem currentPlayer gehört, werden infos rechts eingefühlt.
  //ist eine unit gegeben wird diese eingefühlt, sonst das building
  for (var i = 1; i < childNodes.length; i++){
    if ((typeof childNodes[i].object) != "undefined"){
      document.getElementById("elementName").innerHTML = childNodes[i].object.name;
      document.getElementById("healthpoints").innerHTML = childNodes[i].object.healthpoints;
      document.getElementById("attackDamage").innerHTML = childNodes[i].object.attackDamage;
      document.getElementById("steps").innerHTML = childNodes[i].object.movementRange - childNodes[i].object.stepCounter;
      if (i == 1) {
        document.getElementById("pictureRight").src = getSourceFromBackground(childNodes);
      }
      if (i == 2) {
       document.getElementById("pictureRight").src = childNodes[0].src;
      }
    }
  }
}

function checkButtons(childNodes) {
  // wenn field dem currentPlayer gehört werden für definierte objects in [1] und [2]
  // die infos ausgegeben
  for (var i = 1; i < childNodes.length; i++){
    if ((typeof childNodes[i].object) != "undefined"){
      deactiveAllButtons();
      if (childNodes[i].object.attackDamage != 0 && childNodes[i].object.hasNotAttacked){
        activateButton(document.getElementById("attackButton"));
      }
      if (childNodes[i].object.stepCounter < childNodes[i].object.movementRange){
        activateButton(document.getElementById("moveButton"));
      }
      if (childNodes[i].object.type == "unit"){
        activateButton(document.getElementById("chooseBuildingButton"));
      }
      if (childNodes[i].object.type == "building"){
        activateButton(document.getElementById("buildAxe"));
        activateButton(document.getElementById("buildSword"));
        activateButton(document.getElementById("buildCavalry"));
      }
    }
  }
  if ((typeof childNodes[1].object == "undefined" && typeof childNodes[2].object == "object")){
    deactivateButton(document.getElementById("chooseBuildingButton"));
  }
}

function nextRound(){
  // Aktiver Spieler bei grader Rundenanzahl: player2, bei ungerade player1
  // schreibe aktiven Spieler ins UI
  roundCounter++;
  document.getElementById("roundCounter").innerHTML = roundCounter;
  if (roundCounter % 2 === 0) {
    activePlayer = player2;
    inactivePlayer = player1;
  } else {
    activePlayer = player1;
    inactivePlayer = player2;
  }
  document.getElementById("activePlayer").innerHTML = activePlayer.name;
  activePlayer.goldAmount = Number(activePlayer.goldAmount) + 50;

  document.getElementById("availableGold").innerHTML = activePlayer.goldAmount;
  for (var i = 1; i < (6 * document.getElementById("size").value + 1); i++){
    var temp = document.getElementById(i);
    var childNodes = temp.childNodes;
    console.log("neue Runde: " + childNodes[2].objects);
    if (childNodes[2].object != undefined) {
      childNodes[2].object.stepCounter = 0;
      childNodes[2].object.hasNotAttacked = true;
    }
  }
}
function buildSword(){;
  // neue Unit wird erzeugt. field mit castle wird ausgewählt. Unit+Bild wird ins Field eingefügt
  document.getElementById("availableGold").style.color = "red";
  if (activePlayer.goldAmount > 75) {
    var tempUnit = new Element("sword",50,1,40,activePlayer,"unit");
    var fields = document.getElementsByClassName("field");
    var child = fields[activePlayer.castle.position].childNodes;
    console.log(child[2].object);
    if(typeof child[2].object == "undefined"){
      child[0].src = "./images/sword" + chooseCorrectColor() + ".png";
      // child[2].id = "axe"; //  buildButton.id.slice(5).toLowerCase() // unitDiv id ist jetzt wichtig
      child[2].object = tempUnit;
      child[2].className = tempUnit.owner.name;
      activePlayer.goldAmount = Number(activePlayer.goldAmount) - 75;
    }
    document.getElementById("availableGold").innerHTML = activePlayer.goldAmount;
    document.getElementById("availableGold").style.color = "black";
  }
}

function buildCavalry(){;
  // neue Unit wird erzeugt. field mit castle wird ausgewählt. Unit+Bild wird ins Field eingefügt
  document.getElementById("availableGold").style.color = "red";
  if (activePlayer.goldAmount > 100) {
    var tempUnit = new Element("cavalry",50,3,30,activePlayer,"unit");
    var fields = document.getElementsByClassName("field");
    var child = fields[activePlayer.castle.position].childNodes;
    console.log(child[2].object);
    if(typeof child[2].object == "undefined"){
      child[0].src = "./images/cavalry" + chooseCorrectColor() + ".png";
      // child[2].id = "axe"; //  buildButton.id.slice(5).toLowerCase() // unitDiv id ist jetzt wichtig
      child[2].object = tempUnit;
      child[2].className = tempUnit.owner.name;
      activePlayer.goldAmount = Number(activePlayer.goldAmount) - 100;
    }
    document.getElementById("availableGold").innerHTML = activePlayer.goldAmount;
    document.getElementById("availableGold").style.color = "black";
  }
}

function buildAxe(){;
  // neue Unit wird erzeugt. field mit castle wird ausgewählt. Unit+Bild wird ins Field eingefügt
  document.getElementById("availableGold").style.color = "red";
  if (activePlayer.goldAmount > 50) {
    var tempUnit = new Element("axe",25,2,10,activePlayer,"unit");
    var fields = document.getElementsByClassName("field");
    var child = fields[activePlayer.castle.position].childNodes;
    console.log(child[2].object);
    if(typeof child[2].object == "undefined"){
      child[0].src = "./images/axe" + chooseCorrectColor() + ".png";
      // child[2].id = "axe"; //  buildButton.id.slice(5).toLowerCase() // unitDiv id ist jetzt wichtig
      child[2].object = tempUnit;
      child[2].className = tempUnit.owner.name;
      activePlayer.goldAmount = Number(activePlayer.goldAmount) - 50;
    }
    document.getElementById("availableGold").innerHTML = activePlayer.goldAmount;
    document.getElementById("availableGold").style.color = "black";
  }
}

function chooseCorrectColor(){
  if (activePlayer == player1){
      return "Blue";
  }
  else {
      return "Red";
  }
}

function createPlayers(size){
  // player wird mit namen aus input benannt
  player1 = new Player();
  player1.name = document.getElementById("namePlayer1").value;
  castlePlayer1 = new Element("castle",200,0,25,player1,"building");
  player1.castle = castlePlayer1;
  placeCastle(size,castlePlayer1);
  player2 = new Player();
  player2.name = document.getElementById("namePlayer2").value;
  castlePlayer2 = new Element("castle",10,0,25,player2,"building");
  player2.castle = castlePlayer2;
  placeCastle(size,castlePlayer2);
}

function placeCastle(size, castle){
  // setze castle.png in das richtige field
  // und verbinde das unitObjectInformationDiv mit dem object(object) und owner(class)
  console.log("in placeCastle: " +castle.owner);
  castleFieldNr = Math.floor(Math.random() * (6* (size/2)));
  if (castle.owner != player1){
    castleFieldNr += (size/2) * 6;
  }
  var field = document.getElementsByClassName("field");
  var child = field[castleFieldNr].childNodes;
  castle.position = castleFieldNr;
  if (castle.owner == player1){
      child[0].style = "background:url(./images/castleBlue.png)";
  }
  else {
      child[0].style = "background:url(./images/castleRed.png)";
  }
  child[0].alt = "castle";
  // child[1].id = castle.name; // "axe" // buildingDiv ist jetzt wichtig
  child[1].object = castle;
  child[1].className = castle.owner.name;

}
// function currentPlayer(){
//   return document.getElementById("activePlayer").innerHTML;
// }

function Player(){
  // weist start goldAmount zu
  this.goldAmount = document.getElementById("goldStart").value;
  if(isNaN(document.getElementById("goldStart").value)) {
    this.goldAmount = 450;
  }
}

// function placeElement(Element){
//
// }


function Element(name, healthpoints, movementRange, attackDamage, owner, type) {
  this.stepCounter = 0;
  this.hasNotAttacked = true;
  this.type = type;
  this.name = name;
  this.healthpoints = healthpoints;
  this.movementRange = movementRange;
  this.attackDamage = attackDamage;
  this.owner = owner;
  if (movementRange > 0) {
    this.move = function() {

    }
  }
  if (attackDamage > 0) {
    this.attack = function() {

    }
  }
  counter++;
  this.id = owner.name+name+counter;
}
