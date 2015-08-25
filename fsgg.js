;(function(window, document, $){

  console.log("Script running.");

  var Game = function(){
    this.numberToGuess = this.generateNumber();
    console.log(this.numberToGuess);

    this.playerGuesses = [];
  }

  Game.prototype.generateNumber = function(){
    return Math.round(Math.random() * 100);
  };

  Game.prototype.checkGuess = function(entry){
    var guess = parseInt(entry);
    if(isNaN(guess)){
      console.warn("That is not a number! Try again");
    } else {
      this.playerGuesses.push(guess);
      return guess === this.numberToGuess;
    }
  };


  var game = new Game();

  $("#ping").click(function(e) { 
    e.preventDefault();
    console.log(e);
    console.log(game.checkGuess($("input").val()));
  });

  $("#reset").click(function(e){
    e.preventDefault();
    game = new Game();

  })

}(window, document, jQuery));