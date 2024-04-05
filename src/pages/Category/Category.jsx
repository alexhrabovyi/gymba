import { getCategoryAndSubcategories } from '../../utils/dataAPI.js';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs.jsx';
import Category from '../../components/Category/Category.jsx';

export function loader({ params }) {
  let categoryName;
  let categoryId;
  let subcategories;

  try {
    [categoryName, categoryId, subcategories] = Object
      .values(getCategoryAndSubcategories(params.categoryId));
  } catch (e) {
    if (e.message === 'Категорію не знайдено') {
      throw new Response('Сторінку не знайдено', { status: 404 });
    } else {
      throw e;
    }
  }

  return {
    categoryName,
    categoryId,
    subcategories,
  };
}

export function CategoryPage() {
  return (
    <>
      <BreadCrumbs />
      <Category />
    </>
  );
}
