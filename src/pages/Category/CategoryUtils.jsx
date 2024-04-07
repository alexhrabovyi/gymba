/* eslint-disable import/prefer-default-export */
import { defer } from 'react-router-dom';
import { getCategoryAndSubcategories } from '../../utils/dataAPI.js';

export function loader({ params }) {
  let category;

  try {
    category = getCategoryAndSubcategories(params.categoryId);
  } catch (e) {
    if (e.message === 'Категорію не знайдено') {
      throw new Response('Сторінку не знайдено', { status: 404 });
    } else {
      throw e;
    }
  }

  return defer({ category });
}
