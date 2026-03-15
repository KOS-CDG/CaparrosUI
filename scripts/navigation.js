/* =============================================================================
   NAVIGATION.JS
   Header and Navigation Behavior for Caparros UI
   Responsibilities:
     - Header scroll state (transparent → frosted glass)
     - Mobile menu open / close toggle
     - Active nav link detection on scroll (Intersection Observer)
     - Menu closes when a link is clicked
   ============================================================================= */


/* -----------------------------------------------------------------------------
   HEADER SCROLL STATE
----------------------------------------------------------------------------- */

/**
 * handleHeaderScrollState()
 * Adds .is-scrolled class to the site header once the user scrolls
 * past 60px. Removes it when they return to the top.
 * This triggers the frosted-glass background defined in components.css.
 */
function handleHeaderScrollState() {
  const siteHeader = document.getElementById('siteHeader');
  if (!siteHeader) return;

  const scrollThreshold = 60;

  function updateHeaderOnScroll() {
    if (window.scrollY > scrollThreshold) {
      siteHeader.classList.add('is-scrolled');
    } else {
      siteHeader.classList.remove('is-scrolled');
    }
  }

  // Passive scroll listener for performance
  window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });

  // Run once on init in case page loads already scrolled
  updateHeaderOnScroll();
}


/* -----------------------------------------------------------------------------
   MOBILE MENU TOGGLE
----------------------------------------------------------------------------- */

/**
 * initializeNavigationMenu()
 * Wires up the hamburger button to open and close the full-screen
 * mobile menu overlay. Manages:
 *   - Toggle button aria-expanded state
 *   - Mobile menu aria-hidden state
 *   - Body scroll lock when menu is open
 *   - Animated hamburger → X icon transition
 *   - Closing on overlay click or Escape key
 */
function initializeNavigationMenu() {
  const navToggleButton = document.getElementById('navToggle');
  const mobileMenuPanel = document.getElementById('mobileMenu');
  const siteBody        = document.body;

  if (!navToggleButton || !mobileMenuPanel) return;

  /**
   * openMobileMenu()
   * Opens the full-screen mobile navigation overlay.
   */
  function openMobileMenu() {
    navToggleButton.classList.add('is-active');
    navToggleButton.setAttribute('aria-expanded', 'true');
    navToggleButton.setAttribute('aria-label', 'Close navigation menu');

    mobileMenuPanel.classList.add('is-open');
    mobileMenuPanel.setAttribute('aria-hidden', 'false');

    // Prevent body scroll while menu is open
    siteBody.style.overflow = 'hidden';

    // Move focus into the menu for accessibility
    const firstMenuLink = mobileMenuPanel.querySelector('.mobile-menu__link');
    if (firstMenuLink) {
      setTimeout(function focusFirstLink() {
        firstMenuLink.focus();
      }, 300);
    }
  }

  /**
   * closeMobileMenu()
   * Closes the full-screen mobile navigation overlay.
   */
  function closeMobileMenu() {
    navToggleButton.classList.remove('is-active');
    navToggleButton.setAttribute('aria-expanded', 'false');
    navToggleButton.setAttribute('aria-label', 'Open navigation menu');

    mobileMenuPanel.classList.remove('is-open');
    mobileMenuPanel.setAttribute('aria-hidden', 'true');

    // Restore body scrolling
    siteBody.style.overflow = '';

    // Return focus to the toggle button
    navToggleButton.focus();
  }

  /**
   * toggleMobileMenu()
   * Toggles between open and closed states.
   */
  function toggleMobileMenu() {
    const isCurrentlyOpen = mobileMenuPanel.classList.contains('is-open');
    if (isCurrentlyOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  // Bind toggle button click
  navToggleButton.addEventListener('click', toggleMobileMenu);

  // Close menu when any menu link is clicked
  const mobileMenuLinks = mobileMenuPanel.querySelectorAll('.mobile-menu__link');
  mobileMenuLinks.forEach(function bindMenuLinkClose(link) {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close menu on Escape key
  document.addEventListener('keydown', function handleEscapeKey(event) {
    if (event.key === 'Escape' && mobileMenuPanel.classList.contains('is-open')) {
      closeMobileMenu();
    }
  });
}


/* -----------------------------------------------------------------------------
   ACTIVE NAV LINK DETECTION
----------------------------------------------------------------------------- */

/**
 * initializeActiveNavHighlighting()
 * Uses IntersectionObserver to detect which section is currently
 * visible in the viewport, then highlights the corresponding desktop
 * nav link with the .nav-menu__link--active class.
 */
function initializeActiveNavHighlighting() {
  const navLinks    = document.querySelectorAll('.nav-menu__link[data-scroll-target]');
  const sections    = document.querySelectorAll('section[id]');

  if (!navLinks.length || !sections.length) return;

  const observerOptions = {
    root:       null,
    rootMargin: '-40% 0px -50% 0px',  // Section is "active" when its middle passes through
    threshold:  0
  };

  const sectionObserver = new IntersectionObserver(function onSectionIntersection(entries) {
    entries.forEach(function processEntry(entry) {
      if (!entry.isIntersecting) return;

      const activeSectionId = entry.target.getAttribute('id');

      navLinks.forEach(function updateActiveLink(link) {
        const linkTarget = link.getAttribute('data-scroll-target');

        if (linkTarget === activeSectionId) {
          link.classList.add('nav-menu__link--active');
        } else {
          link.classList.remove('nav-menu__link--active');
        }
      });
    });
  }, observerOptions);

  sections.forEach(function observeSection(section) {
    sectionObserver.observe(section);
  });
}
