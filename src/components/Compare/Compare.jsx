import {
  useState, useMemo, useEffect, useCallback, Fragment, useRef,
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

  const productBlockRef = useRef();
  const specsTableRef = useRef();

  const [activeSubcategoryId, setActiveSubcategoryId] = useState(() => (
    compareSubcategoriesBtnInfo[0]?.subcategoryId
  ));
  const [searchParamsString, setSearchParamsString] = useState(null);
  const [prevSearchParamsString, setPrevSearchParamsString] = useState(null);
  const [productCardObjs, setProductCardObjs] = useState([]);
  const [displayedSpecsType, setDisplayedSpecsType] = useState('all');

  // basic setup functions

  const activeSubcategoryBtnIndex = compareSubcategoriesBtnInfo
    .findIndex(({ subcategoryId }) => subcategoryId === activeSubcategoryId);
  const activeSubcategoryCategory = (
    compareSubcategoriesBtnInfo[activeSubcategoryBtnIndex]?.categoryId
  );

  const updateActiveSubcategoryId = useCallback(() => {
    const isActiveSubcategoryStillExist = compareSubcategoriesBtnInfo
      .find(({ subcategoryId }) => subcategoryId === activeSubcategoryId);

    if (!isActiveSubcategoryStillExist && compareSubcategoriesBtnInfo) {
      setActiveSubcategoryId(compareSubcategoriesBtnInfo[0]?.subcategoryId);
    }
  }, [compareSubcategoriesBtnInfo, activeSubcategoryId]);

  useEffect(updateActiveSubcategoryId, [updateActiveSubcategoryId]);

  function setupSearchParamsString() {
    if (activeSubcategoryId !== null) {
      const newSearchParamsString = new URLSearchParams({
        categoryId: activeSubcategoryCategory,
        subcategoryId: activeSubcategoryId,
      }).toString();

      if (newSearchParamsString !== searchParamsString) {
        setSearchParamsString(newSearchParamsString);
      }

      if (prevSearchParamsString === null) {
        setPrevSearchParamsString(newSearchParamsString);
      }
    }
  }

  setupSearchParamsString();

  const resetScrollLeftOnNewCards = useCallback(() => {
    if (productCardObjs.length) {
      productBlockRef.current.scrollLeft = 0;
      specsTableRef.current.scrollLeft = 0;
    }
  }, [productCardObjs]);

  useEffect(resetScrollLeftOnNewCards, [resetScrollLeftOnNewCards]);

  // fetch functions

  const initialRequestCompareProducts = useCallback(() => {
    if (getCompareProductsFetcher.state === 'idle' && !getCompareProductsFetcher.data
      && searchParamsString !== null) {
      const action = `/getCompareProducts?${searchParamsString}`;

      getCompareProductsFetcher.load(action);
    }
  }, [getCompareProductsFetcher, searchParamsString]);

  useEffect(initialRequestCompareProducts, [initialRequestCompareProducts]);

  const requestCompareProducts = useCallback(() => {
    if (prevSearchParamsString !== searchParamsString) {
      setPrevSearchParamsString(searchParamsString);

      const action = `/getCompareProducts?${searchParamsString}`;

      getCompareProductsFetcher.load(action);
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

  function productBlockOnScroll() {
    const productBlock = productBlockRef.current;
    const specsTable = specsTableRef.current;

    specsTable.scrollLeft = productBlock.scrollLeft;
  }

  function specsTableOnScroll() {
    const productBlock = productBlockRef.current;
    const specsTable = specsTableRef.current;

    productBlock.scrollLeft = specsTable.scrollLeft;
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
      <div
        key={pC.product.id}
        className={compareCls.productCard}
      >
        <ProductCard
          name={pC.product.name}
          categoryId={pC.categoryId}
          subcategoryId={pC.subcategoryId}
          productId={pC.product.id}
          price={pC.product.price}
          oldPrice={pC.product.oldPrice}
          isShortCard
        />
      </div>
    ))
  ), [productCardObjs]);

  // setup specs

  const allSpecFilterNames = useMemo(() => {
    if (!productCardObjs.length) return;

    const filters = new Set();

    productCardObjs.forEach(({ product }) => {
      const specsFilters = product['specs-filters'];

      Object.entries(specsFilters).forEach(([name]) => filters.add(name));
    });

    return Array.from(filters).sort((a, b) => a.localeCompare(b));
  }, [productCardObjs]);

  const allSpecFilterNamesAndValues = useMemo(() => {
    if (!allSpecFilterNames) return;

    const nameAndValues = {};

    allSpecFilterNames.forEach((n) => { nameAndValues[n] = []; });

    productCardObjs.forEach(({ product }) => {
      const productSpecsFilters = product['specs-filters'];

      allSpecFilterNames.forEach((name) => {
        let productSpecFilterValue = productSpecsFilters[name];

        if (productSpecFilterValue === undefined) {
          productSpecFilterValue = '-';
        }

        if (typeof productSpecFilterValue === 'object') {
          productSpecFilterValue = productSpecFilterValue.sort((a, b) => a.localeCompare(b)).join(', ');
        }

        nameAndValues[name].push(productSpecFilterValue);
      });
    });

    return nameAndValues;
  }, [productCardObjs, allSpecFilterNames]);

  const sortedSpecFilterNameAndValue = useMemo(() => {
    if (!allSpecFilterNamesAndValues) return;
    let sortedNameAndValue;

    if (displayedSpecsType === 'all') {
      sortedNameAndValue = allSpecFilterNamesAndValues;
    } else if (displayedSpecsType === 'similar') {
      const result = {};

      Object.entries(allSpecFilterNamesAndValues).forEach(([name, value]) => {
        const firstValue = value[0];

        let allSimilar = true;

        value.slice(1).forEach((v) => {
          if (v !== firstValue) allSimilar = false;
        });

        if (allSimilar) result[name] = value;
      });

      sortedNameAndValue = result;
    } else if (displayedSpecsType === 'differ') {
      const result = {};

      Object.entries(allSpecFilterNamesAndValues).forEach(([name, value]) => {
        const firstValue = value[0];

        let notSimilar = false;

        value.slice(1).forEach((v) => {
          if (v !== firstValue) notSimilar = true;
        });

        if (notSimilar) result[name] = value;
      });

      sortedNameAndValue = result;
    }

    return sortedNameAndValue;
  }, [allSpecFilterNamesAndValues, displayedSpecsType]);

  const tableRows = useMemo(() => {
    if (!sortedSpecFilterNameAndValue) return;

    const productIds = productCardObjs.map(({ product }) => product.id);

    const rows = Object.entries(sortedSpecFilterNameAndValue).map(([name, value]) => {
      const cells = value.map((v, i) => (
        <td
          key={productIds[i]}
          headers={name}
          className={compareCls.valueCell}
        >
          {v}
        </td>
      ));

      return (
        <Fragment key={name}>
          <tr className={compareCls.specsTableHeaderRow}>
            <th
              id={name}
              className={compareCls.specsTableTh}
            >
              {name}
            </th>
          </tr>
          <tr className={compareCls.specsValueRow}>
            {cells}
          </tr>
        </Fragment>
      );
    });

    return rows;
  }, [sortedSpecFilterNameAndValue, productCardObjs]);

  return (
    <main className={classNames(
      compareCls.main,
      productCardObjs.length === 0 && compareCls.main_marginBottom,
    )}
    >
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
        {productCardObjs.length > 0 && (
        <>
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
                disabled={isPrevControlBtnDisabled}
                aria-disabled={isPrevControlBtnDisabled}
                tabIndex={isPrevControlBtnDisabled ? -1 : 0}
                aria-label="Показать предыдущую категорию"
              >
                <ChevronIcon className={compareCls.chevronIcon} />
              </button>
              <button
                type="button"
                className={classNames(
                  compareCls.controlButton,
                  isNextControlBtnDisabled && compareCls.controlButton_disabled,
                )}
                onClick={nextControlButtonOnClick}
                disabled={isNextControlBtnDisabled}
                aria-disabled={isNextControlBtnDisabled}
                tabIndex={isNextControlBtnDisabled ? -1 : 0}
                aria-label="Показать следующую категорию"
              >
                <ChevronIcon className={classNames(
                  compareCls.chevronIcon,
                  compareCls.chevronIcon_next,
                )}
                />
              </button>
            </div>
            )}
          </div>
          <div
            ref={productBlockRef}
            className={compareCls.productBlock}
            onScroll={productBlockOnScroll}
          >
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
                  displayedSpecsType === 'all' && compareCls.specsControlBtn_active,
                )}
                onClick={() => setDisplayedSpecsType('all')}
              >
                Все характеристики
              </button>
              <button
                type="button"
                className={classNames(
                  compareCls.specsControlBtn,
                  displayedSpecsType === 'similar' && compareCls.specsControlBtn_active,
                )}
                onClick={() => setDisplayedSpecsType('similar')}
              >
                Сходства
              </button>
              <button
                type="button"
                className={classNames(
                  compareCls.specsControlBtn,
                  displayedSpecsType === 'differ' && compareCls.specsControlBtn_active,
                )}
                onClick={() => setDisplayedSpecsType('differ')}
              >
                Отличия
              </button>
            </div>
          </div>
        </>
        )}
      </div>
      {productCardObjs.length > 0 && (
        <div className={classNames(
          containerCls.container,
          compareCls.specsBlock,
        )}
        >
          <table
            ref={specsTableRef}
            className={compareCls.specsTable}
            onScroll={specsTableOnScroll}
          >
            <tbody
              className={compareCls.specsTableTBody}
            >
              {tableRows}
            </tbody>
          </table>
        </div>
      )}
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
