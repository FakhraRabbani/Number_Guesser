/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify player of the correct answer if loose
- Let player chose to play again
*/

//Create Variables
//Game Values
let min = 1;
let max = 10;
let winningNum = getRandomNum(min, max);
let guessesLeft = 3;

//UI Elements
const game = document.querySelector('#game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessBtn = document.querySelector('#guess-btn');
const guessInput = document.querySelector('#guess-input');
const message = document.querySelector('.message');

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener
game.addEventListener('mousedown', function (e) {
    if (e.target.className === 'play-again') {
        //Re-load the page
        window.location.reload();
    }   
})

//Listen for guess
guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value);

    //Validate input
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    
    //Check if won
    if (guess === winningNum) {
        //Game Over - won

        gameOver(true, `${winningNum} is correct, YOU WIN!`);
        
        //Disable input
        //guessInput.disabled = true;
        //Change border color
        guessInput.style.borderColor = 'green';
        //Set message
        //setMessage(`${winningNum} is correct, YOU WIN!`, 'green');
        
    }
    else {
        //Wrong number
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            //Game Over - lost
            gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`)

            
            //Disable input
            //guessInput.disabled = true;
            //Change border color
            //guessInput.style.borderColor = 'red';
            //Set message
            //setMessage(`Game Over, you lost. The correct number was ${winningNum}`, 'red');
        
        }
        else {
            //Game-continues Answer wrong

            //Change border color
            guessInput.style.borderColor = 'red';

            //Clear Input
            guessInput.value = '';

            //Tell user its wrong no
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
        }
            
    }
});

//Game Over
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';

    //Disable input
    guessInput.disabled = true;
    //Change border color
    guessInput.style.borderColor = color;
    //Set text color
    //message.style.color = color;
    //Set message
    setMessage(msg, color);

    //Play Again
    guessBtn.value = 'Play again';
    //Append class
    guessBtn.className += 'play-again';

}

//Get Winning Number
function getRandomNum(min) {
    return (Math.floor(Math.random() * (max-min+1)+min));
}

//Set Message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}


