// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD4FH3dYVIUp7-JWxeuxF4k8fWrPTZF2E4",
  authDomain: "pi-task-manager.firebaseapp.com",
  projectId: "pi-task-manager",
  storageBucket: "pi-task-manager.appspot.com",
  messagingSenderId: "33193642030",
  appId: "1:33193642030:web:c66ffbe9d5eec7072077bf",
  measurementId: "G-M2W30YEHDV"
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };