import { showFeature, labelShow, getDataAssigns, editAssigns, updateAssigns } from "./components/components.js";

let b = document.getElementsByClassName("btn-update");

let btn = document.getElementsByClassName("btn-buy");

for (const ele of btn) {
  ele.addEventListener("click", showData);
}

for (const el of b) {
  el.addEventListener("submit", updateAssigns);
}

function showData(e) {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    let value = localStorage.getItem(key);
    value = JSON.parse(value);
    for (let j = 0; j < value.length; j++) {
      const { firstPerson, secondPerson } = value[j];
      const btnID = firstPerson + "-" + secondPerson;
      if (btnID === e.target.id) {
        editAssigns(btnID);
      }
    }
  }
}

function show() {
  let number = 0;
  let containerWeek = document.getElementById("faqlist1");
  containerWeek.innerHTML = '';
  if (localStorage.length === 0) {
    document.getElementById("pricing").style.display = "none";
  }else{
    for (let i = 0; i < localStorage.length; i++) {
      number++;
      let key = localStorage.key(i);
      containerWeek.innerHTML += `<div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#faq-content-${number}">
             ${key}
            </button>
          </h2>
          <div id="faq-content-${number}" class="accordion-collapse collapse" data-bs-parent="#faqlist${number}">
            <div id="${key}" class="row gy-4 accordion-body"></div></div>
        </div>`
    }
  }
}

function showAssigns() {
  let container;
  let count = 0;
  let containerWeek = document.getElementById("container-week");
  containerWeek = "";
  if (localStorage.length === 0) {
    document.getElementById("faq").style.display = "none";
  }else{
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      let value = localStorage.getItem(key);
      value = JSON.parse(value);
      container = document.getElementById(key);
      container.innerHTML = '';
      for (let j = 0; j < value.length; j++) {
        count++;
        const { dateBefore, dateAfter } = value[j];
        let dateComplete = `${dateBefore} - ${dateAfter}`;
        if (dateComplete === key) {
          const ID = dateComplete + "-" + count;
          container.innerHTML += showFeature(getDataAssigns(value[j]), ID);
        }
      }
    }
  }
  labelShow();
}
show();
showAssigns();