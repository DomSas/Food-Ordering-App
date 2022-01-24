import HomePage from "../pages/HomePage.jsx";
import AboutUsPage from "../pages/AboutUsPage.jsx";
import FoodPage from "../pages/FoodPage.jsx";
import DateTimePage from "../pages/DateTimePage.jsx";

var routes = [
  {
    path: "/",
    component: HomePage,
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
    path: "/date-time",
    component: DateTimePage,
  },
];

export default routes;
