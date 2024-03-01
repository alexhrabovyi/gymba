import { getCategoryAndSubcategories } from '../../utils/dataAPI.js';
import Category from '../../components/Category/Category.jsx';

export function loader({ params }) {
  return getCategoryAndSubcategories(params.categoryId);
}

export function CategoryPage() {
  return (
    <Category />
  );
}
