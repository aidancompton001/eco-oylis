/* ============================================================
   EKO-OYLIS Landing — Main JS
   Cookie Banner, Form, Scroll Reveal, Mobile Nav
   ============================================================ */

(function () {
  'use strict';

  // --- Mobile Navigation ---
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  if (burger && nav) {
    burger.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('open');
      burger.classList.toggle('active');
      burger.setAttribute('aria-expanded', isOpen);
    });

    // Close nav on link click
    nav.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        burger.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Staggered Scroll Reveal ---
  var staggerConfigs = {
    '.process': { stagger: 200, selector: '[data-reveal]' },
    '.cards': { stagger: 150, selector: '.card' },
    '.benefits__grid': { stagger: 120, selector: '.benefit' },
    '.about__stats': { stagger: 200, selector: '.stat' },
    '.partners-grid': { stagger: 100, selector: '.partner-card' },
    '.faq__list': { stagger: 100, selector: '.faq__item' }
  };

  // Find parent container for a reveal element and return stagger delay
  function getStaggerDelay(el) {
    for (var parentSelector in staggerConfigs) {
      var config = staggerConfigs[parentSelector];
      var parent = el.closest(parentSelector);
      if (parent) {
        var siblings = Array.prototype.slice.call(parent.querySelectorAll(config.selector));
        var index = siblings.indexOf(el);
        if (index >= 0) return index * config.stagger;
      }
    }
    return 0;
  }

  var revealElements = document.querySelectorAll('[data-reveal]');

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var delay = getStaggerDelay(entry.target);
            entry.target.style.transitionDelay = delay + 'ms';
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
            // Clean up delay after animation completes
            setTimeout(function () {
              entry.target.style.transitionDelay = '';
            }, delay + 900);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  // --- Header scroll effect ---
  var header = document.getElementById('header');

  window.addEventListener('scroll', function () {
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollY > 80) {
      header.style.background = 'rgba(13,15,14,0.95)';
    } else {
      header.style.background = 'rgba(13,15,14,0.85)';
    }
  }, { passive: true });

  // --- Contact Form ---
  var form = document.getElementById('contactForm');
  var formSuccess = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic validation
      var name = form.querySelector('#name');
      var email = form.querySelector('#email');
      var message = form.querySelector('#message');
      var gdpr = form.querySelector('#gdpr');

      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        return;
      }

      if (!gdpr.checked) {
        return;
      }

      // Honeypot check
      var honeypot = form.querySelector('#website');
      if (honeypot && honeypot.value) {
        return; // Bot detected
      }

      // Email validation
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value)) {
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Изпращане...';

      // Collect form data
      var formData = new FormData(form);
      formData.delete('website');

      // Send via FormSubmit.co
      var action = form.getAttribute('action') || '';
      fetch(action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        if (response.ok) {
          showSuccess();
        } else {
          fallbackMailto();
        }
      }).catch(function () {
        fallbackMailto();
      });

      function showSuccess() {
        formSuccess.hidden = false;
        submitBtn.textContent = originalText.indexOf('Send') !== -1 ? 'Sent' : 'Изпратено';
        form.reset();
        if (typeof gtag === 'function') {
          gtag('event', 'form_submit', { event_category: 'contact', event_label: 'contact_form' });
        }
        setTimeout(function () {
          formSuccess.hidden = true;
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }, 5000);
      }

      function fallbackMailto() {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        alert('Моля, свържете се с нас по телефон: +359 884 908 414 или email: oylis.tech@gmail.com');
      }
    });
  }

  // --- GA4 Click Tracking ---
  // Phone clicks
  document.querySelectorAll('a[href^="tel:"]').forEach(function (link) {
    link.addEventListener('click', function () {
      if (typeof gtag === 'function') {
        gtag('event', 'phone_click', {
          event_category: 'contact',
          event_label: link.href
        });
      }
    });
  });

  // Email clicks
  document.querySelectorAll('a[href^="mailto:"]').forEach(function (link) {
    link.addEventListener('click', function () {
      if (typeof gtag === 'function') {
        gtag('event', 'email_click', {
          event_category: 'contact',
          event_label: link.href
        });
      }
    });
  });

  // Language switch tracking
  document.querySelectorAll('.lang-switch__link').forEach(function (link) {
    link.addEventListener('click', function () {
      if (typeof gtag === 'function') {
        gtag('event', 'language_switch', {
          event_category: 'engagement',
          event_label: link.textContent.trim()
        });
      }
    });
  });

  // --- Cookie Banner ---
  var cookieBanner = document.getElementById('cookieBanner');
  var cookieAcceptAll = document.getElementById('cookieAcceptAll');
  var cookieRejectAll = document.getElementById('cookieRejectAll');
  var cookieSettingsBtn = document.getElementById('cookieSettings');
  var cookieSettingsPanel = document.getElementById('cookieSettingsPanel');
  var cookieSaveSettings = document.getElementById('cookieSaveSettings');

  function getCookieConsent() {
    try {
      return JSON.parse(localStorage.getItem('cookie_consent'));
    } catch (e) {
      return null;
    }
  }

  function setCookieConsent(consent) {
    localStorage.setItem('cookie_consent', JSON.stringify(consent));
    cookieBanner.hidden = true;

    // Apply consent
    if (consent.analytics && typeof gtag === 'function') {
      gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
    }
    if (consent.marketing && typeof gtag === 'function') {
      gtag('consent', 'update', {
        ad_storage: 'granted'
      });
    }
  }

  // Show banner if no consent
  if (!getCookieConsent()) {
    cookieBanner.hidden = false;
  }

  if (cookieAcceptAll) {
    cookieAcceptAll.addEventListener('click', function () {
      setCookieConsent({ necessary: true, analytics: true, marketing: true });
    });
  }

  if (cookieRejectAll) {
    cookieRejectAll.addEventListener('click', function () {
      setCookieConsent({ necessary: true, analytics: false, marketing: false });
    });
  }

  if (cookieSettingsBtn && cookieSettingsPanel) {
    cookieSettingsBtn.addEventListener('click', function () {
      cookieSettingsPanel.hidden = !cookieSettingsPanel.hidden;
    });
  }

  if (cookieSaveSettings) {
    cookieSaveSettings.addEventListener('click', function () {
      var analytics = document.getElementById('cookieAnalytics');
      var marketing = document.getElementById('cookieMarketing');
      setCookieConsent({
        necessary: true,
        analytics: analytics ? analytics.checked : false,
        marketing: marketing ? marketing.checked : false
      });
    });
  }

  // --- WebGL Fluid Hero (desktop + mobile) ---
  var fluidContainer = document.getElementById('hero-fluid');
  var heroLiquid = document.querySelector('.hero__liquid');
  var isMobile = window.innerWidth <= 768;
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var FluidClass = (typeof WebGLFluidEnhanced !== 'undefined') &&
    (WebGLFluidEnhanced.default || WebGLFluidEnhanced);

  var desktopConfig = {
    simResolution: 128,
    dyeResolution: 1024,
    densityDissipation: 0.97,
    velocityDissipation: 0.98,
    pressure: 0.8,
    pressureIterations: 20,
    curl: 30,
    splatRadius: 0.3,
    splatForce: 6000,
    shading: true,
    colorful: false,
    colorPalette: ['#c8913a', '#daa94e', '#6b7c3f', '#8a9e52'],
    hover: true,
    backgroundColor: '#0d0f0e',
    transparent: false,
    brightness: 0.5,
    bloom: true,
    bloomIterations: 8,
    bloomResolution: 256,
    bloomIntensity: 0.8,
    bloomThreshold: 0.6,
    bloomSoftKnee: 0.7,
    sunrays: true,
    sunraysResolution: 196,
    sunraysWeight: 1.0
  };

  var mobileConfig = {
    simResolution: 64,
    dyeResolution: 512,
    densityDissipation: 0.97,
    velocityDissipation: 0.98,
    pressure: 0.8,
    pressureIterations: 20,
    curl: 30,
    splatRadius: 0.25,
    splatForce: 6000,
    shading: true,
    colorful: false,
    colorPalette: ['#c8913a', '#daa94e', '#6b7c3f', '#8a9e52'],
    hover: true,
    backgroundColor: '#0d0f0e',
    transparent: false,
    brightness: 0.5,
    bloom: true,
    bloomIterations: 4,
    bloomResolution: 128,
    bloomIntensity: 0.8,
    bloomThreshold: 0.6,
    bloomSoftKnee: 0.7,
    sunrays: false
  };

  if (fluidContainer && !prefersReducedMotion && FluidClass) {
    try {
      var fluid = new FluidClass(fluidContainer);
      fluid.setConfig(isMobile ? mobileConfig : desktopConfig);
      fluid.start();

      // Initial splats for visual impact on load
      if (fluid.simulation && fluid.simulation.multipleSplats) {
        fluid.simulation.multipleSplats(isMobile ? 4 : 8);
      }

      // Hide CSS blobs — fluid replaces them (Landa #3: one render, not two)
      if (heroLiquid) heroLiquid.style.display = 'none';

      // Touch-events for mobile — forward to fluid simulation
      if ('ontouchstart' in window && fluid.simulation) {
        fluidContainer.addEventListener('touchmove', function(e) {
          e.preventDefault();
          var touch = e.touches[0];
          var rect = fluidContainer.getBoundingClientRect();
          var x = (touch.clientX - rect.left) / rect.width;
          var y = (touch.clientY - rect.top) / rect.height;
          if (fluid.simulation.splatPointer) {
            fluid.simulation.splatPointer(x, y);
          }
        }, { passive: false });
      }

      // IntersectionObserver — pause/resume when hero leaves viewport (battery save)
      var heroObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            fluid.activate ? fluid.activate() : fluid.start();
          } else {
            fluid.deactivate ? fluid.deactivate() : fluid.stop();
          }
        });
      }, { threshold: 0.1 });
      heroObserver.observe(fluidContainer);

      // FPS benchmark on mobile — auto-fallback for weak devices
      if (isMobile) {
        var frameCount = 0;
        var benchStart = performance.now();
        var benchRAF;

        function benchFrame() {
          frameCount++;
          if (performance.now() - benchStart >= 2000) {
            var fps = frameCount / 2;
            if (fps < 20) {
              // Too slow — kill WebGL, show CSS fallback
              if (fluid.stop) fluid.stop();
              fluidContainer.style.display = 'none';
              if (heroLiquid) heroLiquid.style.display = '';
            }
            return;
          }
          benchRAF = requestAnimationFrame(benchFrame);
        }
        benchRAF = requestAnimationFrame(benchFrame);
      }

    } catch (e) {
      // WebGL not supported — CSS blobs remain as fallback
      if (fluidContainer) fluidContainer.style.display = 'none';
    }
  }

  // --- Scroll depth tracking (50%) ---
  var scrollTracked = false;
  window.addEventListener('scroll', function () {
    if (scrollTracked) return;
    var scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight > 0 && (window.pageYOffset / scrollHeight) >= 0.5) {
      scrollTracked = true;
      if (typeof gtag === 'function') {
        gtag('event', 'scroll_50', {
          event_category: 'engagement',
          event_label: 'scroll_depth_50'
        });
      }
    }
  }, { passive: true });

})();
