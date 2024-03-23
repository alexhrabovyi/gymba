import {
  memo, useState, Fragment, useCallback, useLayoutEffect, useEffect, useRef,
} from 'react';
import { useNavigation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import paginationCls from './PaginationBlock.module.scss';
import ThreeDots from './images/threeDots.svg';
import useOnResize from '../../../hooks/useOnResize.jsx';

const PaginationBlock = memo(({ pageAmount }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigation();

  const formRef = useRef(null);

  const [windowWidth, setWindowWidth] = useState();

  const getWindowWidth = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useLayoutEffect(() => {
    getWindowWidth();
  }, [getWindowWidth]);

  useOnResize(getWindowWidth);

  const [currentPageNum, setCurrentPageNum] = useState(() => {
    if (searchParams.has('page')) {
      return +searchParams.get('page');
    }

    return 1;
  });

  if (currentPageNum > pageAmount && pageAmount !== 0) {
    setCurrentPageNum(1);
    searchParams.delete('page');
    setSearchParams(searchParams);
  }

  const onNavigation = useCallback(() => {
    if (navigation.state === 'loading') {
      const urlSearchParams = new URLSearchParams(navigation.location.search);

      if (urlSearchParams.has('page')) {
        const searchParamValue = +urlSearchParams.get('page');

        if (searchParamValue !== currentPageNum) {
          setCurrentPageNum(searchParamValue);
        }
      } else if (currentPageNum !== 1) {
        setCurrentPageNum(1);
      }
    }
  }, [navigation, currentPageNum]);

  useEffect(onNavigation, [onNavigation]);

  function formOnSubmit(e) {
    e.preventDefault();

    searchParams.set('page', currentPageNum);
    setSearchParams(searchParams);
  }

  let additionalBtnsAvailable;
  let additionalStartBtnNeeded;
  let additionalEndBtnNeeded;

  if (windowWidth > 576) {
    additionalBtnsAvailable = pageAmount > 9;
    additionalStartBtnNeeded = additionalBtnsAvailable && currentPageNum > 5;
    additionalEndBtnNeeded = additionalBtnsAvailable && currentPageNum <= pageAmount - 5;
  } else {
    additionalBtnsAvailable = pageAmount > 7;
    additionalStartBtnNeeded = additionalBtnsAvailable && currentPageNum > 4;
    additionalEndBtnNeeded = additionalBtnsAvailable && currentPageNum <= pageAmount - 4;
  }

  let firstMainButtonId;
  let lastMainButtonId;

  let additionalStartBtnId;
  let additionalEndBtnId;

  if (windowWidth > 576) {
    if (additionalBtnsAvailable && !additionalStartBtnNeeded) {
      firstMainButtonId = 1;
      lastMainButtonId = 7;
      additionalEndBtnId = 8;
    } else if (additionalBtnsAvailable && !additionalEndBtnNeeded) {
      firstMainButtonId = pageAmount - 6;
      lastMainButtonId = pageAmount;
      additionalStartBtnId = firstMainButtonId - 1;
    } else if (additionalStartBtnNeeded && additionalEndBtnNeeded) {
      firstMainButtonId = currentPageNum - 2;
      lastMainButtonId = currentPageNum + 2;
      additionalStartBtnId = currentPageNum - 3;
      additionalEndBtnId = currentPageNum + 3;
    } else if (!additionalBtnsAvailable) {
      firstMainButtonId = 1;
      lastMainButtonId = pageAmount;
    }
  } else if (windowWidth <= 576) {
    if (additionalBtnsAvailable && !additionalStartBtnNeeded) {
      firstMainButtonId = 1;
      lastMainButtonId = 5;
      additionalEndBtnId = 6;
    } else if (additionalBtnsAvailable && !additionalEndBtnNeeded) {
      firstMainButtonId = pageAmount - 4;
      lastMainButtonId = pageAmount;
      additionalStartBtnId = firstMainButtonId - 1;
    } else if (additionalStartBtnNeeded && additionalEndBtnNeeded) {
      firstMainButtonId = currentPageNum - 1;
      lastMainButtonId = currentPageNum + 1;
      additionalStartBtnId = currentPageNum - 2;
      additionalEndBtnId = currentPageNum + 2;
    } else if (!additionalBtnsAvailable) {
      firstMainButtonId = 1;
      lastMainButtonId = pageAmount;
    }
  }

  const buttons = [];

  for (let i = firstMainButtonId; i <= lastMainButtonId; i += 1) {
    buttons.push((
      <Fragment key={i}>
        <button
          type="submit"
          id={i}
          onClick={() => setCurrentPageNum(i)}
          className={classNames(
            paginationCls.paginationButton,
            i === currentPageNum && paginationCls.paginationButton_active,
          )}
          style={{ borderRadius: i === firstMainButtonId ? '4px 0 0 4px' : i === lastMainButtonId ? '0px 4px 4px 0' : '' }}
          aria-label={`Перейти на страницу товаров ${i}`}
        >
          {i}
        </button>
        {i !== lastMainButtonId && (
          <span className={paginationCls.greyLine} />
        )}
      </Fragment>
    ));
  }

  return (
    <form
      ref={formRef}
      className={paginationCls.paginationBlock}
      onSubmit={formOnSubmit}
    >
      {additionalStartBtnNeeded && (
        <>
          <button
            type="submit"
            id={1}
            onClick={() => {
              setCurrentPageNum(1);
              searchParams.set('page', 1);
              setSearchParams(searchParams);
            }}
            className={classNames(
              paginationCls.paginationButton,
              paginationCls.paginationButton_round,
            )}
            aria-label={`Перейти на страницу товаров ${1}`}
          >
            {1}
          </button>
          <button
            type="submit"
            id={additionalStartBtnId}
            onClick={() => {
              setCurrentPageNum(additionalStartBtnId);
              searchParams.set('page', additionalStartBtnId);
              setSearchParams(searchParams);
            }}
            className={paginationCls.additionalButton}
            aria-label={`Перейти на страницу товаров ${additionalStartBtnId}`}
          >
            <ThreeDots className={paginationCls.icon} />
          </button>
        </>
      )}
      {buttons}
      {additionalEndBtnNeeded && (
        <>
          <button
            type="submit"
            id={additionalEndBtnId}
            onClick={() => {
              setCurrentPageNum(additionalEndBtnId);
              searchParams.set('page', additionalEndBtnId);
              setSearchParams(searchParams);
            }}
            className={paginationCls.additionalButton}
            aria-label={`Перейти на страницу товаров ${additionalEndBtnId}`}
          >
            <ThreeDots className={paginationCls.icon} />
          </button>
          <button
            type="submit"
            id={pageAmount}
            onClick={() => {
              setCurrentPageNum(pageAmount);
              searchParams.set('page', pageAmount);
              setSearchParams(searchParams);
            }}
            className={classNames(
              paginationCls.paginationButton,
              paginationCls.paginationButton_round,
            )}
            aria-label={`Перейти на страницу товаров ${pageAmount}`}
          >
            {pageAmount}
          </button>
        </>
      )}
    </form>
  );
});

export default PaginationBlock;
