const buttonColours = ["green", "red", "yellow", "blue"];
const bodyElement = document.querySelector("body");
const h1Element  = document.querySelector("h1");
let userClickedPattern = [];
let gamePattern = [];
let randomChosenColour;
let userChosenColour;
let started = false;
let level = 0;

const playSound = (colour) => {
    const sound = new Audio(`sounds/${colour}.mp3`);

    sound.play();
}

const animatePress = (currentColour) => {
    currentColour.classList.add("pressed");
    setTimeout(() =>{
        currentColour.classList.remove("pressed");
    }, 100);
}

const gameOver = () => {
    bodyElement.classList.add("game-over");
    setTimeout(() => bodyElement.classList.remove("game-over"), 100);
    h1Element.innerHTML = "Game Over Press any key to restart";
    level = 0;
    started = false;
    playSound("wrong");
    startGame();

    
}

const startGame = () => {
    gamePattern = [];
    document.body.addEventListener("keydown", () => {
        if(!started){
            nextSequence();
        }
    })
}
const checkAnswer = () => {

    let j = 0;


    if(userClickedPattern.length === gamePattern.length){


        let i;
        for(i = 0; i < userClickedPattern.length; ++i){
            j = i;
            if(userClickedPattern[i] === gamePattern[i]){
                if(i === gamePattern.length -1){
                    setTimeout(() => {
                        nextSequence()
                    }, 1000);
                }
            }

            else if (userClickedPattern[j] !== gamePattern[j]) {
                gameOver();
                }
        }


    }
    
    else if (userClickedPattern[j] !== gamePattern[j]) {
            gameOver();
            }
    ++j;

 }

const nextSequence =  () => {
        userClickedPattern = [];
        started = true;
        ++level;
        h1Element.innerHTML = `Level ${level}`;

        const randomNumber = Math.floor(Math.random() * 4);

        randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);

    
        $(`.${randomChosenColour}`).fadeOut(100).fadeIn(100);

        playSound(randomChosenColour);

    }

const colouredButtons = document.querySelectorAll("div.btn");
colouredButtons.forEach((object, index) => {
    object.addEventListener("click", () => {

        userChosenColour  = buttonColours[index];
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);

        animatePress(object);
        checkAnswer();

    })
})

startGame();