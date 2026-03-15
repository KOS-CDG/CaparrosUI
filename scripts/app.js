/* =============================================================================
   APP.JS
   Main Application Entry Point for Caparros UI
   This file is the single initialization controller.
   Every module function is called here, in dependency order,
   after the DOM has fully loaded.

   To disable a feature, comment out its init call here.
   To add a new feature, import its init function and call it below.
   ============================================================================= */


/**
 * initializeApplication()
 * The root initialization function. Called once the DOM is ready.
 * Calls every module's init function in logical order.
 */
function initializeApplication() {

  // -----------------------------------------------------------------------
  // UI HELPERS — must run first (cursor needs to start tracking immediately)
  // -----------------------------------------------------------------------
  initializeCustomCursor();
  setupSmoothScrolling();
  setFooterCopyrightYear();
  initializeContactForm();
  initializeTestimonialRotator();

  // -----------------------------------------------------------------------
  // NAVIGATION — header scroll state, mobile menu, active links
  // -----------------------------------------------------------------------
  handleHeaderScrollState();
  initializeNavigationMenu();
  initializeActiveNavHighlighting();

  // -----------------------------------------------------------------------
  // SCROLL EFFECTS — reveal animations and parallax
  // -----------------------------------------------------------------------
  initializeRevealAnimations();
  initializeHeroParallax();
  initializeHeaderHideOnScroll();

  // -----------------------------------------------------------------------
  // PORTFOLIO & SERVICES — hover effects and accordion
  // -----------------------------------------------------------------------
  activateProjectHoverEffects();
  initializeServicesAccordion();

  // -----------------------------------------------------------------------
  // ANIMATIONS — reduced motion check then page load sequence
  // -----------------------------------------------------------------------
  applyReducedMotionFallbacks();
  runPageLoader();

  // -----------------------------------------------------------------------
  // DEVELOPMENT NOTE:
  // To add Google Analytics, Hotjar, or any third-party script,
  // initialize it here at the bottom so it does not block the UI.
  // -----------------------------------------------------------------------
}


/* -----------------------------------------------------------------------------
   DOM READY GUARD
   Wait for the HTML document to be fully parsed before initializing.
   Using DOMContentLoaded ensures all elements exist when init runs.
----------------------------------------------------------------------------- */

if (document.readyState === 'loading') {
  // DOM not yet ready — wait for it
  document.addEventListener('DOMContentLoaded', initializeApplication);
} else {
  // DOM already parsed (e.g., script deferred or placed at end of body)
  initializeApplication();
}
