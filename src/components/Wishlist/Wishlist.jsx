import { useMemo, useState } from 'react';
import { useFetcher } from 'react-router-dom';
import classNames from 'classnames';
import useFetcherLoad from '../../hooks/useFetcherLoad.jsx';
import ProductCard from '../ProductCard/ProductCard.jsx';
import ThreeDotsSpinnerBlock from '../common/ThreeDotsSpinnerBlock/ThreeDotsSpinnerBlock.jsx';
import PaginationBlock from '../PaginationBlock/PaginationBlock.jsx';
import containerCls from '../../scss/_container.module.scss';
import textCls from '../../scss/_text.module.scss';
import wishlistCls from './Wishlist.module.scss';
import BinIcon from '../../assets/images/icons/bin.svg';
import Line from '../../assets/images/icons/oblique.svg';

export default function Wishlist() {
  const wishlistFetcher = useFetcher();

  const [fetcherData, setFetcherData] = useState(null);

  const wishlistProducts = useMemo(() => fetcherData?.wishlistProducts, [fetcherData]);
  const pageAmount = fetcherData?.pageAmount;

  useFetcherLoad(wishlistFetcher, '/wishlist');

  if (wishlistFetcher.data) {
    if (wishlistFetcher.data.wishlistProductsPerPageAndPageAmount !== fetcherData) {
      setFetcherData(wishlistFetcher.data.wishlistProductsPerPageAndPageAmount);
    }
  }

  function optimisticDeleteAll() {
    if (wishlistFetcher.state === 'loading'
      && wishlistFetcher.formMethod === 'delete'
      && wishlistProducts.length
    ) {
      setFetcherData({ wishlistProducts: [] });
    }
  }

  optimisticDeleteAll();

  function deleteBtnOnClick() {
    const data = JSON.stringify('');

    wishlistFetcher.submit(data, {
      method: 'DELETE',
      encType: 'application/json',
    });
  }

  const products = useMemo(() => {
    if (!wishlistProducts) return;

    return wishlistProducts.map((wP) => (
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
  }, [wishlistProducts]);

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
        {products && products.length > 0 && (
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
        {products ? (
          products.length > 0 ? products : (
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
          )
        ) : (
          <ThreeDotsSpinnerBlock
            blockClassName={wishlistCls.spinnerBlock}
          />
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
