/* eslint-disable react/jsx-no-bind */
import {
  useState, useCallback, useLayoutEffect, useMemo, useRef,
  useEffect,
} from 'react';
import { useFetcher, useSearchParams, useParams } from 'react-router-dom';
import classNames from 'classnames';
import useOnResize from '../../hooks/useOnResize.jsx';
import containerCls from '../../scss/_container.module.scss';
import textCls from '../../scss/_text.module.scss';
import productsCls from './Products.module.scss';
import Select from './Select/Select.jsx';
import FilterBlock from './FilterBlock/FilterBlock.jsx';
import AppliedFiltersBlock from './AppliedFiltersBlock/AppliedFiltersBlock.jsx';
import ThreeDotsSpinnerBlock from '../common/ThreeDotsSpinnerBlock/ThreeDotsSpinnerBlock.jsx';
import ProductCard from '../ProductCard/ProductCard.jsx';
import PaginationBlock from '../PaginationBlock/PaginationBlock.jsx';
import LeftSideMenu from '../common/LeftSideMenu/LeftSideMenu.jsx';
import CardsShortIcon from './images/productCardsShort.svg';
import CardsLongIcon from './images/productCardsLong.svg';
import FilterIcon from './images/filter.svg';
import Line from '../../assets/images/icons/oblique.svg';
import Button from '../common/Button/Button.jsx';

export default function Products() {
  const productsFetcher = useFetcher();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();

  const openFilterMenuBtnRef = useRef();

  const [categoryAndSubcategory, setCategoryAndSubcategory] = useState(null);
  const [subcategoryFilters, setSubcategoryFilters] = useState(null);
  const [filteredProductsAndMinMaxPrice, setFilteredProductsAndMinMaxPrice] = useState(null);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState();
  const [prevFetchUrl, setPrevFetchUrl] = useState(null);

  // setup functions

  const categoryIdParam = params.categoryId;
  const subcategoryIdParam = params.subcategoryId;

  const categoryId = categoryAndSubcategory?.categoryId;
  const subcategoryName = categoryAndSubcategory?.subcategory.name;
  const subcategoryId = categoryAndSubcategory?.subcategory.id;

  const filteredAndSortedProducts = useMemo(() => filteredProductsAndMinMaxPrice
    ?.filteredAndSortedProducts, [filteredProductsAndMinMaxPrice]);
  const productAmount = filteredProductsAndMinMaxPrice?.productAmount;
  const pageAmount = filteredProductsAndMinMaxPrice?.pageAmount;

  const fetchUrl = searchParams.size ? `/getSubcategoryProducts/${categoryIdParam}/${subcategoryIdParam}?${searchParams.toString()}`
    : `/getSubcategoryProducts/${categoryIdParam}/${subcategoryIdParam}`;

  const getWindowWidth = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useLayoutEffect(() => {
    getWindowWidth();
  }, [getWindowWidth]);

  useOnResize(getWindowWidth);

  const [isProductCardsShort, setIsProductCardsShort] = useState(() => {
    const localStorageValue = localStorage.getItem('productCardAppearance');

    if (localStorageValue) {
      if (localStorageValue === 'short') return true;
      if (localStorageValue === 'long') return false;
    }

    return true;
  });

  // fetcher functions

  const initialDataFetch = useCallback(() => {
    if (productsFetcher.state === 'idle' && !productsFetcher.data) {
      setPrevFetchUrl(fetchUrl);

      productsFetcher.load(fetchUrl);
    }
  }, [productsFetcher, fetchUrl]);

  useEffect(initialDataFetch, [initialDataFetch]);

  const dataFetchByInteraction = useCallback(() => {
    if (prevFetchUrl !== fetchUrl) {
      setPrevFetchUrl(fetchUrl);

      productsFetcher.load(fetchUrl);
    }
  }, [prevFetchUrl, fetchUrl, productsFetcher]);

  useEffect(dataFetchByInteraction, [dataFetchByInteraction]);

  function updateDataFromFetch() {
    if (productsFetcher.data) {
      if (productsFetcher.data.categoryAndSubcategory !== categoryAndSubcategory) {
        setCategoryAndSubcategory(productsFetcher.data.categoryAndSubcategory);
      }

      if (productsFetcher.data.subcategoryFilters !== subcategoryFilters) {
        setSubcategoryFilters(productsFetcher.data.subcategoryFilters);
      }

      if (productsFetcher.data.filteredProductsAndMinMaxPrice !== filteredProductsAndMinMaxPrice) {
        setFilteredProductsAndMinMaxPrice(productsFetcher.data.filteredProductsAndMinMaxPrice);
      }
    }
  }

  updateDataFromFetch();

  // productCards setup

  const productCards = useMemo(() => (
    filteredAndSortedProducts?.map((p) => (
      <ProductCard
        key={p.id}
        name={p.name}
        categoryId={categoryId}
        subcategoryId={subcategoryId}
        productId={p.id}
        price={p.price}
        oldPrice={p.oldPrice}
        isShortCard={windowWidth <= 576 ? true : isProductCardsShort}
      />
    ))
  ), [filteredAndSortedProducts, categoryId, subcategoryId, windowWidth, isProductCardsShort]);

  // noproductsBlock setup

  const noProductsBlock = useMemo(() => {
    function deleteAllFiltersBtnOnClick() {
      const newSearchParams = Array.from(searchParams).filter(([name]) => (
        name === 'perView' || name === 'sortBy'
      ));
      setSearchParams(newSearchParams);
    }

    return (
      <div className={productsCls.noProductsBlock}>
        <div className={productsCls.noProductsContent}>
          <Line className={productsCls.noProductsLine} />
          <p className={classNames(
            textCls.text,
            textCls.textFw800,
            textCls.text48px,
            productsCls.noProductsText,
          )}
          >
            Товари не знайдено
          </p>
          <Button
            className={productsCls.resetButton}
            onClick={deleteAllFiltersBtnOnClick}
          >
            Видалити фільтри
          </Button>
        </div>
      </div>
    );
  }, [searchParams, setSearchParams]);

  // select setup objects

  const sortSelectOptions = useMemo(() => [
    {
      name: 'за замовчуванням',
      id: 'default',
    },
    {
      name: 'за назвою (А - Я)',
      id: 'name-A-Z',
    },
    {
      name: 'за назвою (Я - А)',
      id: 'name-Z-A',
    },
    {
      name: 'за ціною (зменшення)',
      id: 'price-down',
    },
    {
      name: 'за ціною (зростання)',
      id: 'price-up',
    },
  ], []);

  const viewSelectOptions = useMemo(() => [
    {
      name: '6',
      id: '6',
    },
    {
      name: '9',
      id: '9',
    },
    {
      name: '12',
      id: '12',
    },
  ], []);

  // event fuctions

  function shortCardBtnOnClick() {
    setIsProductCardsShort(true);
    localStorage.setItem('productCardAppearance', 'short');
  }

  function longCardBtnOnClick() {
    setIsProductCardsShort(false);
    localStorage.setItem('productCardAppearance', 'long');
  }

  return (
    <>
      <main className={classNames(containerCls.container, productsCls.main)}>
        <h1 className={classNames(
          textCls.text,
          textCls.textFw800,
          textCls.text48px,
          textCls.textBlack,
          productsCls.title,
        )}
        >
          {subcategoryName}
        </h1>
        <div className={productsCls.controlBlock}>
          <div className={productsCls.infoBlock}>
            {windowWidth <= 1024 && (
              <button
                ref={openFilterMenuBtnRef}
                type="button"
                className={productsCls.filterButton}
                aria-haspopup="dialog"
                aria-label="Відкрити меню фільтрів"
                onClick={() => setIsFilterMenuOpen(true)}
              >
                <FilterIcon className={productsCls.filterIcon} />
              </button>
            )}
            {windowWidth > 576 && (
              <p
                className={classNames(
                  textCls.text,
                  textCls.textBlack,
                  productsCls.productAmount,
                )}
                aria-atomic="true"
                aria-live="assertive"
              >
                Усього товарів:
                <span>
                  {productAmount !== undefined ? productAmount : 'Завантаження ...'}
                </span>
              </p>
            )}
          </div>
          <div className={productsCls.sortAndAppearanceBlock}>
            <Select
              label="Сортувати за"
              options={sortSelectOptions}
              defaultSelectedOptionId="default"
              searchParamName="sortBy"
            />
            <div className={productsCls.appearanceOptions}>
              <Select
                label="Показувати по"
                options={viewSelectOptions}
                defaultSelectedOptionId="12"
                searchParamName="perView"
              />
              {windowWidth > 576 && (
              <div className={productsCls.appearanceButtonBlock}>
                <button
                  className={classNames(
                    productsCls.iconButton,
                    isProductCardsShort && productsCls.iconButton_active,
                  )}
                  type="button"
                  onClick={shortCardBtnOnClick}
                  aria-label="Показувати маленькі карточки товарів"
                >
                  <CardsShortIcon className={productsCls.buttonIcon} />
                </button>
                <button
                  className={classNames(
                    productsCls.iconButton,
                    !isProductCardsShort && productsCls.iconButton_active,
                  )}
                  type="button"
                  onClick={longCardBtnOnClick}
                  aria-label="Показувати великі карточки товарів"
                >
                  <CardsLongIcon className={productsCls.buttonIcon} />
                </button>
              </div>
              )}
            </div>
          </div>
        </div>
        <div className={productsCls.filtersAndProducts}>
          {windowWidth > 1024 && (
            <FilterBlock
              subcategoryFilters={subcategoryFilters}
            />
          )}
          <div className={classNames(
            isProductCardsShort ? productsCls.products : productsCls.products_long,
            productsFetcher.state === 'loading' && productCards !== undefined && productsCls.products_inactive,
          )}
          >
            {windowWidth > 1024 && <AppliedFiltersBlock />}
            {productCards === undefined ? (
              <ThreeDotsSpinnerBlock blockClassName={productsCls.spinnerBlock} />
            ) : (productCards.length > 0 ? productCards : noProductsBlock)}
            <div className={productsCls.paginationBlock}>
              <PaginationBlock
                pageAmount={pageAmount}
              />
            </div>
          </div>
        </div>
      </main>
      {windowWidth <= 1024 && (
      <LeftSideMenu
        isMenuOpen={isFilterMenuOpen}
        setIsMenuOpen={setIsFilterMenuOpen}
        label="Меню фільтрів"
        openButton={openFilterMenuBtnRef.current}
      >
        <div className={productsCls.filterBlockInMenu}>
          <FilterBlock
            subcategoryFilters={subcategoryFilters}
          />
        </div>
      </LeftSideMenu>
      )}
    </>
  );
}
