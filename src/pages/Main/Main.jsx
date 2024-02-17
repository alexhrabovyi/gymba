import Catalog from '../../components/Catalog/Catalog.jsx';
import MainSlider from '../../components/MainSlider/MainSlider.jsx';
import { getCategoriesAndSubcategories } from '../../utils/dataAPI.js';

export function loader() {
  return getCategoriesAndSubcategories();
}

export default function Main() {
  return (
    <>
      <MainSlider />
      <Catalog />
    </>
  );
}
