import { Suspense, memo } from 'react';
import { Await, Link } from 'react-router-dom';
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

const ProductCard = memo(({
  name, id, price, oldPrice, isShortCard,
}) => {
  const imgSrc = import(`./images/${id}.webp`);

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
            className={productCls.iconButton}
            aria-label={`Добавить ${name} в избранное`}
          >
            <Favorite className={productCls.icon} />
          </button>
        </div>
        <Link
          className={productCls.imageLink}
          to={id}
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
          to={id}
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
            ariaLabel={`Добавить ${name} в корзину`}
          >
            <Cart className={productCls.cartIcon} />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={productCls.longCard}>
      <Link
        className={productCls.longImageLink}
        to={id}
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
          to={id}
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
            className={productCls.iconButton}
            aria-label={`Добавить ${name} в избранное`}
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
          ariaLabel={`Добавить ${name} в корзину`}
        >
          В корзину
        </Button>
      </div>
    </div>
  );
});

export default ProductCard;
