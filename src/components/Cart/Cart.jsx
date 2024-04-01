import { useMemo } from 'react';
import { useFetcher, useLoaderData } from 'react-router-dom';
import classNames from 'classnames';
import beautifyNum from '../../utils/beautifyNum.js';
import CartProduct from './CartProduct/CartProduct.jsx';
import Button from '../common/Button/Button.jsx';
import containerCls from '../../scss/_container.module.scss';
import textCls from '../../scss/_text.module.scss';
import cartCls from './Cart.module.scss';
import BinIcon from '../../assets/images/icons/bin.svg';
import Line from '../../assets/images/icons/oblique.svg';

export default function Cart() {
  const { cartProducts, totalPrice } = useLoaderData();
  const fetcher = useFetcher();

  function deleteBtnOnClick() {
    const data = JSON.stringify('');

    fetcher.submit(data, {
      method: 'DELETE',
      encType: 'application/json',
    });
  }

  const products = useMemo(() => cartProducts.map((cP) => (
    <CartProduct
      key={cP.product.id}
      categoryId={cP.categoryId}
      subcategoryId={cP.subcategoryId}
      productId={cP.product.id}
      name={cP.product.name}
      price={cP.product.price}
      oldPrice={cP.product.oldPrice}
      amount={cP.amount}
      totalPrice={cP.totalPrice}
    />
  )), [cartProducts]);

  return (
    <main
      className={classNames(
        containerCls.container,
        cartCls.main,
      )}
    >
      <div className={cartCls.titleAndButtonBlock}>
        <h1
          className={classNames(
            textCls.text,
            textCls.textFw800,
            textCls.text48px,
            textCls.textBlack,
            cartCls.title,
          )}
        >
          Кошик
        </h1>
        {!!products.length && (
        <button
          type="button"
          className={cartCls.deleteBtn}
          onClick={deleteBtnOnClick}
          aria-label="Видалити все"
        >
          <BinIcon
            className={cartCls.binIcon}
          />
          Видалити все
        </button>
        )}
      </div>
      <div className={cartCls.productBlock}>
        {products.length ? products : (
          <div className={cartCls.noProductBlock}>
            <div className={cartCls.noProductContent}>
              <Line className={cartCls.noProductLine} />
              <p className={classNames(
                textCls.text,
                textCls.textFw800,
                textCls.text32px,
                cartCls.noProductText,
              )}
              >
                Кошик порожній
              </p>
              <p className={classNames(
                textCls.text,
                textCls.text24px,
                textCls.textGrey,
              )}
              >
                Це варто виправити!
              </p>
            </div>
          </div>
        )}
      </div>
      {products.length > 0 && (
      <div className={cartCls.totalPriceAndCheckoutBtnBlock}>
        <div className={cartCls.totalPriceBlock}>
          <p className={classNames(
            textCls.text,
            textCls.textBlack,
          )}
          >
            {`${products.length} товар(и) на суму`}
          </p>
          <p className={classNames(
            textCls.text,
            textCls.textFw800,
            textCls.text38px,
            textCls.textBlack,
          )}
          >
            {beautifyNum(totalPrice)}
            <span className={classNames(
              textCls.text,
              textCls.textBlack,
              cartCls.totalPriceSpan,
            )}
            >
              ₴
            </span>
          </p>
        </div>
        <Button
          className={cartCls.checkoutButton}
        >
          Оформити замовлення
        </Button>
      </div>
      )}
    </main>
  );
}
