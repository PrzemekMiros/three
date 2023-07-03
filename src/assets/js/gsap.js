function GSAPAnimations() {

gsap.registerPlugin(ScrollTrigger);

var magnets = document.querySelectorAll('.magnetic');
var magnetText = document.querySelectorAll(".btn-text");
var strength = 100;

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
       yPercent: 105,
       duration: 2,
       ease: Expo. easeOut,
       stagger: 0.07,
       scrollTrigger: { 
         scroller: ".smooth-scroll",
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
        duration: 0.6,
        stagger: 0.1,
        yPercent: 105,
        ease: "sine.out",
        scrollTrigger: { 
          scroller: ".smooth-scroll",
          trigger: element,
          //toggleActions: 'restart pause reverse pause',
        },
    })
});

// Fade in
const fadeIn = gsap.utils.toArray('.fade-in');
fadeIn.forEach(fadeInItem => {
  gsap.from(fadeInItem, { 
    opacity: 0,
    y: 30,
    duration: 2,
    delay: 0.3,
    ease: Expo. easeOut,
    scrollTrigger: {
      scroller: ".smooth-scroll",
      trigger: fadeInItem,
      start: "top 90%",
    }
})
});

// Line animation
const lineX = gsap.utils.toArray('.line-x');
lineX.forEach(lineXItem => {
gsap.from(lineXItem, { 
width: "0",
duration: 2.5,
delay: 0.5,
ease: Expo. easeOut,
scrollTrigger: {
scroller: ".smooth-scroll",
trigger: lineXItem,
start: "top 95%",
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

// Footer parallax
if (window.matchMedia("(min-width: 767px)").matches) {
  gsap.from(".footer-parallax", {
    y: "-25%",
    opacity: 0,
    scrollTrigger: {
      scroller: ".smooth-scroll",
      trigger: ".site-footer",
      start: "top 95%",
      end: "bottom 90%",
      scrub: true
    }
  });
  } else {
    gsap.from(".footer-parallax", {
      y: "-15%",
      opacity: 0,
      scrollTrigger: {
        scroller: ".smooth-scroll",
        trigger: ".site-footer",
        start: "top 95%",
        end: "bottom 90%",
        scrub: true
      }
    });
  };
  new ResizeObserver(() => locoScroll.update()).observe(document.querySelector(".smooth-scroll"));
};
