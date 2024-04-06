/* eslint-disable import/prefer-default-export */
import { defer } from 'react-router-dom';
import { getCategoriesAndSubcategories, getFourNewsPreviews } from '../../utils/dataAPI.js';

export async function loader() {
  const categories = getCategoriesAndSubcategories();
  const news = getFourNewsPreviews();

  return defer({
    categories,
    news,
  });
}
