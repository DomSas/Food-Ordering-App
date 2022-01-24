import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyChXYwwL0C88rwejI2JcDq9B1QrJjkRI-g",
  authDomain: "restaurant-management-pab-dom.firebaseapp.com",
  projectId: "restaurant-management-pab-dom",
  storageBucket: "restaurant-management-pab-dom.appspot.com",
  messagingSenderId: "856415585329",
  appId: "1:856415585329:web:acbb351dd5ec116b980110",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const starter = [];
const main = [];
const dessert = [];
const beverage = [];

async function getMenu(db) {
  const menuCol = collection(db, "menu");
  const menuSnapshot = await getDocs(menuCol);
  const menu = menuSnapshot.docs.map((doc) => doc.data());
  return menu;
}

const getDatabase = () => {
  getMenu(db).then((menu) => {
    menu.map((m) => {
      switch (m.category) {
        case "starter":
          starter.push(m);
          break;
        case "main":
          main.push(m);
          break;
        case "dessert":
          dessert.push(m);
          break;
        case "beverage":
          beverage.push(m);
          break;
      }
    });
  });
};

const createMenuDict = () => {
  getDatabase();

  return {
    Starter: starter,
    Main: main,
    Dessert: dessert,
    Beverage: beverage,
  };
};

const createDate = (date) => {
  setDoc(doc(db, "reservations", date), {
    times_available: {
      11: [1, 2, 3, 4, 5, 6],
      12: [1, 2, 3, 4, 5, 6],
      13: [1, 2, 3, 4, 5, 6],
      14: [1, 2, 3, 4, 5, 6],
      15: [1, 2, 3, 4, 5, 6],
      16: [1, 2, 3, 4, 5, 6],
      17: [1, 2, 3, 4, 5, 6],
      18: [1, 2, 3, 4, 5, 6],
      19: [1, 2, 3, 4, 5, 6],
      20: [1, 2, 3, 4, 5, 6],
      21: [1, 2, 3, 4, 5, 6],
      22: [1, 2, 3, 4, 5, 6],
    },
    times_booked: [],
  });
};

const checkTimeValidForDate = (date, docSnap, time) => {
  if (docSnap.data().times_available[time] != null) {
    return true;
  } else {
    return false;
  }
};

const checkDateTime = (date, time) => {
  const docRef = doc(db, "reservations", date);
  getDoc(docRef).then((docSnap) => {
    if (docSnap.exists()) {
      checkTimeValidForDate(date, docSnap, time);
    } else {
      createDate(date);
      return true;
    }
  });
};

const addReservation = (date, time, table) => {
  setDoc(doc(db, "reservations", date));
};

const addCustomerInfo = ({ name, email, phone, location }) => {
  setDoc(doc(db, "customer_info", email), {
    name: name,
    email: email,
    phone: phone,
    location: location,
  });
};

export default createMenuDict;

export { checkDateTime, addCustomerInfo };
