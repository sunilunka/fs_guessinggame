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

  Game.prototype.isRepeat = function(arr, guess){
    if(arr.indexOf(guess) === -1){
      return false;
    } else {
      return true;
    }

  }

  Game.prototype.checkGuess = function(entry){
    var guess = parseInt(entry);
    if(isNaN(guess) || (/\D/g.test(entry))){
      console.warn("That is not a valid number! Try again");
    } else if(this.isRepeat(this.playerGuesses, guess)){
      console.error("You have already used that sonobuoy, try again!");
    } else {
      this.tempOfGuess(guess);
      this.playerGuesses.push(guess);
      console.log(this.playerGuesses);
    }
  }

  Game.prototype.tempOfGuess = function(guess){
    if(this.numberToGuess -  guess > 0){ 
      if((this.numberToGuess - guess <= 2)){
        console.info("Scorching hot!");
      }
    } else if (this.numberToGuess - guess < 0){
      if(this.numberToGuess - guess >= 2){
        console.info("Scorching hot!");
      }
    }  
  }

  Game.prototype.compareLastGuess = function(guess, arr){

  }


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