const score = document.querySelector('.score'), // создаём объекты
    start = document.querySelector('.start'),
    gameArea = document.querySelector('.gameArea'),
    car = document.createElement('div');
car.classList.add('car');

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const keys = { // задаём первоначальные значения кнопок
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};

const setting = { // задаём первоначальные показатели
    start: false,
    score: 0,
    speed: 3,
    traffic: 1.5
};

function getQuanityElements(heightElement){ // для бесконечного появления элементов
    return document.documentElement.clientHeight / heightElement + 1;
}

function startGame(){ // главная функция
    start.classList.add('hide'); // кнопка начала игры

    for (let i = 0; i < getQuanityElements(100); i++){ // создаём линии на дороге
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * 100) + 'px';
        line.y = i * 100;
        gameArea.appendChild(line);
    }

    for (let i = 0; i < getQuanityElements(100 * setting.traffic); i++) { // создаём второстепенные машинки
        const enemy = document.createElement('div');
        let enemyImg = Math.floor(Math.random() * 5) + 2; // рандомно выбираем второстепенную машинку 
        enemy.classList.add('enemy');  
        enemy.y = -100 * setting.traffic * (i + 1);   
        enemy.style.left = (Math.random() * (gameArea.offsetWidth - 50)) + 'px'; 
        enemy.style.top = (i * 100) + 'px';
        enemy.style.background = `transparent url(./image/${enemyImg}.png) center / cover no-repeat` ;
        gameArea.appendChild(enemy); 
    }

    setting.start = true;  
    gameArea.appendChild(car); // создаём нашу машинку
    setting.x = car.offsetLeft; // функция управления машинкой
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
}

function playGame(){  // генерируем дорогу, второстепенные машинки и начинаем игру
    moveRoad();
    moveEnemy();
    if(setting.start){
        if(keys.ArrowLeft && setting.x > 0){
            setting.x -= setting.speed;
        }
        if(keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)){
            setting.x += setting.speed;
        }
        if(keys.ArrowUp && setting.y > 0){
            setting.y -= setting.speed;
        }
        if(keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)){
            setting.y += setting.speed;
        }

        car.style.left = setting.x +'px';
        car.style.top = setting.y +'px';

        requestAnimationFrame(playGame);
    }
} 

function startRun(event){ // функция старта машинки
    event.preventDefault();
    if (keys.hasOwnProperty(event.key)) { // исключаем лишние кнопки
        keys[event.key] = true;
    }
    keys[event.key] = true;
}

function stopRun(event){ // функция остановки машинки
    event.preventDefault();
    if (keys.hasOwnProperty(event.key)) { // исключаем лишние кнопки
        keys[event.key] = true;
    }
    keys[event.key] = false;
}

function moveRoad() { // бесконечное движение дороги
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(line){
        line.y += setting.speed;
        line.style.top = line.y +'px';
        if(line.y >= document.documentElement.clientHeight){
            line.y = -100;
        }
    })
}

function moveEnemy(){ // бесконечное движение второстепенных машинок
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(item){
        item.y += setting.speed / 2;
        item.style.top = item.y + 'px';
        
        if(item.y >= document.documentElement.clientHeight){
        item.y = -150 * setting.traffic;
        item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        }
    });
}