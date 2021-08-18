let card = document.getElementsByClassName("card");
// if (!localStorage.getItem('l'))
    localStorage.setItem('l', JSON.stringify(1));
let level = localStorage.getItem('l');

function levels_card(level) {
    let card_details = [];
    let icon_tray = ['opencart', 'heart', 'diamond', 'star', 'btc', 'puzzle-piece', 'paper-plane', 'wifi', 'motorcycle', 'usd', 'arrows-alt','amazon', 'google-wallet'];
    icon_tray = shuffle(icon_tray);
    let inc = 0;
    for (let index = 0; index < 4*level; index++) {
        let card = document.getElementsByClassName("card");
        var li = document.createElement('li');
        li.setAttribute('class','card');
        li.setAttribute('type',`${icon_tray[inc]}`);
        var i_tag = document.createElement('i');
        i_tag.setAttribute('class',`fa fa-${icon_tray[inc]}`);
        li.appendChild(i_tag);
        if(index % 2 != 0) inc++;

        card_details.push(li);

        card = card_details[index];
        card.addEventListener("click", displayCard);
        card.addEventListener("click", cardOpen);
        card.addEventListener("click",congratulations);
    }
    return card_details;
}
let cards = levels_card(1);


const deck = document.getElementById("card-deck");

var countdown = document.querySelector(".countdown");
countdown.innerHTML = (localStorage.getItem('l')-1)+" mins 59 secs";
let max_moves = document.querySelector(".max-moves");
max_moves.innerHTML = (localStorage.getItem('l'))*cards.length;
let moves = 0;
let counter = document.querySelector(".moves");
let count = 1;

const stars = document.querySelectorAll(".fa-star");

let matchedCard = document.getElementsByClassName("match");

 let closeicon = document.querySelector(".close");

 let modal = document.getElementById("popup1")

var openedCards = [];


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};


document.body.onload = startGame();

function startGame(){
 
    openedCards = [];
    cards = [];
    cards = shuffle(levels_card(localStorage.getItem('l')));
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    moves = 0;
    counter.innerHTML = moves;
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
    second = 0;
    minute = 0; 
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    max_moves.innerHTML = (localStorage.getItem('l'))*cards.length;
    
    clearInterval(interval);
}


var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};


function cardOpen() {
    
    openedCards.push(this);
    var len = openedCards.length;
    if(len === 2){
        moveCounter();
        if((openedCards[0] && openedCards[1]) && openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
    // if (moves == 0 && len == 1) {
    //     startTimer();
    // }
};


function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}


function unmatched(){
    if((openedCards[0] && openedCards[1])) {
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event","unmatched");
        openedCards[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        openedCards = [];
    },1100);
}
}


function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}


function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}


function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    //start timer on first click
    if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }
    
    if(moves == (localStorage.getItem('l'))*cards.length) {
        startGame();
    }
    for( i= stars.length-1; i > ((cards.length/(2*moves))*10); i--){
        stars[i].style.visibility = "collapse";
    }
}


var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");

var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
        
        if(minute == (localStorage.getItem('l')-1) && second == 59) {
            startGame();
        }

    },1000);
}


function congratulations(){ 
    if (matchedCard.length == cards.length){
        clearInterval(interval);
        finalTime = timer.innerHTML;
        modal.classList.add("show");
        var starRating = document.querySelector(".stars").innerHTML;
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;
        let level_up = localStorage.getItem('l');
        level_up++;
        localStorage.setItem('l', JSON.stringify(level_up));

        
        countdown.innerHTML = (localStorage.getItem('l')-1)+" mins 60 secs";
        closeModal();

    };
}


function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        startGame();
    });
}


function nextLevelUp(){
    modal.classList.remove("show");
    startGame();
}


for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click",congratulations);
};
