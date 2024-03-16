/* eslint-disable react/jsx-no-bind */
import {
  useState, useEffect, Suspense, useMemo,
} from 'react';
import { useLoaderData, useFetcher, Await } from 'react-router-dom';
import classNames from 'classnames';
import Spinner from '../common/Spinner/Spinner.jsx';
import DynamicImage from '../common/DynamicImage/DynamicImage.jsx';
import Slider from '../common/Slider/Slider.jsx';
import Button from '../common/Button/Button.jsx';
import containerCls from '../../scss/_container.module.scss';
import textCls from '../../scss/_text.module.scss';
import linkCls from '../../scss/_link.module.scss';
import productCls from './Product.module.scss';
import Favorite from '../../assets/images/icons/favorite.svg';
import Compare from '../../assets/images/icons/compare.svg';

export default function Product() {
  const { categoryId, subcategoryId, product } = useLoaderData();
  const wishlistFetcher = useFetcher();
  const cartFetcher = useFetcher();

  const [productInWishlist, setProductInWishlist] = useState(false);
  const [productInCart, setProductInCart] = useState(false);
  const [imgSrcs] = useState(() => {
    const result = [[product.id, import(`../../assets/images/productImgs/${product.id}.webp`)]];

    const { additionalImgs } = product;

    if (additionalImgs) {
      additionalImgs.forEach((additionalSrc) => {
        result.push([additionalSrc, import(`../../assets/images/productImgs/${additionalSrc}.webp`)]);
      });
    }

    return result;
  });

  useEffect(() => {
    if (wishlistFetcher.state === 'idle' && !wishlistFetcher.data) {
      wishlistFetcher.load('../wishlist');
    }
  }, [wishlistFetcher]);

  if (wishlistFetcher.data) {
    const productInWishlistFromFetcher = wishlistFetcher
      .data.wishlistIds.find(([cId, subcId, pId]) => (
        cId === categoryId && subcId === subcategoryId && pId === product.id
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
      cId === categoryId && subcId === subcategoryId && pId === product.id
    ));

    if (productInCartFromFetcher !== productInCart) {
      setProductInCart(productInCartFromFetcher);
    }
  }

  function wishlistButtonOnClick() {
    const data = JSON.stringify([categoryId, subcategoryId, product.id]);

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
    const data = JSON.stringify([categoryId, subcategoryId, product.id]);

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

  const paginationBtns = useMemo(() => {
    const result = imgSrcs.map(([key, src]) => (
      <button
        key={key}
        type="button"
        className={productCls.paginationBtn}
      >
        <Suspense
          fallback={<Spinner className={productCls.paginationBtnSpinner} />}
        >
          <Await resolve={src}>
            <DynamicImage
              className={productCls.paginationBtnImg}
              alt={product.name}
            />
          </Await>
        </Suspense>
      </button>
    ));

    return result;
  }, [product, imgSrcs]);

  const slides = useMemo(() => {
    const result = imgSrcs.map(([key, src]) => (
      <div
        key={key}
        className={productCls.slide}
      >
        <Suspense
          fallback={<Spinner className={productCls.slideImgSpinner} />}
        >
          <Await resolve={src}>
            <DynamicImage
              className={productCls.slideImg}
              alt={product.name}
            />
          </Await>
        </Suspense>
      </div>
    ));

    return result;
  }, [product, imgSrcs]);

  const mainSpecsElems = useMemo(() => {
    const { mainSpecs } = product;

    return Object.entries(mainSpecs).map(([name, value]) => (
      <li
        key={name}
        className={productCls.mainSpec}
      >
        <p className={classNames(
          textCls.text,
          textCls.textGrey,
        )}
        >
          {`${name}:`}
        </p>
        <p className={classNames(
          textCls.text,
          textCls.textBlack,
        )}
        >
          {value}
        </p>
      </li>
    ));
  }, [product]);

  let discountPercent;

  if (product.oldPrice) {
    discountPercent = ((product.oldPrice - product.price) / product.oldPrice) * 100;
    discountPercent = discountPercent.toFixed(0);
  }

  return (
    <main className={classNames(containerCls.container, productCls.main)}>
      <h1 className={classNames(
        textCls.text,
        textCls.textFw800,
        textCls.text48px,
        textCls.textBlackj,
        productCls.title,
      )}
      >
        {product.name}
      </h1>
      <div className={productCls.additionalButtonsBlock}>
        <button
          type="button"
          className={classNames(
            productCls.iconButton,
            productInWishlist && productCls.iconButton_active,
          )}
          onClick={wishlistButtonOnClick}
          aria-label={productInWishlist ? `Удалить ${product.name} из избранного` : `Добавить ${product.name} в избранное`}
        >
          <Favorite className={productCls.buttonIcon} />
          {!productInWishlist ? 'В избранное' : 'В избранном'}
        </button>
        <button
          type="button"
          className={classNames(
            productCls.iconButton,
          )}
        >
          <Compare className={productCls.buttonIcon} />
          К сравнению
        </button>
      </div>
      <div className={productCls.mainBlock}>
        <div className={productCls.imageBlock}>
          <div className={productCls.imagePaginationBlock}>
            {paginationBtns}
          </div>
          <div className={productCls.imageSliderBlock}>
            <Slider
              slides={slides}
              gap={20}
            />
          </div>
        </div>
        <div className={productCls.mainSpecsBlock}>
          <p className={classNames(
            textCls.text,
            textCls.textFw800,
            textCls.text14px,
            textCls.textBlack,
            productCls.mainSpecsTitle,
          )}
          >
            Основные характеристики
          </p>
          <ul className={productCls.mainSpecsList}>
            {mainSpecsElems}
          </ul>
          <a
            href="#specs"
            className={classNames(
              linkCls.link,
              linkCls.linkBlue,
            )}
            alt="Посмотреть все характеристики"
          >
            Посмотреть все
          </a>
        </div>
        <div className={productCls.priceAndCartBlock}>
          {product.oldPrice && (
            <p className={productCls.oldPrice}>
              {`${product.oldPrice} ₴/шт`}
            </p>
          )}
          <div className={productCls.mainPriceBlock}>
            <p className={classNames(
              textCls.text,
              textCls.textFw800,
              textCls.text48px,
              textCls.textBlack,
              product.mainPrice,
            )}
            >
              {product.price}
            </p>
            <span className={classNames(
              textCls.text,
              textCls.textBlack,
            )}
            >
              ₴/шт
            </span>
            {product.oldPrice && (
              <div className={productCls.discountBlock}>
                {`-${discountPercent}%`}
              </div>
            )}
          </div>
          <Button
            className={productCls.cartButton}
            ariaLabel={!productInCart ? `Добавить ${product.name} в корзину` : `Удалить ${product.name} из корзины`}
            onClick={cartButtonOnClick}
          >
            {!productInCart ? 'Добавить в корзину' : 'В корзине'}
          </Button>
        </div>
      </div>
    </main>
  );
}
