import { containerInnerHTML, labelShow } from "./components/components.js";

const URL = 'https://auth-assignjw-default-rtdb.firebaseio.com/pub.json';

window.onload = document.getElementById("input-search").addEventListener("keyup", function search(e) {
  e.preventDefault();
  let detaList = document.getElementById("search");
  detaList.innerHTML = "";
  fetch(URL)
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        const { nameC } = data[i];
        detaList.innerHTML += `<option value="${nameC}">`;
      }
    })
    .catch(error => console.log(error));
});

document.getElementById("btnSearch").addEventListener("click", function clickInTheSearch(e) {
  e.preventDefault();
  let count = 0;
  let inputSearch = document.getElementById("input-search").value;
  let containerAssign = document.getElementById("container_assign");
  let value;
  containerAssign.innerHTML = '';
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    value = localStorage.getItem(key);
    value = JSON.parse(value);
    for (let j = 0; j < value.length; j++) {
      count++;
      const { dateBefore, dateAfter, dataTitle, lec, firstPerson, secondPerson } = value[j];
      if (firstPerson === inputSearch || secondPerson === inputSearch) {
        const ID = key + "-" + count;
        console.log(ID);
        containerAssign.innerHTML += `<div class="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-delay="200">
        <div class="box">
          <span id="${ID}" class="featured">Le Falta Poco</span>
          <h3 style="color: #65c600;">${dataTitle}</h3>
          <div class="price"><p class="de">De: </p><h2 class="date"><strong>${dateBefore}</strong></h2><p class="al">Al: </p><h2 class="date"><strong>${dateAfter}</strong></h2></div>
          <ul>
            <li>${firstPerson}</li>
            <li>${secondPerson}</li>
          </ul>
          <h3>Leccion: ${lec}</h3>
          <a href="#" class="btn-buy">Editar</a>
        </div>
      </div>`;
      }
    }
    labelShow();
  }
});

document.getElementById("input-search").addEventListener("keydown", function searchVerifyInputClean() {
  const input = document.getElementById("input-search").value;
  if (input === "") {
    containerInnerHTML();
  }
});

containerInnerHTML();
