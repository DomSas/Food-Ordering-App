import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore/lite";

import { getStorage, uploadString } from "firebase/storage";

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
    times_booked: {
      11: [],
      12: [],
      13: [],
      14: [],
      15: [],
      16: [],
      17: [],
      18: [],
      19: [],
      20: [],
      21: [],
      22: [],
    },
  });
};

const checkTimeValidForDate = (docSnap, time) => {
  const timeShort = time.split(":")[0];
  if (docSnap.data().times_available[timeShort].length != 0) {
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
  photo
) => {
  if (userInfo.location === "") {
    const getDate = doc(db, "reservations", date_time.date);

    //get the available times and change the time
    let info = await getDoc(getDate).then((docSnap) => {
      return docSnap;
    });
    let times_available = await info.data().times_available;
    let times_booked = await info.data().times_booked;

    const timeShort = date_time.time.split(":")[0];

    times_booked[timeShort] = times_available[timeShort].splice(
      times_available[timeShort].indexOf(table),
      1
    );

    //date and time done

    //set everywhere

    updateDoc(getDate, {
      times_available: times_available,
      times_booked: times_booked,
    });
  }

  addCustomerInfo(userInfo);

  let photoBD;

  const metadata = {
    contentType: "image/jpeg",
  };

  console.log("photo");
  console.log(photo);

  if (photo != undefined) {
    photoBD = true;
    uploadString(
      ref(storage, "photos/" + orderNumber + ".jpg"),
      photo,
      "base64",
      metadata
    ).then(() => {});
  } else {
    photoBD = false;
  }

  setDoc(doc(db, "orders", orderNumber.toString()), {
    food: food,
    user: userInfo.email,
    photo: photoBD,
  });
};

const addCustomerInfo = (userInfo) => {
  setDoc(doc(db, "customer_info", userInfo.email), {
    name: userInfo.name,
    email: userInfo.email,
    phone: userInfo.phone,
    location: userInfo.location,
  });
};

const getOrderNumber = async () => {
  do {
    var orderNumber = Math.floor(Math.random() * 10001);
  } while (await checkOrderNumber(orderNumber));
  return orderNumber;
};

const checkOrderNumber = async (orderNumber) => {
  const docRef = doc(db, "orders", orderNumber.toString());
  let check = await getDoc(docRef).then((docSnap) => {
    if (docSnap.exists()) {
      return true;
    } else {
      return false;
    }
  });
  return check;
};

export default createMenuDict;

export {
  checkDateTime,
  addCustomerInfo,
  getTableAvailability,
  addReservation,
  getOrderNumber,
};

export { storage };
