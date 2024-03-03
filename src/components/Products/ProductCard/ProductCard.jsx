import { Suspense } from 'react';
import { Await, Link } from 'react-router-dom';
import Spinner from '../../common/Spinner/Spinner.jsx';
import DynamicImage from '../../common/DynamicImage/DynamicImage.jsx';
import Button from '../../common/Button/Button.jsx';
import linkCls from '../../../scss/_link.module.scss';
import productCls from './ProductCard.module.scss';
import Compare from './images/compare.svg';
import Favorite from './images/favorite.svg';
import Cart from './images/cart.svg';

export default function ProductCard({
  name, id, price, oldPrice,
}) {
  const imgSrc = import(`./images/${id}.webp`);

  return (
    <div className={productCls.card}>
      <div className={productCls.iconButtonsBlock}>
        <button
          type="button"
          className={productCls.iconButton}
        >
          <Compare />
        </button>
        <button
          type="button"
          className={productCls.iconButton}
        >
          <Favorite />
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
        className={linkCls.link}
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
            </p>
          )}
          <p className={productCls.price}>
            {price}
            <span className={productCls.priceSpan}>₴/шт</span>
          </p>
        </div>
        <Button className={productCls.cartButton}>
          <Cart />
        </Button>
      </div>
    </div>
  );
}
