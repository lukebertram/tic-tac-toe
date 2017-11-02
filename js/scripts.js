//back-end business town
function Game(p1,p2){
  this.player1 = p1;
  this.player2 = p2;
  this.board = new Board();
  this.turn = true;
}

function Player(team, name){
  this.team = team;
  this.name = name;
}

function Board(){
  this.spaces = [];
  for (var x = 1; x < 4; x++) {
    for (var y = 1; y < 4; y++) {
      this.spaces.push(new Space(x,y));
    }
  }
}

function Space(xCoord, yCoord){
  this.coords = xCoord.toString() + yCoord.toString();
  this.xCoord = xCoord;
  this.yCoord = yCoord;
  this.markedBy = "";
}

var generateClickHandler = function(xCoord, yCoord) {
  return function() {
    $('div#col'+ xCoord +'-'+ yCoord).css('background-color', 'red');
  }
}

var game = new Game("player1","player2");
var board = game.board;
//front end flights of fancy
$(document).ready(function(){
  for (var x = 1; x < 4; x++) {
    for (var y = 1; y < 4; y++) {
      var xCoord = x.toString();
      var yCoord = y.toString();
      $('div#col'+ xCoord +'-'+ yCoord).click(generateClickHandler(xCoord, yCoord));
        // for (var i = 0; i < spaces.length; i++) {
        //   if (spaces[i].coords === (x.toString + y.toString)){
        //     spaces[i].markedBy = "X";
        //   }
        //
        // }
    }
  }




});
