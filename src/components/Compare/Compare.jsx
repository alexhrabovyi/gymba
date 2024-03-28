import {
  useState, useMemo, useEffect, useCallback,
} from 'react';
import { useFetcher, useLoaderData } from 'react-router-dom';
import classNames from 'classnames';
import ProductCard from '../ProductCard/ProductCard.jsx';
import containerCls from '../../scss/_container.module.scss';
import textCls from '../../scss/_text.module.scss';
import compareCls from './Compare.module.scss';
import CrossIcon from '../../assets/images/icons/cross.svg';
import BinIcon from '../../assets/images/icons/bin.svg';
import ChevronIcon from '../../assets/images/icons/chevronRight.svg';

export default function Compare() {
  const { compareSubcategoriesBtnInfo } = useLoaderData();
  const compareFetcher = useFetcher();
  const getCompareProductsFetcher = useFetcher();

  const [activeSubcategoryId, setActiveSubcategoryId] = useState(
    () => compareSubcategoriesBtnInfo[0]?.subcategoryId,
  );
  const [searchParamsString, setSearchParamsString] = useState(null);
  const [prevSearchParamsString, setPrevSearchParamsString] = useState(null);
  const [productCardObjs, setProductCardObjs] = useState([]);

  // basic setup functions

  const activeSubcategoryBtnIndex = compareSubcategoriesBtnInfo
    .findIndex(({ subcategoryId }) => subcategoryId === activeSubcategoryId);
  const activeSubcategoryCategory = (
    compareSubcategoriesBtnInfo[activeSubcategoryBtnIndex].categoryId
  );

  function setupSearchParamsString() {
    const newSearchParamsString = new URLSearchParams({
      categoryId: activeSubcategoryCategory,
      subcategoryId: activeSubcategoryId,
    }).toString();

    if (newSearchParamsString !== searchParamsString) {
      setSearchParamsString(newSearchParamsString);
    }
  }

  setupSearchParamsString();

  // fetch functions
  const requestCompareProducts = useCallback(() => {
    if (prevSearchParamsString !== searchParamsString) {
      const action = `/getCompareProducts?${searchParamsString}`;

      getCompareProductsFetcher.load(action);

      setPrevSearchParamsString(searchParamsString);
    }
  }, [prevSearchParamsString, searchParamsString, getCompareProductsFetcher]);

  useEffect(requestCompareProducts, [requestCompareProducts]);

  function updateProductCartObjs() {
    if (getCompareProductsFetcher.data) {
      const compareProductsFromFetcher = getCompareProductsFetcher.data.productCards;

      if (compareProductsFromFetcher !== productCardObjs) {
        setProductCardObjs(compareProductsFromFetcher);
      }
    }
  }

  updateProductCartObjs();

  // event handler functions

  function deleteAllBtnOnClick() {
    const data = JSON.stringify('');

    compareFetcher.submit(data, {
      method: 'DELETE',
      encType: 'application/json',
    });
  }

  function prevControlButtonOnClick() {
    setActiveSubcategoryId(
      compareSubcategoriesBtnInfo[activeSubcategoryBtnIndex - 1].subcategoryId,
    );
  }

  function nextControlButtonOnClick() {
    setActiveSubcategoryId(
      compareSubcategoriesBtnInfo[activeSubcategoryBtnIndex + 1].subcategoryId,
    );
  }

  // setup subcategory buttons and control buttons

  const isPrevControlBtnDisabled = activeSubcategoryBtnIndex === 0;
  const isNextControlBtnDisabled = (
    activeSubcategoryBtnIndex === compareSubcategoriesBtnInfo.length - 1
  );

  const subcategoryBtns = useMemo(() => (
    compareSubcategoriesBtnInfo.map(({ categoryId, subcategoryId, subcategoryName }) => (
      <div
        key={subcategoryId}
        className={classNames(
          compareCls.subcategoryBtn,
          activeSubcategoryId === subcategoryId && compareCls.subcategoryBtn_active,
        )}
        id={`${categoryId}${subcategoryId}`}
        role="button"
        onClick={(e) => {
          if (e.target.id === `${categoryId}${subcategoryId}`) {
            setActiveSubcategoryId(subcategoryId);
          }
        }}
        tabIndex="0"
        aria-label={`Показать сравнения товаров из категории ${subcategoryName}`}
        aria-pressed={activeSubcategoryId === subcategoryId}
      >
        <button
          type="button"
          className={compareCls.deleteSubcBtn}
          onClick={() => {
            const data = JSON.stringify([categoryId, subcategoryId]);

            compareFetcher.submit(data, {
              method: 'DELETE',
              encType: 'application/json',
            });
          }}
          aria-label={`Удалить категорию ${subcategoryName} из сравнения`}
        >
          <CrossIcon
            className={compareCls.crossIcon}
          />
        </button>
        {subcategoryName}
      </div>
    ))
  ), [compareSubcategoriesBtnInfo, activeSubcategoryId, compareFetcher]);

  // setup product cards

  const productCards = useMemo(() => (
    productCardObjs.map((pC) => (
      <ProductCard
        key={pC.product.id}
        name={pC.product.name}
        categoryId={pC.categoryId}
        subcategoryId={pC.subcategoryId}
        productId={pC.product.id}
        price={pC.product.price}
        oldPrice={pC.product.oldPrice}
        isShortCard
      />
    ))
  ), [productCardObjs]);

  // setup specs

  const allSpecsFilters = useMemo(() => {
    if (!productCardObjs.length) return;

    const filters = new Set();

    productCardObjs.forEach(({ product }) => {
      const specsFilters = product['specs-filters'];

      Object.entries(specsFilters).forEach(([name]) => filters.add(name));
    });

    return Array.from(filters).sort((a, b) => a.localeCompare(b));
  }, [productCardObjs]);

  return (
    <main className={compareCls.main}>
      <div className={classNames(
        containerCls.container,
        compareCls.controlAndProductBlock,
      )}
      >
        <div className={compareCls.titleAndButtonBlock}>
          <h1
            className={classNames(
              textCls.text,
              textCls.textFw800,
              textCls.text48px,
              textCls.textBlack,
              compareCls.title,
            )}
          >
            Сравнение товаров
          </h1>
          {!!compareSubcategoriesBtnInfo.length && (
          <button
            type="button"
            className={compareCls.deleteBtn}
            onClick={deleteAllBtnOnClick}
          >
            <BinIcon
              className={compareCls.binIcon}
            />
            Удалить все
          </button>
          )}
        </div>
        <div className={compareCls.subcategoryBtnAndControlBtnBlock}>
          <div className={compareCls.subcategoryBtnBlock}>
            {subcategoryBtns}
          </div>
          {subcategoryBtns.length > 1 && (
          <div className={compareCls.controlBtnBlock}>
            <button
              type="button"
              className={classNames(
                compareCls.controlButton,
                isPrevControlBtnDisabled && compareCls.controlButton_disabled,
              )}
              onClick={prevControlButtonOnClick}
              aria-label="Показать предыдущую категорию"
            >
              <ChevronIcon className={classNames(
                compareCls.chevronIcon,
                compareCls.chevronIcon_prev,
              )}
              />
            </button>
            <button
              type="button"
              className={classNames(
                compareCls.controlButton,
                isNextControlBtnDisabled && compareCls.controlButton_disabled,
              )}
              onClick={nextControlButtonOnClick}
              aria-label="Показать следующую категорию"
            >
              <ChevronIcon className={compareCls.chevronIcon} />
            </button>
          </div>
          )}
        </div>
        <div className={compareCls.productBlock}>
          {productCards}
        </div>
        <div className={compareCls.specsTitleAndControlBtnBlock}>
          <h2 className={classNames(
            textCls.text,
            textCls.textFw800,
            textCls.text24px,
            textCls.textBlack,
            compareCls.subtitle,
          )}
          >
            Характеристики
          </h2>
          <div className={compareCls.specsControlBtnBlock}>
            <button
              type="button"
              className={classNames(
                compareCls.specsControlBtn,
                compareCls.specsControlBtn_active,
              )}
            >
              Все характеристики
            </button>
            <button
              type="button"
              className={classNames(
                compareCls.specsControlBtn,
                compareCls.specsControlBtn_active,
              )}
            >
              Сходства
            </button>
            <button
              type="button"
              className={classNames(
                compareCls.specsControlBtn,
                compareCls.specsControlBtn_active,
              )}
            >
              Отличия
            </button>
          </div>
        </div>
      </div>
      <div className={classNames(
        containerCls.container,
        compareCls.specsBlock,
      )}
      >
        
      </div>
    </main>
  );
}

// localStorage.setItem('compareIds', JSON.stringify([
//   ["enamels", "alkyd_enamels", "emal-alkidnaya-pf-116-akvarel-zebra-811-belyy-mat-2-8-kg"],
//   ['enamels', 'acrylic_enamels', 'test'],
//   ['enamels', 'nitro_enamels', 'test'],
//   ['enamels', 'oil_paints', 'test'],
//   ['enamels', 'soils_gf_ge', 'test'],
//   ['paints', 'waterdispersion_paints', 'test'],
//   ['wood_protection', 'for_wood', 'test'],
//   ['foams_sealants_glue', 'foams', 'test'],
// ]));
