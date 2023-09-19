// Import the functions you need from the SDKs you need
import { getApp,getApps,initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3uP-UoI4WydMwYt-z_bs4ygHsAWQ7St4",
  authDomain: "open-inapp.firebaseapp.com",
  projectId: "open-inapp",
  storageBucket: "open-inapp.appspot.com",
  messagingSenderId: "787015877584",
  appId: "1:787015877584:web:4bcd8d43b6a733acc62fd5"
};

// Initialize Firebase
const app = getApps.length>0 ? getApp() :initializeApp(firebaseConfig);
export {app};