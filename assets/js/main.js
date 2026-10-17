/**
 * Hair Creations by Bruce — Interactive Client Scripts
 * Handles mobile menu drawer, gallery/pricing filtering, and appointment request helper.
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mainNav = document.getElementById('main-nav');
  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', () => {
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!expanded));
      mainNav.classList.toggle('is-open', !expanded);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
        menuBtn.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('is-open');
        menuBtn.focus();
      }
    });
  }

  // 2. Category Filtering (Gallery & Services/Pricing)
  const filterButtons = document.querySelectorAll('[data-filter-btn]');
  const filterItems = document.querySelectorAll('[data-filter-category]');
  if (filterButtons.length > 0 && filterItems.length > 0) {
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-filter-btn');
        filterButtons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        filterItems.forEach((item) => {
          const cats = (item.getAttribute('data-filter-category') || '').split(' ');
          if (target === 'all' || cats.includes(target)) {
            item.hidden = false;
          } else {
            item.hidden = true;
          }
        });
      });
    });
  }

  // 3. Interactive Appointment Request Form -> Pre-filled Mailto + SMS helper
  const bookingForm = document.getElementById('appointment-request-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(bookingForm);
      const name = formData.get('clientName') || '';
      const phone = formData.get('clientPhone') || '';
      const service = formData.get('serviceType') || 'General Hair Consultation';
      const locationType = formData.get('visitType') || 'In-Studio (McLean House Suite 106)';
      const preferredDay = formData.get('preferredDay') || 'Flexible (Mon-Sat, 6am-3pm)';
      const notes = formData.get('notes') || '';

      const subject = encodeURIComponent(`Appointment Request: ${service} — ${name}`);
      const body = encodeURIComponent(
        `Hi Bruce,\n\nI would like to request an appointment at Hair Creations by Bruce.\n\n` +
        `• Name: ${name}\n` +
        `• Phone: ${phone}\n` +
        `• Requested Service: ${service}\n` +
        `• Visit Type: ${locationType}\n` +
        `• Preferred Day/Time (Mon–Sat 6am–3pm): ${preferredDay}\n` +
        `• Additional Notes: ${notes || 'None'}\n\n` +
        `Thank you!`
      );

      const statusBox = document.getElementById('booking-form-status');
      if (statusBox) {
        statusBox.hidden = false;
        statusBox.innerHTML = `
          <strong>✓ Request Ready!</strong> Opening your email client addressed to <code>Sambru703@aol.com</code>.
          For the fastest response, you can also call or text Bruce directly at <a href="tel:+15712133667">(571) 213-3667</a>.
        `;
      }
      window.location.href = `mailto:Sambru703@aol.com?subject=${subject}&body=${body}`;
    });
  }
});
