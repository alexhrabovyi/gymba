import { defer } from 'react-router-dom';
import {
  getCompareIds, getCompareAmount, getCompareSubcategoriesBtnInfo, addIdToCompare,
  deleteSubcFromCompare, deleteAllFromCompare, deleteFromCompare,
} from '../../utils/dataAPI';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs.jsx';
import Compare from '../../components/Compare/Compare.jsx';

export async function loader() {
  const compareIds = getCompareIds();
  const compareAmount = getCompareAmount();
  const compareSubcategoriesBtnInfo = getCompareSubcategoriesBtnInfo();

  return defer({
    compareIds,
    compareAmount,
    compareSubcategoriesBtnInfo,
  });
}

export async function action({ request }) {
  const [categoryId, subcategoryId, productId] = await request.json();

  if (request.method === 'PATCH') {
    addIdToCompare(categoryId, subcategoryId, productId);
  } else if (request.method === 'DELETE' && categoryId && subcategoryId && !productId) {
    deleteSubcFromCompare(categoryId, subcategoryId);
  } else if (request.method === 'DELETE' && categoryId && subcategoryId && productId) {
    deleteFromCompare(categoryId, subcategoryId, productId);
  } else if (request.method === 'DELETE') {
    deleteAllFromCompare();
  }

  return null;
}

export function ComparePage() {
  return (
    <>
      <BreadCrumbs />
      <Compare />
    </>
  );
}
