import HomePage from "../pages/HomePage.jsx";
import AboutUsPage from "../pages/AboutUsPage.jsx";
import FoodPage from "../pages/FoodPage.jsx";
import PaymentPage from "../pages/PaymentPage.jsx";
import ContactInfo from "../pages/ContactInfo.jsx";
import DateTimePage from "../pages/DateTimePage.jsx";
import TablePickerPage from "../pages/TablePickerPage.jsx";
import OrderSummary from "../pages/OrderSummary.jsx";

let routes = [
  {
    path: "/",
    component: HomePage,
    options: {
      clearPreviousHistory: true,
    },
  },
  {
    path: "/about-us",
    component: AboutUsPage,
  },
  {
    path: "/food",
    component: FoodPage,
  },
  {
    path: "/delivery",
    component: ContactInfo,
  },
  {
    path: "/date-time",
    component: DateTimePage,
  },
  {
    path: "/table",
    component: TablePickerPage,
  },
  {
    path: "/payment",
    component: PaymentPage,
  },
  {
    path: "/summary",
    component: OrderSummary,
    options: {
      clearPreviousHistory: true,
    },
  },
];

export default routes;
