import { getCategoryAndSubcategory, getSubcategoryFilters, getFilteredProducts } from '../../utils/dataAPI';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs.jsx';
import Products from '../../components/Products/Products.jsx';

export function loader({ params, request }) {
  const { categoryId, subcategoryId } = params;
  const { searchParams } = new URL(request.url);

  const categoryAndSubcategory = getCategoryAndSubcategory(categoryId, subcategoryId);
  const subcategoryFilters = getSubcategoryFilters(categoryId, subcategoryId);
  const filteredProducts = getFilteredProducts(categoryId, subcategoryId, searchParams);

  return {
    name: categoryAndSubcategory.name,
    id: categoryAndSubcategory.id,
    subcategory: categoryAndSubcategory.subcategory,
    subcategoryFilters,
    filteredProducts,
  };
}

export function ProductsPage() {
  return (
    <>
      <BreadCrumbs />
      <Products />
    </>
  );
}
