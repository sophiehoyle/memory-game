//List that holds the cards
let card = document.getElementsByClassName("card");
let cards = [...card]

//Declaring variables
const deck = document.getElementById("card-deck");
let counter = document.querySelector(".moves");
let moves = 0;
const stars = document.querySelectorAll(".fa-star");
let starsList = document.querySelectorAll(".stars li");
let matchedCard = document.getElementsByClassName("match");
let modal = document.getElementById("popupEnd")
let closeicon = document.querySelector(".close");

//Empty array opened cards
var openedCards = [];

//Shuffle the cards
function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue, randomIndex;
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
};

//Shuffles the cards when the page is refreshed
document.body.onload = startGame();

//Function to start a new game
function startGame() {
	openedCards = [];
	cards = shuffle(cards);
	for (var i = 0; i < cards.length; i++) {
		deck.innerHTML = "";
		[].forEach.call(cards, function(item) {
			deck.appendChild(item);
		});
		cards[i].classList.remove("show", "open", "match", "noMatch", "disabled");
	}

	moves = 0;
	counter.innerHTML = moves;
	for (var i = 0; i < stars.length; i++) {
		stars[i].style.color = "#FFD700";
		stars[i].style.visibility = "visible";
	}
	//reset the timer
	second = 0;
	minute = 0;
	hour = 0;
	var timer = document.querySelector(".timer");
	timer.innerHTML = "0 mins 0 secs";
	clearInterval(interval);
}

//Display cards with the open and show function
var displayCard = function() {
	this.classList.toggle("show");
	this.classList.toggle("open");
	this.classList.toggle("disabled");
};

//Start timer when card clicked
var second = 0,
minute = 0;
hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer() {
	interval = setInterval(function() {
		timer.innerHTML = minute + "mins " + second + "secs";
		second++;
		if (second == 60) {
			minute++;
			second = 0;
		}
		if (minute == 60) {
			hour++;
			minute = 0;
		}
	}, 1000);
}

//See if cards match
function cardOpen() {
	openedCards.push(this);
	var num = openedCards.length;
	if (num === 2) {
		countMoves();
		if (openedCards[0].type === openedCards[1].type) {
			matched();
		} else {
			noMatch();
		}
	}
};

//Cards match
function matched() {
	openedCards[0].classList.add("match", "disabled");
	openedCards[1].classList.add("match", "disabled");
	openedCards[0].classList.remove("show", "open", "no-event");
	openedCards[1].classList.remove("show", "open", "no-event");
	openedCards = [];
}

//Cards dont match
function noMatch() {
	openedCards[0].classList.add("noMatch");
	openedCards[1].classList.add("noMatch");
	disable();
	setTimeout(function() {
		openedCards[0].classList.remove("show", "open", "no-event", "noMatch");
		openedCards[1].classList.remove("show", "open", "no-event", "noMatch");
		enable();
		openedCards = [];
	}, 800);
}

function disable() {
	Array.prototype.filter.call(cards, function(card) {
		card.classList.add('disabled');
	});
}

//Enable cards and disable matched cards
function enable() {
	Array.prototype.filter.call(cards, function(card) {
		card.classList.remove('disabled');
		for (var i = 0; i < matchedCard.length; i++) {
			matchedCard[i].classList.add("disabled");
		}
	});
}

//Count the players moves
function countMoves() {
	moves++;
	counter.innerHTML = moves;
	//start timer on move
	if (moves == 1) {
		second = 0;
		minute = 0;
		hour = 0;
		startTimer();
	}
	//Rating
	if (moves > 8 && moves < 12) {
		for (i = 0; i < 3; i++) {
			if (i > 1) {
				stars[i].style.visibility = "collapse";
			}
		}
	} else if (moves > 13) {
		for (i = 0; i < 3; i++) {
			if (i > 0) {
				stars[i].style.visibility = "collapse";
			}
		}
	}
}

//Popup when cards all matched
function congratulations() {
	if (matchedCard.length == 16) {
		clearInterval(interval);
		finalTime = timer.innerHTML;
		//Show popup
		modal.classList.add("show");
		//Rating
		var starRating = document.querySelector(".stars").innerHTML;
		//Display the move, rating and time
		document.getElementById("finalMove").innerHTML = moves;
		document.getElementById("starRating").innerHTML = starRating;
		document.getElementById("totalTime").innerHTML = finalTime;
		closeModal();
	};
}

//Close the popup
function closeModal() {
	closeicon.addEventListener("click", function(e) {
		modal.classList.remove("show");
		startGame();
	});
}

//Play again button
function playAgain() {
	modal.classList.remove("show");
	startGame();
}

//Loop event listener
for (var i = 0; i < cards.length; i++) {
	card = cards[i];
	card.addEventListener("click", displayCard);
	card.addEventListener("click", cardOpen);
	card.addEventListener("click", congratulations);
};

//Add sound effects when card clicked
function playSound() {
	var sound = document.getElementById("audio");
	sound.play();
}
