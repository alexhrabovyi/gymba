import {
  useState, useCallback, useLayoutEffect, useMemo, useRef,
} from 'react';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import containerCls from '../../scss/_container.module.scss';
import textCls from '../../scss/_text.module.scss';
import productsCls from './Products.module.scss';
import Select from './Select/Select.jsx';
import FilterBlock from './FilterBlock/FilterBlock.jsx';
import AppliedFiltersBlock from './AppliedFiltersBlock/AppliedFiltersBlock.jsx';
import ProductCard from './ProductCard/ProductCard.jsx';
import PaginationBlock from './PaginationBlock/PaginationBlock.jsx';
import LeftSideMenu from '../common/LeftSideMenu/LeftSideMenu.jsx';
import CardsShortIcon from './images/productCardsShort.svg';
import CardsLongIcon from './images/productCardsLong.svg';
import FilterIcon from './images/filter.svg';
import Line from '../../assets/images/icons/oblique.svg';
import Button from '../common/Button/Button.jsx';
import useOnResize from '../../hooks/useOnResize.jsx';

export default function Products() {
  const {
    categoryId,
    subcategoryName,
    subcategoryId,
    filteredAndSortedProducts,
    productAmount,
    pageAmount,
  } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const openFilterMenuBtnRef = useRef();

  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState();

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

  const productCards = filteredAndSortedProducts.map((p) => (
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
  ));

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
              className={classNames(textCls.text, textCls.textBlack)}
              aria-atomic="true"
              aria-live="assertive"
            >
              Всего товаров:
              <span>
                {` ${productAmount}`}
              </span>
            </p>
            )}
          </div>
          <div className={productsCls.sortAndAppearanceBlock}>
            <Select
              label="Сортировать по"
              options={sortSelectOptions}
              defaultSelectedOptionId="default"
              searchParamName="sortBy"
            />
            <div className={productsCls.appearanceOptions}>
              <Select
                label="Показывать по"
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
                  onClick={() => {
                    setIsProductCardsShort(true);
                    localStorage.setItem('productCardAppearance', 'short');
                  }}
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
                  onClick={() => {
                    setIsProductCardsShort(false);
                    localStorage.setItem('productCardAppearance', 'long');
                  }}
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
          {windowWidth > 1024 && <FilterBlock />}
          <div
            className={isProductCardsShort ? productsCls.products : productsCls.products_long}
          >
            {windowWidth > 1024 && <AppliedFiltersBlock />}
            {productCards.length ? productCards : (
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
                    Товары не найдены
                  </p>
                  <Button
                    className={productsCls.resetButton}
                    onClick={() => {
                      const newSearchParams = Array.from(searchParams).filter(([name]) => (
                        name === 'perView' || name === 'sortBy'
                      ));
                      setSearchParams(newSearchParams);
                    }}
                  >
                    Сбросить фильтры
                  </Button>
                </div>
              </div>
            )}
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
          <FilterBlock />
        </div>
      </LeftSideMenu>
      )}
    </>
  );
}
