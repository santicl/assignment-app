console.debug("esta funcionando")

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBl52zmq4bjNQUaguftaV9i1ozxC7wrOoI",
    authDomain: "auth-assignjw.firebaseapp.com",
    projectId: "auth-assignjw",
    storageBucket: "auth-assignjw.appspot.com",
    messagingSenderId: "957426807740",
    appId: "1:957426807740:web:c531406bf437415dbcf1b9",
    measurementId: "G-BL7GXTLPMW"
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);


const form = document.querySelector("#form");
form.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        console.log("entro");
        const user = userCredential.user;
        form.reset();
        window.location.href = "./home.html";
        console.log("entro este usuario "+user);
    })
    .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        document.getElementById("input_session").innerHTML = "Correo o contraseña incorrectos";
        form.reset();
    })
})