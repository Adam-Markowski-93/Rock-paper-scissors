//Object to keep players selction and game statistics
const game = {
    playerHand: null,
    aiHand: null,
}

const gameSummary = {
    games: 0,
    wins: 0,
    draws: 0,
    losses: 0,
}

//Variables 

const startGameButton = document.querySelector('.button__button');
const options = [...document.querySelectorAll(".main__options")];

let liveCounter = 3;
const liveAmount = document.querySelector('.main__live-amount');

liveAmount.textContent = liveCounter;

// Player selection func
function handSelect() {
    game.playerHand = this.dataset.option;
    options.forEach(option => option.style.boxShadow = ""); // In first action style - box shadow is removed
    options.forEach(option => option.classList.remove('main__options--active')) // The same with modifier class
    this.style.boxShadow = "0 0 3px 1px rgba(82, 153, 211, 1)";
    this.classList.add("main__options--active");
}

// Ai selection func
function aiHand() {
    const aiChooiceImage = document.querySelector('.main__ai-chooice-image');

    aiChooiceImage.src = "";

    game.aiHand = options[Math.floor(Math.random() * options.length)].dataset.option;
    console.log(aiHand); // Drawing a AI selection with Math module and get a dataset information, in next line I used this info to change images sources and display it in game.
    if (game.aiHand === "nożyczki") {
        aiChooiceImage.src = "img/nozyczki.jpg";
    } else if (game.aiHand === "papier") {
        aiChooiceImage.src = "img/papier.jpg";
    } else {
        aiChooiceImage.src = "img/kamien.jpg";
    }
}

// Function to check who win and return string value
const checkResult = (player, ai) => {
    if (player === ai) return "draw";
    else if (player === "nożyczki" && ai === "papier" || player === "papier" && ai === "kamień" || player === "kamień" && ai === "nożyczki") return "win";
    else return "lose";
}

function addStatistics(result) {
    document.querySelector('.results__span-player').textContent = game.playerHand;
    document.querySelector('.results__span-ai').textContent = game.aiHand;
    const spanResult = document.querySelector('.results__span-result');

    if (result === "lose") {
        spanResult.style.color = "red";
        spanResult.textContent = "Przegrałeś :(";
        --liveCounter;
        ++gameSummary.losses;
        ++gameSummary.games;
    } else if (result === "win") {
        spanResult.style.color = "yellowgreen";
        spanResult.textContent = "Wygrana !";
        ++liveCounter;
        ++gameSummary.wins;
        ++gameSummary.games;
    } else if (result === "draw") {
        spanResult.textContent = "Remis";
        ++gameSummary.draws;
        ++gameSummary.games;
    }


    const resultSpans = [...document.querySelectorAll('p > span')]; //Get to array all span to display results.
    const gameSummaryValues = Object.values(gameSummary); //Get to array ale game statistics

    //Attribute a values of Object(gameSummary) and suitable to span which keeping a statistics
    gameSummaryValues.forEach((item, index) => {
        resultSpans[index].textContent = item;
    })

}

function startGame() {
    if (!game.playerHand) {
        return alert("Wybierz rękę którą chcesz zagrać !");
    } //Verifing if player choose a hand.
    if (liveAmount.textContent == 0) {
        return alert("Koniec gry");
    } //Verifing if player have lives

    aiHand();

    addStatistics(checkResult(game.playerHand, game.aiHand));

    liveAmount.textContent = liveCounter;

}


// Listeners
options.forEach((option) => option.addEventListener('click', handSelect));

startGameButton.addEventListener('click', startGame);