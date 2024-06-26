import {
  useCallback, useMemo, useState, useRef,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { queryAPI, useGetWishlistProductsQuery, useDeleteAllWishlistIdsMutation } from '../../queryAPI/queryAPI';
import ProductCard from '../ProductCard/ProductCard';
import SkeletonProductCard from '../SkeletonProductCard/SkeletonProductCard';
import ThreeDotsSpinnerBlock from '../common/ThreeDotsSpinnerBlock/ThreeDotsSpinnerBlock';
import PaginationBlock from '../PaginationBlock/PaginationBlock';
import containerCls from '../../scss/_container.module.scss';
import textCls from '../../scss/_text.module.scss';
import wishlistCls from './Wishlist.module.scss';
import BinIcon from '../../assets/images/icons/bin.svg';
import Line from '../../assets/images/icons/oblique.svg';
import { ProductCard as TypeProductCard } from '../../utils/dataAPI';

const Wishlist: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const titleRef = useRef<HTMLHeadingElement | null>(null);

  const [wishlistProducts, setWishlistProducts] = useState<TypeProductCard[] | null>(null);
  const [totalProductAmount, setTotalProductAmount] = useState<number | null>(null);
  const [pageAmount, setPageAmount] = useState<number>(1);
  const [prevPageNum, setPrevPageNum] = useState<number | null>(null);

  const [deleteAllWishlistIds] = useDeleteAllWishlistIdsMutation();

  const perView = 12;
  const currentPageNum = Number(searchParams.get('page')) || 1;

  // event functions

  const productOnAddDeleteButton = useCallback((
    categoryId: string,
    subcategoryId: string,
    productId: string,
  ) => {
    dispatch(queryAPI.util.updateQueryData('getWishlistProducts', currentPageNum, (draft) => {
      const products = draft.wishlistProducts;

      const index = products.findIndex((pObj) => (pObj.categoryId === categoryId
        && pObj.subcategoryId === subcategoryId
        && pObj.product.id === productId));

      products.splice(index, 1);

      draft.totalProductAmount -= 1;
    }) as any);
  }, [dispatch, currentPageNum]);

  function deleteAllBtnOnClick() {
    deleteAllWishlistIds('');

    dispatch(queryAPI.util.updateQueryData('getWishlistProducts', currentPageNum, (draft) => {
      draft.wishlistProducts = [];
      draft.pageAmount = 0;
      draft.totalProductAmount = 0;
    }) as any);
  }

  // fetch functions

  const { data: fetcherData, isFetching, isLoading } = useGetWishlistProductsQuery(currentPageNum);

  if (fetcherData) {
    if (wishlistProducts !== fetcherData.wishlistProducts) {
      setWishlistProducts(fetcherData.wishlistProducts);
    }

    if (totalProductAmount !== fetcherData.totalProductAmount) {
      setTotalProductAmount(fetcherData.totalProductAmount);
    }

    if (pageAmount !== fetcherData.pageAmount) {
      setPageAmount(fetcherData.pageAmount);
    }
  }

  // setup functions

  function changePageWhenLastProductDeleted() {
    if (wishlistProducts?.length === 0 && pageAmount !== 1) {
      if (currentPageNum <= pageAmount && currentPageNum !== 1) {
        searchParams.set('page', String(currentPageNum - 1));
        setSearchParams(searchParams);
      }
    }
  }

  changePageWhenLastProductDeleted();

  function checkIsLoadingNextPageNum() {
    if (!isLoading && isFetching && prevPageNum !== currentPageNum) {
      return true;
    }

    if (!isFetching && prevPageNum !== currentPageNum) {
      setPrevPageNum(currentPageNum);
      return false;
    }
  }

  const isLoadingNextPageNum = checkIsLoadingNextPageNum();

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

  function addSkeletonProduct() {
    products!.push(<SkeletonProductCard />);
  }

  function isSkeletonProductNeeded() {
    if (!products || !totalProductAmount) return;

    if (products.length < perView && !checkIsLoadingNextPageNum()) {
      const lastCardOnPageIndex = currentPageNum * perView - 1;
      return totalProductAmount > lastCardOnPageIndex;
    }

    return false;
  }

  if (isSkeletonProductNeeded()) {
    addSkeletonProduct();
  }

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
          ref={titleRef}
        >
          Список бажань
        </h1>
        {products && products.length > 0 && (
          <button
            type="button"
            className={wishlistCls.deleteBtn}
            onClick={deleteAllBtnOnClick}
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
      {!!products?.length && (
        <div className={wishlistCls.paginationBlock}>
          <PaginationBlock
            pageAmount={pageAmount}
            elemToScrollRef={titleRef}
          />
        </div>
      )}
    </main>
  );
};

export default Wishlist;
