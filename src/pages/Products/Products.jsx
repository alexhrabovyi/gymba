import { getCategoryAndSubcategory, getSubcategoryFilters, getFilteredProductsAndMinMaxPrice } from '../../utils/dataAPI';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs.jsx';
import Products from '../../components/Products/Products.jsx';

export function loader({ params, request }) {
  const categoryIdParam = params.categoryId;
  const subcategoryIdParam = params.subcategoryId;
  const { searchParams } = new URL(request.url);

  let categoryName;
  let categoryId;
  let subcategory;
  let subcategoryFilters;
  let minPrice;
  let maxPrice;
  let filteredAndSortedProducts;
  let productAmount;
  let pageAmount;

  try {
    [
      categoryName, categoryId, subcategory,
    ] = Object.values(getCategoryAndSubcategory(categoryIdParam, subcategoryIdParam));
    subcategoryFilters = getSubcategoryFilters(categoryIdParam, subcategoryIdParam);
    [
      filteredAndSortedProducts,
      minPrice,
      maxPrice,
      productAmount,
      pageAmount,
    ] = Object
      .values(getFilteredProductsAndMinMaxPrice(categoryIdParam, subcategoryIdParam, searchParams));
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
