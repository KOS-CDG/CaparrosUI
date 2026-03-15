/* =============================================================================
   ANIMATIONS.JS
   Page Load and Hero Entrance Animations for Caparros UI
   Responsibilities:
     - Page loader progress bar and fade-out
     - Hero section entrance sequence (staggered reveals)
     - Headline clip-up text reveal
     - Reduced-motion fallback
   ============================================================================= */


/* -----------------------------------------------------------------------------
   PAGE LOADER
----------------------------------------------------------------------------- */

/**
 * runPageLoader()
 * Animates the loading bar fill to 100%, then fades out the loader
 * and triggers the hero entrance sequence once complete.
 * If the page is already loaded (cached), it fast-forwards.
 */
function runPageLoader() {
  const loaderElement  = document.getElementById('pageLoader');
  const loaderBarFill  = document.getElementById('loaderBarFill');

  if (!loaderElement) {
    // If no loader exists, just run the hero entrance directly
    runHeroEntranceSequence();
    return;
  }

  // Check if user prefers reduced motion — if so, skip loader immediately
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    hidePageLoader(loaderElement);
    runHeroEntranceSequence();
    return;
  }

  // Animate loading bar to 100% over ~900ms
  requestAnimationFrame(function startLoaderBarAnimation() {
    if (loaderBarFill) {
      loaderBarFill.style.width = '100%';
    }
  });

  // Hide loader after bar completes + short pause
  setTimeout(function triggerLoaderFadeOut() {
    hidePageLoader(loaderElement);

    // Begin hero entrance slightly after loader disappears
    setTimeout(runHeroEntranceSequence, 200);
  }, 1100);
}

/**
 * hidePageLoader(loaderElement)
 * Adds .is-hidden to trigger the CSS fade-out transition on the loader,
 * then fully removes it from the DOM after the animation completes.
 *
 * @param {HTMLElement} loaderElement - The loader wrapper element
 */
function hidePageLoader(loaderElement) {
  loaderElement.classList.add('is-hidden');

  // Remove from DOM after opacity transition ends (0.6s)
  setTimeout(function removeLoaderFromDOM() {
    if (loaderElement && loaderElement.parentNode) {
      loaderElement.parentNode.removeChild(loaderElement);
    }
  }, 700);
}


/* -----------------------------------------------------------------------------
   HERO ENTRANCE SEQUENCE
----------------------------------------------------------------------------- */

/**
 * Entrance animation timing config.
 * Adjust these values to control the speed and feel of the hero reveal.
 */
const heroEntranceConfig = {
  baseDelay:    100,   // ms before first element appears
  stepDelay:    120,   // ms between each numbered entrance element
  eyebrowDelay: 100,
  line1Delay:   200,
  line2Delay:   320,
  line3Delay:   420,
  bodyDelay:    540,
  statsDelay:   680
};

/**
 * runHeroEntranceSequence()
 * Triggers the staggered entrance animation for all hero elements.
 * Each element has a data-entrance-order attribute that maps to a
 * specific delay value, creating a natural reading-flow reveal order.
 */
function runHeroEntranceSequence() {
  const entranceElements = document.querySelectorAll('.hero-entrance-element');
  if (!entranceElements.length) return;

  // Map entrance order numbers to their delay timings
  const delayMap = {
    '1': heroEntranceConfig.eyebrowDelay,
    '2': heroEntranceConfig.line1Delay,
    '3': heroEntranceConfig.line2Delay,
    '4': heroEntranceConfig.line3Delay,
    '5': heroEntranceConfig.bodyDelay,
    '6': heroEntranceConfig.statsDelay
  };

  entranceElements.forEach(function revealEntranceElement(element) {
    const order    = element.getAttribute('data-entrance-order') || '1';
    const delayMs  = delayMap[order] || heroEntranceConfig.baseDelay;

    setTimeout(function addEnteredClass() {
      element.classList.add('is-entered');
    }, delayMs);
  });
}


/* -----------------------------------------------------------------------------
   REDUCED MOTION FALLBACK
----------------------------------------------------------------------------- */

/**
 * applyReducedMotionFallbacks()
 * If the user has requested reduced motion in their OS/browser settings,
 * this function immediately reveals all animated elements without transitions.
 * This ensures the site is fully usable for users who cannot tolerate motion.
 */
function applyReducedMotionFallbacks() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) return;

  // Reveal all entrance and scroll-reveal elements immediately
  const allAnimatedElements = document.querySelectorAll(
    '.hero-entrance-element, .reveal-element, .hero-headline__inner'
  );

  allAnimatedElements.forEach(function forceRevealElement(element) {
    element.classList.add('is-entered');
    element.classList.add('is-revealed');
    element.style.opacity   = '1';
    element.style.transform = 'none';
    element.style.transition = 'none';
  });
}
