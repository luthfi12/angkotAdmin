import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  
  authDomain: "monitoringangkot-76648.firebaseapp.com",
  databaseURL: "https://monitoringangkot-76648-default-rtdb.firebaseio.com",
  projectId: "monitoringangkot-76648",
  storageBucket: "monitoringangkot-76648.appspot.com",
  messagingSenderId: "946944654960",
  
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
