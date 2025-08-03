import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyASt9Ksw4ZSDI97u_7bdsOtmQMtHYHPzdo",
  authDomain: "monitoringangkot-76648.firebaseapp.com",
  databaseURL: "https://monitoringangkot-76648-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "monitoringangkot-76648",
  storageBucket: "monitoringangkot-76648.appspot.com",
  messagingSenderId: "946944654960",
  appId: "1:946944654960:web:c5175b18849e6136367eb5"
};   

export const firebaseApp = initializeApp(firebaseConfig);

