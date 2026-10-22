const menu=document.getElementById('menu'),nav=document.getElementById('nav');
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
document.getElementById('year').textContent=new Date().getFullYear();
document.querySelectorAll('[data-product]').forEach(a=>a.addEventListener('click',()=>{document.getElementById('product').value=a.dataset.product}));
document.getElementById('rfq').addEventListener('submit',async e=>{
 e.preventDefault();const d=Object.fromEntries(new FormData(e.target).entries());
 const body=`VALTIRON PROJECT QUOTE REQUEST\nName: ${d.name}\nCompany: ${d.company}\nEmail: ${d.email}\nPhone: ${d.phone}\nProduct: ${d.product}\nProject location: ${d.location}\n\nProject details:\n${d.details}`;
 const status=document.getElementById('form-status');
 try{await navigator.clipboard.writeText(body);status.textContent='Quote request copied. Paste it into an email to your VALTIRON contact. This website has not submitted your request.';}
 catch{status.textContent='Clipboard access is unavailable. Please copy your project details manually; this website has not submitted your request.';}
});
