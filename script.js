// Create disco floor tiles
const discoFloor = document.querySelector('.disco-floor');
for (let i = 0; i < 16; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.dataset.index = i;
    discoFloor.appendChild(tile);
}

// Set up audio files (you'll need to provide these audio files)
const audioFiles = [
    'audio1.mp3', 'audio2.mp3', 'audio3.mp3', 'audio4.mp3',
    'audio5.mp3', 'audio6.mp3', 'audio7.mp3', 'audio8.mp3',
    'audio9.mp3', 'audio10.mp3', 'audio11.mp3', 'audio12.mp3',
    'audio13.mp3', 'audio14.mp3', 'audio15.mp3', 'audio16.mp3'
];

// Create audio elements
const audioElements = audioFiles.map(file => {
    const audio = new Audio(file);
    audio.preload = 'auto';
    return audio;
});

// Cat movement
const cat = document.querySelector('.cat');
let catPosition = { x: 0, y: 0 };
let currentAudio = null;
let lastColoredTile = null;

function getRandomGlowColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsla(${hue}, 100%, 50%, 0.8)`;
}

function moveCat(direction) {
    const oldX = catPosition.x;
    const oldY = catPosition.y;

    switch(direction) {
        case 'up':
            if (catPosition.y > 0) catPosition.y--;
            break;
        case 'down':
            if (catPosition.y < 3) catPosition.y++;
            break;
        case 'left':
            if (catPosition.x > 0) catPosition.x--;
            break;
        case 'right':
            if (catPosition.x < 3) catPosition.x++;
            break;
    }
    
    const newX = catPosition.x * 187.5;
    const newY = catPosition.y * 187.5;
    
    // Teleport cat
    cat.style.transition = 'none';
    cat.style.transform = `translate(${newX}px, ${newY}px) rotateX(-60deg) rotateZ(180deg) translateY(-1580px)`;
    
    // Reset last colored tile
    if (lastColoredTile) {
        lastColoredTile.style.backgroundColor = 'white';
        lastColoredTile.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.5)';    
    }
    
    const tileIndex = catPosition.y * 4 + catPosition.x;
    const tile = discoFloor.children[tileIndex];
    const glowColor = getRandomGlowColor();
    
    tile.style.backgroundColor = glowColor;
    tile.style.boxShadow = `0 0 20px ${glowColor}, 0 0 40px ${glowColor}, 0 0 60px ${glowColor}`;
    tile.style.transition = 'background-color 0.5s, box-shadow 0.5s';
    
    lastColoredTile = tile;
    
    // Stop the current audio if it's playing
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    
    // Play the new audio
    currentAudio = audioElements[tileIndex];
    currentAudio.play();
}

// Initial cat position
moveCat('right'); // This will place the cat on the starting tile

function getRandomLightColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 100%, 75%)`;
}

// Button event listeners
document.getElementById('up').addEventListener('click', () => moveCat('up'));
document.getElementById('down').addEventListener('click', () => moveCat('down'));
document.getElementById('left').addEventListener('click', () => moveCat('left'));
document.getElementById('right').addEventListener('click', () => moveCat('right'));

// Keyboard event listener
document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'ArrowUp':
            moveCat('up');
            break;
        case 'ArrowDown':
            moveCat('down');
            break;
        case 'ArrowLeft':
            moveCat('left');
            break;
        case 'ArrowRight':
            moveCat('right');
            break;
    }
});

// Update cat image to use GIF
const catImg = document.querySelector('.cat img');
catImg.src = 'cat.gif';