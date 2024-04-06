import { defer } from 'react-router-dom';
import Error from '../../components/Error/Error.jsx';
import { getRandomProduct } from '../../utils/dataAPI';

export async function loader() {
  const randomProduct = getRandomProduct();

  return defer({
    randomProduct,
  });
}

export function GetRandomProductPage() {
  return (
    <Error />
  );
}
