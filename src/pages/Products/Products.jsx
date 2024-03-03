import { getCategoryAndSubcategoryAndProducts } from '../../utils/dataAPI';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs.jsx';
import Products from '../../components/Products/Products.jsx';

export function loader({ params }) {
  const { categoryId, subcategoryId } = params;
  console.log(getCategoryAndSubcategoryAndProducts(categoryId, subcategoryId));

  return getCategoryAndSubcategoryAndProducts(categoryId, subcategoryId);
}

export function ProductsPage() {
  return (
    <>
      <BreadCrumbs />
      <Products />
    </>
  );
}
