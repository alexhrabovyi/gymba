import { getRandomProduct } from '../../utils/dataAPI';

export function loader() {
  const randomProduct = getRandomProduct();

  return {
    randomProduct,
  };
}

export function GetRandomProduct() {
  throw new Error('Not Found');
}
