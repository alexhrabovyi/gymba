/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  Fragment, Suspense, memo, useState, useCallback,
  useLayoutEffect, useRef, useMemo, useEffect,
} from 'react';
import { Link, Await } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';
import classNames from 'classnames';
import { useGetSearchResultsQuery } from '../../../queryAPI/queryAPI';
import useOnResize from '../../../hooks/useOnResize.jsx';
import findAllInteractiveElements from '../../../utils/findAllInteractiveElements';
import Spinner from '../../common/Spinner/Spinner.jsx';
import DynamicImage from '../../common/DynamicImage/DynamicImage.jsx';
import ThreeDotsSpinnerBlock from '../../common/ThreeDotsSpinnerBlock/ThreeDotsSpinnerBlock.jsx';
import backdropCls from '../../../scss/_backdrop.module.scss';
import searchCls from './SearchResultsBlock.module.scss';
import ArrowRightIcon from '../../../assets/images/icons/arrow-right.svg';

const SearchResultBlock = memo(({
  inputLeft,
  inputWidth,
  headerBottom,
  isActive,
  setIsActive,
  searchValue,
}) => {
  const searchBlockRef = useRef();

  const [searchResults, setSearchResults] = useState(null);
  const [windowWidth, setWindowWidth] = useState(null);
  const [searchResultList, setSearchResultList] = useState(null);

  // setup functions

  const isOpen = isActive && searchValue?.length;

  const requestParams = useMemo(() => ({
    searchQuery: searchValue,
    pageNum: 1,
  }), [searchValue]);

  const searchParamsString = new URLSearchParams({
    search: searchValue,
  }).toString();

  const getWindowWidth = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useLayoutEffect(getWindowWidth, [getWindowWidth]);
  useOnResize(getWindowWidth);

  function setupWidthAndLeft() {
    let width = 0;
    let left = 0;

    if (windowWidth > 768) {
      if (inputWidth >= 575) {
        width = inputWidth;
        left = inputLeft;
      } else {
        width = 575;
        left = inputLeft - ((width - inputWidth) / 2);
      }
    } else if (windowWidth > 576) {
      width = windowWidth * 0.9;
      left = windowWidth * 0.05;
    } else {
      width = windowWidth * 0.95;
      left = windowWidth * 0.025;
    }

    if (isNaN(left)) left = 0;

    return {
      width,
      left,
    };
  }

  const metrics = setupWidthAndLeft();

  function toggleInteractiveElements() {
    const searchBlock = searchBlockRef.current;
    if (!searchBlock) return;

    const interactiveElements = findAllInteractiveElements(searchBlock);

    if (isOpen) {
      interactiveElements.forEach((el) => {
        el.tabIndex = '';
        el.ariaHidden = false;
      });
    } else {
      interactiveElements.forEach((el) => {
        el.tabIndex = '-1';
        el.ariaHidden = true;
      });
    }
  }

  toggleInteractiveElements();

  // fetch functions

  const shouldSkip = !searchValue?.length;

  const {
    data: fetchedResults,
    isLoading: isLoadingResults,
    isFetching: isFetchingResults,
  } = useGetSearchResultsQuery(requestParams, { skip: shouldSkip });

  if (fetchedResults) {
    if (searchResults !== fetchedResults.searchResults) {
      setSearchResults(fetchedResults.searchResults);
    }
  }

  const createSearchResultList = useCallback(() => {
    if (!searchResults || isFetchingResults) return;

    const listElems = searchResults.slice(0, 5).map((sR) => {
      let key;
      let type;
      let name;
      let link;

      if (sR.type === 'category') {
        key = sR.category.id;
        type = 'Категорія:';
        name = sR.category.name;
        link = `/${sR.category.id}`;
      } else if (sR.type === 'subcategory') {
        key = sR.subcategory.id;
        type = 'Категорія:';
        name = sR.subcategory.name;
        link = `/${sR.subcategory.categoryId}/${sR.subcategory.id}`;
      } else if (sR.type === 'product') {
        key = sR.product.product.id;
        type = 'Продукт:';
        name = sR.product.product.name;
        link = `/${sR.product.categoryId}/${sR.product.subcategoryId}/${sR.product.product.id}`;
      } else if (sR.type === 'news') {
        key = sR.news.id;
        type = 'Стаття:';
        name = sR.news.name;
        link = `/news/${sR.news.id}`;
      }

      function selectMatched(matchValue, text) {
        const regExp = new RegExp(matchValue, 'gi');
        const searchValueLength = matchValue.length;

        const matchIndexes = Array.from(text.matchAll(regExp)).map(({ index }) => index);

        let startIndex = 0;
        const result = [];

        matchIndexes.forEach((matchIndex, i) => {
          const startText = text.slice(startIndex, matchIndex);
          result.push(
            <Fragment key={startText + nanoid()}>
              {startText}
            </Fragment>,
          );

          const selectedText = text.slice(matchIndex, matchIndex + searchValueLength);
          result.push(
            <span
              key={selectedText + nanoid()}
              className={searchCls.matchedText}
            >
              {selectedText}
            </span>,
          );

          startIndex = matchIndex + searchValueLength;

          if (i === matchIndexes.length - 1) {
            const endText = text.slice(startIndex);
            result.push(
              <Fragment key={endText + nanoid()}>
                {endText}
              </Fragment>,
            );
          }
        });

        return result;
      }

      const linkName = selectMatched(searchValue, name);

      let imgSrc;

      if (sR.type === 'product') {
        imgSrc = import(`../../../assets/images/productImgs/${sR.product.product.id}.webp`);
      }

      return (
        <li
          key={key}
          className={searchCls.searchResultListElement}
        >
          <Link
            className={searchCls.searchResultListLink}
            to={link}
            alt={name}
          >
            {sR.type === 'product' ? (
              <Suspense fallback={<Spinner className={searchCls.imgSpinner} />}>
                <Await resolve={imgSrc}>
                  <DynamicImage
                    className={searchCls.img}
                    alt={name}
                  />
                </Await>
              </Suspense>
            ) : (
              <span className={searchCls.searchResultListType}>
                {type}
              </span>
            )}
            <span className={searchCls.linkName}>
              {linkName}
            </span>
          </Link>
        </li>
      );
    });

    const newSearchResultList = (
      <ul className={searchCls.searchResultList}>
        {listElems.length ? (
          listElems
        ) : (
          <li className={searchCls.nothingFoundText}>
            По вашому запиту нічого не знайдено. Уточніть свій запит
          </li>
        )}
      </ul>
    );

    setSearchResultList(newSearchResultList);
  }, [searchResults, isFetchingResults, searchValue]);

  useEffect(createSearchResultList, [createSearchResultList]);

  return (
    <div
      className={classNames(
        backdropCls.backdrop,
        isOpen && backdropCls.backdrop_active,
      )}
      style={{ top: headerBottom }}
      onClick={() => setIsActive(false)}
    >
      <div
        role="dialog"
        ref={searchBlockRef}
        className={searchCls.searchBlock}
        style={{
          top: headerBottom,
          left: metrics?.left,
          width: metrics?.width,
        }}
      >
        {isActive && searchResultList ? (
          <div className={classNames(
            searchCls.loadingBlock,
            !isLoadingResults && isFetchingResults && searchCls.loadingBlock_inactive,
          )}
          >
            {searchResultList}
            {searchResults?.length > 5 && (
            <Link
              className={searchCls.allResultsLink}
              to={`/search?${searchParamsString}`}
              alt="Сторінка результатів пошуку"
            >
              Переглянути всі результати
              <ArrowRightIcon className={searchCls.arrowRightIcon} />
            </Link>
            )}
          </div>
        ) : (
          <ThreeDotsSpinnerBlock
            blockClassName={searchCls.spinnerBlock}
            spinnerClassName={searchCls.spinner}
          />
        )}
      </div>
    </div>
  );
});

export default SearchResultBlock;
