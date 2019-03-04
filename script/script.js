// check screen orientation

const portrait = window.matchMedia("(orientation: portrait)").matches;

// assign DOM elements to consts

const navButton = document.querySelector('.nav-button');
const navList = document.querySelector('.nav-list');
const navMisha = document.querySelector('.nav-misha');
const navBubbles = document.querySelector('.nav-bubbles');
const navContact = document.querySelector('.nav-contact');
const navArrow = document.querySelector('.arrow');

// navigation list animation for portrait orientation

function moveList(position, distance, duration) {
  let start = null;
  function animation(currentTime) {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const negativePosition = position < 0;
    const increment = position + distance * timeElapsed / duration;
    const decrement = position - distance * timeElapsed / duration;
    const currentPosition = negativePosition ? increment : decrement;
    const wantedPosition = negativePosition ? Math.min(currentPosition, 0) : Math.max(currentPosition, -70);
    navList.style.marginRight = "" + wantedPosition + "%";
    if (timeElapsed < duration) requestAnimationFrame(animation);
  };
  requestAnimationFrame(animation);
}

// toggle mobile nav button and nav list

const navVisibility = {
  showButton: true,
  showNavlist: false
}

function toggleButton() {
  const portrait = window.matchMedia("(orientation: portrait)").matches;
  if (portrait) {
    navButton.style.display = navVisibility.showButton ? "none" : "inherit";
    navVisibility.showButton = !navVisibility.showButton;
  }
}

function toggleNavList() {
  const portrait = window.matchMedia("(orientation: portrait)").matches;
  if (portrait) {
    navVisibility.showNavlist ? moveList(0, 70, 500) : moveList(-70, 70, 500);
    navVisibility.showNavlist = !navVisibility.showNavlist;
  }
}

// return to defaults on window resize

const changeOrientation = {
  toPortrait: !portrait,
  toLandscape: portrait
}

function defaultPortrait() {
  if (changeOrientation.toPortrait) {
    navButton.style.display = "inherit";
    navList.style.marginRight = "-70%";
    changeOrientation.toPortrait = false;
    changeOrientation.toLandscape = true;
    navVisibility.showButton = true;
    navVisibility.showNavlist = false;
  }
}

function defaultLandscape() {
  if (changeOrientation.toLandscape) {
    navButton.style.display = "none";
    navList.style.marginRight = "0";
    changeOrientation.toLandscape = false;
    changeOrientation.toPortrait = true;
  }
}

// smooth scroll animation

function smoothScroll(target, duration) {
  const getHere = document.querySelector(target);
  const targetPosition = getHere.getBoundingClientRect().top;
  const startPosition = window.pageYOffset;
  const scrollToY = startPosition + targetPosition;
  let start = null;

  function animation(currentTime) {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const currentPosition = targetPosition * timeElapsed / duration + startPosition;
    const wantedPosition = startPosition < scrollToY ? Math.min(currentPosition, scrollToY) : Math.max(currentPosition, scrollToY);
    window.scrollTo(0, wantedPosition);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }
  requestAnimationFrame(animation);
}

// change arrow position

const arrowPosition = {
  initial: true,
  target: "#nav-2"
}

function moveArrow() {
  navArrow.style.transform = arrowPosition.initial? "translateY(280%) rotate(180deg)" : "translateY(0) rotate(0)";

  arrowPosition.initial = !arrowPosition.initial;
  arrowPosition.target = arrowPosition.target === "#nav-2" ? "#nav-1" : "#nav-2";
}

// assign event listeners to functions

navMisha.addEventListener('click', function() {
  smoothScroll('#nav-1', 500);
  toggleNavList();
  setTimeout(toggleButton, 500);
});
navBubbles.addEventListener('click', function() {
  smoothScroll('#nav-2', 500);
  toggleNavList();
  setTimeout(toggleButton, 500);
});
navContact.addEventListener('click', function() {
  smoothScroll('#nav-3', 500);
  toggleNavList();
  setTimeout(toggleButton, 500);
});

navButton.addEventListener('click', function() {
  toggleButton();
  toggleNavList();
});

navArrow.addEventListener('click', function() {
  smoothScroll(arrowPosition.target, 500);
  moveArrow();
});

window.addEventListener("resize", function() {
  const landscape = window.matchMedia("(orientation: landscape)").matches;
  if (landscape) {
    defaultLandscape();
  } else {
    defaultPortrait();
  }
});
