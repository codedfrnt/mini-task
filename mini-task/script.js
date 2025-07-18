// Memory Game Logic

// List of card values (use emojis for simplicity)
const cardValues = ['🐶', '🐱', '🦊', '🐻', '🐼', '🦁', '🐸', '🐵'];
let cards = [];
let flippedCards = [];
let matchedCards = 0;
const gameBoard = document.getElementById('game-board');
const restartBtn = document.getElementById('restart-btn');

// Shuffle function (Fisher-Yates)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Create card elements and add to board
function setupBoard() {
    gameBoard.innerHTML = '';
    flippedCards = [];
    matchedCards = 0;
    // Duplicate and shuffle cards
    cards = shuffle([...cardValues, ...cardValues]);
    cards.forEach((value, idx) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.dataset.index = idx;
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${value}</div>
                <div class="card-back">?</div>
            </div>
        `;
        card.addEventListener('click', handleCardClick);
        gameBoard.appendChild(card);
    });
}

// Handle card click
function handleCardClick(e) {
    const card = e.currentTarget;
    if (
        card.classList.contains('flipped') ||
        flippedCards.length === 2 ||
        card.classList.contains('matched')
    ) {
        return;
    }
    card.classList.add('flipped');
    flippedCards.push(card);
    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

// Check if two flipped cards match
function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards += 2;
        flippedCards = [];
        if (matchedCards === cards.length) {
            setTimeout(() => {
                alert('Congratulations! You found all pairs!');
            }, 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 900);
    }
}

// Restart game
function restartGame() {
    setupBoard();
}

// Event listener for restart button
restartBtn.addEventListener('click', restartGame);

// Initial setup
setupBoard(); 