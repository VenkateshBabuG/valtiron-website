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
      body: new FormData(rfq),
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
