import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import Footer from '../../components/Footer/Footer.jsx';

export default function HeaderAndFooterLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
