import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  // Handle dot clicks
  const dots = document.querySelectorAll('.nav-dot');
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = dot.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Intersection Observer for scroll-reveal animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Update nav dots active state
        dots.forEach(dot => {
          if (dot.getAttribute('href') === `#${id}`) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });

        // Light nav dot theme adaptation (Slide 8 is dark at bottom)
        const sideNav = document.querySelector('.side-nav');
        if (sideNav) {
          if (id === 'slide-8') {
            sideNav.classList.add('light-nav');
          } else {
            sideNav.classList.remove('light-nav');
          }
        }

        // Activate reveal elements in this slide
        const revealElements = entry.target.querySelectorAll('.reveal-el');
        revealElements.forEach(el => {
          el.classList.add('active');
        });

        // Animate the bar chart bars
        const bars = entry.target.querySelectorAll('.chart-bar');
        bars.forEach(bar => {
          const heightVal = bar.getAttribute('data-height');
          if (heightVal) {
            bar.style.height = heightVal;
          }
        });

        // Trigger SVG drawing animations on paths
        const paths = entry.target.querySelectorAll('.arrow-path');
        paths.forEach(path => {
          path.style.animation = 'none';
          // Trigger browser layout recalculation to restart animation
          void path.offsetWidth;
          path.style.animation = '';
        });
      }
    });
  }, observerOptions);

  // Start observing all sections
  document.querySelectorAll('.slide').forEach(slide => {
    observer.observe(slide);
  });
});

