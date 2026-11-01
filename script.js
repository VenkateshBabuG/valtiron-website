const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#nav');menu?.addEventListener('click',()=>{let open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false')}));document.getElementById('year').textContent=new Date().getFullYear();document.querySelectorAll('[data-product]').forEach(a=>a.addEventListener('click',()=>{document.getElementById('product').value=a.dataset.product}));
const phone=document.getElementById('phone-digits'),dial=document.getElementById('dial-code'),fullPhone=document.getElementById('phone-full');phone.addEventListener('input',()=>{phone.value=phone.value.replace(/\D/g,'').slice(0,15)});
const form=document.getElementById('rfq'),status=document.getElementById('form-status');form.addEventListener('submit',async e=>{e.preventDefault();if(!form.reportValidity())return;const button=form.querySelector('button[type="submit"]');button.disabled=true;button.textContent='Sending request…';status.className='';status.textContent='Sending your request…';fullPhone.value=phone.value?dial.value+' '+phone.value:'';try{const response=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});const data=await response.json();if(!response.ok||!(data.success===true||data.success==='true'))throw new Error('Not confirmed');status.className='success';status.textContent='✓ Thank you! Your quote request has been submitted successfully. Our team will review your requirements.';form.reset()}catch(err){status.className='error';status.textContent='We could not confirm your submission. Please try again or email sales@valtirondoors.com.'}finally{button.disabled=false;button.innerHTML='Send Project Inquiry <span>↗</span>'}});
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver'in window){document.documentElement.classList.add('js-motion');const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}}),{threshold:.06,rootMargin:'0px 0px 45px 0px'});document.querySelectorAll('.reveal').forEach(el=>obs.observe(el))}


// VALTIRON Studio Experience: progressive enhancements only.
const topLink=document.querySelector('.back-to-top');
const updateTop=()=>topLink?.classList.toggle('is-visible',window.scrollY>750);
window.addEventListener('scroll',updateTop,{passive:true});updateTop();
// Dynamic glow follows the pointer, without moving page layout.
if(window.matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches){
 const hero=document.querySelector('.hero-art');hero?.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();hero.style.setProperty('--px',((e.clientX-r.left)/r.width*100)+'%');hero.style.setProperty('--py',((e.clientY-r.top)/r.height*100)+'%')});
}
// Validate optional national phone lengths for the displayed calling code.
const lengths={'+1':[10],'+91':[10],'+44':[9,10],'+971':[8,9],'+61':[9],'+49':[7,8,9,10,11,12,13],'+33':[9],'+65':[8]};
const validatePhone=()=>{if(!phone.value){phone.setCustomValidity('');return;}const allowed=lengths[dial.value];phone.setCustomValidity(allowed&&!allowed.includes(phone.value.length)?`Enter a valid phone number (${allowed.join(' or ')} digits) for ${dial.value}.`:'')};
phone.addEventListener('input',validatePhone);dial.addEventListener('change',validatePhone);

// Accessible product category filters. RFQ form behavior is unchanged.
const productCards=[...document.querySelectorAll('.portfolio-grid .product-card')];
document.querySelectorAll('.filter-chip').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('.filter-chip').forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-pressed',String(b===btn))});
 productCards.forEach(card=>card.classList.toggle('is-hidden',btn.dataset.filter!=='all'&&card.dataset.category!==btn.dataset.filter));
}));
document.querySelectorAll('.filter-chip').forEach(b=>b.setAttribute('aria-pressed',String(b.classList.contains('active'))));
