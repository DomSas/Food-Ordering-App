import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore/lite";

import { getStorage } from "firebase/storage";

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
const storage = getStorage(app);
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

const checkTimeValidForDate = (docSnap, time) => {
  const timeShort = time.split(":")[0];
  if (docSnap.data().times_available[timeShort] != null) {
    return true;
  } else {
    return false;
  }
};

const getTableAvailability = async (date_time) => {
  const docRef = doc(db, "reservations", date_time.date);
  let tables = await getDoc(docRef).then(async (docSnap) => {
    const timeShort = date_time.time.split(":")[0];
    let availableTables = await docSnap.data().times_available[timeShort];
    return availableTables;
  });
  return tables;
};

const checkDateTime = async (date, time) => {
  const docRef = doc(db, "reservations", date);
  let check = await getDoc(docRef).then((docSnap) => {
    if (docSnap.exists()) {
      return checkTimeValidForDate(docSnap, time);
    } else {
      createDate(date);
      return true;
    }
  });
  return check;
};

const addReservation = async (
  date_time,
  table,
  food,
  userInfo,
  orderNumber,
  photo,
  location
) => {
  

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

export { checkDateTime, addCustomerInfo, getTableAvailability, addReservation };

export { storage };
