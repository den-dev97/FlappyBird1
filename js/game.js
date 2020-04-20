// Переменные
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// Переменные-объекты
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();
//Отступ между трубами
var gap = 90;
// Позиция птички
var xPos = 10;
var yPos = 150;
var grav = 1.2;
// Счёт
var score = 0;
// Создание блоков
var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
}
// Подключение объектов
bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

// Звуковое сопровождение
var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

document.addEventListener("keydown", moveUp); 

function moveUp() {
    yPos -=25;
    fly.play();
}


// Рисовка объектов в Canvas
function draw() {
    ctx.drawImage(bg, 0, 0);

    for(var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        if(pipe[i].x == 90) {
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        };
// Отслеживание столкновений
        if(xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
                || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) 
                || yPos + bird.height >= cvs.height -fg.height) {
                    location.reload(); //Перезагрузка страницы
                }
        if(pipe[i].x == 5) {
            score ++;
            score_audio.play();

        }
};
   ctx.drawImage(fg, 0, cvs.height - fg.height);
   ctx.drawImage(bird, xPos, yPos);

    ctx.fillStyle = "#000"
    ctx.font = "24px Verdana";
    ctx.fillText("Счёт: " + score, 10, cvs.height - 20)

//   Падение птички
   yPos += grav;
   requestAnimationFrame(draw);
}
//По нажатию клавиши птичка поднимается вверх
function moveUp() {
    yPos -=30;
}
pipeBottom.onload = draw;
