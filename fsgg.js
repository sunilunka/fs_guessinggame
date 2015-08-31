;(function(window, document, $){

  console.log("Script running.");

  var Game = function(){
    this.numberToGuess = this.generateNumber();
    this.attemptsRemaining = 20;
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

  Game.prototype.subtractGuess = function(number){
    $("#guessesLeft").html(number);
    return;
  };

  Game.prototype.userGuessLogger = function(number, cls){
    var $numParent = $("<div>");
    var $numElement = $("<h4>");
    $numParent.addClass("guessHolder")
    .addClass(cls)
    .html(number)
    .prependTo("#guessLog");
    console.log($numParent, number);
    // $("#guessLog");
  }

  Game.prototype.checkGuess = function(entry){
    var guess = parseInt(entry);
    if(isNaN(guess) || (/\D/g.test(entry))){
      Game.prototype.displayFeedback("inputError", "That is not a valid number! <br> Try again");
    } else if(this.isRepeat(this.playerGuesses, guess)){
      Game.prototype.displayFeedback("inputError", "You have already used that sonobuoy! <br> Try again!");
    } else if ( (guess < 1 ) || (guess > 100) ){
      Game.prototype.displayFeedback("inputError", "Our sonobuoys channels only go from <br> 1 - 100 <br> Try again!");

    } else {
      if(this.attemptsRemaining > 1){
        this.attemptsRemaining -= 1;
        this.guessOutput(guess);
        this.playerGuesses.push(guess);
      } else {
        this.attemptsRemaining = 0;
        $("#ping, #hint").prop("disabled", true);
      };
      this.subtractGuess(this.attemptsRemaining);
      console.log(this.playerGuesses);
    }
  }

  // Game.prototype.trackGuesses = function(button){
  //   if(button.id === "hint"){
  //     this.attemptsRemaining -= 3;
  //   } else if(button.id === "ping"){
  //     this.attemptsRemaining -= 1;
  //   }
  // }

  Game.prototype.displayFeedback = function(cls, msgOne, msgTwo){
    $("#ping, #hint").prop("disabled", true);
    $("#userMessage").addClass(cls);
    $("#userMessage h3").html(msgOne);
    $("#userMessage h4").html(msgTwo);
    $("#userMessage").fadeIn("slow", function(){
      $("input")
      .val("")
      .blur();  
    }).delay(1500).fadeOut("slow", function(){
      $(this).removeClass();
      $("#ping, #hint").prop("disabled", false);
      $("input")
      .focus();
      console.log(this, $(this));
    });

    return;
  }

  Game.prototype.torpedoEnabled = function(){
    $("#hint, #ping").prop("disabled", true);
    $("#torpedo").prop("disabled", false)
      .addClass("torpedo-enabled")
      .fadeIn("fast", function(){
        $("input").val("")
        .prop("disabled", true);
      });
  }


  Game.prototype.guessOutput = function(guess){
    var guessDifference = this.numberToGuess - guess;
    var pgs = this.playerGuesses;
    var ntg = this.numberToGuess;
    var getPositiveDiff = function(gd) {
      return gd > 0 ? gd : (gd * -1);
    };
    var difference = getPositiveDiff(guessDifference);



    var guessTemp = function(diff){  
      if(diff === 0){
        Game.prototype.displayFeedback("hot", "HOT CONTACT, launch the torpedo!" );
        Game.prototype.torpedoEnabled();
      } else if(diff <= 2){
        Game.prototype.displayFeedback("hot", "Really hot, strong echoes!", compareLastGuess(pgs, guess, ntg) + " " + higherOrLower(guessDifference));
        Game.prototype.userGuessLogger(guess, "hot");
      } else if ((diff > 2) && (diff <= 5)){
        Game.prototype.displayFeedback("gettingHotter", "Hot, good echoes!", compareLastGuess(pgs, guess, ntg) + " " + higherOrLower(guessDifference));
        Game.prototype.userGuessLogger(guess, "gettingHotter"); 
        console.info("Really hot!");
      } else if ((diff > 5) && (diff <= 10)) {
        Game.prototype.displayFeedback("warm", "Warm, getting some good echoes...", compareLastGuess(pgs, guess, ntg) + " " + higherOrLower(guessDifference));
        Game.prototype.userGuessLogger(guess, "warm");
        console.info("Hot!")
      } else if ((diff > 10) && (diff <= 20)) {
        Game.prototype.displayFeedback("cold", "...getting some weak echoes...warming up...", compareLastGuess(pgs, guess, ntg) + " " + higherOrLower(guessDifference));
        Game.prototype.userGuessLogger(guess, "cold");
      } else if ((diff > 20) && (diff <= 35)){
        Game.prototype.displayFeedback("reallyCold", "Cold...but maybe a faint echo...", compareLastGuess(pgs, guess, ntg) + " " + higherOrLower(guessDifference));
        Game.prototype.userGuessLogger(guess, "reallyCold");
      } else {
        Game.prototype.displayFeedback("freezing", "No echoes at all, freezing cold!", compareLastGuess(pgs, guess, ntg) + " " + higherOrLower(guessDifference));
        Game.prototype.userGuessLogger(guess, "freezing");
        console.info("Freezing cold!");
      }
    };

    var compareLastGuess = function(arr, currentGuess, objectiveNum){
      if(arr.length > 0){  
        var prevGuessDiff = getPositiveDiff(objectiveNum - arr[arr.length -1]);
        if(prevGuessDiff > difference){
          return "Getting hotter...";
        } else {
          return "Getting colder...";
        }
      } else {
        return "";
      }
    };



    var higherOrLower = function(rawDiff){
      if(rawDiff > 0){
        return "try a higher number";
      } else {
        return "try a lower number";
      }
    }


    console.log(this.attemptsRemaining);
    console.log(compareLastGuess(this.playerGuesses, guess, this.numberToGuess));
    console.log(higherOrLower(guessDifference));
    guessTemp(difference);

  };


  function initGame(){
    var game = new Game();

    var reset = function(){
      $("#guessLog").empty();
      $("#hint, #ping").prop("disabled", false); 
      game = new Game();
      $("#guessesLeft").html(game.attemptsRemaining); 
      $("input").prop("disabled", false).focus();
      $("#torpedo").fadeOut("slow");

    }
    console.log(game.numberToGuess);
    $("#ping").click(function(e) { 
      e.preventDefault();
      console.log(e);
      game.checkGuess($("input").val());
    });

    $("input").on("keydown", function(event){  
      if(event.keyCode === 13){
        console.log(this);
        console.log($(this).val());
        game.checkGuess($(this).val());

      };
    })

    $("#hint").click(function(e){
      e.preventDefault();
      game.displayFeedback("hint", "You ask for more air support..." + "<br>" + "and find out the closest buoy is: <br>" + game.numberToGuess + "<br>", "...but six ships are damaged in the process.");
    })

    $("#reset").click(function(e){
      e.preventDefault();
      reset();
    });
  };

  initGame();

}(window, document, jQuery));