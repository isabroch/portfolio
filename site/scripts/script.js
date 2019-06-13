// For typing effect on title
var typed = new Typed('#typed', {
  stringsElement: '#typed-strings',
  typeSpeed: 30,
  backSpeed: 40,
  backDelay: 500,
});


// Having issues???
// // Isotope sorting
// var $isoGrid = $('.work--projects').isotope({
//   // options
//   itemSelector: '.work--project',
//   layoutMode: 'fitRows'
// });

// const sortButtons = document.querySelectorAll('.filter--button');
// sortButtons.forEach(function (button) {
//     button.addEventListener('click', function() {
//       let filterValue = this.dataset.filter;
//       console.log(filterValue);
//     $isoGrid.isotope({
//       filter: filterValue
//     })
//   });
// });


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

document.querySelectorAll('.readmore--button').forEach((button) => {
  button.addEventListener('click', () => {
    const buttonText = button.querySelector('.readmore--button--text--wrapper');

    console.log(buttonText);

    if (button.classList.contains('om-mig--readmore')) {
      const content = document.querySelector('.readmore--text');
      content.classList.toggle('hiding');

      if (content.classList.contains('hiding')) {
        buttonText.textContent = 'Read more';
      } else {
        buttonText.textContent = 'Read less';
      }
    }
  })
})