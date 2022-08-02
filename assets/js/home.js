import {
    containerInnerHTML,
    //editAssigns,
    arrayElementsByBtn,
    containerTitle,
    containerHome
} from "./components/components.js";

var dateA;
var dateB;
const URL = 'https://auth-assignjw-default-rtdb.firebaseio.com/pub.json';
var asign = { dateBefore, dateAfter };
var dataTitle;

document.getElementById("submitPersons2").addEventListener("click", home);
document.getElementById("btnTitleAsign").addEventListener("click", submitBtn);
document.getElementById("btnPersons").addEventListener("click", getInfoForOptions);
//document.getElementById("btnEdit"), addEventListener("click", editAssigns);
submitBtn.onload = getData;
document.getElementById("submitPersons2").addEventListener("click", getData);

const personAsign = document.getElementById("personAsign");
const dataInfo = document.getElementById("dataInfo");
const dateWeek = document.getElementById("dateWeek");
const dataAsign = document.getElementById("dateAsign");
const hero = document.getElementById("hero");
const heroSecond = document.getElementById("heroSecond");

function load() {
    $(window).load(function () {
        $(".loader").fadeOut("slow");
        heroSecond.style.position = "absolute";
    })
}

document.getElementById("container_assign").addEventListener("change", function (e) {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        let value = localStorage.getItem(key);
        value = JSON.parse(value);
        for (let j = 0; j < value.length; j++) {
          const { firstPerson, secondPerson } = value[j];
          const ID = "action-" + firstPerson + "-" + secondPerson;
          let btn = firstPerson + "-" + secondPerson;
          if (ID === e.target.id) {
            let getSelect = document.getElementById(ID).value;
            document.getElementById(btn).textContent = getSelect;
          }
        }
      }
})

document.getElementById("btnSubmit").addEventListener("click", function () {
    if (document.getElementById("dateBefore").value === "") {
        alert("Ingrese la fecha de inicio de la semana");
    } else {
        dateA = document.getElementById("dateAfter").value;
        dateB = document.getElementById("dateBefore").value;
        asign = {
            dateBefore: dateB,
            dateAfter: dateA
        }
        const { dateBefore, dateAfter } = asign;
        let data = { dateAfter, dateBefore };
        document.getElementById("container_title").innerHTML = containerTitle(data);

        document.getElementById("home").innerHTML = containerHome();
        dateWeek.style.display = "none";
        dataAsign.style.display = "flex";
    }
});

document.getElementById("btnTitles").addEventListener("click", function () {
    const { dateBefore, dateAfter } = asign;
    document.getElementById("title").innerHTML = `Semana del <div class="container_data">
    <h2 class="data">${dateBefore}</h2>  al  <h2 class="data">${dateAfter}</h2></div>`;
    dataInfo.style.display = "flex";
    dateWeek.style.display = "none";
    dataAsign.style.display = "none";
});

function submitBtn() {
    const { dateBefore, dateAfter } = asign;
    let btn = document.getElementById("titleOption").value;
    dataTitle = btn;
    asign = { dateBefore, dateAfter, dataTitle };
    if ((dataTitle === "Primera conversacion 3") || (dataTitle === "Primera conversacion 5") || (dataTitle === "Revisita" || (dataTitle === "Curso Biblico"))) {
        document.getElementById("titlePersons").innerHTML = `Agregar dos personas`;
        document.getElementById("h2_change").innerHTML = `Ahora asigne a dos personas para esta asignacion y agregue la leccion`;
        document.getElementById("btnPersons").style.display = "none";
        document.getElementById("container-btnPerson").style.display = "none";
        document.getElementById("submitPersons2").style.display = "flex";
        document.getElementById("submitPersons2").style.position = "inherit";
        document.getElementById("submitPersons").style.visibility = "hidden";
        document.getElementById("span1").style.visibility = "hidden";
        getInfoForOptions();
        changeNumberPerson();
    } else {
        document.getElementById("titlePersons").innerHTML = `Agregar un publicador`;
        document.getElementById("h2_change").innerHTML = `Ahora asigne a una persona para esta asignacion y agregue la leccion`;
        document.getElementById("btnPersons").style.display = "none";
        document.getElementById("container-btnPerson").style.display = "none";
        document.getElementById("submitPersons2").style.display = "flex";
        document.getElementById("submitPersons2").style.position = "inherit";
        document.getElementById("submitPersons").style.visibility = "hidden";
        document.getElementById("span1").style.visibility = "hidden";
        getInfoForOptions();
    }
    document.getElementById("titlePersonData").innerHTML = `Semana del 
    <div class="container_data"><h2 class="data">${dateBefore}</h2>  al  
    <h2 class="data">${dateAfter}</h2></div><div><h2>${dataTitle}</h2></div>`;
    personAsign.style.display = "flex";
    dataInfo.style.display = "none";
    dateWeek.style.display = "none";
    dataAsign.style.display = "none";
    hero.style.display = "none";
    hero.style.position = "absolute"
    heroSecond.style.display = "flex";
    heroSecond.style.position = "inherit";
}

function getInfoForOptions() {
    document.getElementById("container-btnPerson").style.display = "none";
    document.getElementById("container-btnPerson").style.position = "absolute";
    document.getElementById("optionFirst").style.display = "flex";
    let option = document.getElementById("personas");
    option.innerHTML = '';
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                const { nameC } = data[i];
                option.innerHTML += `<option value="${nameC}">`;
            }
        })
}

function changeNumberPerson() {
    document.getElementById("label_personas2").style.display = "inline-block";
    document.getElementById("titleOptionsPerson2").style.display = "flex";
    document.getElementById("personas2").style.position = "flex";
    let option = document.getElementById("personas2");
    option.innerHTML = '';
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                const { nameC } = data[i];
                option.innerHTML += `<option value="${nameC}">`;
            }
        })
}

function getData() {
    let input1 = document.getElementById("titleOptionsPerson").value;
    let input2 = document.getElementById("titleOptionsPerson2").value;
    let firstPerson = input1;
    let secondPerson = input2;
    let lec = document.getElementById("titleOptionsPerson3").value;
    const { dateBefore, dateAfter, dataTitle } = asign;
    asign = { dateBefore, dateAfter, dataTitle, lec, firstPerson, secondPerson };
    let dateComplete = dateBefore + " - " + dateAfter;
    if ((dataTitle === "Primera conversacion 3") || (dataTitle === "Primera conversacion 5") || (dataTitle === "Revisita" || (dataTitle === "Curso Biblico"))) {
        if (localStorage.getItem(dateComplete) === null) {
            let asigns = [];
            asigns.push(asign);
            localStorage.setItem(dateComplete, JSON.stringify(asigns));
        } else {
            for (let i = 0; i < localStorage.length; i++) {
                let key = localStorage.key(i);
                console.log(key);
                if (key === dateComplete) {
                    let asigns = JSON.parse(localStorage.getItem(key));
                    asigns.push(asign);
                    localStorage.setItem(key, JSON.stringify(asigns));
                } else {
                    let asigns = [];
                    asigns.push(asign);
                }
            }
        }

        document.getElementById("titlePersonData").innerHTML = `Semana del 
    <div class="container_data"><h2 class="data">${dateBefore}</h2>  al  
    <h2 class="data">${dateAfter}</h2></div><div><h2>${dataTitle}</h2>
    <h2>${firstPerson}</h2><h2>${secondPerson}</h2><h2>Leccion: ${lec}</h2></div>`;
        document.getElementById("h2_change").innerHTML = `Ahora guarde la asignacion`;
    } else if (dataTitle === "Lectura Biblica") {
        if (localStorage.getItem(dateComplete) === null) {
            let asigns = [];
            asigns.push(asign);
            localStorage.setItem(dateComplete, JSON.stringify(asigns));
        } else {
            for (let i = 0; i < localStorage.length; i++) {
                let key = localStorage.key(i);
                console.log(key);
                if (key === dateComplete) {
                    let asigns = JSON.parse(localStorage.getItem(key));
                    asigns.push(asign);
                    localStorage.setItem(key, JSON.stringify(asigns));
                } else {
                    let asigns = [];
                    asigns.push(asign);
                }
            }
        }
        document.getElementById("titlePersonData").innerHTML = `Semana del 
    <div class="container_data"><h2 class="data">${dateBefore}</h2>  al  
    <h2 class="data">${dateAfter}</h2></div><div><h2>${dataTitle}</h2>
    <h2>${firstPerson}</h2><h2>Leccion: ${lec}</h2></div>`;
        document.getElementById("h2_change").innerHTML = `Ahora guarde la asignacion`;
    }
}

getData.onload = home;

function home() {
    location.reload();
    load();
}

containerInnerHTML();
arrayElementsByBtn();