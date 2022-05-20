import { getNumberDays, getToday, getDayOrWeekOrMonth } from "./components/components.js";

const url = 'https://auth-assignjw-default-rtdb.firebaseio.com/pub.json';

window.onload = getPersonAssigns;

function getPersonAssigns() {
    const tbody = document.getElementById('tbody');
    tbody.innerHTML = '';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            try {
                for (let i = 0; i < data.length; i++) {
                    let { nameC, cel, howTime, time } = data[i];
                    console.log(time);
                    let today = getToday();
                    let timeNumber = getNumberDays(time, today);
                    howTime = getDayOrWeekOrMonth(timeNumber);
                    tbody.innerHTML += `<tr class="home" data-aos="fade-up" data-aos-delay="200">
                <td>${nameC}</td>
                <td>${cel}</td>
                <td>${howTime}</td>
                </tr>`;
                }
            }
            catch (error) {
                console.log(error);
            }
        })
}