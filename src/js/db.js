import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore/lite";

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

  checkDateTime(new Date().toDateString(), 11);

  return {
    Starter: starter,
    Main: main,
    Dessert: dessert,
    Beverage: beverage,
  };
};

const times_available = {
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
  22: [1, 2, 3, 4, 5, 6]
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
      22: [1, 2, 3, 4, 5, 6]
    },
    times_booked: [],
  });
}

const checkTimeValidForDate = (docSnap, time) => {
  if(docSnap.data().times_available[time] != null){
    //Hora libre
    console.log("hora libre")
    
  }
  else{
    //Hora no disponible
    console.log("hora no disponible")
    
  }
}

const showToastBottom = () => {
  // Create toast
  if (!toastBottom) {
    toastBottom = $f7.toast.create({
      text: 'This is default bottom positioned toast',
      closeTimeout: 2000,
    });
  }
  // Open it
  toastBottom.open();
}

const checkDateTime = (date, time) => {
  const docRef = doc(db, "reservations", date);
  getDoc(docRef).then(docSnap=>{
    if (docSnap.exists()) {
      checkTimeValidForDate(docSnap, time);
    } else {
      createDate(date);
    }
  })

}

const addReservation = (date, time, table) => {
  setDoc(doc(db, "reservations", date));
}

export default createMenuDict;
