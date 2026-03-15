/* =============================================================================
   PORTFOLIO.JS
   Portfolio Interactions and Services Accordion for Caparros UI
   Responsibilities:
     - Portfolio card hover state enhancements (beyond CSS)
     - Services accordion expand / collapse
     - Ensure only one service item is open at a time
   ============================================================================= */


/* -----------------------------------------------------------------------------
   PORTFOLIO CARD HOVER EFFECTS
----------------------------------------------------------------------------- */

/**
 * activateProjectHoverEffects()
 * Enhances portfolio cards with a subtle tilt effect on mouse move,
 * adding three-dimensional depth to the card hover interaction.
 * The tilt resets smoothly when the mouse leaves the card.
 */
function activateProjectHoverEffects() {
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  if (!portfolioCards.length) return;

  // Only enable tilt on desktop (pointer devices)
  const isPointerDevice = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isPointerDevice) return;

  portfolioCards.forEach(function bindCardTiltEffect(card) {

    card.addEventListener('mousemove', function handleCardMouseMove(event) {
      const cardBounds    = card.getBoundingClientRect();
      const cardCenterX   = cardBounds.left + cardBounds.width / 2;
      const cardCenterY   = cardBounds.top  + cardBounds.height / 2;
      const mouseDeltaX   = event.clientX - cardCenterX;
      const mouseDeltaY   = event.clientY - cardCenterY;

      // Map mouse offset to a small tilt angle (max ±3 degrees)
      const tiltX  = (mouseDeltaY / (cardBounds.height / 2)) * -2.5;
      const tiltY  = (mouseDeltaX / (cardBounds.width  / 2)) *  2.5;

      card.style.transform = 'perspective(800px) rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg) translateY(-4px)';
      card.style.transition = 'transform 0.1s linear';
    });

    card.addEventListener('mouseleave', function handleCardMouseLeave() {
      card.style.transform  = '';
      card.style.transition = 'transform 0.5s ' + 'cubic-bezier(0.25, 0.1, 0.25, 1)';
    });

  });
}


/* -----------------------------------------------------------------------------
   SERVICES ACCORDION
----------------------------------------------------------------------------- */

/**
 * initializeServicesAccordion()
 * Wires up the services accordion list. Each service item has a
 * button header that toggles its associated panel open/closed.
 * Only one panel can be open at a time (closing others on open).
 * Uses ARIA attributes for accessibility.
 */
function initializeServicesAccordion() {
  const accordionContainer = document.getElementById('servicesAccordion');
  if (!accordionContainer) return;

  const serviceItems   = accordionContainer.querySelectorAll('.service-item');
  const serviceButtons = accordionContainer.querySelectorAll('.service-item__header');

  /**
   * closeServiceItem(item, button)
   * Closes a single service accordion item.
   *
   * @param {HTMLElement} item   - The .service-item wrapper
   * @param {HTMLElement} button - The header button element
   */
  function closeServiceItem(item, button) {
    const panelElement = item.querySelector('.service-item__panel');

    item.classList.remove('is-open');
    button.setAttribute('aria-expanded', 'false');

    if (panelElement) {
      panelElement.setAttribute('hidden', '');
    }
  }

  /**
   * openServiceItem(item, button)
   * Opens a single service accordion item.
   *
   * @param {HTMLElement} item   - The .service-item wrapper
   * @param {HTMLElement} button - The header button element
   */
  function openServiceItem(item, button) {
    const panelElement = item.querySelector('.service-item__panel');

    item.classList.add('is-open');
    button.setAttribute('aria-expanded', 'true');

    if (panelElement) {
      panelElement.removeAttribute('hidden');
    }
  }

  /**
   * closeAllServiceItems()
   * Collapses every accordion item in the list.
   */
  function closeAllServiceItems() {
    serviceItems.forEach(function closeItem(item) {
      const itemButton = item.querySelector('.service-item__header');
      if (itemButton) {
        closeServiceItem(item, itemButton);
      }
    });
  }

  // Bind click events to each accordion button
  serviceButtons.forEach(function bindAccordionButton(button) {
    button.addEventListener('click', function handleAccordionButtonClick() {
      const parentItem = button.closest('.service-item');
      const isAlreadyOpen = parentItem.classList.contains('is-open');

      // Close all items first
      closeAllServiceItems();

      // If it was closed, open it
      if (!isAlreadyOpen) {
        openServiceItem(parentItem, button);

        // Smooth scroll to show the opened panel if below viewport
        setTimeout(function scrollToOpenPanel() {
          const panelElement = parentItem.querySelector('.service-item__panel');
          if (panelElement) {
            const panelBottom = panelElement.getBoundingClientRect().bottom;
            if (panelBottom > window.innerHeight) {
              parentItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          }
        }, 100);
      }
    });

    // Keyboard: Enter and Space open/close (native button behavior covers this,
    // but this ensures correct aria state management)
    button.addEventListener('keydown', function handleAccordionKeydown(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        button.click();
      }
    });
  });
}
