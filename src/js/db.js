import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

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

export default createMenuDict;
