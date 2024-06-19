import { Suspense, useState } from 'react';
import { Link, Await } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { queryAPI, useDeleteCartIdMutation, useEditCartIdAmountMutation } from '../../../queryAPI/queryAPI';
import beautifyNum from '../../../utils/beautifyNum';
import Spinner from '../../common/Spinner/Spinner';
import DynamicImage from '../../common/DynamicImage/DynamicImage';
import linkCls from '../../../scss/_link.module.scss';
import productCls from './CartProduct.module.scss';
import BinIcon from '../../../assets/images/icons/bin.svg';

export default function CartProduct({
  categoryId, subcategoryId, productId, name, price, oldPrice, amount, totalPrice,
}) {
  const dispatch = useDispatch();

  const [deleteProductIdRequest] = useDeleteCartIdMutation();
  const [editProductAmountRequest] = useEditCartIdAmountMutation();

  const [imgSrc] = useState(() => import(`../../../assets/images/productImgs/${productId}.webp`));

  function submitNewAmount(newAmount) {
    const data = JSON.stringify([categoryId, subcategoryId, productId, newAmount]);
    editProductAmountRequest(data);

    dispatch(queryAPI.util.updateQueryData('getCartProducts', undefined, (draft) => {
      const productObj = draft.find((p) => p.categoryId === categoryId
        && p.subcategoryId === subcategoryId && p.product.id === productId);

      productObj.amount = newAmount;
    }));
  }

  function deleteBtnOnClick() {
    const data = JSON.stringify([categoryId, subcategoryId, productId]);
    deleteProductIdRequest(data);

    dispatch(queryAPI.util.updateQueryData('getCartProducts', undefined, (draft) => {
      const index = draft.findIndex((p) => p.categoryId === categoryId
        && p.subcategoryId === subcategoryId && p.product.id === productId);

      draft.splice(index, 1);
    }));
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
          aria-label="Зменшити кількість товара на один"
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
          aria-label="Збільшити кількість товара на один"
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
        aria-label={`Видалити ${name} з кошика`}
      >
        <BinIcon
          className={productCls.binIcon}
        />
      </button>
    </div>
  );
}
