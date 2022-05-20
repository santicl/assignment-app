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
      const { dateBefore, dateAfter, dataTitle, lec, firstPerson, secondPerson } = value[j];
      const newID = key + "-" + count;
      containerAssign.innerHTML += `<div class="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-delay="200">
          <div class="box">
            <span id="${newID}" class="featured">Le Falta Poco</span>
            <h3 style="color: #a23530;">${dataTitle}</h3>
            <div class="price"><p class="de">De: </p><h2 class="date"><strong>${dateBefore}</strong></h2><p class="al">Al: </p><h2 class="date"><strong>${dateAfter}</strong></h2></div>
            <ul>
              <li>${firstPerson}</li>
              <li>${secondPerson}</li>
            </ul>
            <h3>Leccion: ${lec}</h3>
            <button id="btnEdit" class="btn-buy" onclick="editAssigns('${firstPerson}, ${secondPerson}')">Editar</button>
          </div>
        </div>`;
    }
  }
  labelShow();  
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
          console.log(newID);
          dateBefore = reverseDate(dateBefore);
          let manyDays = getNumberDays(dateBefore, getToday());
          manyDays = verifyNumber(manyDays);
          if (manyDays <= numberAprox) {
            document.getElementById(newID).style.backgroundColor = 'red';
            document.getElementById(newID).innerHTML = 'Le Falta Poco';
          }else{
            document.getElementById(newID).innerHTML = 'Aun Le Falta';
          }
        })
      }
}

export function editAssigns(first, second) {
  console.log(first, second);
  const containerAssign = document.getElementById("container_assign");
  containerAssign.innerHTML = '';
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    let value = localStorage.getItem(key);
    value = JSON.parse(value);
    for (let j = 0; j < value.length; j++) {
      const { dateBefore, dateAfter, dataTitle, lec, firstPerson, secondPerson } = value[j];
      if (first === firstPerson && second  === secondPerson) {
        containerAssign.innerHTML = `<div class="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-delay="200">
          <div class="box">
            <span id="label" class="featured">Le Falta Poco</span>
            <h3 style="color: #a23530 ;"><input id="dataTitle" type="text" class="form-control" name="text" placeholder="${dataTitle}" required></h3>
            <div class="price"><p class="de">De: </p><h2 class="date"><strong><input id="dateBefore" type="date" class="form-control" name="date" placeholder="${dateBefore}"required></strong></h2><p class="al">Al: </p><h2 class="date"><strong><input id="dateAfter" type="date" class="form-control" name="date" placeholder="${dateAfter}"required></strong></h2></div>
            <ul>
              <li><input id="firstPerson" type="text" class="form-control" name="date" placeholder="${firstPerson}"required></li>
              <li><input id="secondPerson" type="text" class="form-control" name="date" placeholder="${secondPerson}"></li>
            </ul>
            <h3>Leccion: <input id="lec" type="number" class="form-control" name="date" placeholder="${lec}"required></h3>
            <a class="btn-buy" onclick="updateAssigns('${firstPerson}, ${secondPerson}')">Actualizar</a>
          </div>
        </div>`;
      }
    }
  }
}