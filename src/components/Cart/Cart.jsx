import { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { queryAPI, useGetCartProductsQuery, useDeleteAllCartIdsMutation } from '../../queryAPI/queryAPI';
import beautifyNum from '../../utils/beautifyNum.js';
import CartProduct from './CartProduct/CartProduct.jsx';
import Button from '../common/Button/Button';
import containerCls from '../../scss/_container.module.scss';
import textCls from '../../scss/_text.module.scss';
import cartCls from './Cart.module.scss';
import BinIcon from '../../assets/images/icons/bin.svg';
import Line from '../../assets/images/icons/oblique.svg';
import ThreeDotsSpinnerBlock from '../common/ThreeDotsSpinnerBlock/ThreeDotsSpinnerBlock';

export default function Cart() {
  const dispatch = useDispatch();

  const [deleteAllRequest] = useDeleteAllCartIdsMutation();

  const [cartProducts, setCartProducts] = useState(null);

  const totalPrice = useMemo(() => (cartProducts
    ?.reduce((acc, pObj) => acc + pObj.amount * pObj.product.price, 0)), [cartProducts]);

  const { data: fetcherData } = useGetCartProductsQuery();

  if (fetcherData) {
    if (fetcherData !== cartProducts) {
      setCartProducts(fetcherData);
    }
  }

  function deleteAllBtnOnClick() {
    deleteAllRequest();

    dispatch(queryAPI.util.updateQueryData('getCartProducts', undefined, (draft) => {
      draft.splice(0);
    }));
  }

  const products = useMemo(() => {
    if (!cartProducts) return;

    return cartProducts.map((cP) => (
      <CartProduct
        key={cP.product.id}
        categoryId={cP.categoryId}
        subcategoryId={cP.subcategoryId}
        productId={cP.product.id}
        name={cP.product.name}
        price={cP.product.price}
        oldPrice={cP.product.oldPrice}
        amount={cP.amount}
        totalPrice={cP.amount * cP.product.price}
      />
    ));
  }, [cartProducts]);

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
        {products && products.length > 0 && (
        <button
          type="button"
          className={cartCls.deleteBtn}
          onClick={deleteAllBtnOnClick}
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
        {products ? (
          products.length > 0 ? products : (
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
          )
        ) : (
          <ThreeDotsSpinnerBlock />
        )}
      </div>
      {products && products.length > 0 && (
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
