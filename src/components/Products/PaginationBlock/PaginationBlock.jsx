import {
  memo, useState, Fragment, useCallback, useLayoutEffect, useEffect, useRef,
} from 'react';
import { useNavigation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import paginationCls from './PaginationBlock.module.scss';
import ThreeDots from './images/threeDots.svg';

const PaginationBlock = memo(({ pageAmount }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigation();

  const formRef = useRef(null);

  const [currentPageNum, setCurrentPageNum] = useState(() => {
    if (searchParams.has('page')) {
      return +searchParams.get('page');
    }

    return 1;
  });

  useEffect(() => {
    if (currentPageNum > pageAmount) {
      setCurrentPageNum(1);
      searchParams.set('page', 1);
      setSearchParams(searchParams);
    }
  }, [currentPageNum, pageAmount, searchParams, setSearchParams]);

  const onNavigation = useCallback(() => {
    if (navigation.state === 'loading') {
      const urlSearchParams = new URLSearchParams(navigation.location.search);

      if (urlSearchParams.has('page')) {
        setCurrentPageNum(+urlSearchParams.get('page'));
      } else {
        setCurrentPageNum(1);
      }
    }
  }, [navigation]);

  useLayoutEffect(onNavigation, [onNavigation]);

  function formOnSubmit(e) {
    e.preventDefault();
    console.log('amogus');

    searchParams.set('page', currentPageNum);
    setSearchParams(searchParams);
  }

  const additionalBtnsAvailable = pageAmount > 9;
  const additionalStartBtnNeeded = additionalBtnsAvailable && currentPageNum > 5;
  const additionalEndBtnNeeded = additionalBtnsAvailable && currentPageNum <= pageAmount - 5;

  let firstMainButtonId;
  let lastMainButtonId;

  let additionalStartBtnId;
  let additionalEndBtnId;

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

  if (additionalStartBtnNeeded) {
    buttons.unshift(
      (
        <button
          key={1}
          type="submit"
          id={1}
          onClick={() => setCurrentPageNum(1)}
          className={classNames(
            paginationCls.paginationButton,
            paginationCls.paginationButton_round,
          )}
          aria-label={`Перейти на страницу товаров ${1}`}
        >
          {1}
        </button>
      ),
      (
        <button
          key={additionalStartBtnId}
          type="submit"
          id={additionalStartBtnId}
          onClick={() => setCurrentPageNum(additionalStartBtnId)}
          className={paginationCls.additionalButton}
          aria-label={`Перейти на страницу товаров ${additionalStartBtnId}`}
        >
          <ThreeDots className={paginationCls.icon} />
        </button>
      ),
    );
  }

  if (additionalEndBtnNeeded) {
    buttons.push(
      (
        <button
          key={additionalEndBtnId}
          type="submit"
          id={additionalEndBtnId}
          onClick={() => setCurrentPageNum(additionalEndBtnId)}
          className={paginationCls.additionalButton}
          aria-label={`Перейти на страницу товаров ${additionalEndBtnId}`}
        >
          <ThreeDots className={paginationCls.icon} />
        </button>
      ),
      (
        <button
          key={pageAmount}
          type="submit"
          id={pageAmount}
          onClick={() => setCurrentPageNum(pageAmount)}
          className={classNames(
            paginationCls.paginationButton,
            paginationCls.paginationButton_round,
          )}
          aria-label={`Перейти на страницу товаров ${pageAmount}`}
        >
          {pageAmount}
        </button>
      ),
    );
  }

  return (
    <form
      ref={formRef}
      className={paginationCls.paginationBlock}
      onSubmit={formOnSubmit}
    >
      {buttons}
    </form>
  );
});

export default PaginationBlock;
