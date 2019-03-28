$(document).ready(function (event) {

    // Creating variables to store wins, losses, time left, and when time is up. 
    var wins = 0;
    var losses = 0;
    var timeLeft = 10;
    var timesUp = 0;

    // Creating variables to store my 5 questions in. 
    var question1 = {
        question: "Question 1: In the Pilot episode, who started their first day at Dunder Mifflin Scranton?",
        answerChoices: ["A. Jim", "B. Ryan", "C. Micheal", "D. Erin"],
        answer: "B.",
    }

    var question2 = {
        question: "Question 2: What is Andy's nickname for Jim?",
        answerChoices: ["A. Jimbo", "B. Fat Halpert", "C. Jimothy", "D. Big Tuna"],
        answer: "D.",
    }

    var question3 = {
        question: "Question 3: What 90's movie does Michael show for Movie Monday?",
        answerChoices: ["A. Never Been Kissed", "B. Batman Returns", "C. Can't Hardly Wait", "D. Varsity Blues"],
        answer: "D.",
    }

    var question4 = {
        question: "Question 4: Who gets flashed in the parking lot?",
        answerChoices: ["A. Meredith", "B. Pam", "C. Phyllis", "D. Creed"],
        answer: "C.",
    }

    var question5 = {
        question: "Question 5: \"There's been a murder in...\" Where?",
        answerChoices: ["A. Scranton", "B. Atlanta", "C. New York", "D. Savannah"],
        answer: "D.",
    }

    // Creating arrays for questions, answer options, and answers
    var questions = [question1.question, question2.question, question3.question, question4.question, question5.question];
    console.log(questions);


    var answerOptions = [question1.answerChoices, question2.answerChoices, question3.answerChoices, question4.answerChoices, question5.answerChoices];

    var answers = [question1.answer, question2.answer, question3.answer, question4.answer, question5.answer];
    console.log(answers);

    // Creating a functions to create an img tag and display a GIF within it. 
    function winPage() {
        $(".gifs").html("<img src=assets/images/win.gif class='winGif'>")
    }

    function losePage() {
        $(".gifs").html("<img src=assets/images/lose.gif class='loseGif'>")
    }

    function endPage() {
        $(".gifs").html("<img src=assets/images/end.gif class='endGif'>")
    }

    // Creating a variable to use for later.
    var number = 0;

    // Creating a countdown function while the user is answering the question.
    function countdown() {
        if (timeLeft === 0) {
            clearInterval(intervalId);
            $(".timer").text("Time Remaining: " + 0 + " Seconds");
            $(".results").text("Times Up! The right answer is: " + answers[number]).css("color", "rgb(234, 235, 226)");
            losePage();
            timesUp++;
            number++;
            setTimeout(game, 3000);
        }
        else {
            timeLeft--;
            $(".timer").text("Time Remaining: " + timeLeft + " Seconds");
        }
    }

    // Creating a variable to replace divs at start of game. 
    var replaceOptions = "<div class='row'>" +

        "<div class='row choice1'></div>" +
        "<div class='row choice2'></div>" +
        "<div class='row choice3'></div>" +
        "<div class='row choice4'></div>"

    // Creating the actual functioning game.
    function game() {
        if (number < questions.length) {
            timeLeft = 10;
            $(".results").text("");
            $(".gifs").html(replaceOptions);
            $(".timer").text("Time Remaining: " + timeLeft + " Seconds");
            intervalId = setInterval(countdown, 1000);
            $(".question").text(questions[number]);
            $(".choice1").html("<button class='buttons button1' value=" + answerOptions[number][0] + ">" + answerOptions[number][0] + "</button>");
            $(".choice2").html("<button class='buttons button2' value=" + answerOptions[number][1] + ">" + answerOptions[number][1] + "</button>");
            $(".choice3").html("<button class='buttons button3' value=" + answerOptions[number][2] + ">" + answerOptions[number][2] + "</button>");
            $(".choice4").html("<button class='buttons button4' value=" + answerOptions[number][3] + ">" + answerOptions[number][3] + "</button>");

            $(".buttons").on("click", function () {
                var userClick = $(this).attr("value");
                console.log(userClick);

                if (userClick === answers[number]) {
                    $(".results").text("You're Right! The right answer is: " + answers[number]).css("color", "rgb(234, 235, 226)");
                    wins++;
                    clearInterval(intervalId);
                    winPage();
                    number++;
                    setTimeout(game, 3000);

                }
                else {
                    $(".results").text("You're Wrong! The right answer is: " + answers[number]).css("color", "rgb(234, 235, 226)");
                    losses++;
                    clearInterval(intervalId);
                    losePage();
                    number++;
                    setTimeout(game, 3000);

                }
            });


        }

        else {
            clearInterval(intervalId);
            endPage();
            $(".results").text("Game Over! Press Restart to Play Again!").css("color", "rgb(234, 235, 226)");
            $(".question").text("");
            $(".unanswered").text("Unanswered: " + timesUp);
            $(".right").text("Right: " + wins);
            $(".wrong").text("Wrong: " + losses);

            $(".restart").show();
        }
    }
    // Creating an on click event to start game once start button is clicked. 
    $(".start").on("click", function () {
        $(this).hide();
        game();

    });
    // Creating a function to reset the game once restart button is pressed.
    function reset() {
        $(".restart").hide();
        losses = 0;
        $(".wrong").text("");
        wins = 0;
        $(".right").text("");
        timesUp = 0;
        $(".unanswered").text("");
        number = 0;
        game();
    }

    $(".restart").hide();


    $(".restart").on("click", function () {
        reset();
    });

}); 
