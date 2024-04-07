/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len */
import { defer } from 'react-router-dom';
import { getCategoryAndSubcategory, getSubcategoryFilters, getFilteredProductsAndMinMaxPrice } from '../../utils/dataAPI';

export async function loader({ params, request }) {
  const categoryIdParam = params.categoryId;
  const subcategoryIdParam = params.subcategoryId;
  const { searchParams } = new URL(request.url);

  let categoryAndSubcategory;
  let subcategoryFilters;
  let filteredProductsAndMinMaxPrice;

  try {
    categoryAndSubcategory = getCategoryAndSubcategory(categoryIdParam, subcategoryIdParam);
    subcategoryFilters = getSubcategoryFilters(categoryIdParam, subcategoryIdParam);
    filteredProductsAndMinMaxPrice = getFilteredProductsAndMinMaxPrice(categoryIdParam, subcategoryIdParam, searchParams);
  } catch (e) {
    if (e.message === 'Категорію не знайдено') {
      throw new Response('Сторінку не знайдено', { status: 404 });
    } else {
      throw e;
    }
  }

  return defer({
    categoryAndSubcategory,
    subcategoryFilters,
    filteredProductsAndMinMaxPrice,
  });
}
