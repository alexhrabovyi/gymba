import { getCategoryAndSubcategories } from '../../utils/dataAPI.js';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs.jsx';
import Category from '../../components/Category/Category.jsx';

export function loader({ params }) {
  return getCategoryAndSubcategories(params.categoryId);
}

export function CategoryPage() {
  return (
    <>
      <BreadCrumbs />
      <Category />
    </>
  );
}
