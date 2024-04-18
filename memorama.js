document.addEventListener('DOMContentLoaded', () => {
    const memoryGame = document.querySelector('.memory-game');
    let cards = Array.from(memoryGame.querySelectorAll('.memory-card'));
    cards = shuffle(cards);

    while (memoryGame.firstChild) {
        memoryGame.removeChild(memoryGame.lastChild);
    }

    cards.forEach(card => {
        memoryGame.appendChild(card);
        card.addEventListener('click', flipCard);
    });
});

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.classList.add('sparkle-effect');
    secondCard.classList.add('sparkle-effect');

    setTimeout(() => {
        firstCard.classList.remove('sparkle-effect');
        secondCard.classList.remove('sparkle-effect');
    }, 1000);  // Duración de la animación

    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard, firstCard, secondCard] = [false, false, null, null];
}


//Animación full pantalla
    