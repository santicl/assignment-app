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
        const { dateBefore, dateAfter, dataTitle, firstPerson, secondPerson, lec } = value[j];
        let dateComplete = `${dateBefore} - ${dateAfter}`;
        if (dateComplete === key) {
  
          container.innerHTML += `<div class="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-delay="200">
          <div class="box">
            <h3 style="color: #a23530;">${dataTitle}</h3>
            <div class="price"><p class="de">De: </p><h2 class="date"><strong>${dateBefore}</strong></h2><p class="al">Al: </p><h2 class="date"><strong>${dateAfter}</strong></h2></div>
            <ul>
              <li>${firstPerson}</li>
              <li>${secondPerson}</li>
            </ul>
            <h3>Leccion: ${lec}</h3>
          </div>
        </div>`
        }
      }
    }
  }
}
show();
showAssigns();