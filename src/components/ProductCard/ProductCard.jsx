/* eslint-disable react/jsx-no-bind */
import {
  Suspense, memo, useState,
} from 'react';
import { Await, Link, useFetcher } from 'react-router-dom';
import classNames from 'classnames';
import useFetcherLoad from '../../hooks/useFetcherLoad.jsx';
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

import { useGetWishlistIdsQuery, useAddWishlistIdMutation, useDeleteWishlistIdMutation } from '../../queryAPI/queryAPI.js';

const ProductCard = memo(({
  name, categoryId, subcategoryId, productId, price, oldPrice, isShortCard,
}) => {
  // const cartFetcher = useFetcher();
  // const compareFetcher = useFetcher();

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

  // useFetcherLoad(cartFetcher, '/cart');

  // if (cartFetcher.data) {
  //   const productInCartFromFetcher = cartFetcher.data.cartIds.find((cId) => (
  //     cId.categoryId === categoryId
  //       && cId.subcategoryId === subcategoryId && cId.productId === productId
  //   ));

  //   if (productInCartFromFetcher !== productInCart) {
  //     setProductInCart(productInCartFromFetcher);
  //   }
  // }

  // useFetcherLoad(compareFetcher, '/compare');

  // if (compareFetcher.data) {
  //   const productInCompareFromFetcher = compareFetcher
  //     .data.compareIds.find(([cId, subcId, pId]) => (
  //       cId === categoryId && subcId === subcategoryId && pId === productId
  //     ));

  //   if (productInCompareFromFetcher !== productInCompare) {
  //     setProductInCompare(productInCompareFromFetcher);
  //   }
  // }

  // function optimisticCart() {
  //   if (cartFetcher.state === 'loading') {
  //     if (cartFetcher.formMethod === 'patch' && !productInCart) {
  //       setProductInCart(true);
  //     } else if (cartFetcher.formMethod === 'delete' && productInCart) {
  //       setProductInCart(false);
  //     }
  //   }
  // }

  // optimisticCart();

  // function optimisticCompare() {
  //   if (compareFetcher.state === 'loading') {
  //     if (compareFetcher.formMethod === 'patch' && !productInCompare) {
  //       setProductInCompare(true);
  //     } else if (compareFetcher.formMethod === 'delete' && productInCompare) {
  //       setProductInCompare(false);
  //     }
  //   }
  // }

  // optimisticCompare();

  const [addToWishlistRequest] = useAddWishlistIdMutation();
  const [deleteFromWishlistRequest] = useDeleteWishlistIdMutation();

  function wishlistButtonOnClick() {
    const body = JSON.stringify([categoryId, subcategoryId, productId]);

    if (!productInWishlist) {
      addToWishlistRequest(body);
    } else {
      deleteFromWishlistRequest(body);
    }
  }

  // function cartButtonOnClick() {
  //   const data = JSON.stringify([categoryId, subcategoryId, productId]);

  //   if (!productInCart) {
  //     cartFetcher.submit(data, {
  //       action: '/cart',
  //       method: 'PATCH',
  //       encType: 'application/json',
  //     });
  //   } else {
  //     cartFetcher.submit(data, {
  //       action: '/cart',
  //       method: 'DELETE',
  //       encType: 'application/json',
  //     });
  //   }
  // }

  // function compareButtonOnClick() {
  //   const data = JSON.stringify([categoryId, subcategoryId, productId]);

  //   if (!productInCompare) {
  //     compareFetcher.submit(data, {
  //       action: '/compare',
  //       method: 'PATCH',
  //       encType: 'application/json',
  //     });
  //   } else {
  //     compareFetcher.submit(data, {
  //       action: '/compare',
  //       method: 'DELETE',
  //       encType: 'application/json',
  //     });
  //   }
  // }

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
            // onClick={compareButtonOnClick}
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
            // onClick={cartButtonOnClick}
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
            // onClick={compareButtonOnClick}
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
            // onClick={wishlistButtonOnClick}
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
          // onClick={cartButtonOnClick}
        >
          {!productInCart ? 'Додати до кошику' : 'У кошику'}
        </Button>
      </div>
    </div>
  );
});

export default ProductCard;
