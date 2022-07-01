// //UI Labels
let breakLengthLabel = document.getElementById('break-length');
let sessionLengthLabel = document.getElementById('session-length');
let timerLabel = document.getElementById('timer-label');
let secondsLabel = document.getElementById('seconds-left');
let minutesLabel = document.getElementById('minutes-left');

let sessionContainerLbl = document.getElementById('session-container');


  secondsLabel.innerHTML = '00';
  breakLengthLabel.innerHTML = 5;
  sessionLengthLabel.innerHTML = 25;
  timerLabel.innerHTML = 'Session';
  minutesLabel.innerHTML = 25;


// //UI Buttons
let sessionIncrementBtn = document.getElementById('session-increment');
let sessionDecrementBtn = document.getElementById('session-decrement');
let breakIncrementBtn = document.getElementById('break-increment');
let breakDecrementBtn = document.getElementById('break-decrement');
let audioSound = document.getElementById('beep');

// //Event Listeners
sessionIncrementBtn.addEventListener('click', increaseSessionTime);
sessionDecrementBtn.addEventListener('click', decreaseSessionTime);
breakIncrementBtn.addEventListener('click', increaseBreakTime);
breakDecrementBtn.addEventListener('click', decreaseBreakTime);
let playPauseBtn = document.getElementById('start_stop');

let playStyling = document.querySelector('.fa-play');
let pauseStyling = document.querySelector('.fa-pause');

let breakMins = 5;
// //The countdown seconds
let secondsLeft = 0;
let minutesLeft = 25;
// //How long is the session
let sessionMins = 25;

let pause = false;

let breakTrueOrFalse = true;

function playSound() {
  audioSound.play();
}

function everySecond() {
  if (minutesLeft === 0 && secondsLeft === 0) {
    if (breakTrueOrFalse) {
      //It is the break
      playSound();
      breakTrueOrFalse = false;
      sessionContainerLbl.classList.remove('session-countdown');
      sessionContainerLbl.classList.add('break-countdown');
      coundownLabels('Break')
      startCountDown(breakMins);            
     
      
    } else {
      playSound();
      breakTrueOrFalse = true;
      sessionContainerLbl.classList.remove('break-countdown');
      sessionContainerLbl.classList.add('session-countdown');
      coundownLabels('Session')
      startCountDown(sessionMins);         
      
    }
  } else if (secondsLeft <= 0) {
    secondsLeft = 59;
    minutesLeft -= 1;
    minutesLabel.innerHTML = addZero(minutesLeft);
  }

  secondsLabel.innerHTML = addZero(secondsLeft);
  secondsLeft -= 1;
}

function startCountDown(minsLeft, ) {
  
  minutesLeft = minsLeft;
  secondsLeft = 0;
}

function coundownLabels(message){
  timerLabel.innerHTML = message;
}

function addZero(number) {
  return (parseInt(number, 10) < 10 ? '0' : '') + number;
}

playPauseBtn.addEventListener('click', playPauseLaunch);
//Time interval variable

var playPause;
//let playPause = setInterval(everySecond, 1000);
function playInterval() {
  playPause = setInterval(everySecond, 1000);
}
function clearPlayInterval() {
  clearInterval(playPause);
}

function playPauseLaunch() {
  if (pause) {
    clearPlayInterval();
    pause = false;
    pauseStyling.style.color = 'gray';
    playStyling.style.color = 'black';
    incrementAndDecrement(false);
  } else {
    pause = true;
    playInterval();
    playStyling.style.color = 'green';
    pauseStyling.style.color = 'black';
    incrementAndDecrement(true);
  }
}

function incrementAndDecrement(theValue) {
  sessionIncrementBtn.disabled = theValue;
  sessionDecrementBtn.disabled = theValue;
  breakIncrementBtn.disabled = theValue;
  breakDecrementBtn.disabled = theValue;
}

function increaseSessionTime() {
  if (sessionMins < 60) {
    sessionMins += 1;
    minutesLeft = sessionMins;
    if (sessionContainerLbl.classList.contains('session-countdown')) {
      minutesLabel.innerHTML = addZero(sessionMins);
    }
    sessionLengthLabel.innerHTML = sessionMins;
  }
}

function decreaseSessionTime() {
  if (sessionMins > 1) {
    sessionMins -= 1;
    minutesLeft = sessionMins;
    if (sessionContainerLbl.classList.contains('session-countdown')) {
      minutesLabel.innerHTML = addZero(sessionMins);
    }

    sessionLengthLabel.innerHTML = sessionMins;
  }
}

function increaseBreakTime() {
  if (breakMins < 60) {
    breakMins += 1;
    if (sessionContainerLbl.classList.contains('break-countdown')) {
      minutesLabel.innerHTML = addZero(breakMins);
    }
    breakLengthLabel.innerHTML = breakMins;
  }
}

function decreaseBreakTime() {
  if (breakMins > 1) {
    breakMins -= 1;
    if (sessionContainerLbl.classList.contains('break-countdown')) {
      minutesLabel.innerHTML = addZero(breakMins);
    }
    breakLengthLabel.innerHTML = breakMins;
  }
}

// //Reset Button
resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click', resetUI);

function resetUI() {
  clearPlayInterval();
  audioSound.pause();

  pause = false;

  breakTrueOrFalse = true;


  incrementAndDecrement(false);
  playStyling.style.color = 'black';
  pauseStyling.style.color = 'black';
  timerLabel.innerHTML = 'Session';
  audioSound.currentTime = 0;
  minutesLeft = 25;
  secondsLeft = 0;
  breakMins = 5;
  sessionMins = 25;
  sessionContainerLbl.classList.add('session-countdown');
  minutesLabel.innerHTML = minutesLeft;
  breakLengthLabel.innerHTML = breakMins;
  sessionLengthLabel.innerHTML = minutesLeft;
  secondsLabel.innerHTML = addZero(secondsLeft);
}
