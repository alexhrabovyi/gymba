import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { useGetWishlistProductsQuery } from '../../queryAPI/queryAPI.js';
import ProductCard from '../ProductCard/ProductCard.jsx';
import ThreeDotsSpinnerBlock from '../common/ThreeDotsSpinnerBlock/ThreeDotsSpinnerBlock.jsx';
import PaginationBlock from '../PaginationBlock/PaginationBlock.jsx';
import containerCls from '../../scss/_container.module.scss';
import textCls from '../../scss/_text.module.scss';
import wishlistCls from './Wishlist.module.scss';
import BinIcon from '../../assets/images/icons/bin.svg';
import Line from '../../assets/images/icons/oblique.svg';

import { useDispatch } from 'react-redux';
import { queryAPI } from '../../queryAPI/queryAPI.js';

export default function Wishlist() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const [wishlistProducts, setWishlistProducts] = useState(null);
  const [pageAmount, setPageAmount] = useState(1);
  const [prevPageNum, setPrevPageNum] = useState();

  const currentPageNum = +searchParams.get('page') || 1;

  const { data: fetcherData, isFetching, isLoading } = useGetWishlistProductsQuery(currentPageNum);

  if (fetcherData) {
    if (wishlistProducts !== fetcherData.wishlistProducts) {
      setWishlistProducts(fetcherData.wishlistProducts);
    }

    if (pageAmount !== fetcherData.pageAmount) {
      setPageAmount(fetcherData.pageAmount);
    }
  }

  function checkIsLoadingNextPageNum() {
    if (prevPageNum !== currentPageNum && isFetching && !isLoading) {
      return true;
    }

    if (prevPageNum !== currentPageNum && !isFetching) {
      if (prevPageNum !== currentPageNum) {
        setPrevPageNum(currentPageNum);
      }
      return false;
    }
  }

  const isLoadingNextPageNum = checkIsLoadingNextPageNum();

  const productOnAddDeleteButton = useCallback((categoryId, subcategoryId, productId) => {
    dispatch(queryAPI.util.updateQueryData('getWishlistProducts', currentPageNum, (draft) => {
      const products = draft.wishlistProducts;

      const index = products.findIndex((pObj) => (pObj.categoryId === categoryId
        && pObj.subcategoryId === subcategoryId
        && pObj.product.id === productId));

      products.splice(index, 1);
    }));
  }, [dispatch, currentPageNum]);

  function changePageWhenLastProductDeleted() {
    if (wishlistProducts?.length === 0 && pageAmount !== 1) {
      console.log(true);

      if (currentPageNum <= pageAmount) {
        searchParams.set('page', pageAmount - 1);
        setSearchParams(searchParams);
      }
    }
  }

  changePageWhenLastProductDeleted();

  // function optimisticDeleteAll() {
  //   if (wishlistFetcher.state === 'loading'
  //     && wishlistFetcher.formMethod === 'delete'
  //     && wishlistProducts.length
  //   ) {
  //     setFetcherData({ wishlistProducts: [] });
  //   }
  // }

  // optimisticDeleteAll();

  // function deleteBtnOnClick() {
  //   const data = JSON.stringify('');

  //   wishlistFetcher.submit(data, {
  //     method: 'DELETE',
  //     encType: 'application/json',
  //   });
  // }

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
        wishlistMutationFunc={productOnAddDeleteButton}
      />
    ));
  }, [wishlistProducts, productOnAddDeleteButton]);

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
          // onClick={deleteBtnOnClick}
          aria-label="Видалити все"
        >
          <BinIcon
            className={wishlistCls.binIcon}
          />
          Видалити все
        </button>
        )}
      </div>
      <div className={classNames(
        wishlistCls.productBlock,
        isLoadingNextPageNum && wishlistCls.productBlock_inactive,
      )}
      >
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
      {products && (
        <div className={wishlistCls.paginationBlock}>
          <PaginationBlock
            pageAmount={pageAmount}
          />
        </div>
      )}
    </main>
  );
}
