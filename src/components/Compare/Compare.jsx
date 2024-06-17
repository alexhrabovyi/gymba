import {
  useState, useMemo, useEffect, useCallback, Fragment, useRef,
} from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import {
  queryAPI,
  useGetCompareSubcategoriesQuery,
  useGetCompareProductsQuery,
  useDeleteCompareSubcategoryMutation,
} from '../../queryAPI/queryAPI';
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
  const dispatch = useDispatch();

  const productBlockRef = useRef();
  const specsTableRef = useRef();

  const [compareSubcategories, setCompareSubcategories] = useState(null);
  const [activeSubcategoryId, setActiveSubcategoryId] = useState(null);
  const [previousSubcategoryId, setPreviousSubcategoryId] = useState(null);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [productObjs, setProductObjs] = useState(null);
  const [displayedSpecsType, setDisplayedSpecsType] = useState('all');

  const [deleteSubcategoryRequest] = useDeleteCompareSubcategoryMutation();

  // basic setup functions

  const activeSubcategoryBtnIndex = activeSubcategoryId ? compareSubcategories
    ?.findIndex(({ subcategoryId }) => subcategoryId === activeSubcategoryId) : null;

  function initialActiveSubcategoryIdSetup() {
    if (activeSubcategoryId === null && compareSubcategories?.length) {
      setActiveSubcategoryId(compareSubcategories[0]?.subcategoryId);
    }
  }

  initialActiveSubcategoryIdSetup();

  function updateActiveCategoryId() {
    if (previousSubcategoryId !== activeSubcategoryId) {
      setPreviousSubcategoryId(activeSubcategoryId);
      setActiveCategoryId(compareSubcategories[activeSubcategoryBtnIndex].categoryId);
    }
  }

  updateActiveCategoryId();

  function updateActiveSubcategoryIdOnDelete() {
    if (!compareSubcategories || !compareSubcategories?.length) return;

    const isActiveSubcategoryStillExist = compareSubcategories
      ?.find(({ subcategoryId }) => subcategoryId === activeSubcategoryId);

    if (!isActiveSubcategoryStillExist) {
      setActiveSubcategoryId(compareSubcategories[0]?.subcategoryId);
    }
  }

  updateActiveSubcategoryIdOnDelete();

  const resetScrollLeftOnNewCards = useCallback(() => {
    if (productObjs?.length) {
      productBlockRef.current.scrollLeft = 0;
      specsTableRef.current.scrollLeft = 0;
    }
  }, [productObjs]);

  useEffect(resetScrollLeftOnNewCards, [resetScrollLeftOnNewCards]);

  const isFetchingProductsForAnotherSubcategory = productObjs
    ?.[0]?.subcategoryId !== activeSubcategoryId;

  // fetch functions

  const { data: fetchedCompareSubcategories } = useGetCompareSubcategoriesQuery();

  if (fetchedCompareSubcategories) {
    if (compareSubcategories !== fetchedCompareSubcategories) {
      setCompareSubcategories(fetchedCompareSubcategories);
    }
  }

  const shouldSkip = !activeSubcategoryId;
  const requestObj = useMemo(() => ({
    categoryId: activeCategoryId,
    subcategoryId: activeSubcategoryId,
  }), [activeCategoryId, activeSubcategoryId]);

  const { data: fetchedProducts } = useGetCompareProductsQuery(requestObj, { skip: shouldSkip });

  if (fetchedProducts) {
    if (productObjs !== fetchedProducts) {
      setProductObjs(fetchedProducts);
    }
  }

  // event handler functions

  const productOnAddDeleteButton = useCallback((categoryId, subcategoryId, productId) => {
    const shouldDeleteSubcategory = productObjs.length === 1;

    dispatch(queryAPI.util.updateQueryData('getCompareProducts', requestObj, (draft) => {
      const index = draft.findIndex((pObj) => (pObj.categoryId === categoryId
        && pObj.subcategoryId === subcategoryId
        && pObj.product.id === productId));

      draft.splice(index, 1);
    }));

    if (shouldDeleteSubcategory) {
      dispatch(queryAPI.util.updateQueryData('getCompareSubcategories', undefined, (draft) => {
        const index = draft.findIndex((subC) => (subC.categoryId === categoryId
          && subC.subcategoryId === subcategoryId));

        draft.splice(index, 1);
      }));
    }
  }, [productObjs, dispatch, requestObj]);

  function deleteAllBtnOnClick() {
    const data = JSON.stringify({ deleteAll: true });

    deleteSubcategoryRequest(data);

    dispatch(queryAPI.util.updateQueryData('getCompareProducts', requestObj, (draft) => {
      draft.splice(0);
    }));
  }

  function prevControlButtonOnClick() {
    setActiveSubcategoryId(
      compareSubcategories[activeSubcategoryBtnIndex - 1].subcategoryId,
    );
  }

  function nextControlButtonOnClick() {
    setActiveSubcategoryId(
      compareSubcategories[activeSubcategoryBtnIndex + 1].subcategoryId,
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
    activeSubcategoryBtnIndex === (compareSubcategories ? compareSubcategories.length - 1 : null)
  );

  const subcategoryBtns = useMemo(() => (
    compareSubcategories?.map(({ categoryId, subcategoryId, subcategoryName }) => (
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

            deleteSubcategoryRequest(data);

            if (compareSubcategories.length === 1) {
              dispatch(queryAPI.util.updateQueryData('getCompareProducts', requestObj, (draft) => {
                draft.splice(0);
              }));
            }
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
  ), [compareSubcategories, activeSubcategoryId, deleteSubcategoryRequest, dispatch, requestObj]);

  // setup product cards

  const productCards = useMemo(() => (
    productObjs?.map((pC) => (
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
          compareMutationFunc={productOnAddDeleteButton}
        />
      </div>
    ))
  ), [productObjs, productOnAddDeleteButton]);

  // setup specs

  const allSpecFilterNames = useMemo(() => {
    if (!productObjs || !productObjs.length) return;

    const filters = new Set();

    productObjs.forEach(({ product }) => {
      const specsFilters = product['specs-filters'];

      Object.entries(specsFilters).forEach(([name]) => filters.add(name));
    });

    return Array.from(filters).sort((a, b) => a.localeCompare(b));
  }, [productObjs]);

  const allSpecFilterNamesAndValues = useMemo(() => {
    if (!allSpecFilterNames) return;

    const nameAndValues = {};

    allSpecFilterNames.forEach((n) => { nameAndValues[n] = []; });

    productObjs.forEach(({ product }) => {
      const productSpecsFilters = product['specs-filters'];

      allSpecFilterNames.forEach((name) => {
        let productSpecFilterValue = productSpecsFilters[name];

        if (productSpecFilterValue === undefined) {
          productSpecFilterValue = '-';
        }

        if (typeof productSpecFilterValue === 'object') {
          productSpecFilterValue = productSpecFilterValue.slice().sort((a, b) => a.localeCompare(b)).join(', ');
        }

        nameAndValues[name].push(productSpecFilterValue);
      });
    });

    return nameAndValues;
  }, [productObjs, allSpecFilterNames]);

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

    const productIds = productObjs.map(({ product }) => product.id);

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
  }, [sortedSpecFilterNameAndValue, productObjs]);

  return (
    <main className={classNames(
      compareCls.main,
      (!productObjs || productObjs?.length === 0) && compareCls.main_marginBottom,
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
        {productObjs && productObjs.length > 0 && (
        <>
          <div
            ref={productBlockRef}
            className={classNames(
              compareCls.productBlock,
              isFetchingProductsForAnotherSubcategory && compareCls.productBlock_inactive,
            )}
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
        {!productObjs && (!compareSubcategories || compareSubcategories?.length !== 0) && (
          <ThreeDotsSpinnerBlock />
        )}
        {(productObjs?.length === 0 || compareSubcategories?.length === 0) && (
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
      {productObjs && productObjs.length > 0 && (
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
