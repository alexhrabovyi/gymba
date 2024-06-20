/* eslint-disable react/jsx-no-bind */
import {
  useState, useCallback, useLayoutEffect, useMemo, useRef,
} from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useGetCategoriesQuery, useGetProductsQuery } from '../../queryAPI/queryAPI';
import useOnResize from '../../hooks/useOnResize';
import containerCls from '../../scss/_container.module.scss';
import textCls from '../../scss/_text.module.scss';
import productsCls from './Products.module.scss';
import Select from './Select/Select';
import FilterBlock from './FilterBlock/FilterBlock';
import AppliedFiltersBlock from './AppliedFiltersBlock/AppliedFiltersBlock';
import ThreeDotsSpinnerBlock from '../common/ThreeDotsSpinnerBlock/ThreeDotsSpinnerBlock';
import ProductCard from '../ProductCard/ProductCard';
import PaginationBlock from '../PaginationBlock/PaginationBlock';
import LeftSideMenu from '../common/LeftSideMenu/LeftSideMenu';
import CardsShortIcon from './images/productCardsShort.svg';
import CardsLongIcon from './images/productCardsLong.svg';
import FilterIcon from './images/filter.svg';
import Line from '../../assets/images/icons/oblique.svg';
import Button from '../common/Button/Button';
import { CategoryShort, FilteredProductsAndMinMaxPrice, Filters } from '../../utils/dataAPI';

export default function Products() {
  interface PrevCategoryAndSubcategoryType {
    categoryId: string,
    subcategoryId: string,
  }

  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();

  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const openFilterMenuBtnRef = useRef<HTMLButtonElement | null>(null);

  const [category, setCategory] = useState<CategoryShort | null>(null);
  const [subcategoryFilters, setSubcategoryFilters] = useState<Filters | null>(null);
  const [
    productsAndInfo, setProductsAndInfo,
  ] = useState<FilteredProductsAndMinMaxPrice | null>(null);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [
    prevCategoryAndSubcategory, setPrevCategoryAndSubcategory,
  ] = useState<PrevCategoryAndSubcategoryType | null>(null);

  // setup functions

  const categoryId = params.categoryId as string;
  const subcategoryId = params.subcategoryId as string;

  const subcategoryName = category?.subcategories.entities[subcategoryId as string]?.name;

  const filteredAndSortedProducts = useMemo(() => productsAndInfo
    ?.filteredAndSortedProducts, [productsAndInfo]);
  const productAmount = productsAndInfo?.productAmount;
  const pageAmount = productsAndInfo?.pageAmount;

  const fetchUrl = Array.from(searchParams).length ? `${categoryId}/${subcategoryId}?${searchParams.toString()}`
    : `${categoryId}/${subcategoryId}`;

  const getWindowWidth = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useLayoutEffect(() => {
    getWindowWidth();
  }, [getWindowWidth]);

  useOnResize(getWindowWidth);

  const [isProductCardsShort, setIsProductCardsShort] = useState<boolean>(() => {
    const localStorageValue = localStorage.getItem('productCardAppearance');

    if (localStorageValue) {
      if (localStorageValue === 'short') return true;
      if (localStorageValue === 'long') return false;
    }

    return true;
  });

  // fetcher functions

  const { data: fetchedCategories } = useGetCategoriesQuery();

  if (fetchedCategories) {
    if (fetchedCategories.entities[categoryId!] !== category) {
      setCategory(fetchedCategories.entities[categoryId!]);
    }
  }

  const {
    data: fetchedProductsAndFilters,
    isLoading: isProductsLoading,
    isFetching: isProductsFetching,
    status: productsFetchingStatus,
  } = useGetProductsQuery(fetchUrl);

  if (fetchedProductsAndFilters && productsFetchingStatus === 'fulfilled') {
    if (!prevCategoryAndSubcategory
      || prevCategoryAndSubcategory.categoryId !== categoryId
      || prevCategoryAndSubcategory.subcategoryId !== subcategoryId
    ) {
      setPrevCategoryAndSubcategory({
        categoryId,
        subcategoryId,
      });
      setSubcategoryFilters(fetchedProductsAndFilters.subcategoryFilters);
    }

    if (productsAndInfo !== fetchedProductsAndFilters) {
      setProductsAndInfo(fetchedProductsAndFilters);
    }
  } else if (productsFetchingStatus === 'rejected') {
    throw new Response(null, { status: 404, statusText: 'Not found' });
  }

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
      name: 'замовчуванням',
      id: 'default',
    },
    {
      name: 'назвою (А - Я)',
      id: 'name-A-Z',
    },
    {
      name: 'назвою (Я - А)',
      id: 'name-Z-A',
    },
    {
      name: 'ціною (зменшення)',
      id: 'price-down',
    },
    {
      name: 'ціною (зростання)',
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
        <h1
          className={classNames(
            textCls.text,
            textCls.textFw800,
            textCls.text48px,
            textCls.textBlack,
            productsCls.title,
          )}
          ref={titleRef}
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
                  {!isProductsLoading ? productAmount : 'Завантаження ...'}
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
              isFetching={isProductsFetching}
            />
          )}
          <div className={classNames(
            isProductCardsShort ? productsCls.products : productsCls.products_long,
            isProductsFetching && !isProductsLoading && productsCls.products_inactive,
          )}
          >
            {windowWidth > 1024 && <AppliedFiltersBlock />}
            {productCards === undefined ? (
              <ThreeDotsSpinnerBlock blockClassName={productsCls.spinnerBlock} />
            ) : (productCards.length > 0 ? productCards : noProductsBlock)}
            <div className={productsCls.paginationBlock}>
              <PaginationBlock
                elemToScrollRef={titleRef}
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
          id="filterBlockMenu"
        >
          <div className={productsCls.filterBlockInMenu}>
            <FilterBlock
              subcategoryFilters={subcategoryFilters}
              isFetching={isProductsFetching}
            />
          </div>
        </LeftSideMenu>
      )}
    </>
  );
}
