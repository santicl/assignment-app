export function getNumberDays(time, today) {
  today = today.split("/");
  time = time.split('/');
  var fDate = Date.UTC(today[2], today[1] - 1, today[0]);
  var sDate = Date.UTC(time[2], time[1] - 1, time[0]);
  var diferent = fDate - sDate;
  var days = Math.round(diferent / (1000 * 60 * 60 * 24));
  return days;
}

export function getToday() {
  let newDateTime;
  const newDate = new Date();
  const year = newDate.getUTCFullYear();
  let day = newDate.getDate();
  let month = newDate.getMonth();
  if (month <= 10) { month = '0' + (month + 1) + "/"; }

  if (month > 10) { month = (month + 1) + "/"; }

  if (day < 10) { day = '0' + day + "/"; }

  if (day > 10) { day = day + "/"; }

  newDateTime = day + month + year;
  return newDateTime;
}

export function returnMonths(days) {
  days = days / 30.44;
  var decimal = days.toString().replace(/^[^\.]+/, '0').replace(/\./, '').substring(1, 2);
  days = parseInt(days) + " Meses" + " y " + decimal + " Dias";
  return days;
}

export function returnWeeks(days) {
  days = days / 7;
  var decimal = days.toString().replace(/^[^\.]+/, '0').replace(/\./, '').substring(1, 2);
  days = parseInt(days) + " Semanas" + " y " + decimal + " Dias";
  return days;
}

export function getDayOrWeekOrMonth(days) {
  if (days < 0) {
    days = days * -1;
    if (days <= 7) {
      days = "Le hace falta " + days + " Días";
      return days;
    }
    if (days > 7 && days <= 31) {
      days = returnWeeks(days);
      days = "Le hace falta " + days;
      return days;
    }
    if (days > 31 || days > 30) {
      days = returnMonths(days);
      days = "Le hace falta " + days;
      return days;
    }
  }
  if (days <= 7) {
    days = days + " Dias"
    return days;
  }
  if (days > 7 && days <= 31) {
    days = returnWeeks(days);
    return days;
  }
  if (days > 31 || days > 30) {
    days = returnMonths(days);
    return days;
  }
}

export function verifyNumber(manyDay) {
  if (manyDay < 0) {
    manyDay = manyDay * -1;
    return manyDay;
  }
  return manyDay;
}

export function reverseDate(str) {
  if (str === "") {
    return "";
  } else {
    str = str.split("-");
    str = str[2] + "/" + str[1] + "/" + str[0];
    return str;
  }
}

export function containerInnerHTML() {
  let count = 0;
  const containerAssign = document.getElementById("container_assign");
  containerAssign.innerHTML = '';
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    let value = localStorage.getItem(key);
    value = JSON.parse(value);
    for (let j = 0; j < value.length; j++) {
      count++;
      const newID = key + "-" + count;
      containerAssign.innerHTML += showFeature(getDataAssigns(value[j]), newID);
    }
  }
  labelShow();
}

export function getDataAssigns(value) {
  const { dateBefore, dateAfter, dataTitle, lec, firstPerson, secondPerson } = value;
  const assigns = { before: dateBefore, after: dateAfter, title: dataTitle, lec, first: firstPerson, second: secondPerson };
  return assigns;
}

export function labelShow() {
  const numberAprox = 14;
  let count = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    let value = localStorage.getItem(key);
    value = JSON.parse(value);
    value.map(asigns => {
      count++;
      let { dateBefore } = asigns;
      const newID = key + "-" + count;
      dateBefore = reverseDate(dateBefore);
      let manyDays = getNumberDays(dateBefore, getToday());
      manyDays = verifyNumber(manyDays);
      if (manyDays <= numberAprox) {
        document.getElementById(newID).style.backgroundColor = 'red';
        document.getElementById(newID).innerHTML = 'Le Falta Poco';
      } else {
        document.getElementById(newID).innerHTML = 'Aun Le Falta';
      }
    })
  }
  arrayElementsBtnsByClassName();
}

export function editAssigns(btnID) {
  const containerAssign = document.getElementById("container_assign");
  containerAssign.innerHTML = '';
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    let value = localStorage.getItem(key);
    value = JSON.parse(value);
    for (let j = 0; j < value.length; j++) {
      const { dateBefore, dateAfter, dataTitle, lec, firstPerson, secondPerson } = value[j];
      const compareId = firstPerson + "-" + secondPerson;

      if (compareId === btnID) {
        containerAssign.innerHTML = `<div class="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-delay="200">
        <div class="box">
          <h3 style="color: #a23530 ;"><input id="dataTitle" type="text" class="form-control" name="text"
              placeholder="${dataTitle}" required></h3>
          <div class="price">
            <p class="de">De: </p>
            <h2 class="date"><strong><input id="dateBefore" type="date" class="form-control" name="date"
                  placeholder="${dateBefore}" required></strong></h2>
            <p class="al">Al: </p>
            <h2 class="date"><strong><input id="dateAfter" type="date" class="form-control" name="date"
                  placeholder="${dateAfter}" required></strong></h2>
          </div>
          <ul>
            <li><input id="firstPerson" type="text" class="form-control" name="date" placeholder="${firstPerson}" required>
            </li>
            <li><input id="secondPerson" type="text" class="form-control" name="date" placeholder="${secondPerson}"></li>
          </ul>
          <h3>Leccion: <input id="lec" type="number" class="form-control" name="date" placeholder="${lec}" required></h3>
          <button id="${compareId}" class="btn-update">Actualizar</button>
        </div>
      </div>`;
      }
    }
  }
}

export function arrayElementsBtnsByClassName() {
  for (const ele of document.getElementsByClassName("btn-buy")) {
    ele.addEventListener("click", verifyDataEdit);
  }
}

export function updateAssigns(e) {
  const btnID = e.target.id;
  console.log(btnID);
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    let value = localStorage.getItem(key);
    value = JSON.parse(value);
    for (let j = 0; j < value.length; j++) {
      console.log("update");
      let { firstPerson, secondPerson } = value[j];
      const compareId = firstPerson + "-" + secondPerson;

      if (compareId === btnID) {
        value[j] = {
          dateBefore: document.getElementById("dateBefore").value,
          dateAfter: document.getElementById("dateAfter").value,
          dataTitle: document.getElementById("dataTitle").value,
          lec: document.getElementById("lec").value,
          firstPerson: document.getElementById("firstPerson").value,
          secondPerson: document.getElementById("secondPerson").value
        };
        let assign = [];
        assign.push(value[j]);
        localStorage.setItem(key, JSON.stringify(assign));
      }
    }
  }
  location.reload();
}

export function verifyDataEdit(e) {
  var idGetElement = "";
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    let value = localStorage.getItem(key);
    value = JSON.parse(value);
    for (let j = 0; j < value.length; j++) {
      const { firstPerson, secondPerson } = value[j];
      const btnID = firstPerson + "-" + secondPerson;
      if (btnID === e.target.id) {
        idGetElement = btnID;
        editAssigns(btnID);
      }
    }
  }
  document.getElementById(idGetElement).addEventListener("click", updateAssigns);
}

export function showFeature(assigns, ID) {  //Componente para renderizar las asignaciones
  const btnID = assigns.first + "-" + assigns.second;
  return `<div class="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-delay="200">
  <div class="box">
    <span id="${ID}" class="featured">Le Falta Poco</span>
    <h3 style="color: #65c600;">${assigns.title}</h3>
    <div class="price"><p class="de">De: </p><h2 class="date"><strong>${assigns.before}</strong></h2><p class="al">Al: </p><h2 class="date"><strong>${assigns.after}</strong></h2></div>
    <ul>
      <li>${assigns.first}</li>
      <li>${assigns.second}</li>
    </ul>
    <h3>Leccion: ${assigns.lec}</h3>
    <button id="${btnID}" class="btn-buy">Editar</button>
  </div>
</div>`;
}