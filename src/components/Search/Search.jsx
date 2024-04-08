/* eslint-disable react/no-array-index-key */
import {
  useMemo, Suspense, useState, useCallback, useLayoutEffect,
  useEffect,
} from 'react';
import {
  Link, Await, useSearchParams,
  useFetcher,
} from 'react-router-dom';
import classNames from 'classnames';
import useOnResize from '../../hooks/useOnResize.jsx';
import ProductCard from '../ProductCard/ProductCard.jsx';
import Spinner from '../common/Spinner/Spinner.jsx';
import DynamicImage from '../common/DynamicImage/DynamicImage.jsx';
import PaginationBlock from '../PaginationBlock/PaginationBlock.jsx';
import containerCls from '../../scss/_container.module.scss';
import textCls from '../../scss/_text.module.scss';
import searchCls from './Search.module.scss';
import LineIcon from '../../assets/images/icons/oblique.svg';
import ThreeDotsSpinnerBlock from '../common/ThreeDotsSpinnerBlock/ThreeDotsSpinnerBlock.jsx';

export default function Search() {
  const searchFetcher = useFetcher();
  const [searchParams] = useSearchParams();

  const [searchFetcherData, setSearchFetcherData] = useState(null);
  const [isShortProductCard, setIsShortProductCard] = useState(false);
  const [fetchURL, setFetchUrl] = useState(null);
  const [prevFetchUrl, setPrevFetchUrl] = useState(null);

  const searchValue = searchParams.get('search');

  const searchResults = useMemo(() => searchFetcherData?.searchResults, [searchFetcherData]);
  const pageAmount = searchFetcherData?.pageAmount;

  const setupFetchUrl = useCallback(() => {
    const newFetchURL = `/search?${searchParams.toString()}`;

    if (newFetchURL !== fetchURL) {
      setFetchUrl(newFetchURL);
    }
  }, [searchParams, fetchURL]);

  useEffect(setupFetchUrl);

  const requestFetcherData = useCallback(() => {
    if (fetchURL !== prevFetchUrl) {
      setPrevFetchUrl(fetchURL);

      searchFetcher.load(fetchURL);
    }
  }, [fetchURL, prevFetchUrl, searchFetcher]);

  useEffect(requestFetcherData);

  if (searchFetcher.data) {
    if (searchFetcher.data.searchResultAndPageAmount !== searchFetcherData) {
      setSearchFetcherData(searchFetcher.data.searchResultAndPageAmount);
    }
  }

  const setupIsShortProductCard = useCallback(() => {
    if (window.innerWidth > 576 && isShortProductCard) {
      setIsShortProductCard(false);
    } else if (window.innerWidth <= 576 && !isShortProductCard) {
      setIsShortProductCard(true);
    }
  }, [isShortProductCard]);

  useLayoutEffect(setupIsShortProductCard, [setupIsShortProductCard]);
  useOnResize(setupIsShortProductCard);

  const searchResultList = useMemo(() => {
    if (!searchResults) return;

    const listElems = searchResults.map((sR) => {
      let key;
      let type;
      let name;
      let link;
      let imgSrc;

      if (sR.type === 'category') {
        key = sR.category.id;
        type = 'Категорія:';
        name = sR.category.name;
        link = `/${sR.category.id}`;
        imgSrc = import(`../../assets/images/categoryImgs/${sR.category.id}.webp`);
      } else if (sR.type === 'subcategory') {
        key = sR.subcategory.id;
        type = 'Категорія:';
        name = sR.subcategory.name;
        link = `/${sR.subcategory.categoryId}/${sR.subcategory.id}`;
        imgSrc = import(`../../assets/images/subcategoryImgs/${sR.subcategory.categoryId}_${sR.subcategory.id}.webp`);
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
        imgSrc = import(`../../assets/images/newsImgs/${sR.news.id}.webp`);
      }

      if (sR.type === 'product') {
        imgSrc = import(`../../assets/images/productImgs/${sR.product.product.id}.webp`);
      }

      return (
        <li
          key={key}
          className={searchCls.searchResultListElement}
        >
          {sR.type === 'product' ? (
            <div className={searchCls.productCard}>
              <ProductCard
                key={sR.product.product.id}
                name={sR.product.product.name}
                categoryId={sR.product.categoryId}
                subcategoryId={sR.product.subcategoryId}
                productId={sR.product.product.id}
                price={sR.product.product.price}
                oldPrice={sR.product.product.oldPrice}
                isShortCard={isShortProductCard}
              />
            </div>
          ) : (
            <Link
              className={searchCls.searchResultListLink}
              to={link}
              alt={name}
            >
              <Suspense fallback={<Spinner className={searchCls.imgSpinner} />}>
                <Await resolve={imgSrc}>
                  <DynamicImage
                    className={searchCls.img}
                    alt={name}
                  />
                </Await>
              </Suspense>
              <span className={searchCls.searchResultListType}>
                {type}
              </span>
              <span className={searchCls.linkName}>
                {name}
              </span>
            </Link>
          )}
        </li>
      );
    });

    return (
      <ul className={searchCls.searchResultList}>
        {listElems}
      </ul>
    );
  }, [searchResults, isShortProductCard]);

  return (
    <main className={classNames(
      containerCls.container,
      searchCls.main,
    )}
    >
      {searchResults !== undefined ? (
        <div className={classNames(
          searchCls.searchResults,
          searchFetcher.state === 'loading' && searchCls.searchResults_inactive,
        )}
        >
          {searchResults.length ? (
            searchResultList
          ) : (
            <div className={searchCls.noResultBlock}>
              <div className={searchCls.noResultContent}>
                <LineIcon className={searchCls.noResultLine} />
                <p className={classNames(
                  textCls.text,
                  textCls.textFw800,
                  textCls.text32px,
                  searchCls.noResultText,
                )}
                >
                  Нічого не знайдено
                </p>
                <p className={classNames(
                  textCls.text,
                  textCls.text24px,
                  textCls.textGrey,
                )}
                >
                  Переконайтеся у правильності формулювання вашого запиту, спробуйте використати
                  альтернативні варіанти або більш узагальнені терміни.
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <ThreeDotsSpinnerBlock />
      )}
      {searchValue && (
        <div className={searchCls.paginationBlock}>
          <PaginationBlock
            pageAmount={pageAmount}
          />
        </div>
      )}
    </main>
  );
}
