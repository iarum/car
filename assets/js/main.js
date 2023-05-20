let width = $(window).width();
let height = $(window).height();
let gameStarted = false;

let car = $('.car');
let score = 0;

let bgAudio = new Audio('../assets/sounds/bg.mp3');
let coin = new Audio('../assets/sounds/coin.mp3');
let death = new Audio('../assets/sounds/death.mp3');

function randomNumber(from, to) {
    return Math.floor((Math.random() * to) + from);
}

$(document).on('keypress', function (e) {
    let key = e.which;

    if (key == 13) {
        $('.start').detach();
        gameStarted = true;
        bgAudio.play();
    }
    // a 97, d 100, w 119, s 115
    if (gameStarted) {
        if (key == 119) {
            car.css('top', "-35%");
        }
        if (key == 115) {
            car.css('top', "20%");
        }
        if (key == 100) {
            car.css('left', car.offset().left + 40 + 'px');
        }
        if (key == 97) {
            car.css('left', car.offset().left - 40 + 'px');
        }
    }
});

// GAME STARTED 👇

// ☁
setInterval(function () {
    $('.clouds').append(`<i class="fa-solid fa-cloud cloud" style="top: ${randomNumber(0, height * 0.75)}px; left: ${width}px;"></i>`);
    setTimeout(function () {
        $('.clouds').find('.cloud:first').detach();
    }, 15000)
}, 2000)

// 🚗
setInterval(function () {
    $('.lines').append(`<div class="line" style="left: ${width}px;"></div>`);
    setTimeout(function () {
        $('.lines').find('.line:first').detach();
    }, 15000)
}, 400)

// 🌲
setInterval(function () {
    $('.trees').append('<img src="assets/img/tree.png" class="tree" style="left:' + width + 'px; "/>');
    setTimeout(function () {
        $('.trees').find('.tree:first').detach();
    }, 8000)
}, 5000)

setInterval(function () {
    $('.grass').append('<img src="assets/img/grass.png" class="gras" style="left:' + width + 'px; "/>');
    setTimeout(function () {
        $('.grass').find('.gras:first').detach();
    }, 8000)
}, 4500)

// 🐛
setInterval(function () {
    if (gameStarted) {
        let position = ['0', '85px']
        let currentPosition = position[Math.floor(Math.random() * position.length)];
        $('.worms').append(`<img class="worm" src="assets/img/hole.png" style="top: ${currentPosition}; left: ${width}px;"/>`);
        setTimeout(function () {
            $('.worms').find('.worm:first').detach();
        }, 8000)
    }
}, 2100)

// 💲
setInterval(function () {
    if (gameStarted) {
        let position = ['7px', '94px']
        let currentPosition = position[Math.floor(Math.random() * position.length)];
        $('.coins').append(`<img class="coin" src="assets/img/star.png" style="top: ${currentPosition}; left: ${width}px;"/>`);
    }
}, 3500)

// Win or die
setInterval(function () {
    if (gameStarted) {
        $('.worm').each(function () {
            if (
                (car.offset().left - $(this).offset().left) < 50 &&
                (car.offset().left - $(this).offset().left) > - 130 &&
                (car.offset().top - $(this).offset().top) < 30 &&
                (car.offset().top - $(this).offset().top) > - 70
            ) {
                $('.car').detach();
                death.play();
                $('.end').find('span').text(score);
                $('.end').show();
            }
        })

        $('.coin').each(function () {
            if (
                (car.offset().left - $(this).offset().left) < 50 &&
                (car.offset().left - $(this).offset().left) > - 130 &&
                (car.offset().top - $(this).offset().top) < 10 &&
                (car.offset().top - $(this).offset().top) > - 70
            ) {
                score++;
                coin.play();
                $(this).detach();
                $('.score').find('span').text(score);

            }
        })
    }
}, 10)

$('.reload').click(function () {
    location.reload();
});