// For typing effect on title
if (document.querySelector('#typed-strings')) {
  var typed = new Typed('#typed', {
    stringsElement: '#typed-strings',
    typeSpeed: 30,
    backSpeed: 40,
    backDelay: 500,
  });
}

// Get url
let urlPath = window.location.pathname;
// Get everything from the last slash to the end (filename)
let urlPathString = urlPath.substring(urlPath.lastIndexOf("/"));
// Console should log '/index.html' or '/'
// console.log(urlPathString);

if (urlPathString == '/index.html' || urlPathString == '/') {
  console.log('You are on the homepage');

  // Form validation + thank you popup
const contactForm = document.forms[0];

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const popup = this.querySelector('.form--popup');
  const errorDiv = this.querySelector('.form--error');

  const name = this.name.value;
  const email = this.email.value;
  const message = this.message.value;

  let errorMessage;

  if ( name == '' || !/\S/.test(name) ) {
    this.name.focus();
    errorMessage = 'Skrive dit navn, tak!';
  } else if (email == '' || !/\S/.test(email) ) {
    this.email.focus();
    errorMessage = 'Skrive din email, tak!';
  } else if (email.match(/@/g) == null) {
    this.email.focus();
    errorMessage = 'Mangler @';
  } else if (email.match(/\S@/) == null) {
    this.email.focus();
    errorMessage = 'Mangler del før @';
  } else if (email.match(/@\S/) == null) {
    this.email.focus();
    errorMessage = 'Mangler del efter @';
  } else if (email.match(/[^@]\..+$/) == null) {
    this.email.focus();
    errorMessage = 'Mangler sidste del (f.eks. .com, .net)';
  } else if ( message == '' || !/\S/.test(message) ) {
    this.message.focus();
    errorMessage = 'Skrive en besked, tak!';
  } else {
    popup.innerHTML = `Tak for din besked, ${name}! Jeg skriver tilbage til ${email} så snart jeg kan.`
    this.classList.add('done');
    return true;
  }

  errorDiv.textContent = errorMessage;
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
}

let projectNumber;
const projectArray = [
  '1950s',
  'om_verden',
  'moana',
  'krigsmuseet',
  'national_graphic',
  'rfa_party',
  'mediegrafiker_exam',
  'hundelufter'
]

if (urlPathString == '/project.html') {
  console.log('You are on the project page!');

  // Prevent clicking on disabled links
document.querySelectorAll('.disabled').forEach(function (item) {
  item.addEventListener('click', function (e) {
    e.preventDefault();
  })
});


  // Get linked project from ?value in url
  let projectString = window.location.search.substring(1);

  // If it's a string, figure out its index number
  if (projectArray.indexOf(projectString) != -1) {
    projectNumber = projectArray.indexOf(projectString);
  } else {
    projectNumber = 0;
  }

  console.log(projectNumber);

  // Turn off transition for page load, gets reset by the next line. Small timeout is used to prevent transition on page load.
  const container = document.querySelector('.project--container');
  container.style.transition = `all 0s`;
  setTimeout(() => {
    movePage(projectNumber);
  }, 20);
  setTimeout(() => {
    container.style.transition = ``;
  }, 1000);



  document.querySelector('.arrow-left')
    .addEventListener('click', () => {
      changeIndex(-1);
    });

  document.querySelector('.arrow-right')
    .addEventListener('click', () => {
      changeIndex(+1);
    });

  window.addEventListener('keydown', function(e) {
    switch (e.key) {
      case 'ArrowLeft':
        changeIndex(-1);
        break;
      case 'ArrowRight':
        changeIndex(+1);
        break;
    }
  })

  const dots = document.querySelectorAll('.dot');
  dots.forEach(dot => {
      dot.addEventListener('click', function() {
        changeIndex([...dots].indexOf(this), true);
      })
    });
}

// Function that increases or decreases, or takes in an index
function changeIndex(number, isIndex = false) {

  if (isIndex) {
    // If given an index number, change projectNumber to index number.
    projectNumber = number;
  } else {
    // If given -1 or +1, add to the projectNumber.
    projectNumber += number;

    // If hitting minimum/max of the array, loop around.
    if (projectNumber > projectArray.length - 1) {
      projectNumber = 0;
    } else if (projectNumber < 0) {
      projectNumber = projectArray.length - 1;
    }
  }

  movePage(projectNumber);
}

function movePage(index) {
  const container = document.querySelector('.project--container');
  let stylemove = `translateX(calc((100% + 1rem) * -${index}))`;
  container.style.transform = stylemove;

  const dotsArray = document.querySelectorAll('.dot');
  dotsArray.forEach(dot => {
    dot.classList.remove('active');
  });

  dotsArray[index].classList.add('active');

  let projectName = projectArray[index];
  let baseURL = window.location.pathname;

  // Replaces URL in bar to the current project viewed
  window.history.replaceState({}, projectName, `${baseURL}?${projectName}`);
}