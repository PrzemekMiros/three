function GSAPAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  window.addEventListener("load", () => gsap.to("body", { autoAlpha: 1 }));

var magnets = document.querySelectorAll('.magnetic');
var magnetText = document.querySelectorAll(".btn-text");
 
if(window.innerWidth > 767){
  // Mouse Reset
  magnets.forEach( (magnet) => {
    magnet.addEventListener('mousemove', moveMagnet );
    // $(this.parentNode).removeClass('not-active');
    magnet.addEventListener('mouseleave', function(event) {
      gsap.to( event.currentTarget, 1.5, {
        x: 0, 
        y: 0, 
        ease: 'Elastic.easeOut'
      });
      gsap.to( magnetText, 1.5, {
        x: 0, 
        y: 0, 
        ease: 'Elastic.easeOut'
      });
    });
  });

  // Mouse move
  function moveMagnet(event) {
    var magnetButton = event.currentTarget;
    var bounding = magnetButton.getBoundingClientRect();
    var magnetsStrength = magnetButton.getAttribute("data-strength");
    var magnetsStrengthText = magnetButton.getAttribute("data-strength-text");
    var magnetText = magnetButton.querySelector(".btn-text");

    gsap.to( magnetButton, 1.5, {
      x: ((( event.clientX - bounding.left)/magnetButton.offsetWidth) - 0.5) * magnetsStrength,
      y: ((( event.clientY - bounding.top)/magnetButton.offsetHeight) - 0.5) * magnetsStrength,
      rotate: '0.005deg',
      ease: 'Power4.easeOut'
    });
    gsap.to( magnetText, 1.5, {
      x: ((( event.clientX - bounding.left)/magnetButton.offsetWidth) - 0.5) * magnetsStrengthText,
      y: ((( event.clientY - bounding.top)/magnetButton.offsetHeight) - 0.5) * magnetsStrengthText,
      rotate: '0.001deg',
      ease: 'Power4.easeOut'
    });
  }
}; 

// Split text chars --------------------------------------------------------------
let splitTextLetters = [...document.querySelectorAll('.split-text-letters')];
splitTextLetters.forEach(element =>{
  new SplitText(element, { 
    type: "words, chars",
    wordsClass: "word",
    charsClass: "char-parent"
  });
  let mySplitText = new SplitText(element, {
    type:"chars",
    charsClass: "char"
  });
  gsap.from(mySplitText.chars, {
       yPercent: 100,
       autoAlpha: 0,
       opacity: 0,
       duration: 1.2,
       delay: 0.1,
       ease: Power4.easeInOut,
       stagger: 0.03,
       scrollTrigger: { 
         trigger: element,
         //toggleActions: 'restart pause reverse pause',
       },
   })
});

// Split text lines --------------------------------------------------------------
let splitTextLines = [...document.querySelectorAll('.split-text-lines')];
splitTextLines.forEach(element =>{
  let mySplitText = new SplitText(element, {
    type:"lines",
    linesClass: "line"
  });
  new SplitText(element, {
    type:"lines",
    linesClass: "line-parent",
  });
  gsap.from(mySplitText.lines, {
        autoAlpha: 0,
        opacity: 0,
        duration: 1.2,
        delay: 0.1,
        stagger: 0.05,
        yPercent: 105,
        ease: Power4.easeInOut,
        scrollTrigger: { 
          trigger: element,
          //toggleActions: 'restart pause reverse pause',
        },
    })
});

// Fade in
const fadeIn = gsap.utils.toArray('.fade-in');
fadeIn.forEach(fadeInItem => {
  gsap.from(fadeInItem, { 
    autoAlpha: 0,
    opacity: 0,
    y: 50,
    duration: 1.2,
    delay: 0.1,
    ease: Power4.easeInOut,
    scrollTrigger: {
      trigger: fadeInItem,
      start: "top 98%",
    }
})
});

// Scale in
const scaleIn = gsap.utils.toArray('.scale-in');
scaleIn.forEach(scaleInItem => {
  gsap.from(scaleInItem, { 
    autoAlpha: 0,
    opacity: 0,
    scale: 0,
    duration: 1.2,
    delay: 0.1,
    ease: Power4.easeInOut,
    scrollTrigger: {
      trigger: scaleInItem,
      start: "top 98%",
    }
})
});

// Line animation
const lineX = gsap.utils.toArray('.line-x');
lineX.forEach(lineXItem => {
gsap.from(lineXItem, { 
width: "0",
duration: 1.2,
delay: 0.1,
ease: Power4.easeInOut,
scrollTrigger: {
trigger: lineXItem,
start: "top 98%",
}
})
});

// Accordion
if (document.querySelector(".accordion")) {
  let t = document.getElementsByClassName("accordion");
    for (let e = 0; e < t.length; e++) t[e].addEventListener("click", function () {
      let e = this.nextElementSibling;
      if (e.style.maxHeight) e.style.maxHeight = null, this.classList.remove("open");
      else {
        for (let a = 0; a < t.length; a++) t[a].classList.remove("open"), t[a].nextElementSibling.style.maxHeight = null;
        e.style.maxHeight = e.scrollHeight + "px", this.classList.toggle("open");
      }
    });
  };

// Reveal image
let revealContainers = document.querySelectorAll(".reveal-wrap");

revealContainers.forEach((element) => {
  let image = element.querySelector(".reveal-image");
  gsap.set(element, { autoAlpha: 1 }); 

  gsap.from(element, 1.5, {
    xPercent: -102,
    ease: Power3.easeInOut,
    scrollTrigger: {
      trigger: element
    }
  });
  gsap.from(image, 1.5, {
    xPercent: 102,
    scale: 1.3,
    ease: Power3.easeInOut,
    scrollTrigger: {
      trigger: element
    }
  });
});

const paths = [...document.querySelectorAll('path.path-anim')];

paths.forEach(el => {
  const svgEl = el.closest('.separator--up');
  const pathTo = el.dataset.pathTo;

  gsap.timeline({
      scrollTrigger: {
          trigger: svgEl,
          start: "top bottom",
          end: "bottom 30%",
          scrub: true
      }
  })
  .to(el, {
      ease: 'none',
      attr: { d: pathTo }
  });
});


// Header bg
ScrollTrigger.create({
  start: 'top -70',
  end: 99999,
  toggleClass: {className: 'header-scrolled', targets: '.site-header'}
});


// Footer parallax
if (window.matchMedia("(min-width: 767px)").matches) {
  gsap.from(".footer-parallax", {
    y: "-40%",
    scrollTrigger: {
      trigger: ".site-footer",
      start: "top 90%",
      end: "bottom 85%",
      scrub: true
    }
  });
  } else {
    gsap.from(".footer-parallax", {
      y: "-15%",
      scrollTrigger: {
        trigger: ".site-footer",
        start: "top 95%",
        end: "bottom 90%",
        scrub: true
      }
    });
  };
  
  window.addEventListener('scroll', function() {
    // Obliczanie postępu przewijania strony
    var scrollTop = document.documentElement.scrollTop;
    var scrollHeight = document.documentElement.scrollHeight;
    var clientHeight = document.documentElement.clientHeight;
    var progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
    // Ustawianie wysokości paska postępu
    var progressBar = document.getElementById('progress-bar');
    progressBar.style.height = progress + '%';
  });
  
};





