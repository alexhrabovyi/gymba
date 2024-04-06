import { defer } from 'react-router-dom';
import { getCategoriesAndSubcategories } from '../../utils/dataAPI';
import Error from '../../components/Error/Error.jsx';

export async function loader() {
  const categories = getCategoriesAndSubcategories();

  return defer({ categories });
}

export function GetCategoriesAndSubcategoriesPage() {
  return (
    <Error />
  );
}
