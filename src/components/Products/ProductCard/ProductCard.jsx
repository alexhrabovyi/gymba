/* eslint-disable react/jsx-no-bind */
import {
  Suspense, memo, useState, useEffect,
} from 'react';
import { Await, Link, useFetcher } from 'react-router-dom';
import classNames from 'classnames';
import beautifyNum from '../../../utils/beautifyNum.js';
import Spinner from '../../common/Spinner/Spinner.jsx';
import DynamicImage from '../../common/DynamicImage/DynamicImage.jsx';
import Button from '../../common/Button/Button.jsx';
import linkCls from '../../../scss/_link.module.scss';
import productCls from './ProductCard.module.scss';
import Compare from './images/compare.svg';
import Favorite from './images/favorite.svg';
import Cart from './images/cart.svg';
import Mark from './images/mark.svg';

const ProductCard = memo(({
  name, categoryId, subcategoryId, productId, price, oldPrice, isShortCard,
}) => {
  const wishlistFetcher = useFetcher();
  const cartFetcher = useFetcher();

  const [imgSrc] = useState(() => import(`./images/${productId}.webp`));
  const [productInWishlist, setProductInWishlist] = useState(false);
  const [productInCart, setProductInCart] = useState(false);

  useEffect(() => {
    if (wishlistFetcher.state === 'idle' && !wishlistFetcher.data) {
      wishlistFetcher.load('../wishlist');
    }
  }, [wishlistFetcher]);

  if (wishlistFetcher.data) {
    const productInWishlistFromFetcher = wishlistFetcher
      .data.wishlistIds.find(([cId, subcId, pId]) => (
        cId === categoryId && subcId === subcategoryId && pId === productId
      ));

    if (productInWishlistFromFetcher !== productInWishlist) {
      setProductInWishlist(productInWishlistFromFetcher);
    }
  }

  useEffect(() => {
    if (cartFetcher.state === 'idle' && !cartFetcher.data) {
      cartFetcher.load('../cart');
    }
  }, [cartFetcher]);

  if (cartFetcher.data) {
    const productInCartFromFetcher = cartFetcher.data.cartIds.find(([cId, subcId, pId]) => (
      cId === categoryId && subcId === subcategoryId && pId === productId
    ));

    if (productInCartFromFetcher !== productInCart) {
      setProductInCart(productInCartFromFetcher);
    }
  }

  function wishlistButtonOnClick() {
    const data = JSON.stringify([categoryId, subcategoryId, productId]);

    if (!productInWishlist) {
      wishlistFetcher.submit(data, {
        action: '../wishlist',
        method: 'PATCH',
        encType: 'application/json',
      });
    } else {
      wishlistFetcher.submit(data, {
        action: '../wishlist',
        method: 'DELETE',
        encType: 'application/json',
      });
    }
  }

  function cartButtonOnClick() {
    const data = JSON.stringify([categoryId, subcategoryId, productId]);

    if (!productInCart) {
      cartFetcher.submit(data, {
        action: '../cart',
        method: 'PATCH',
        encType: 'application/json',
      });
    } else {
      cartFetcher.submit(data, {
        action: '../cart',
        method: 'DELETE',
        encType: 'application/json',
      });
    }
  }

  if (isShortCard) {
    return (
      <div className={productCls.card}>
        <div className={productCls.iconButtonsBlock}>
          <button
            type="button"
            className={productCls.iconButton}
            aria-label={`Добавить ${name} в сравнение`}
          >
            <Compare className={productCls.icon} />
          </button>
          <button
            type="button"
            className={classNames(
              productCls.iconButton,
              productInWishlist && productCls.iconButton_active,
            )}
            aria-label={productInWishlist ? `Удалить ${name} из избранного` : `Добавить ${name} в избранное`}
            onClick={wishlistButtonOnClick}
          >
            <Favorite className={productCls.icon} />
          </button>
        </div>
        <Link
          className={productCls.imageLink}
          to={productId}
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
          to={productId}
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
            ariaLabel={!productInCart ? `Добавить ${name} в корзину` : `Удалить ${name} из корзины`}
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
        to={productId}
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
          to={productId}
          alt={name}
        >
          {name}
        </Link>
        <div className={productCls.longIconButtonsBlock}>
          <button
            type="button"
            className={productCls.iconButton}
            aria-label={`Добавить ${name} в сравнение`}
          >
            <Compare className={productCls.icon} />
          </button>
          <button
            type="button"
            className={classNames(
              productCls.iconButton,
              productInWishlist && productCls.iconButton_active,
            )}
            aria-label={productInWishlist ? `Удалить ${name} из избранного` : `Добавить ${name} в избранное`}
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
          ariaLabel={!productInCart ? `Добавить ${name} в корзину` : `Удалить ${name} из корзины`}
          onClick={cartButtonOnClick}
        >
          {!productInCart ? 'В корзину' : 'Удалить из корзины'}
        </Button>
      </div>
    </div>
  );
});

export default ProductCard;
