const score = document.querySelector('.score'),
    start = document.querySelector('.start'),
    gameArea = document.querySelector('gameArea');

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};

function startRun(){
    Console.log('start');
}

function stopRun(event){
    event.preventDefault();
    keys[event.key] = true;
}

function startGame(event){
    event.preventDefault();
    start.classList.add('hide');
}

