//back-end business town
function Game(p1,p2){
  this.player1 = new Player("X",p1);
  this.player2 = new Player("O",p2);
  this.board = new Board();
  this.turn = true;
  this.active = true;
}

Game.prototype.currentPlayer = function(){
  if (this.turn){
    return this.player1;
  } else {
    return this.player2;
  }
}

Game.prototype.setupBoard = function(){
  $('.col-md').text("");
  $('#victory').hide();
  for (var x = 1; x < 4; x++) {
    for (var y = 1; y < 4; y++) {
      $('div#col'+ x +'-'+ y).click(generateClickHandler(x, y));
    }
  }
}

Game.prototype.checkWinner = function(){
  var spaces = this.board.spaces;
  //check for vertical wins
  if (spaces[0].markedBy === spaces[1].markedBy && spaces[1].markedBy === spaces[2].markedBy && spaces[0].markedBy !== ""){
    game.gameOver("Congratulation, "+ game.currentPlayer().name +"! You got the left column!");
  } else if (spaces[3].markedBy === spaces[4].markedBy && spaces[4].markedBy === spaces[5].markedBy && spaces[3].markedBy !== ""){
    game.gameOver("Congratulation, "+ game.currentPlayer().name +"! You got the middle column!");
  } else if (spaces[6].markedBy === spaces[7].markedBy && spaces[7].markedBy === spaces[8].markedBy && spaces[6].markedBy !== ""){
    game.gameOver("Congratulation, "+ game.currentPlayer().name +"! You got the right column!");

  //check for horizontal wins
  } else if (spaces[0].markedBy === spaces[3].markedBy && spaces[3].markedBy === spaces[6].markedBy && spaces[0].markedBy !== ""){
    game.gameOver("Congratulation, "+ game.currentPlayer().name +"! You got the top row!");
  } else if (spaces[1].markedBy === spaces[4].markedBy && spaces[4].markedBy === spaces[7].markedBy && spaces[1].markedBy !== ""){
    game.gameOver("Congratulation, "+ game.currentPlayer().name +"! You got the middle row!");
  } else if (spaces[2].markedBy === spaces[5].markedBy && spaces[5].markedBy === spaces[8].markedBy && spaces[2].markedBy !== ""){
    game.gameOver("Congratulation, "+ game.currentPlayer().name +"! You got the bottom row!");

    //check for diagonal wins
  } else if (spaces[0].markedBy === spaces[4].markedBy && spaces[4].markedBy === spaces[8].markedBy && spaces[0].markedBy !== ""){
    game.gameOver("Congratulation, "+ game.currentPlayer().name +"! You got a diagonal!");
  } else if (spaces[2].markedBy === spaces[4].markedBy && spaces[4].markedBy === spaces[6].markedBy && spaces[2].markedBy !== ""){
    game.gameOver("Congratulation, "+ game.currentPlayer().name +"! You got a diagonal!");
  }

  var fullBoard = true;
  for (var i = 0; i < spaces.length; i++) {
    if (spaces[i].markedBy === ""){
      fullBoard = false;
    }
  }
  if (fullBoard && game.active){
    game.gameOver("nope");
  }
}

Game.prototype.gameOver = function(string){
  game.active = false;
  //display victory screen
  if (string === "nope") {
    $("#won-message").text("Draw game! Everyone loses!");
  } else {
    $("#won-message").text(game.currentPlayer().name + " Won!");
  }
  $("#victory").fadeIn();
  //disable click handlers?
  //display replay button
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

//when a space is clicked, this function handles the business
var generateClickHandler = function(xCoord, yCoord) {
  return function() {
    var spaceIndex;
    // translate the x,y coords into a the proper array index
    if (xCoord === 1){
      spaceIndex = yCoord -1;
    } else if (xCoord === 2){
      spaceIndex = yCoord + 2;
    } else {
      spaceIndex = yCoord + 5;
    }
    //only mark the space if it is not already occupied by a player's mark
    if (game.board.spaces[spaceIndex].markedBy === "" && game.active){
      var team = game.currentPlayer().team;
      $('div#col'+ xCoord +'-'+ yCoord).text(team);
      game.board.spaces[spaceIndex].markedBy = team;
      game.checkWinner();
      if (game.active) {
      game.turn = !game.turn;
      }
    }
  }
}


var game = new Game("Player X","Player O");
var board = game.board;
//front end flights of fancy
$(document).ready(function(){
  game.setupBoard();
  $("#play-again").click(function() {
    game = new Game("Player X","Player O");
    game.setupBoard();
  });





});
