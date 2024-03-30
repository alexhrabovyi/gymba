import { Suspense, useState } from 'react';
import { Link, Await, useFetcher } from 'react-router-dom';
import classNames from 'classnames';
import beautifyNum from '../../../utils/beautifyNum.js';
import Spinner from '../../common/Spinner/Spinner.jsx';
import DynamicImage from '../../common/DynamicImage/DynamicImage.jsx';
import linkCls from '../../../scss/_link.module.scss';
import productCls from './CartProduct.module.scss';
import BinIcon from '../../../assets/images/icons/bin.svg';

export default function CartProduct({
  categoryId, subcategoryId, productId, name, price, oldPrice, amount, totalPrice,
}) {
  const fetcher = useFetcher();
  const [imgSrc] = useState(() => import(`../../../assets/images/productImgs/${productId}.webp`));

  function submitNewAmount(newAmount) {
    const data = JSON.stringify([categoryId, subcategoryId, productId, newAmount]);

    fetcher.submit(data, {
      action: '/cart',
      method: 'PATCH',
      encType: 'application/json',
    });
  }

  function deleteBtnOnClick() {
    const data = JSON.stringify([categoryId, subcategoryId, productId]);

    fetcher.submit(data, {
      action: '/cart',
      method: 'DELETE',
      encType: 'application/json',
    });
  }

  return (
    <div className={productCls.product}>
      <Link
        to={`/${categoryId}/${subcategoryId}/${productId}`}
        className={productCls.imgLink}
        alt={name}
      >
        <Suspense
          fallback={<Spinner className={productCls.spinner} />}
        >
          <Await resolve={imgSrc}>
            <DynamicImage
              className={productCls.image}
              alt={name}
            />
          </Await>
        </Suspense>
      </Link>
      <Link
        to={`/${categoryId}/${subcategoryId}/${productId}`}
        className={classNames(
          linkCls.link,
          linkCls.link18px,
          productCls.textLink,
        )}
      >
        {name}
      </Link>
      <div className={productCls.priceBlock}>
        {oldPrice && (
        <p className={productCls.oldPrice}>
          {oldPrice}
          ₴/шт
        </p>
        )}
        <p className={productCls.price}>
          {beautifyNum(price)}
          <span className={productCls.priceSpan}>₴/шт</span>
        </p>
      </div>
      <div className={productCls.amountControlBlock}>
        <button
          type="button"
          className={classNames(
            productCls.amountButton,
            amount === 1 && productCls.amountButton_inactive,
          )}
          disabled={amount === 1}
          aria-disabled={amount === 1}
          onClick={() => {
            submitNewAmount(amount - 1);
          }}
          aria-label="Уменьшить количество товара на один"
        >
          -
        </button>
        <span
          className={productCls.amountNum}
          aria-live="polite"
        >
          {amount}
        </span>
        <button
          type="button"
          className={productCls.amountButton}
          onClick={() => {
            submitNewAmount(amount + 1);
          }}
          aria-label="Увеличить количество товара на один"
        >
          +
        </button>
      </div>
      <div className={productCls.totalPriceBlock}>
        <p className={productCls.price}>
          {beautifyNum(totalPrice)}
          <span className={productCls.priceSpan}>₴</span>
        </p>
      </div>
      <button
        type="button"
        className={productCls.deleteButton}
        onClick={deleteBtnOnClick}
        aria-label={`Удалить ${name} из корзины`}
      >
        <BinIcon
          className={productCls.binIcon}
        />
      </button>
    </div>
  );
}
