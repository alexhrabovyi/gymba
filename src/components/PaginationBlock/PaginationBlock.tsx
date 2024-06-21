import {
  memo, useState, Fragment, useCallback, useLayoutEffect, useEffect, useRef,
  ReactNode,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import paginationCls from './PaginationBlock.module.scss';
import ThreeDots from './images/threeDots.svg';
import useOnResize from '../../hooks/useOnResize';

interface PaginationBlockProps {
  pageAmount: number,
  elemToScrollRef?: React.MutableRefObject<HTMLElement | null>,
}

const PaginationBlock = memo<PaginationBlockProps>(({ pageAmount, elemToScrollRef }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const formRef = useRef<HTMLFormElement | null>(null);

  const [windowWidth, setWindowWidth] = useState<number>(0);

  const getWindowWidth = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useLayoutEffect(() => {
    getWindowWidth();
  }, [getWindowWidth]);

  useOnResize(getWindowWidth);

  const [currentPageNum, setCurrentPageNum] = useState<number>(() => {
    if (searchParams.has('page')) {
      return +searchParams.get('page')!;
    }

    return 1;
  });

  if (currentPageNum > pageAmount && pageAmount !== 0) {
    setCurrentPageNum(1);
    searchParams.delete('page');
    setSearchParams(searchParams);
  }

  const onBackForward = useCallback(() => {
    if (searchParams.has('page')) {
      const searchParamValue = +searchParams.get('page')!;

      if (searchParamValue !== currentPageNum) {
        setCurrentPageNum(searchParamValue);
      }
    } else if (currentPageNum !== 1) {
      setCurrentPageNum(1);
    }
  }, [searchParams, currentPageNum]);

  useEffect(onBackForward, [onBackForward]);

  const formOnSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    searchParams.set('page', String(currentPageNum));
    setSearchParams(searchParams);

    elemToScrollRef?.current?.scrollIntoView({ block: 'center' });
  };

  let additionalBtnsAvailable: boolean;
  let additionalStartBtnNeeded: boolean;
  let additionalEndBtnNeeded: boolean;

  if (windowWidth > 576) {
    additionalBtnsAvailable = pageAmount > 9;
    additionalStartBtnNeeded = additionalBtnsAvailable && currentPageNum > 5;
    additionalEndBtnNeeded = additionalBtnsAvailable && currentPageNum <= pageAmount - 5;
  } else {
    additionalBtnsAvailable = pageAmount > 7;
    additionalStartBtnNeeded = additionalBtnsAvailable && currentPageNum > 4;
    additionalEndBtnNeeded = additionalBtnsAvailable && currentPageNum <= pageAmount - 4;
  }

  let firstMainButtonId: number;
  let lastMainButtonId: number;

  let additionalStartBtnId: number;
  let additionalEndBtnId: number;

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

  const buttons: ReactNode[] = [];

  for (let i = firstMainButtonId!; i <= lastMainButtonId!; i += 1) {
    buttons.push((
      <Fragment key={i}>
        <button
          type="submit"
          id={String(i)}
          onClick={() => setCurrentPageNum(i)}
          className={classNames(
            paginationCls.paginationButton,
            i === currentPageNum && paginationCls.paginationButton_active,
          )}
          style={{ borderRadius: i === firstMainButtonId! ? '4px 0 0 4px' : i === lastMainButtonId! ? '0px 4px 4px 0' : '' }}
          aria-label={`Перейти на сторінку товарів ${i}`}
        >
          {i}
        </button>
        {i !== lastMainButtonId! && (
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
            id="1"
            onClick={() => {
              setCurrentPageNum(1);
              searchParams.set('page', '1');
              setSearchParams(searchParams);
              elemToScrollRef?.current?.scrollIntoView();
            }}
            className={classNames(
              paginationCls.paginationButton,
              paginationCls.paginationButton_round,
            )}
            aria-label={`Перейти на сторінку товарів ${1}`}
          >
            {1}
          </button>
          <button
            type="submit"
            id={String(additionalStartBtnId!)}
            onClick={() => {
              setCurrentPageNum(additionalStartBtnId);
              searchParams.set('page', String(additionalStartBtnId!));
              setSearchParams(searchParams);
              elemToScrollRef?.current?.scrollIntoView();
            }}
            className={paginationCls.additionalButton}
            aria-label={`Перейти на сторінку товарів ${additionalStartBtnId!}`}
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
            id={String(additionalEndBtnId!)}
            onClick={() => {
              setCurrentPageNum(additionalEndBtnId);
              searchParams.set('page', String(additionalEndBtnId!));
              setSearchParams(searchParams);
              elemToScrollRef?.current?.scrollIntoView();
            }}
            className={paginationCls.additionalButton}
            aria-label={`Перейти на сторінку товарів ${additionalEndBtnId!}`}
          >
            <ThreeDots className={paginationCls.icon} />
          </button>
          <button
            type="submit"
            id={String(pageAmount)}
            onClick={() => {
              setCurrentPageNum(pageAmount);
              searchParams.set('page', String(pageAmount));
              setSearchParams(searchParams);
              elemToScrollRef?.current?.scrollIntoView();
            }}
            className={classNames(
              paginationCls.paginationButton,
              paginationCls.paginationButton_round,
            )}
            aria-label={`Перейти на сторінку товарів ${pageAmount}`}
          >
            {pageAmount}
          </button>
        </>
      )}
    </form>
  );
});

export default PaginationBlock;
