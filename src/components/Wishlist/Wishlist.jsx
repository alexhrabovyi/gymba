import { useFetcher, useLoaderData } from 'react-router-dom';
import classNames from 'classnames';
import ProductCard from '../ProductCard/ProductCard.jsx';
import PaginationBlock from '../PaginationBlock/PaginationBlock.jsx';
import containerCls from '../../scss/_container.module.scss';
import textCls from '../../scss/_text.module.scss';
import wishlistCls from './Wishlist.module.scss';
import BinIcon from '../../assets/images/icons/bin.svg';
import Line from '../../assets/images/icons/oblique.svg';

export default function Wishlist() {
  const { wishlistProducts, pageAmount } = useLoaderData();
  const fetcher = useFetcher();

  function deleteBtnOnClick() {
    const data = JSON.stringify('');

    fetcher.submit(data, {
      method: 'DELETE',
      encType: 'application/json',
    });
  }

  const products = wishlistProducts.map((wP) => (
    <ProductCard
      key={wP.product.id}
      name={wP.product.name}
      categoryId={wP.categoryId}
      subcategoryId={wP.subcategoryId}
      productId={wP.product.id}
      price={wP.product.price}
      oldPrice={wP.product.oldPrice}
      isShortCard
    />
  ));

  return (
    <main
      className={classNames(
        containerCls.container,
        wishlistCls.main,
      )}
    >
      <div className={wishlistCls.titleAndButtonBlock}>
        <h1
          className={classNames(
            textCls.text,
            textCls.textFw800,
            textCls.text48px,
            textCls.textBlack,
            wishlistCls.title,
          )}
        >
          Список бажань
        </h1>
        {!!products.length && (
        <button
          type="button"
          className={wishlistCls.deleteBtn}
          onClick={deleteBtnOnClick}
          aria-label="Видалити все"
        >
          <BinIcon
            className={wishlistCls.binIcon}
          />
          Видалити все
        </button>
        )}
      </div>
      <div className={wishlistCls.productBlock}>
        {products.length ? products : (
          <div className={wishlistCls.noProductBlock}>
            <div className={wishlistCls.noProductContent}>
              <Line className={wishlistCls.noProductLine} />
              <p className={classNames(
                textCls.text,
                textCls.textFw800,
                textCls.text32px,
                wishlistCls.noProductText,
              )}
              >
                Бажаних товарів немає
              </p>
              <p className={classNames(
                textCls.text,
                textCls.text24px,
                textCls.textGrey,
              )}
              >
                Саме час додати!
              </p>
            </div>
          </div>
        )}
      </div>
      <div className={wishlistCls.paginationBlock}>
        <PaginationBlock
          pageAmount={pageAmount}
        />
      </div>
    </main>
  );
}
