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
      this.guessTemp(guess);
      this.playerGuesses.push(guess);
      console.log(this.playerGuesses);
    }
  }


  Game.prototype.guessTemp = function(guess){
    var guessDifference = this.numberToGuess - guess;
    var getPositiveDiff = function(gd) {
      return gd > 0 ? gd : (gd * -1);
    };
    var difference = getPositiveDiff(guessDifference);

    var guessTemp = function(diff){  
      if(diff <= 2){
        console.log("Scorching hot!");
      } else if ((diff > 2) && (diff <= 5)){
        console.info("Really hot!");
      } else if ((diff > 5) && (diff <= 10)) {
        console.info("Hot!")
      } else if ((diff > 10) && (diff <= 20)) {
        console.log("Warm");
      } else if ((diff > 20) && (diff <= 35)){
        console.info("Cold");
      } else if ((diff > 35) && (diff <= 50)){
        console.info("Really cold");
      } else {
        console.info("Freezing cold!");
      }
    }

    var compareLastGuess = function(arr, currentGuess, objectiveNum){
      if(arr.length > 0){  
        var prevGuessDiff = getPositiveDiff(objectiveNum - arr[arr.length -1]);
        if(prevGuessDiff > difference){
          return "Getting hotter";
        } else {
          return "Getting colder";
        }
      };


    }
    console.log(compareLastGuess(this.playerGuesses, guess, this.numberToGuess));
    // console.log(compareLastGuess(this.playerGuesses, guess, this.numberToGuess))
    return guessTemp(difference);

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