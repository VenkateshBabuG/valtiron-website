const menu=document.getElementById('menu'),nav=document.getElementById('nav');
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
document.getElementById('year').textContent=new Date().getFullYear();
document.querySelectorAll('[data-product]').forEach(a=>a.addEventListener('click',()=>{document.getElementById('product').value=a.dataset.product}));
// RFQ submissions are handled by the form's POST action to FormSubmit.
// No client-side interception: the browser submits the form normally.
