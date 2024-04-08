import {
  useState, useMemo, useEffect, useCallback, Fragment, useRef,
} from 'react';
import { useFetcher } from 'react-router-dom';
import classNames from 'classnames';
import useFetcherLoad from '../../hooks/useFetcherLoad.jsx';
import ProductCard from '../ProductCard/ProductCard.jsx';
import containerCls from '../../scss/_container.module.scss';
import textCls from '../../scss/_text.module.scss';
import compareCls from './Compare.module.scss';
import CrossIcon from '../../assets/images/icons/cross.svg';
import BinIcon from '../../assets/images/icons/bin.svg';
import ChevronIcon from '../../assets/images/icons/chevronRight.svg';
import Line from '../../assets/images/icons/oblique.svg';
import ThreeDotsSpinnerBlock from '../common/ThreeDotsSpinnerBlock/ThreeDotsSpinnerBlock.jsx';

export default function Compare() {
  // const { compareSubcategoriesBtnInfo } = useLoaderData();
  const compareFetcher = useFetcher();
  const getCompareProductsFetcher = useFetcher();

  const productBlockRef = useRef();
  const specsTableRef = useRef();

  const [compareFetcherData, setCompareFetcherData] = useState(null);
  const [activeSubcategoryId, setActiveSubcategoryId] = useState(null);
  const [searchParamsString, setSearchParamsString] = useState(null);
  const [prevSearchParamsString, setPrevSearchParamsString] = useState(null);
  const [productCardObjs, setProductCardObjs] = useState(null);
  const [displayedSpecsType, setDisplayedSpecsType] = useState('all');

  // basic setup functions

  const initialActiveSubcategoryIdSetup = useCallback(() => {
    if (activeSubcategoryId === null && compareFetcherData) {
      setActiveSubcategoryId(compareFetcherData[0]?.subcategoryId);
    }
  }, [activeSubcategoryId, compareFetcherData]);

  useEffect(initialActiveSubcategoryIdSetup, [initialActiveSubcategoryIdSetup]);

  const activeSubcategoryBtnIndex = compareFetcherData
    ?.findIndex(({ subcategoryId }) => subcategoryId === activeSubcategoryId);
  const activeSubcategoryCategory = (
    compareFetcherData?.[activeSubcategoryBtnIndex]?.categoryId
  );

  const updateActiveSubcategoryId = useCallback(() => {
    if (!compareFetcherData) return;

    const isActiveSubcategoryStillExist = compareFetcherData
      .find(({ subcategoryId }) => subcategoryId === activeSubcategoryId);

    if (!isActiveSubcategoryStillExist && compareFetcherData) {
      setActiveSubcategoryId(compareFetcherData[0]?.subcategoryId);
    }
  }, [compareFetcherData, activeSubcategoryId]);

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
    if (productCardObjs?.length) {
      productBlockRef.current.scrollLeft = 0;
      specsTableRef.current.scrollLeft = 0;
    }
  }, [productCardObjs]);

  useEffect(resetScrollLeftOnNewCards, [resetScrollLeftOnNewCards]);

  // fetch functions

  useFetcherLoad(compareFetcher, '/compare');

  if (compareFetcher.data) {
    if (compareFetcher.data.compareSubcategoriesBtnInfo !== compareFetcherData) {
      setCompareFetcherData(compareFetcher.data.compareSubcategoriesBtnInfo);
    }
  }

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

      if (productCardObjs && productCardObjs.length === 0
        && compareProductsFromFetcher.length === 0) return;

      if (compareProductsFromFetcher !== productCardObjs) {
        setProductCardObjs(compareProductsFromFetcher);
      }
    }
  }

  updateProductCartObjs();

  function optimisticDeleteAllBtn() {
    if (compareFetcher.state === 'loading'
    && compareFetcher.formMethod === 'delete') {
      if (compareFetcherData !== null) {
        setCompareFetcherData(null);
        setProductCardObjs([]);
      }
    }
  }

  optimisticDeleteAllBtn();

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
      compareFetcherData[activeSubcategoryBtnIndex - 1].subcategoryId,
    );
  }

  function nextControlButtonOnClick() {
    setActiveSubcategoryId(
      compareFetcherData[activeSubcategoryBtnIndex + 1].subcategoryId,
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
    activeSubcategoryBtnIndex === (compareFetcherData ? compareFetcherData.length - 1 : null)
  );

  const subcategoryBtns = useMemo(() => (
    compareFetcherData?.map(({ categoryId, subcategoryId, subcategoryName }) => (
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
        aria-label={`Показати порівняння товарів з категорії ${subcategoryName}`}
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
          aria-label={`Видалити категорію ${subcategoryName} з порівняння`}
        >
          <CrossIcon
            className={compareCls.crossIcon}
          />
        </button>
        {subcategoryName}
      </div>
    ))
  ), [compareFetcherData, activeSubcategoryId, compareFetcher]);

  // setup product cards

  const productCards = useMemo(() => (
    productCardObjs?.map((pC) => (
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
    if (!productCardObjs || !productCardObjs.length) return;

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
          headers={name.split(' ').join('')}
          className={compareCls.valueCell}
        >
          {v}
        </td>
      ));

      return (
        <Fragment key={name}>
          <tr className={compareCls.specsTableHeaderRow}>
            <th
              id={name.split(' ').join('')}
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
      (productCardObjs?.length === 0 || !productCardObjs) && compareCls.main_marginBottom,
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
            Порівняння товарів
          </h1>
          {subcategoryBtns?.length > 0 && (
          <button
            type="button"
            className={compareCls.deleteBtn}
            onClick={deleteAllBtnOnClick}
            aria-label="Видалити все"
          >
            <BinIcon
              className={compareCls.binIcon}
            />
            Видалити все
          </button>
          )}
        </div>
        {subcategoryBtns?.length > 0 && (
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
              aria-label="Показати попередню категорію"
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
              aria-label="Показати наступну категорію"
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
        )}
        {productCardObjs && productCardObjs.length > 0 && (
        <>
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
                aria-label="Показати всі характеристики"
              >
                Усі характеристики
              </button>
              <button
                type="button"
                className={classNames(
                  compareCls.specsControlBtn,
                  displayedSpecsType === 'similar' && compareCls.specsControlBtn_active,
                )}
                onClick={() => setDisplayedSpecsType('similar')}
                aria-label="Показати характеристики, що сходяться"
              >
                Однакові
              </button>
              <button
                type="button"
                className={classNames(
                  compareCls.specsControlBtn,
                  displayedSpecsType === 'differ' && compareCls.specsControlBtn_active,
                )}
                onClick={() => setDisplayedSpecsType('differ')}
                aria-label="Показати характеристики, які відрізняються"
              >
                Різні
              </button>
            </div>
          </div>
        </>
        )}
        {!productCardObjs && (
          <ThreeDotsSpinnerBlock />
        )}
        {productCardObjs && productCardObjs.length === 0 && (
          <div className={compareCls.noProductBlock}>
            <div className={compareCls.noProductContent}>
              <Line className={compareCls.noProductLine} />
              <p className={classNames(
                textCls.text,
                textCls.textFw800,
                textCls.text32px,
                compareCls.noProductText,
              )}
              >
                Немає товарів для порівняння
              </p>
              <p className={classNames(
                textCls.text,
                textCls.text24px,
                textCls.textGrey,
              )}
              >
                Наші товари унікальні, але не настільки!
              </p>
            </div>
          </div>
        )}
      </div>
      {productCardObjs && productCardObjs.length > 0 && (
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
