import Catalog from '../../components/Catalog/Catalog.jsx';
import MainSlider from '../../components/MainSlider/MainSlider.jsx';
import NewsPreview from '../../components/NewsPreviews/NewsPreviews.jsx';
import { getCategoriesAndSubcategories, getFourNewsPreviews } from '../../utils/dataAPI.js';

export function loader() {
  return {
    categories: getCategoriesAndSubcategories(),
    news: getFourNewsPreviews(),
  };
}

export function Main() {
  return (
    <>
      <MainSlider />
      <Catalog />
      <NewsPreview />
    </>
  );
}
