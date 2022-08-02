const URL_API = 'https://api-db-assign-default-rtdb.firebaseio.com/assign.json';

  // Import the functions
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
  import { getDatabase } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyA1z6D54gF5Abvvn90E1edxTh7KIYdZlQw",
    authDomain: "api-db-assign.firebaseapp.com",
    databaseURL: "https://api-db-assign-default-rtdb.firebaseio.com",
    projectId: "api-db-assign",
    storageBucket: "api-db-assign.appspot.com",
    messagingSenderId: "854193473688",
    appId: "1:854193473688:web:cffd4e0b2db8aa9ca168ed",
    measurementId: "G-DBGVN0HLQ6"
  };

  // Initialize Firebase and DB
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);