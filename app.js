const countTime = document.getElementById('time');
const countScore = document.getElementById('score');
const randomWord = document.getElementById("word");
const inputWords = document.getElementById("text");
const endGame = document.getElementById("end-game-container");
const selectDifficulty = document.getElementById("difficulty");


let time = 10;
let score = 0;
let intervalId; 

const words = [
    "apple",
    "banana",
    "cat",
    "dog",
    "elephant",
    "fish",
    "giraffe",
    "hat",
    "ice cream",
    "jacket",
    "kite",
    "lion",
    "monkey",
    "nest",
    "ocean",
    "penguin",
    "queen",
    "rainbow",
    "sun",
    "tree",
    "umbrella",
    "violin",
    "whale",
    "xylophone",
    "yak",
    "zebra",
    "car",
    "flower",
    "house",
    "mountain"
];

//Создаю генератор, который будет выводить случайные слова из массива
function getRandomWord(words) {
    return words[Math.floor(Math.random() * words.length)];
}

randomWord.innerHTML = getRandomWord(words);
// Установка начального значения времени на странице
countTime.innerHTML = time; // отображаем начальное значение времени на странице

// Вызов функции setInterval после установки начального значения времени
intervalId = setInterval(updateCountdown, 1000);

function updateCountdown() {
    if (time < 0) {
        clearInterval(intervalId); 
        countScore.innerHTML = "0";
        gameOverScore();
    } else {
        countTime.innerHTML = `${time}s`; 
        time--;
    } 
}

function difficultyTime() {
    switch(selectDifficulty.value) {
        case "easy":
            time = time + 6;
            break;
        case "medium":
            time = time + 4;
            break;
        default:
            time = time + 2;
    }
}



// Добавляем обработчик события для поля ввода
inputWords.addEventListener('input', function() {
    if (inputWords.value === randomWord.innerHTML) {
        score++;
        countScore.innerHTML = score; // Обновляем отображение счетчика
        difficultyTime();
        // Получаем новое случайное слово после увеличения счетчика
        randomWord.innerHTML = getRandomWord(words);
        // Очищаем поле ввода
        inputWords.value = '';
    }
});

//создаю форму окончания игры 

function gameOverScore() {
    endGame.style.display = "block";
//создаю форму, на которую будут помещаться сообщения 
    const form = document.createElement("form");
  //заголовок  
    const message = document.createElement("h1")
    message.textContent = 'Time ran out';
    form.appendChild(message);
// строка  для отображения финального счета
    const finalScore = document.createElement("p");
    finalScore.textContent = `Your final score is ${score}`
    form.appendChild(finalScore);
    //создаю кнопку рестарат игры
    const restartGame = document.createElement("button");
    restartGame.textContent = "Restart"
    restartGame.onclick = function() {
        location.reload();
    }
    form.appendChild(restartGame);

    //добавляю форму на страницу
    endGame.appendChild(form);
}

