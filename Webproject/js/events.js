/*
If mouse calls one of the fields then it blurs orange and shows preview
*/
var id;

function mouseOver(ele) {
  id = ele.id;
  pictures(id);
  document.getElementById(ele.id).style.backgroundColor = "orange";
  border();

}

function mouseOverHighscore() {
  document.getElementById("highscore").style.backgroundColor = "orange";
  id = "highscore";
  border();
}

function pictures(gameid) {
  switch (gameid) {
    case 'game1':
      document.getElementById("pics").setAttribute("src", "Bilder/age.jpg");
      break;
    case 'game2':
      document.getElementById("pics").setAttribute("src", "Bilder/rollaball.gif");
      break;
    case 'game3':
      document.getElementById("pics").setAttribute("src", "Bilder/4gewinnt.png");
      break;
    default:
  }
}

function mouseOut() {
  document.getElementById("pics").setAttribute("src", "");
  document.getElementById(id).style.backgroundColor = "#990000";
  nonborder();
}

function border() {
  document.getElementById("pics").style.border = "5px outset  #990000";
}

function nonborder() {
  document.getElementById("pics").style.border = "";
  document.getElementById("pics").style.boxShadow = "";
}


/*
To go up and down with keyCode not finished!
*/
window.onkeyup = function(e) {
  var key = e.keyCode ? e.keyCode : e.which;

  if (key == 38) {
    console.log("Hallo");
  } else if (key == 40) {

  }

}
