'use strict';
const packages=[
{id:'business',name:'Business Website',bn:'ব্যবসার নিজস্ব পরিচয়',price:5000,features:['ব্যবসার পরিচিতি ও সেবার তথ্য','মোবাইলবান্ধব ডিজাইন','Facebook / WhatsApp যোগাযোগ'],icon:'▦'},
{id:'catalog',name:'Product Catalog',bn:'পণ্য দেখানো হোক সহজ',price:2000,features:['পণ্যের ছবি, দাম ও বিস্তারিত','সার্চ ও বিভাগ অনুযায়ী ফিল্টার','পেজে যোগাযোগের সুবিধা'],icon:'▤'},
{id:'portfolio',name:'Personal Portfolio',bn:'আপনাকে চিনুক আপনার কাজেই',price:1000,features:['নিজের পরিচয় ও দক্ষতা','কাজের নমুনা ও প্রয়োজনীয় লিংক','সরাসরি যোগাযোগের অংশ'],icon:'◉'},
{id:'gift',name:'Gift Website',bn:'স্মৃতি দিয়ে সাজানো উপহার',price:1000,features:['ছবি ও ব্যক্তিগত বার্তা','জন্মদিন / অ্যানিভার্সারির আয়োজন','মোবাইলে সহজে দেখার অভিজ্ঞতা'],icon:'♡'},
{id:'redesign',name:'Website Redesign',bn:'পরিচিত সাইটে নতুন অনুভব',price:3000,features:['সম্মত অংশের ডিজাইন পরিবর্তন','মোবাইল লেআউট উন্নত করা','পরিষ্কার ও সহজ নেভিগেশন'],icon:'✧'}];
const $=s=>document.querySelector(s);const config=window.WEBBUNON||{};const money=n=>'৳'+n.toLocaleString('en-US');
function safeFacebook(value){try{const u=new URL(value);return u.protocol==='https:'&&['facebook.com','www.facebook.com','m.facebook.com'].includes(u.hostname)?u.href:''}catch{return ''}}
function safeNumber(value){const n=String(value||'').replace(/[\s+()-]/g,'');return /^[1-9]\d{7,14}$/.test(n)?n:''}
const fb=safeFacebook(config.facebookUrl),wa=safeNumber(config.whatsappNumber);
$('#pricing-grid').innerHTML=packages.map(p=>`<article class="price-card ${p.id==='business'?'highlight':''}"><div class="price-label">${p.id==='business'?'BUSINESS ESSENTIAL':'ONE-TIME PACKAGE'}</div><span class="service-icon">${p.icon}</span><h3>${p.name}</h3><p>${p.bn}</p><div class="price">${money(p.price)}<small>এককালীন / One-time</small></div><ul>${p.features.map(f=>`<li>${f}</li>`).join('')}</ul><button class="btn ${p.id==='business'?'':'secondary'}" data-package="${p.id}">এই প্যাকেজটি চাই</button><small class="delivery">Delivery: ৩–৫ দিন</small></article>`).join('');
$('#service-select').innerHTML=packages.map(p=>`<option value="${p.id}">${p.name} — ${money(p.price)}</option>`).join('');
function selected(){return packages.find(p=>p.id===$('#service-select').value)||packages[0]}
function updatePrice(){const p=selected();$('#selected-price').textContent=`${p.name} · ${money(p.price)} · One-time payment`}
function briefText(name,service,idea){return `Hello WebBunon!\n\nনাম / ব্যবসা: ${name.trim()}\nপ্যাকেজ: ${service.name}\nপ্যাকেজ মূল্য: ${money(service.price)} (এককালীন)\n\nআমার আইডিয়া:\n${idea.trim()}\n\nকাজের পরিধি ও ৩–৫ দিনের ডেলিভারির সময় নিয়ে কথা বলতে চাই।`}
function setLink(id,url){if(!url)return;$(id).href=url;$(id).hidden=false}setLink('#facebook-link',fb);setLink('#whatsapp-link',wa?'https://wa.me/'+wa:'');
$('#pricing-grid').addEventListener('click',e=>{const b=e.target.closest('[data-package]');if(!b)return;$('#service-select').value=b.dataset.package;updatePrice();$('#contact').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});$('#client-name').focus({preventScroll:true})});
$('#service-select').addEventListener('change',updatePrice);$('#year').textContent=new Date().getFullYear();updatePrice();
$('#menu-toggle').addEventListener('click',()=>{const open=$('#menu-toggle').getAttribute('aria-expanded')!=='true';$('#menu-toggle').setAttribute('aria-expanded',String(open));$('#nav').classList.toggle('open',open)});
$('#nav').addEventListener('click',e=>{if(e.target.closest('a')){$('#menu-toggle').setAttribute('aria-expanded','false');$('#nav').classList.remove('open')}});
$('#brief-form').addEventListener('submit',e=>{e.preventDefault();if(!$('#brief-form').reportValidity())return;const name=$('#client-name').value.trim(),idea=$('#idea').value.trim();if(!name||!idea){toast('নাম ও প্রজেক্টের কথা লিখুন।');return}const text=briefText(name,selected(),idea);$('#brief-output').textContent=text;setLink('#send-whatsapp',wa?'https://wa.me/'+wa+'?text='+encodeURIComponent(text):'');$('#brief-dialog').showModal()});
$('#close-dialog').addEventListener('click',()=>$('#brief-dialog').close());let timer;function toast(t){$('#toast').textContent=t;clearTimeout(timer);timer=setTimeout(()=>$('#toast').textContent='',4000)}
$('#copy-brief').addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('#brief-output').textContent);toast('ব্রিফ কপি হয়েছে। পছন্দের মাধ্যমে পাঠাতে পারেন।')}catch{const range=document.createRange();range.selectNodeContents($('#brief-output'));const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);toast('লেখা নির্বাচন করা হয়েছে। Copy করুন।')}});
