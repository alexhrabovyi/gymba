/* eslint-disable import/prefer-default-export */
import { getRandomProduct } from '../../utils/dataAPI';

export function loader() {
  const randomProduct = getRandomProduct();

  return {
    randomProduct,
  };
}
