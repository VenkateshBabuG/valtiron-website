const menu=document.getElementById('menu'),nav=document.getElementById('nav');
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
document.getElementById('year').textContent=new Date().getFullYear();
document.querySelectorAll('[data-product]').forEach(a=>a.addEventListener('click',()=>{document.getElementById('product').value=a.dataset.product}));
// Submit without navigating away from the VALTIRON website.
const rfq = document.getElementById('rfq');
const status = document.getElementById('form-status');
rfq.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!rfq.reportValidity()) return;
  const button = rfq.querySelector('button[type="submit"]');
  button.disabled = true;
  button.textContent = 'Sending request…';
  status.style.cssText = '';
  status.textContent = 'Sending your request…';
  try {
    const response = await fetch(rfq.action, {
      method: 'POST',
      body: (() => { const data = new FormData(rfq); const digits = (rfq.querySelector('#phone-number')?.value || '').replace(/\D/g, ''); data.set('phone', digits ? `${rfq.querySelector('#phone-country').value} ${digits}` : ''); return data; })(),
      headers: { 'Accept': 'application/json' }
    });
    const result = await response.json();
    if (!response.ok || result.success !== 'true' && result.success !== true) {
      throw new Error(result.message || 'Submission not confirmed');
    }
    status.textContent = '✓ Thank you! Your quote request has been submitted successfully. Our team will review your requirements.';
    status.style.cssText = 'display:block;padding:14px 18px;margin-top:14px;border:1px solid #a7d9b5;border-radius:6px;background:#e6f6e9;color:#155c2c;font-weight:600;';
    rfq.reset();
  } catch (error) {
    status.textContent = 'We could not confirm your submission. Please try again, or email sales@valtirondoors.com directly.';
    status.style.cssText = 'display:block;padding:14px 18px;margin-top:14px;border:1px solid #f1b8b8;border-radius:6px;background:#fff0f0;color:#9c2424;font-weight:600;';
  } finally {
    button.disabled = false;
    button.textContent = 'Submit Quote Request ↗';
  }
});


// VALTIRON motion enhancement: visual-only; RFQ handler above remains unchanged.
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;
  document.documentElement.classList.add('valtiron-motion');
  const targets = document.querySelectorAll(
    '.section-heading, .product, .industry-grid > div, .spec-card, .spec-aside, .about > div, .contact-intro, .form, .trust > span, .footer-main > div'
  );
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('v-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px 35px 0px' });
  targets.forEach((el, index) => {
    el.classList.add('v-reveal');
    el.style.setProperty('--v-delay', `${(index % 4) * 75}ms`);
    observer.observe(el);
  });
  // Keep the green form confirmation visible and animate it once on submission.
  const formStatus = document.getElementById('form-status');
  if (formStatus) {
    new MutationObserver(() => {
      if (formStatus.textContent.includes('submitted successfully')) {
        formStatus.classList.remove('v-success-pop');
        void formStatus.offsetWidth;
        formStatus.classList.add('v-success-pop');
      }
    }).observe(formStatus, { childList: true, characterData: true, subtree: true });
  }
})();

// Numeric-only phone entry; keep the international prefix in the selector.
const vPhone = document.getElementById('phone-number');
if (vPhone) vPhone.addEventListener('input', () => { vPhone.value = vPhone.value.replace(/\D/g, '').slice(0, 15); });
