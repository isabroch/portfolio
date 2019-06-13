// For typing effect on title
var typed = new Typed('#typed', {
  stringsElement: '#typed-strings',
  typeSpeed: 30,
  backSpeed: 40,
  backDelay: 500,
});

// For skills bar animation
const skillsArray = document.querySelectorAll('.skill');
const skillWrapper = document.querySelector('.skill--wrapper');

function skillAnimation() {
  skillsArray.forEach(function (skill, i) {
    let skillLevel = skill.querySelector('.skill--bar').dataset.lvl;
    let skillBar = skill.querySelector('.skill--level')

    setTimeout(() => {
      skillBar.style.width = skillLevel;
    }, 300 * i);
  });
}

// If skillWrapper is 50px in vp from bottom, then run the function
let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      skillAnimation();
      observer.unobserve;
    }
  })
}, {
  root: null,
  rootMargin: "0px 0px -50px 0px"
});

observer.observe(skillWrapper);

// If viewport is $bp: 830px; or less, then show only 4 projects first
if(window.innerWidth <= 830) {
  const projects = document.querySelector('.work--projects');
  projects.classList.toggle('limited');
}