import { getCategoryAndSubcategory, getSubcategoryFilters, getFilteredProductsAndMinMaxPrice } from '../../utils/dataAPI';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs.jsx';
import Products from '../../components/Products/Products.jsx';

export function loader({ params, request }) {
  const categoryIdParam = params.categoryId;
  const subcategoryIdParam = params.subcategoryId;
  const { searchParams } = new URL(request.url);

  const {
    categoryName, categoryId, subcategory,
  } = getCategoryAndSubcategory(categoryIdParam, subcategoryIdParam);

  const subcategoryFilters = getSubcategoryFilters(categoryIdParam, subcategoryIdParam);

  const {
    minPrice,
    maxPrice,
    filteredAndSortedProducts,
    productAmount,
    pageAmount,
  } = getFilteredProductsAndMinMaxPrice(categoryIdParam, subcategoryIdParam, searchParams);

  return {
    categoryName,
    categoryId,
    subcategoryName: subcategory.name,
    subcategoryId: subcategory.id,
    subcategoryFilters,
    filteredAndSortedProducts,
    minPrice,
    maxPrice,
    productAmount,
    pageAmount,
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
