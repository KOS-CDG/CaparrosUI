/* =============================================================================
   UI-HELPERS.JS
   Shared Utility Functions for Caparros UI
   Responsibilities:
     - Custom cursor tracking and hover states
     - Smooth anchor scroll behavior
     - Dynamic footer copyright year
     - Contact form submission and validation
   ============================================================================= */


/* -----------------------------------------------------------------------------
   CUSTOM CURSOR
   Tracks mouse position and updates two cursor elements:
   a small dot (precise) and a larger ring (trailing).
----------------------------------------------------------------------------- */

/**
 * Stores the live mouse X/Y position for the trailing ring animation.
 */
const cursorState = {
  mouseX:  0,
  mouseY:  0,
  ringX:   0,
  ringY:   0,
  animFrameId: null
};

/**
 * initializeCustomCursor()
 * Sets up the dual-element custom cursor — a dot that snaps to the
 * cursor precisely, and a ring that lags behind using linear interpolation.
 * Only activates on devices with a true pointer (not touch screens).
 */
function initializeCustomCursor() {
  const cursorWrapper = document.getElementById('customCursor');
  if (!cursorWrapper) return;

  // Only run on real pointer devices
  const isPointerDevice = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isPointerDevice) {
    cursorWrapper.style.display = 'none';
    return;
  }

  const dotElement  = cursorWrapper.querySelector('.custom-cursor__dot');
  const ringElement = cursorWrapper.querySelector('.custom-cursor__ring');

  // Track mouse position
  document.addEventListener('mousemove', function handleMouseMove(event) {
    cursorState.mouseX = event.clientX;
    cursorState.mouseY = event.clientY;

    // Dot snaps instantly
    dotElement.style.left = cursorState.mouseX + 'px';
    dotElement.style.top  = cursorState.mouseY + 'px';
  });

  // Animate the trailing ring via requestAnimationFrame
  function animateRing() {
    // Linear interpolation — ring chases the mouse at 12% speed per frame
    cursorState.ringX += (cursorState.mouseX - cursorState.ringX) * 0.12;
    cursorState.ringY += (cursorState.mouseY - cursorState.ringY) * 0.12;

    ringElement.style.left = cursorState.ringX + 'px';
    ringElement.style.top  = cursorState.ringY + 'px';

    cursorState.animFrameId = requestAnimationFrame(animateRing);
  }

  animateRing();

  // Expand ring on interactive elements
  const hoverTargets = 'a, button, [data-cursor-hover], .portfolio-card, .insight-card, .service-item__header';

  document.addEventListener('mouseover', function handleCursorHoverOn(event) {
    if (event.target.closest(hoverTargets)) {
      cursorWrapper.classList.add('is-hovering');
    }
  });

  document.addEventListener('mouseout', function handleCursorHoverOff(event) {
    if (event.target.closest(hoverTargets)) {
      cursorWrapper.classList.remove('is-hovering');
    }
  });

  // Hide cursor when it leaves the browser window
  document.addEventListener('mouseleave', function handleMouseLeave() {
    cursorWrapper.style.opacity = '0';
  });

  document.addEventListener('mouseenter', function handleMouseEnter() {
    cursorWrapper.style.opacity = '1';
  });
}


/* -----------------------------------------------------------------------------
   SMOOTH SCROLLING
   Intercepts anchor clicks and scrolls smoothly to the target section,
   accounting for the fixed header height offset.
----------------------------------------------------------------------------- */

/**
 * setupSmoothScrolling()
 * Finds all anchor links that point to in-page sections (#id) and
 * overrides their default behavior with smooth animated scrolling.
 * Automatically offsets for the sticky header height.
 */
function setupSmoothScrolling() {
  const headerHeight    = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
    10
  ) || 72;

  const smoothScrollLinks = document.querySelectorAll('a[href^="#"], [data-smooth-scroll]');

  smoothScrollLinks.forEach(function attachScrollListener(link) {
    link.addEventListener('click', function handleSmoothScrollClick(event) {
      const targetId = link.getAttribute('href') || link.getAttribute('data-scroll-target');
      if (!targetId || !targetId.startsWith('#')) return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      event.preventDefault();

      const targetOffsetTop = targetElement.getBoundingClientRect().top
        + window.scrollY
        - headerHeight
        - 16;   // 16px extra breathing room

      window.scrollTo({
        top:      targetOffsetTop,
        behavior: 'smooth'
      });
    });
  });
}


/* -----------------------------------------------------------------------------
   FOOTER COPYRIGHT YEAR
   Dynamically writes the current year to all #footerYear elements,
   so it never needs manual updating.
----------------------------------------------------------------------------- */

/**
 * setFooterCopyrightYear()
 * Writes the current year into any element with id="footerYear".
 */
function setFooterCopyrightYear() {
  const yearElements = document.querySelectorAll('#footerYear');
  const currentYear  = new Date().getFullYear();

  yearElements.forEach(function updateYearElement(element) {
    element.textContent = currentYear;
  });
}


/* -----------------------------------------------------------------------------
   CONTACT FORM HANDLING
   Client-side validation and simulated submission for the contact form.
   Replace the simulateFormSubmission function body with a real fetch()
   call to your form handler endpoint when going live.
----------------------------------------------------------------------------- */

/**
 * validateContactField(fieldElement, errorElement, validationRules)
 * Validates a single form field against the given rules object.
 * Returns true if valid, false if not. Adds/removes error classes.
 *
 * @param {HTMLElement} fieldElement   - The input/select/textarea to validate
 * @param {HTMLElement} errorElement   - The element where error text is shown
 * @param {Object}      validationRules - { required, minLength, type }
 * @returns {boolean}
 */
function validateContactField(fieldElement, errorElement, validationRules) {
  const value = fieldElement.value.trim();
  let isValid = true;
  let errorMessage = '';

  if (validationRules.required && value === '') {
    isValid       = false;
    errorMessage  = 'This field is required.';
  } else if (validationRules.type === 'email' && value !== '') {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      isValid      = false;
      errorMessage = 'Please enter a valid email address.';
    }
  } else if (validationRules.minLength && value.length < validationRules.minLength) {
    isValid      = false;
    errorMessage = 'Please provide a more detailed description (min. ' + validationRules.minLength + ' characters).';
  }

  // Apply visual feedback
  if (!isValid) {
    fieldElement.classList.add('has-error');
    errorElement.textContent = errorMessage;
  } else {
    fieldElement.classList.remove('has-error');
    errorElement.textContent = '';
  }

  return isValid;
}

/**
 * simulateFormSubmission(formElement, submitButton, successMessage)
 * Temporarily disables the submit button while "sending" (simulate 1.5s delay),
 * then shows a success message. Replace with a real fetch() call to go live.
 *
 * @param {HTMLFormElement} formElement    - The contact form element
 * @param {HTMLButtonElement} submitButton - The submit button
 * @param {HTMLElement} successMessage     - The success message container
 */
function simulateFormSubmission(formElement, submitButton, successMessage) {
  const originalLabel = submitButton.querySelector('.btn__label').textContent;

  submitButton.disabled = true;
  submitButton.querySelector('.btn__label').textContent = 'Sending…';

  // Simulate a 1.5-second network request
  setTimeout(function onSubmitComplete() {
    formElement.reset();
    submitButton.disabled = false;
    submitButton.querySelector('.btn__label').textContent = originalLabel;

    if (successMessage) {
      successMessage.removeAttribute('hidden');
      successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, 1500);
}

/**
 * initializeContactForm()
 * Attaches validation and submission logic to the contact form.
 * Each required field is validated on blur and on form submit.
 */
function initializeContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  const nameField     = document.getElementById('contactName');
  const emailField    = document.getElementById('contactEmail');
  const serviceField  = document.getElementById('contactService');
  const messageField  = document.getElementById('contactMessage');

  const nameError     = document.getElementById('contactNameError');
  const emailError    = document.getElementById('contactEmailError');
  const serviceError  = document.getElementById('contactServiceError');
  const messageError  = document.getElementById('contactMessageError');

  const submitButton  = document.getElementById('contactSubmitBtn');
  const successMsg    = document.getElementById('formSuccessMessage');

  // Validate on blur (when user leaves a field)
  if (nameField) {
    nameField.addEventListener('blur', function() {
      validateContactField(nameField, nameError, { required: true });
    });
  }

  if (emailField) {
    emailField.addEventListener('blur', function() {
      validateContactField(emailField, emailError, { required: true, type: 'email' });
    });
  }

  if (serviceField) {
    serviceField.addEventListener('blur', function() {
      validateContactField(serviceField, serviceError, { required: true });
    });
  }

  if (messageField) {
    messageField.addEventListener('blur', function() {
      validateContactField(messageField, messageError, { required: true, minLength: 30 });
    });
  }

  // Validate all fields on submit
  contactForm.addEventListener('submit', function handleFormSubmit(event) {
    event.preventDefault();

    const isNameValid    = validateContactField(nameField,    nameError,    { required: true });
    const isEmailValid   = validateContactField(emailField,   emailError,   { required: true, type: 'email' });
    const isServiceValid = validateContactField(serviceField, serviceError, { required: true });
    const isMessageValid = validateContactField(messageField, messageError, { required: true, minLength: 30 });

    const formIsValid = isNameValid && isEmailValid && isServiceValid && isMessageValid;

    if (formIsValid) {
      simulateFormSubmission(contactForm, submitButton, successMsg);
    } else {
      // Scroll to the first error field
      const firstError = contactForm.querySelector('.has-error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.focus();
      }
    }
  });
}


/* -----------------------------------------------------------------------------
   TESTIMONIAL ROTATOR
   Cycles through testimonial data when the dot navigation is clicked.
----------------------------------------------------------------------------- */

/**
 * Testimonial data array.
 * Add or edit entries here to change the testimonials shown on the homepage.
 */
const testimonialData = [
  {
    quote:  'Caparros UI transformed our digital presence completely. The website they built communicates our brand at the highest level — and the results in engagement and lead generation have been remarkable.',
    name:   'Alexandra Mercer',
    role:   'Chief Marketing Officer, Meridian Capital'
  },
  {
    quote:  'Working with Caparros UI was a defining moment for our brand. They did not just design a website — they challenged us to think more clearly about who we are and who we serve. The result exceeded every expectation.',
    name:   'James Forrester',
    role:   'CEO, Arcta Labs'
  },
  {
    quote:  'The team at Caparros UI brings a rare combination of aesthetic precision and commercial intelligence. Our new site launched to exceptional client feedback and measurably improved conversion metrics.',
    name:   'Isabelle Roux',
    role:   'Founder, Solenne Beauty'
  }
];

/**
 * initializeTestimonialRotator()
 * Binds click events to testimonial dot buttons.
 * Fades out the current quote, swaps content, and fades back in.
 */
function initializeTestimonialRotator() {
  const dotsContainer   = document.getElementById('testimonialDots');
  const quoteTextElement = document.querySelector('.testimonial-quote-block__text');
  const nameElement     = document.querySelector('.testimonial-quote-block__name');
  const roleElement     = document.querySelector('.testimonial-quote-block__role');

  if (!dotsContainer || !quoteTextElement) return;

  const dots = dotsContainer.querySelectorAll('.testimonial-dot');

  dots.forEach(function bindDotClick(dot, dotIndex) {
    dot.addEventListener('click', function handleDotClick() {
      const targetTestimonial = testimonialData[dotIndex];
      if (!targetTestimonial) return;

      // Update dot active state
      dots.forEach(function clearActiveDot(d) {
        d.classList.remove('testimonial-dot--active');
        d.setAttribute('aria-selected', 'false');
      });
      dot.classList.add('testimonial-dot--active');
      dot.setAttribute('aria-selected', 'true');

      // Fade out, swap content, fade in
      quoteTextElement.style.opacity = '0';
      quoteTextElement.style.transform = 'translateY(8px)';
      quoteTextElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

      setTimeout(function swapTestimonialContent() {
        quoteTextElement.textContent = targetTestimonial.quote;
        if (nameElement) nameElement.textContent = targetTestimonial.name;
        if (roleElement) roleElement.textContent = targetTestimonial.role;

        quoteTextElement.style.opacity   = '1';
        quoteTextElement.style.transform = 'translateY(0)';
      }, 320);
    });
  });
}
