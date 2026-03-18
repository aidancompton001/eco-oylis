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

  // --- Scroll Reveal ---
  var revealElements = document.querySelectorAll('[data-reveal]');

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show all
    revealElements.forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  // --- Header scroll effect ---
  var header = document.getElementById('header');
  var lastScroll = 0;

  window.addEventListener('scroll', function () {
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollY > 80) {
      header.style.background = 'rgba(13,15,14,0.95)';
    } else {
      header.style.background = 'rgba(13,15,14,0.85)';
    }
    lastScroll = scrollY;
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

      // Send via Formspree
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
