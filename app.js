const products=[
{id:1,name:'Court Low 01',brand:'Sole Shop',category:'sneakers',price:120,was:150,color:'#f4f2ec',sole:'#e8ff3a',tint:'#e7e6df',rating:4.8,reviews:214,sizes:['7','8','9','10','11'],stock:{'7':3,'8':6,'9':2,'10':0,'11':4}},
{id:2,name:'Trail Runner GT',brand:'Ridgeline',category:'sneakers',price:165,was:null,color:'#2a5cff',sole:'#101010',tint:'#dfe4ef',rating:4.6,reviews:98,sizes:['8','9','10','11','12'],stock:{'8':4,'9':4,'10':2,'11':0,'12':1}},
{id:3,name:'Canvas Everyday',brand:'Sole Shop',category:'everyday',price:78,was:95,color:'#f0efe9',sole:'#c9c7bd',tint:'#eeece4',rating:4.5,reviews:341,sizes:['6','7','8','9','10'],stock:{'6':5,'7':7,'8':0,'9':3,'10':6}},
{id:4,name:'Leather Chelsea',brand:'Ashfield',category:'boots',price:198,was:null,color:'#5a3a24',sole:'#2b1c12',tint:'#e8dfd5',rating:4.9,reviews:127,sizes:['8','9','10','11','12'],stock:{'8':2,'9':3,'10':1,'11':2,'12':0}},
{id:5,name:'Work Boot M2',brand:'Ridgeline',category:'boots',price:175,was:210,color:'#a9762f',sole:'#3a3a34',tint:'#ece3d3',rating:4.7,reviews:76,sizes:['9','10','11','12','13'],stock:{'9':1,'10':2,'11':3,'12':2,'13':1}},
{id:6,name:'Slip-On Knit',brand:'Sole Shop',category:'everyday',price:95,was:null,color:'#101010',sole:'#f0efe9',tint:'#e3e3de',rating:4.4,reviews:188,sizes:['7','8','9','10','11'],stock:{'7':4,'8':5,'9':6,'10':3,'11':2}},
{id:7,name:'Retro Trainer 84',brand:'Ashfield',category:'sneakers',price:140,was:170,color:'#ff5b35',sole:'#f4f2ec',tint:'#f2e2da',rating:4.6,reviews:259,sizes:['7','8','9','10','11','12'],stock:{'7':2,'8':0,'9':4,'10':5,'11':2,'12':3}},
{id:8,name:'Hiking Mid X',brand:'Ridgeline',category:'boots',price:210,was:null,color:'#3f4a3a',sole:'#e8ff3a',tint:'#dfe5da',rating:4.8,reviews:64,sizes:['8','9','10','11'],stock:{'8':2,'9':2,'10':0,'11':1}},
{id:9,name:'Runner Lite',brand:'Sole Shop',category:'sneakers',price:110,was:130,color:'#dcdcd6',sole:'#2a5cff',tint:'#e6e8ec',rating:4.3,reviews:402,sizes:['7','8','9','10','11','12'],stock:{'7':6,'8':8,'9':5,'10':4,'11':3,'12':2}},
{id:10,name:'Desert Chukka',brand:'Ashfield',category:'boots',price:185,was:null,color:'#c9a271',sole:'#6b5334',tint:'#efe6d8',rating:4.7,reviews:91,sizes:['8','9','10','11'],stock:{'8':3,'9':1,'10':2,'11':4}},
{id:11,name:'Mesh Trainer Air',brand:'Ridgeline',category:'sneakers',price:155,was:185,color:'#e8ff3a',sole:'#101010',tint:'#e8ecdc',rating:4.5,reviews:173,sizes:['8','9','10','11','12'],stock:{'8':5,'9':0,'10':3,'11':2,'12':1}},
{id:12,name:'Court High Top',brand:'Sole Shop',category:'sneakers',price:135,was:null,color:'#f4f2ec',sole:'#ff5b35',tint:'#eae7e1',rating:4.6,reviews:146,sizes:['7','8','9','10','11','12'],stock:{'7':2,'8':4,'9':3,'10':2,'11':0,'12':4}}];
const FREE_SHIP_OVER=120, SHIPPING=9;
let cart=[];try{cart=JSON.parse(localStorage.getItem('soleshop-cart')||'[]')}catch(e){cart=[]}
const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(n);
const grid=document.querySelector('#products'), cartItems=document.querySelector('#cartItems');
let state={filter:'all',query:''};
function renderProducts(){
  const list=products.filter(p=>(state.filter==='all'||p.category===state.filter)&&p.name.toLowerCase().includes(state.query));
  grid.innerHTML=list.map(p=>{
    const sizes=p.sizes.map(s=>`<button data-size="${s}" data-id="${p.id}" ${p.stock[s]===0?'disabled':''} title="${p.stock[s]===0?'Sold out':'Add size '+s+' to bag'}">${s}</button>`).join('');
    const badge=p.was?'<span class="card-badge sale">SALE</span>':(Object.values(p.stock).every(v=>v<=2)?'<span class="card-badge">LOW STOCK</span>':'');
    return `<article class="card"><div class="card-media" style="--color:${p.color};--sole:${p.sole};--tint:${p.tint}">${badge}<div class="shoe"></div></div><div class="card-body"><span class="card-brand">${p.brand} / ${p.category}</span><h3>${p.name}</h3><span class="card-rating">${p.rating} ★ (${p.reviews})</span><div class="card-price"><strong>${money(p.price)}</strong>${p.was?`<s>${money(p.was)}</s>`:''}</div><div class="sizes" role="group" aria-label="Choose a size for ${p.name}">${sizes}</div><button class="add-to-bag" data-add="${p.id}">Add to bag</button></div></article>`;}).join('');
  document.querySelector('#resultCount').textContent=list.length+' of '+products.length+' styles';
  document.querySelector('#noResults').hidden=list.length>0;
  document.querySelector('#statCount').textContent=products.length;
}
function totals(){const sub=cart.reduce((s,x)=>s+x.price*x.qty,0);const ship=!cart.length||sub>=FREE_SHIP_OVER?0:SHIPPING;return{sub,ship,total:sub+ship}}
function save(){localStorage.setItem('soleshop-cart',JSON.stringify(cart));renderCart()}
function renderCart(){
  document.querySelector('#cartCount').textContent=cart.reduce((s,x)=>s+x.qty,0);
  cartItems.innerHTML=cart.length?cart.map(x=>`<div class="cart-item"><div class="mini" style="--color:${x.color};--tint:${x.tint}"></div><div><h3>${x.name}</h3><span>size ${x.size} · ${money(x.price)}</span><div class="qty"><button data-dec="${x.id}-${x.size}" aria-label="Decrease quantity">-</button><b>${x.qty}</b><button data-inc="${x.id}-${x.size}" aria-label="Increase quantity">+</button></div><button class="remove" data-remove="${x.id}-${x.size}">remove</button></div><strong>${money(x.price*x.qty)}</strong></div>`).join(''):'<p class="empty">Nothing in the bag yet.</p>';
  const t=totals();
  document.querySelector('#subtotal').textContent=money(t.sub);
  document.querySelector('#shipping').textContent=t.ship?money(t.ship):'FREE';
  document.querySelector('#total').textContent=money(t.total);
}
function toast(msg){const t=document.querySelector('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(t.timer);t.timer=setTimeout(()=>t.classList.remove('show'),2200)}
function openCart(open){document.querySelector('#cart').classList.toggle('open',open);document.querySelector('#cart').setAttribute('aria-hidden',!open);document.querySelector('#overlay').classList.toggle('show',open)}
function find(id){return products.find(p=>p.id===Number(id))}
grid.addEventListener('click',e=>{
  const sizeBtn=e.target.closest('[data-size]');
  if(sizeBtn&&!sizeBtn.disabled){const p=find(sizeBtn.dataset.id);addToCart(p,sizeBtn.dataset.size);return}
  const add=e.target.closest('[data-add]');
  if(add){const p=find(add.dataset.add);const first=p.sizes.find(s=>p.stock[s]>0);if(!first){toast('That style is sold out.');return}addToCart(p,first)}
});
function addToCart(p,size){
  const line=cart.find(x=>x.id===p.id&&x.size===size);
  if(line)line.qty++;else cart.push({id:p.id,name:p.name,size,price:p.price,color:p.color,tint:p.tint,qty:1});
  save();toast(p.name+' · size '+size+' added');openCart(true);
}
cartItems.addEventListener('click',e=>{
  const inc=e.target.dataset.inc,dec=e.target.dataset.dec,rem=e.target.dataset.remove;
  const key=inc||dec||rem;if(!key)return;
  const [id,size]=key.split('-');
  if(inc){const l=cart.find(x=>x.id===Number(id)&&x.size===size);l.qty++}
  if(dec){const l=cart.find(x=>x.id===Number(id)&&x.size===size);l.qty--;if(l.qty<1)cart=cart.filter(x=>!(x.id===Number(id)&&x.size===size))}
  if(rem){cart=cart.filter(x=>!(x.id===Number(id)&&x.size===size))}
  save();
});
document.querySelectorAll('.filters button').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filters button').forEach(x=>x.classList.remove('active'));b.classList.add('active');state.filter=b.dataset.filter;renderProducts()}));
document.querySelector('#search').addEventListener('input',e=>{state.query=e.target.value.trim().toLowerCase();renderProducts()});
document.querySelector('#cartBtn').onclick=()=>openCart(true);
document.querySelector('#closeCart').onclick=()=>openCart(false);
document.querySelector('#overlay').onclick=()=>openCart(false);
document.querySelector('.menu').onclick=()=>document.querySelector('nav').classList.toggle('open');
document.addEventListener('keydown',e=>{if(e.key==='Escape')openCart(false)});
document.querySelector('#checkout').onclick=()=>{
  if(!cart.length){toast('Your bag is empty.');return}
  const t=totals();toast('Demo order · '+money(t.total)+' - connect a payment provider to take payment.');
};
document.querySelector('#newsletterForm').onsubmit=e=>{
  e.preventDefault();const input=document.querySelector('#email');
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.value)){document.querySelector('#formMsg').textContent='Enter a valid email address.';return}
  document.querySelector('#formMsg').textContent='You are on the list.';e.target.reset();
};
document.querySelector('#year').textContent=new Date().getFullYear();
renderProducts();renderCart();
const hash=location.hash.replace('#','');if(['sneakers','boots','everyday'].includes(hash)){state.filter=hash;document.querySelectorAll('.filters button').forEach(b=>b.classList.toggle('active',b.dataset.filter===hash));renderProducts()}