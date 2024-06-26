/* eslint-disable react/jsx-no-bind */
import {
  Suspense, memo, useState,
} from 'react';
import { Await, Link } from 'react-router-dom';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { MutationDefinition } from '@reduxjs/toolkit/query';
import classNames from 'classnames';
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
} from '../../queryAPI/queryAPI';
import beautifyNum from '../../utils/beautifyNum';
import Spinner from '../common/Spinner/Spinner';
import DynamicImage from '../common/DynamicImage/DynamicImage';
import Button from '../common/Button/Button';
import linkCls from '../../scss/_link.module.scss';
import productCls from './ProductCard.module.scss';
import Compare from '../../assets/images/icons/compare.svg';
import Favorite from '../../assets/images/icons/favorite.svg';
import Cart from '../../assets/images/icons/cart.svg';
import Mark from '../../assets/images/icons/mark.svg';

type MutationFunc = (
  categoryId: string,
  subcategoryId: string,
  productId: string,
) => void;

interface ProductCardProps {
  name: string,
  categoryId: string,
  subcategoryId: string,
  productId: string,
  price: string,
  oldPrice?: string | undefined,
  isShortCard: boolean,
  wishlistMutationFunc?: MutationFunc,
  compareMutationFunc?: MutationFunc,
}

const ProductCard = memo<ProductCardProps>(({
  name, categoryId, subcategoryId, productId, price, oldPrice, isShortCard,
  wishlistMutationFunc, compareMutationFunc,
}) => {
  const [imgSrc] = useState(() => import(`../../assets/images/productImgs/${productId}.webp`));
  const [productInWishlist, setProductInWishlist] = useState<boolean>(false);
  const [productInCart, setProductInCart] = useState<boolean>(false);
  const [productInCompare, setProductInCompare] = useState<boolean>(false);

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

  function sendMutationRequest(
    state: boolean,
    addMutationFunc: MutationTrigger<MutationDefinition<any, any, any, any>>,
    deleteMutationFunc: MutationTrigger<MutationDefinition<any, any, any, any>>,
  ) {
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

    if (wishlistMutationFunc) {
      wishlistMutationFunc(categoryId, subcategoryId, productId);
    }
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

    if (compareMutationFunc) {
      compareMutationFunc(categoryId, subcategoryId, productId);
    }
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
              {beautifyNum(Number(price))}
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
            {beautifyNum(Number(price))}
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
