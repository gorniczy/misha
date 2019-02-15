// check screen orientation

const portrait = window.matchMedia("(orientation: portrait)").matches;

// assign DOM elements to consts

const navButton = document.getElementsByClassName('nav-button')[0];
const navList = document.getElementsByClassName('nav-list')[0];
const navMisha = document.getElementsByClassName('nav-misha')[0];
const navBubbles = document.getElementsByClassName('nav-bubbles')[0];
const navContact = document.getElementsByClassName('nav-contact')[0];
const navArrow = document.getElementsByClassName('arrow')[0];

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
  return null;
}

function toggleNavList() {
  const portrait = window.matchMedia("(orientation: portrait)").matches;
  if (portrait) {
    navList.style.marginRight = navVisibility.showNavlist ? "-70%" : "0";
    navVisibility.showNavlist = !navVisibility.showNavlist;
  }
  return null;
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
  return null;
}

function defaultLandscape() {
  if (changeOrientation.toLandscape) {
    navButton.style.display = "none";
    navList.style.marginRight = "0";
    changeOrientation.toLandscape = false;
    changeOrientation.toPortrait = true;
  }
  return null;
}

// assign event listeners to functions

navMisha.addEventListener('click', function() {
  smoothScroll('#nav-1', 500);
  toggleButton();
  toggleNavList();
});
navBubbles.addEventListener('click', function() {
  smoothScroll('#nav-2', 500);
  toggleButton();
  toggleNavList();
});
navContact.addEventListener('click', function() {
  smoothScroll('#nav-3', 500);
  toggleButton();
  toggleNavList();
});

navButton.addEventListener('click', function() {
  toggleButton();
  toggleNavList();
});

navArrow.addEventListener('click', function() {
  smoothScroll('#nav-2', 500);
});

window.addEventListener("resize", function() {
  const landscape = window.matchMedia("(orientation: landscape)").matches;
  if (landscape) {
    defaultLandscape();
  } else {
    defaultPortrait();
  }
});
