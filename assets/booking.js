const servicesData = [
  { name: "Автомийка стандарт", tag: "Зовні + килимки", duration: "30 хв", price: 350 },
  { name: "Автомийка комплекс", tag: "Зовні + салон", duration: "60 хв", price: 650 },
  { name: "Хімчистка салону", tag: "Глибоке очищення", duration: "90 хв", price: 900 },
  { name: "Нанесення воску", tag: "Захист кузова", duration: "25 хв", price: 200 },
];

const slotsData = ["09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30"];

const servicesEl = document.getElementById("services");
const slotsEl = document.getElementById("slots");
const pickedServiceEl = document.getElementById("pickedService");
const pickedTimeEl = document.getElementById("pickedTime");
const confirmBtn = document.getElementById("confirmBtn");
const resetBtn = document.getElementById("resetBtn");
const toast = document.getElementById("toast");

let selectedService = null;
let selectedTime = null;

function грн(n){ return `${n} грн`; }

function renderServices() {
  servicesEl.innerHTML = servicesData.map((s, idx) => `
    <div class="service" role="button" tabindex="0" data-idx="${idx}">
      <div>
        <div class="name">${s.name}</div>
        <div class="badge">${s.tag}</div>
      </div>
      <div class="meta">
        <div>${s.duration}</div>
        <div>${грн(s.price)}</div>
      </div>
    </div>
  `).join("");
}

function renderSlots() {
  slotsEl.innerHTML = slotsData.map(t => `<div class="slot" role="button" tabindex="0" data-time="${t}">${t}</div>`).join("");
}

function setToast(message){
  toast.textContent = message;
  toast.classList.add("show");
}
function clearToast(){
  toast.textContent = "";
  toast.classList.remove("show");
}

function updateSummary(){
  if (selectedService){
    pickedServiceEl.innerHTML = `Послуга: <b>${selectedService.name}</b> <span style="color:rgba(255,255,255,.55)">(${selectedService.duration}, ${грн(selectedService.price)})</span>`;
  } else {
    pickedServiceEl.innerHTML = "Послуга: <b>не обрано</b>";
  }

  if (selectedTime){
    pickedTimeEl.innerHTML = `Час: <b>${selectedTime}</b>`;
  } else {
    pickedTimeEl.innerHTML = "Час: <b>не обрано</b>";
  }

  confirmBtn.disabled = !(selectedService && selectedTime);
}

servicesEl.addEventListener("click", (e) => {
  const item = e.target.closest(".service");
  if(!item) return;
  document.querySelectorAll(".service.selected").forEach(el => el.classList.remove("selected"));
  item.classList.add("selected");
  selectedService = servicesData[Number(item.dataset.idx)];
  clearToast();
  updateSummary();
});

slotsEl.addEventListener("click", (e) => {
  const item = e.target.closest(".slot");
  if(!item) return;
  document.querySelectorAll(".slot.selected").forEach(el => el.classList.remove("selected"));
  item.classList.add("selected");
  selectedTime = item.dataset.time;
  clearToast();
  updateSummary();
});

confirmBtn.addEventListener("click", () => {
  if(!(selectedService && selectedTime)) return;
  setToast(`✅ Бронювання підтверджено: ${selectedService.name} о ${selectedTime}. (Демо-режим: без збереження)`);
});

resetBtn.addEventListener("click", () => {
  document.querySelectorAll(".service.selected").forEach(el => el.classList.remove("selected"));
  document.querySelectorAll(".slot.selected").forEach(el => el.classList.remove("selected"));
  selectedService = null;
  selectedTime = null;
  clearToast();
  updateSummary();
});

renderServices();
renderSlots();
updateSummary();
