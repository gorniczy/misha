// assign DOM elements to consts

const navButton = document.getElementsByClassName('nav-button')[0];
const navList = document.getElementsByClassName('nav-list')[0];
const navMisha = document.getElementsByClassName('nav-misha')[0];
const navBubbles = document.getElementsByClassName('nav-bubbles')[0];
const navContact = document.getElementsByClassName('nav-contact')[0];

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

// assign event listeners to functions

navMisha.addEventListener('click', function() {
  smoothScroll('#nav-1', 500);
});
navBubbles.addEventListener('click', function() {
  smoothScroll('#nav-2', 500);
});
navContact.addEventListener('click', function() {
  smoothScroll('#nav-3', 500);
});
