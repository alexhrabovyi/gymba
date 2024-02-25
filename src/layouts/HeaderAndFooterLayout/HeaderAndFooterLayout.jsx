import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import { getCategoriesAndSubcategories } from '../../utils/dataAPI.js';

export function loader() {
  return getCategoriesAndSubcategories();
}

export function HeaderAndFooterLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
