const baseServices = [
  { id:"wash_std", name:"Автомийка стандарт", price:350 },
  { id:"wash_full", name:"Автомийка комплекс", price:650 },
  { id:"interior", name:"Хімчистка салону", price:900 },
  { id:"wax", name:"Нанесення воску", price:200 },
];

const addOptions = [
  { id:"engine", name:"Мийка двигуна", price:200 },
  { id:"tire", name:"Чорніння шин", price:80 },
  { id:"glass", name:"Антидощ для скла", price:120 },
  { id:"vacuum", name:"Пилосос салону", price:150 },
  { id:"mat", name:"Мийка килимків (комплект)", price:70 },
  { id:"trunk", name:"Прибирання багажника", price:90 },
  { id:"polish", name:"Експрес‑полірування кузова", price:350 },
  { id:"ozone", name:"Озонація салону", price:300 },
];

const serviceSel = document.getElementById("serviceSel");
const optsEl = document.getElementById("opts");
const qtyEl = document.getElementById("qty");
const totalEl = document.getElementById("total");
const detailsEl = document.getElementById("details");

function грн(n){ return `${n} грн`; }

function render(){
  serviceSel.innerHTML = baseServices.map(s => `<option value="${s.id}">${s.name} — ${грн(s.price)}</option>`).join("");
  optsEl.innerHTML = addOptions.map(o => `
    <label style="display:flex; gap:10px; align-items:center; padding:10px 12px; border:1px solid rgba(255,255,255,.12); border-radius:14px; background: rgba(255,255,255,.03); cursor:pointer;">
      <input type="checkbox" value="${o.id}" style="width:auto; margin:0;">
      <span style="flex:1">${o.name}</span>
      <span style="color:rgba(255,255,255,.55); font-weight:800">${грн(o.price)}</span>
    </label>
  `).join("");
  calc();
}

function calc(){
  const selectedService = baseServices.find(s => s.id === serviceSel.value);
  const qty = Math.max(1, Number(qtyEl.value || 1));

  const selectedOptIds = Array.from(optsEl.querySelectorAll('input[type="checkbox"]:checked')).map(i => i.value);
  const selectedOpts = addOptions.filter(o => selectedOptIds.includes(o.id));

  const optionsSum = selectedOpts.reduce((a,o)=>a+o.price,0);
  const one = selectedService.price + optionsSum;
  const total = one * qty;

  totalEl.textContent = грн(total);
  detailsEl.innerHTML = `
    <div class="line">База: <b>${selectedService.name}</b> — <b>${грн(selectedService.price)}</b></div>
    <div class="line">Додатково: <b>${selectedOpts.length ? selectedOpts.map(o=>o.name).join(", ") : "немає"}</b> — <b>${грн(optionsSum)}</b></div>
    <div class="line">Кількість: <b>${qty}</b></div>
    <div class="line">Разом за 1 раз: <b>${грн(one)}</b></div>
  `;
}

serviceSel.addEventListener("change", calc);
qtyEl.addEventListener("input", calc);
optsEl.addEventListener("change", calc);

render();
