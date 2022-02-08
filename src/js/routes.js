import HomePage from '../pages/HomePage';
import AboutUsPage from '../pages/AboutUsPage';
import FoodPage from '../pages/FoodPage';
import PaymentPage from '../pages/PaymentPage';
import ContactInfo from '../pages/ContactInfo';
import DateTimePage from '../pages/DateTimePage';
import TablePickerPage from '../pages/TablePickerPage';
import OrderSummary from '../pages/OrderSummary';

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/about-us',
    component: AboutUsPage,
  },
  {
    path: '/food',
    component: FoodPage,
  },
  {
    path: '/delivery',
    component: ContactInfo,
  },
  {
    path: '/date-time',
    component: DateTimePage,
  },
  {
    path: '/table',
    component: TablePickerPage,
  },
  {
    path: '/payment',
    component: PaymentPage,
  },
  {
    path: '/summary',
    component: OrderSummary,
    options: {
      clearPreviousHistory: true,
    },
  },
];

export default routes;
