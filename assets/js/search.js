import { containerInnerHTML, labelShow, showFeature, getDataAssigns } from "./components/components.js";

const URL = 'https://auth-assignjw-default-rtdb.firebaseio.com/pub.json';

window.onload = document.getElementById("input-search").addEventListener("keyup", function (e) {
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

document.getElementById("btnSearch").addEventListener("click", function (e) {
  e.preventDefault();
  let count = 0, value;
  let inputSearch = document.getElementById("input-search").value;
  let containerAssign = document.getElementById("container_assign");
  containerAssign.innerHTML = '';
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    value = localStorage.getItem(key);
    value = JSON.parse(value);
    for (let j = 0; j < value.length; j++) {
      count++;
      let { firstPerson, secondPerson } = value[j];
      if (firstPerson === inputSearch || secondPerson === inputSearch) {
        const ID = key + "-" + count;
        containerAssign.innerHTML += showFeature(getDataAssigns(value[j]), ID);
      }
    }
    labelShow();
  }
});

document.getElementById("input-search").addEventListener("keydown", function () {
  const input = document.getElementById("input-search").value;
  if (input === "") {
    containerInnerHTML();
  }
});

containerInnerHTML();
