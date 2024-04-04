/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  Fragment, Suspense, memo, useMemo, useState, useCallback, useLayoutEffect, useRef,
} from 'react';
import { Link, useFetcher, Await } from 'react-router-dom';
import classNames from 'classnames';
import useOnResize from '../../../hooks/useOnResize.jsx';
import findAllInteractiveElements from '../../../utils/findAllInteractiveElements';
import Spinner from '../../common/Spinner/Spinner.jsx';
import DynamicImage from '../../common/DynamicImage/DynamicImage.jsx';
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
  const searchResultsFetcher = useFetcher();

  const searchBlockRef = useRef();

  const [prevSearchValue, setPrevSearchValue] = useState(searchValue);
  const [searchResults, setSearchResults] = useState(null);
  const [windowWidth, setWindowWidth] = useState(null);

  const isOpen = isActive && searchValue?.length;

  const searchParamsString = new URLSearchParams({
    search: searchValue,
  }).toString();

  const getWindowWidth = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useLayoutEffect(getWindowWidth, [getWindowWidth]);
  useOnResize(getWindowWidth);

  function setupWidthAndLeft() {
    let width;
    let left;

    if (windowWidth > 768) {
      if (inputWidth >= 575) {
        width = inputWidth;
        left = inputLeft;
      }

      width = 575;
      left = inputLeft - ((width - inputWidth) / 2);
    } else if (windowWidth > 576) {
      width = windowWidth * 0.9;
      left = windowWidth * 0.05;
    } else {
      width = windowWidth * 0.95;
      left = windowWidth * 0.025;
    }

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

  if (searchValue === '' && searchResults !== null) {
    setSearchResults(null);
  }

  function requestSearchResults() {
    if (prevSearchValue !== searchValue && searchValue.length) {
      setPrevSearchValue(searchValue);

      const action = `/search?${searchParamsString}`;

      searchResultsFetcher.load(action);
    }
  }

  requestSearchResults();

  function updateSearchResults() {
    if (searchResultsFetcher.data && searchValue !== '') {
      const searchResultsFromFetcher = searchResultsFetcher.data.searchResults;

      if (searchResultsFromFetcher !== searchResults) {
        setSearchResults(searchResultsFromFetcher);
      }
    }
  }

  updateSearchResults();

  const searchResultList = useMemo(() => {
    if (!searchResults) return;

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
            <Fragment key={startText + i}>
              {startText}
            </Fragment>,
          );

          const selectedText = text.slice(matchIndex, matchIndex + searchValueLength);
          result.push(
            <span
              key={selectedText + i}
              className={searchCls.matchedText}
            >
              {selectedText}
            </span>,
          );

          startIndex = matchIndex + searchValueLength;

          if (i === matchIndexes.length - 1) {
            const endText = text.slice(startIndex);
            result.push(
              <Fragment key={endText + i}>
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

    return (
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
  }, [searchResults, searchValue]);

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
    </div>
  );
});

export default SearchResultBlock;
