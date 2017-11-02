//back-end business town
function Game(p1,p2){
  this.player1 = new Player("X",p1);
  this.player2 = new Player("O",p2);
  this.board = new Board();
  this.turn = true;
}

Game.prototype.currentPlayer = function(){
  if (this.turn){
    return this.player1;
  } else {
    return this.player2;
  }
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
  this.name = xCoord.toString() + ", " + yCoord.toString();
  this.xCoord = xCoord;
  this.yCoord = yCoord;
  this.markedBy = "";
}

var generateClickHandler = function(xCoord, yCoord) {
  return function() {
    $('div#col'+ xCoord +'-'+ yCoord).css('background-color', 'red');
    debugger
    var spaceIndex;
    if (xCoord === 1){
      spaceIndex = yCoord -1;
    } else if (xCoord === 2){
      spaceIndex = yCoord + 2;
    } else {
      spaceIndex = yCoord + 5;
    }
    var team = game.currentPlayer().team;
    game.board.spaces[spaceIndex].markedBy = team;
  }
}

var game = new Game("player1","player2");
var board = game.board;
//front end flights of fancy
$(document).ready(function(){
  for (var x = 1; x < 4; x++) {
    for (var y = 1; y < 4; y++) {
      // var xCoord = x.toString();
      // var yCoord = y.toString();
      $('div#col'+ x +'-'+ y).click(generateClickHandler(x, y));
        // for (var i = 0; i < spaces.length; i++) {
        //   if (spaces[i].coords === (x.toString + y.toString)){
        //     spaces[i].markedBy = "X";
        //   }
        //
        // }
    }
  }




});
