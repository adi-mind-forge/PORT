import { animate, stagger, splitText } from 'animejs';

const { chars } = splitText('h1', { words: false, chars: true });

animate(chars, {
  
  y: [
    { to: '-2.75rem', ease: 'outExpo', duration: 600 },
    { to: 0, ease: 'outBounce', duration: 800, delay: 100 }
  ],
  
  rotate: {
    from: '-1turn',
    delay: 0
  },
  delay: stagger(50),
  ease: 'inOutCirc',
  loopDelay: 1000,
  loop: false
});

function animateAboutCols() {
  animate('.about-col-1', {
    translateX: ['-100%', '0%'],
    opacity: [0, 1],
    duration: 1000,
    easing: 'easeOutExpo',
    delay: 200
  });

  animate('.about-col-2', {
    translateY: ['20px', '0px'],
    opacity: [0, 1],
    duration: 1200,
    easing: 'easeOutExpo',
    delay: 350
  });
}

const aboutSection = document.querySelector('#about');
if (aboutSection && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateAboutCols();
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(aboutSection);
} else if (aboutSection) {
  animateAboutCols();
}

function setupNameRotator(){
  const inner = document.querySelector('.rotator-inner');
  if(!inner) return;

  const items = inner.querySelectorAll('span');
  const count = items.length;
  if(count <= 1) return;

  const keyframes = [];
  for(let i=1;i<count;i++){
    keyframes.push({ translateY: `-${i * 100}%` });
  }
  keyframes.push({ translateY: '0%' }); 

  let rotatorAnim = null;

  inner.parentElement.addEventListener('mouseenter', () => {
    
    if(rotatorAnim) rotatorAnim.restart();
    rotatorAnim = animate(inner, {
      keyframes: keyframes,
      duration: 2000 * (count - 1),
      easing: 'easeInOutSine',
      loop: true,
      autoplay: true
    });
  });

  inner.parentElement.addEventListener('mouseleave', () => {
    
    if(rotatorAnim){
      try{ rotatorAnim.pause(); }catch(e){}
      rotatorAnim = null;
    }
    animate(inner, {
      translateY: '0%',
      duration: 500,
      easing: 'easeOutExpo'
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupNameRotator);
} else {
  setupNameRotator();
}