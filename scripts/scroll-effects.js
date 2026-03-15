/* =============================================================================
   SCROLL-EFFECTS.JS
   Scroll-Triggered Reveal Animations for Caparros UI
   Responsibilities:
     - Observe .reveal-element nodes and add .is-revealed when in viewport
     - Apply staggered delay offsets from data-reveal-delay attributes
     - Subtle parallax depth effect on the hero background
   ============================================================================= */


/* -----------------------------------------------------------------------------
   SCROLL REVEAL
----------------------------------------------------------------------------- */

/**
 * initializeRevealAnimations()
 * Sets up an IntersectionObserver that watches all elements with the
 * .reveal-element class. When an element enters the viewport threshold,
 * it receives the .is-revealed class, triggering the CSS transition
 * defined in animations.css.
 *
 * Stagger delays are read from the data-reveal-delay attribute (in ms)
 * and applied as inline transition-delay styles.
 */
function initializeRevealAnimations() {
  const revealElements = document.querySelectorAll('.reveal-element');
  if (!revealElements.length) return;

  const revealObserverOptions = {
    root:       null,
    rootMargin: '0px 0px -80px 0px',  // Trigger when element is 80px above bottom of viewport
    threshold:  0.08                   // 8% of the element must be visible
  };

  const revealObserver = new IntersectionObserver(
    function onRevealIntersection(entries, observer) {
      entries.forEach(function processRevealEntry(entry) {
        if (!entry.isIntersecting) return;

        const element      = entry.target;
        const delayMs      = parseInt(element.getAttribute('data-reveal-delay') || '0', 10);

        // Apply stagger delay as inline style
        if (delayMs > 0) {
          element.style.transitionDelay = delayMs + 'ms';
        }

        // Trigger the reveal
        element.classList.add('is-revealed');

        // Unobserve after reveal — each element only animates once
        observer.unobserve(element);
      });
    },
    revealObserverOptions
  );

  revealElements.forEach(function observeRevealElement(element) {
    revealObserver.observe(element);
  });
}


/* -----------------------------------------------------------------------------
   HERO PARALLAX
----------------------------------------------------------------------------- */

/**
 * initializeHeroParallax()
 * Creates a subtle vertical parallax effect on the hero background
 * gradient element as the user scrolls. The gradient moves at 30% of
 * the scroll speed, giving a gentle depth illusion.
 * Uses requestAnimationFrame for smooth, jank-free performance.
 */
function initializeHeroParallax() {
  const heroBackground = document.querySelector('.hero-section__background');
  if (!heroBackground) return;

  // Only run parallax on desktop — disable on touch/mobile for performance
  const isDesktop = window.matchMedia('(min-width: 1024px) and (hover: hover)').matches;
  if (!isDesktop) return;

  let ticking = false;
  let currentScrollY = 0;

  function applyParallaxTransform() {
    const parallaxOffset = currentScrollY * 0.30;
    heroBackground.style.transform = 'translateY(' + parallaxOffset + 'px)';
    ticking = false;
  }

  window.addEventListener('scroll', function onScrollForParallax() {
    currentScrollY = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(applyParallaxTransform);
      ticking = true;
    }
  }, { passive: true });
}


/* -----------------------------------------------------------------------------
   HEADER HIDE ON SCROLL DOWN / SHOW ON SCROLL UP
----------------------------------------------------------------------------- */

/**
 * initializeHeaderHideOnScroll()
 * Hides the header when scrolling down quickly (more than 5px/frame),
 * and reveals it immediately on any upward scroll.
 * Adds .is-hidden class to the header for CSS to animate.
 * Does NOT hide the header if the user is near the top of the page.
 */
function initializeHeaderHideOnScroll() {
  const siteHeader = document.getElementById('siteHeader');
  if (!siteHeader) return;

  let lastScrollY      = 0;
  let ticking          = false;
  const hideThreshold  = 80;   // Only activate hide behavior after scrolling past 80px

  function updateHeaderVisibility() {
    const currentScrollY = window.scrollY;
    const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';

    if (currentScrollY <= hideThreshold) {
      // Always show header near the top
      siteHeader.classList.remove('is-hidden');
    } else if (scrollDirection === 'down') {
      siteHeader.classList.add('is-hidden');
    } else {
      siteHeader.classList.remove('is-hidden');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', function onScrollForHeader() {
    if (!ticking) {
      requestAnimationFrame(updateHeaderVisibility);
      ticking = true;
    }
  }, { passive: true });
}
