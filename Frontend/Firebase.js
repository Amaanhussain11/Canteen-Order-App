import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyA1Ud9doHHRqHdF6QT4ZcfF-KRLgQjhCQo",
    authDomain: "canteen-order-app.firebaseapp.com",
    projectId: "canteen-order-app",
    storageBucket: "canteen-order-app.firebasestorage.app",
    messagingSenderId: "344330337452",
    appId: "1:344330337452:web:1febd5c562cfc8b6573309"
  };


  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
