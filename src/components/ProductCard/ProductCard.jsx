/* eslint-disable react/jsx-no-bind */
import {
  Suspense, memo, useState,
} from 'react';
import { Await, Link } from 'react-router-dom';
import classNames from 'classnames';
import beautifyNum from '../../utils/beautifyNum.js';
import Spinner from '../common/Spinner/Spinner.jsx';
import DynamicImage from '../common/DynamicImage/DynamicImage.jsx';
import Button from '../common/Button/Button.jsx';
import linkCls from '../../scss/_link.module.scss';
import productCls from './ProductCard.module.scss';
import Compare from '../../assets/images/icons/compare.svg';
import Favorite from '../../assets/images/icons/favorite.svg';
import Cart from '../../assets/images/icons/cart.svg';
import Mark from '../../assets/images/icons/mark.svg';

import {
  useGetWishlistIdsQuery,
  useAddWishlistIdMutation,
  useDeleteWishlistIdMutation,
  useGetCartIdsQuery,
  useAddCartIdMutation,
  useDeleteCartIdMutation,
  useGetCompareIdsQuery,
  useAddCompareIdMutation,
  useDeleteCompareIdMutation,
} from '../../queryAPI/queryAPI.js';

const ProductCard = memo(({
  name, categoryId, subcategoryId, productId, price, oldPrice, isShortCard,
}) => {
  const [imgSrc] = useState(() => import(`../../assets/images/productImgs/${productId}.webp`));
  const [productInWishlist, setProductInWishlist] = useState(false);
  const [productInCart, setProductInCart] = useState(false);
  const [productInCompare, setProductInCompare] = useState(false);

  const { data: wishlistFetcherData } = useGetWishlistIdsQuery();

  if (wishlistFetcherData) {
    const isInWishlistIdsList = !!wishlistFetcherData.find(([cId, subcId, pId]) => (
      cId === categoryId && subcId === subcategoryId && pId === productId
    ));

    if (productInWishlist !== isInWishlistIdsList) {
      setProductInWishlist(isInWishlistIdsList);
    }
  }

  const { data: cartFetcherData } = useGetCartIdsQuery();

  if (cartFetcherData) {
    const isInCartIdsList = !!cartFetcherData.find((cId) => (cId.categoryId === categoryId
      && cId.subcategoryId === subcategoryId && cId.productId === productId));

    if (productInCart !== isInCartIdsList) {
      setProductInCart(isInCartIdsList);
    }
  }

  const { data: compareFetcherData } = useGetCompareIdsQuery();

  if (compareFetcherData) {
    const isInCompareIdsList = !!compareFetcherData.find(([cId, subcId, pId]) => (
      cId === categoryId && subcId === subcategoryId && pId === productId
    ));

    if (productInCompare !== isInCompareIdsList) {
      setProductInCompare(isInCompareIdsList);
    }
  }

  function sendMutationRequest(state, addMutationFunc, deleteMutationFunc) {
    const body = JSON.stringify([categoryId, subcategoryId, productId]);

    if (!state) {
      addMutationFunc(body);
    } else {
      deleteMutationFunc(body);
    }
  }

  const [addToWishlistRequest] = useAddWishlistIdMutation();
  const [deleteFromWishlistRequest] = useDeleteWishlistIdMutation();

  function wishlistButtonOnClick() {
    sendMutationRequest(productInWishlist, addToWishlistRequest, deleteFromWishlistRequest);
  }

  const [addToCartRequest] = useAddCartIdMutation();
  const [deleteFromCartRequest] = useDeleteCartIdMutation();

  function cartButtonOnClick() {
    sendMutationRequest(productInCart, addToCartRequest, deleteFromCartRequest);
  }

  const [addToCompareRequest] = useAddCompareIdMutation();
  const [deleteFromCompareRequest] = useDeleteCompareIdMutation();

  function compareButtonOnClick() {
    sendMutationRequest(productInCompare, addToCompareRequest, deleteFromCompareRequest);
  }

  const productLink = `/${categoryId}/${subcategoryId}/${productId}`;

  if (isShortCard) {
    return (
      <div className={productCls.card}>
        <div className={productCls.iconButtonsBlock}>
          <button
            type="button"
            className={classNames(
              productCls.iconButton,
              productInCompare && productCls.iconButton_active,
            )}
            aria-label={productInCompare ? `Видалити ${name} з порівняння` : `Добавить ${name} в порівняння`}
            onClick={compareButtonOnClick}
          >
            <Compare className={productCls.icon} />
          </button>
          <button
            type="button"
            className={classNames(
              productCls.iconButton,
              productInWishlist && productCls.iconButton_active,
            )}
            aria-label={productInWishlist ? `Видалити ${name} зі списку бажань` : `Добавить ${name} до списку бажань`}
            onClick={wishlistButtonOnClick}
          >
            <Favorite className={productCls.icon} />
          </button>
        </div>
        <Link
          className={productCls.imageLink}
          to={productLink}
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
          className={classNames(linkCls.link, productCls.textLink)}
          to={productLink}
          alt={name}
        >
          {name}
        </Link>
        <div className={productCls.priceAndCartBlock}>
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
          <Button
            className={productCls.cartButton}
            ariaLabel={!productInCart ? `Додати ${name} до кошику` : `Видалити ${name} з кошика`}
            onClick={cartButtonOnClick}
          >
            {!productInCart ? (
              <Cart className={productCls.cartIcon} />
            ) : (
              <Mark className={productCls.cartIcon} />
            )}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={productCls.longCard}>
      <Link
        className={productCls.longImageLink}
        to={productLink}
        alt={name}
      >
        <Suspense
          fallback={<Spinner className={productCls.spinner} />}
        >
          <Await resolve={imgSrc}>
            <DynamicImage
              className={productCls.longImage}
              alt={name}
            />
          </Await>
        </Suspense>
      </Link>
      <div className={productCls.nameAndIconButtons}>
        <Link
          className={classNames(linkCls.link, productCls.longTextLink)}
          to={productLink}
          alt={name}
        >
          {name}
        </Link>
        <div className={productCls.longIconButtonsBlock}>
          <button
            type="button"
            className={classNames(
              productCls.iconButton,
              productInCompare && productCls.iconButton_active,
            )}
            aria-label={productInCompare ? `Видалити ${name} з порівняння` : `Додати ${name} в порівняння`}
            onClick={compareButtonOnClick}
          >
            <Compare className={productCls.icon} />
          </button>
          <button
            type="button"
            className={classNames(
              productCls.iconButton,
              productInWishlist && productCls.iconButton_active,
            )}
            aria-label={productInWishlist ? `Видалити ${name} зі списку бажань` : `Додати ${name} до списку бажань`}
            onClick={wishlistButtonOnClick}
          >
            <Favorite className={productCls.icon} />
          </button>
        </div>
      </div>
      <div className={productCls.longPriceAndCartBlock}>
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
        <Button
          className={productCls.longCartButton}
          ariaLabel={!productInCart ? `Додати ${name} до кошику` : `Видалити ${name} з кошика`}
          onClick={cartButtonOnClick}
        >
          {!productInCart ? 'Додати до кошику' : 'У кошику'}
        </Button>
      </div>
    </div>
  );
});

export default ProductCard;
