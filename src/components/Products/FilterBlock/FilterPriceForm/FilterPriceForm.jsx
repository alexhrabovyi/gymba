/* eslint-disable consistent-return */
import {
  useCallback, useEffect, useLayoutEffect, useRef, useState,
} from 'react';
import { useFetcher, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import textCls from '../../../../scss/_text.module.scss';
import filterCls from './FilterPriceForm.module.scss';
import ChevronUp from '../../../../assets/images/icons/chevronUp.svg';

export default function FilterPriceForm() {
  const productsFetcher = useFetcher();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isClosed, setIsClose] = useState(false);
  const [formWasInteracted, setFormWasInteracted] = useState(false);

  const [filteredProductsAndMinMaxPrice, setFilteredProductsAndMinMaxPrice] = useState(null);
  const [prevFetchUrl, setPrevFetchUrl] = useState(null);

  const [prevLoaderMinPrice, setPrevLoaderMinPrice] = useState(null);
  const [prevLoaderMaxPrice, setPrevLoaderMaxPrice] = useState(null);
  const [totalMinPrice, setTotalMinPrice] = useState(null);
  const [totalMaxPrice, setTotalMaxPrice] = useState(null);
  const [currentMinPrice, setCurrentMinPrice] = useState(null);
  const [currentMaxPrice, setCurrentMaxPrice] = useState(null);
  const [minInputValue, setMinInputValue] = useState('');
  const [maxInputValue, setMaxInputValue] = useState('');
  const [minButtonLeft, setMinButtonLeft] = useState(null);
  const [maxButtonLeft, setMaxButtonLeft] = useState(null);

  const contentRef = useRef(null);
  const mainLineRef = useRef(null);
  const activeLineRef = useRef(null);
  const minButtonRef = useRef(null);
  const maxButtonRef = useRef(null);

  // setup functions

  const categoryIdParam = params.categoryId;
  const subcategoryIdParam = params.subcategoryId;

  const fetchUrl = searchParams.size ? `/getSubcategoryProducts/${categoryIdParam}/${subcategoryIdParam}?${searchParams.toString()}`
    : `/getSubcategoryProducts/${categoryIdParam}/${subcategoryIdParam}`;

  const initMinPrice = Number(filteredProductsAndMinMaxPrice?.minPrice) || 0;
  const initMaxPrice = Number(filteredProductsAndMinMaxPrice?.maxPrice) || 0;

  function setupPrices() {
    if (prevLoaderMinPrice !== initMinPrice) setPrevLoaderMinPrice(initMinPrice);
    if (prevLoaderMaxPrice !== initMaxPrice) setPrevLoaderMaxPrice(initMaxPrice);

    if (!formWasInteracted) {
      if (searchParams.has('minPrice')) {
        const searchParamsMinPrice = Number(searchParams.get('minPrice'));
        const searchParamsMaxPrice = Number(searchParams.get('maxPrice'));

        if (initMinPrice > searchParamsMinPrice && prevLoaderMinPrice !== initMinPrice) {
          setTotalMinPrice(searchParamsMinPrice);
        } else if (initMinPrice < searchParamsMinPrice && prevLoaderMinPrice !== initMinPrice) {
          setTotalMinPrice(initMinPrice);
        }
        if (initMaxPrice < searchParamsMaxPrice && prevLoaderMaxPrice !== initMaxPrice) {
          setTotalMaxPrice(searchParamsMaxPrice);
        } else if (initMaxPrice > searchParamsMaxPrice && prevLoaderMaxPrice !== initMaxPrice) {
          setTotalMaxPrice(initMaxPrice);
        }

        if (searchParamsMinPrice !== currentMinPrice) {
          setCurrentMinPrice(searchParamsMinPrice);
          setMinInputValue(searchParamsMinPrice);
        }
        if (searchParamsMaxPrice !== currentMaxPrice) {
          setCurrentMaxPrice(searchParamsMaxPrice);
          setMaxInputValue(searchParamsMaxPrice);
        }
      } else {
        if (totalMinPrice !== initMinPrice) setTotalMinPrice(initMinPrice);
        if (totalMaxPrice !== initMaxPrice) setTotalMaxPrice(initMaxPrice);

        if (currentMinPrice !== initMinPrice) {
          setCurrentMinPrice(initMinPrice);
          setMinInputValue(initMinPrice);
        }
        if (currentMaxPrice !== initMaxPrice) {
          setCurrentMaxPrice(initMaxPrice);
          setMaxInputValue(initMaxPrice);
        }
      }
    } else {
      if (initMinPrice > currentMinPrice && prevLoaderMinPrice !== initMinPrice) {
        setTotalMinPrice(currentMinPrice);
      } else if (initMinPrice < currentMinPrice && prevLoaderMinPrice !== initMinPrice) {
        setTotalMinPrice(initMinPrice);
      }

      if (initMaxPrice < currentMaxPrice && prevLoaderMaxPrice !== initMaxPrice) {
        setTotalMaxPrice(currentMaxPrice);
      } else if (initMaxPrice > currentMaxPrice && prevLoaderMaxPrice !== initMaxPrice) {
        setTotalMaxPrice(initMaxPrice);
      }
    }
  }

  setupPrices();

  const interactedFormOnNavigate = useCallback(() => {
    if (productsFetcher.state === 'loading' && formWasInteracted) {
      if (searchParams.has('minPrice')) {
        const searchParamsMinPrice = Number(searchParams.get('minPrice'));
        const searchParamsMaxPrice = Number(searchParams.get('maxPrice'));

        if (searchParamsMinPrice !== currentMinPrice) {
          setCurrentMinPrice(searchParamsMinPrice);
          setMinInputValue(searchParamsMinPrice);
        }

        if (searchParamsMaxPrice !== currentMaxPrice) {
          setCurrentMaxPrice(searchParamsMaxPrice);
          setMaxInputValue(searchParamsMaxPrice);
        }
      } else {
        setFormWasInteracted(false);
      }
    }
  }, [productsFetcher, searchParams, currentMinPrice, currentMaxPrice, formWasInteracted]);

  useLayoutEffect(interactedFormOnNavigate, [interactedFormOnNavigate]);

  // fetcher functions

  const initialDataFetch = useCallback(() => {
    if (productsFetcher.state === 'idle' && !productsFetcher.data) {
      setPrevFetchUrl(fetchUrl);

      productsFetcher.load(fetchUrl);
    }
  }, [productsFetcher, fetchUrl]);

  useEffect(initialDataFetch, [initialDataFetch]);

  const dataFetchByInteraction = useCallback(() => {
    if (prevFetchUrl !== fetchUrl) {
      setPrevFetchUrl(fetchUrl);

      productsFetcher.load(fetchUrl);
    }
  }, [prevFetchUrl, fetchUrl, productsFetcher]);

  useEffect(dataFetchByInteraction, [dataFetchByInteraction]);

  function updateDataFromFetch() {
    if (productsFetcher.data) {
      if (productsFetcher.data.filteredProductsAndMinMaxPrice !== filteredProductsAndMinMaxPrice) {
        setFilteredProductsAndMinMaxPrice(productsFetcher.data.filteredProductsAndMinMaxPrice);
      }
    }
  }

  updateDataFromFetch();

  // helper functions

  const getMainLinePxWidth = useCallback(() => {
    const mainLine = mainLineRef.current;

    return mainLine.offsetWidth;
  }, []);

  const getRoundButtonPercentWidth = useCallback(() => {
    const roundButton = minButtonRef.current;
    const roundButtonPxWidth = roundButton.offsetWidth;
    const mainLinePxWidth = getMainLinePxWidth();

    const roundButtonPercentWidth = (roundButtonPxWidth / mainLinePxWidth) * 100;
    return roundButtonPercentWidth;
  }, [getMainLinePxWidth]);

  // calculation functions

  const calcAndUpdateButtonLeft = useCallback((buttonType, price) => {
    const roundButtonWidthInPercent = getRoundButtonPercentWidth();
    const availableMainLineWidth = 100 - roundButtonWidthInPercent * 2;
    const minMaxPriceDiff = totalMaxPrice - totalMinPrice;
    const valueInPercent = ((price - totalMinPrice) / minMaxPriceDiff);

    if (minMaxPriceDiff === 0) {
      setMinButtonLeft(0);
      setMaxButtonLeft(Number((100 - getRoundButtonPercentWidth()).toFixed(2)));
    } else if (buttonType === 'min') {
      const buttonLeft = Number((valueInPercent * availableMainLineWidth).toFixed(2));

      setMinButtonLeft(buttonLeft);
    } else if (buttonType === 'max') {
      const buttonLeft = Number(
        (valueInPercent * availableMainLineWidth + roundButtonWidthInPercent).toFixed(2),
      );

      setMaxButtonLeft(buttonLeft);
    }
  }, [getRoundButtonPercentWidth, totalMinPrice, totalMaxPrice]);

  function calcCurrentMinMaxPrice(buttonType, leftInPercent) {
    const roundButtonWidthInPercent = getRoundButtonPercentWidth();
    const availableMainLineWidth = 100 - roundButtonWidthInPercent * 2;
    const minMaxDiff = totalMaxPrice - totalMinPrice;

    if (buttonType === 'min') {
      let result = ((leftInPercent / availableMainLineWidth) * minMaxDiff) + totalMinPrice;
      result = Number(result.toFixed());

      setCurrentMinPrice(result);
      setMinInputValue(result);
    } else {
      let result = (((leftInPercent - roundButtonWidthInPercent)
        / availableMainLineWidth) * minMaxDiff) + totalMinPrice;
      result = Number(result.toFixed());

      setCurrentMaxPrice(result);
      setMaxInputValue(result);
    }
  }

  const calcAndUpdateButtonsLeft = useCallback(() => {
    calcAndUpdateButtonLeft('min', currentMinPrice);
    calcAndUpdateButtonLeft('max', currentMaxPrice);
  }, [currentMinPrice, currentMaxPrice, calcAndUpdateButtonLeft]);

  useLayoutEffect(calcAndUpdateButtonsLeft, [calcAndUpdateButtonsLeft]);

  // style functions

  const makeInactiveOnSameValues = useCallback(() => {
    if (formWasInteracted) return;

    const contentBlock = contentRef.current;

    if (initMinPrice === initMaxPrice
      && currentMinPrice === initMinPrice
      && currentMaxPrice === initMaxPrice) {
      contentBlock.style.opacity = '0.5';
      contentBlock.style.pointerEvents = 'none';
    }

    return () => {
      if (initMinPrice === initMaxPrice
        && currentMinPrice === initMinPrice
        && currentMaxPrice === initMaxPrice) {
        contentBlock.style.opacity = '';
        contentBlock.style.pointerEvents = '';
      }
    };
  }, [formWasInteracted, initMinPrice, initMaxPrice, currentMinPrice, currentMaxPrice]);

  useEffect(makeInactiveOnSameValues, [makeInactiveOnSameValues]);

  const setupActiveLineStyles = useCallback(() => {
    const width = maxButtonLeft - minButtonLeft;
    const left = minButtonLeft;

    activeLineRef.current.style.width = `${width}%`;
    activeLineRef.current.style.left = `${left}%`;
  }, [minButtonLeft, maxButtonLeft]);

  useLayoutEffect(setupActiveLineStyles, [setupActiveLineStyles]);

  // user events

  function roundButtonOnDown(e) {
    e.preventDefault();

    setFormWasInteracted(true);

    const { buttonType } = e.target.dataset;
    const button = buttonType === 'min' ? minButtonRef.current : maxButtonRef.current;

    const roundButtonWidthInPercent = getRoundButtonPercentWidth();

    let minLeft;
    let maxLeft;

    if (buttonType === 'min') {
      minLeft = 0;
      maxLeft = maxButtonLeft - roundButtonWidthInPercent;
    } else {
      minLeft = minButtonLeft + roundButtonWidthInPercent;
      maxLeft = 100 - roundButtonWidthInPercent;
    }

    const cursorCoordXOnDown = e.clientX;
    const buttonCoordLeft = button.getBoundingClientRect().left;
    const cursorDiff = cursorCoordXOnDown - buttonCoordLeft;

    button.setPointerCapture(e.pointerId);

    function roundButtonOnMove(onMoveEvent) {
      const mainLineLeftCoord = mainLineRef.current.getBoundingClientRect().left;
      const cursorCoordXOnMove = onMoveEvent.clientX;
      const buttonLeftInPx = cursorCoordXOnMove - mainLineLeftCoord - cursorDiff;

      let buttonLeftInPercent = (buttonLeftInPx / getMainLinePxWidth()) * 100;

      if (buttonLeftInPercent < minLeft) {
        buttonLeftInPercent = minLeft;
      } else if (buttonLeftInPercent > maxLeft) {
        buttonLeftInPercent = maxLeft;
      }

      buttonLeftInPercent = Number(buttonLeftInPercent.toFixed(2));

      calcCurrentMinMaxPrice(buttonType, buttonLeftInPercent);
    }

    function roundButtonOnUp() {
      button.removeEventListener('pointermove', roundButtonOnMove);
    }

    button.addEventListener('pointermove', roundButtonOnMove);
    button.addEventListener('pointerup', roundButtonOnUp, { once: true });
  }

  function formOnSubmit(e) {
    e.preventDefault();

    searchParams.set('minPrice', currentMinPrice);
    searchParams.set('maxPrice', currentMaxPrice);

    setSearchParams(searchParams);
  }

  function inputOnInput(e) {
    const inputType = e.target.name;
    const { value } = e.target;

    if (inputType === 'minPrice') {
      setMinInputValue(value);
    } else {
      setMaxInputValue(value);
    }
  }

  function inputOnKeyDown(e) {
    if (e.code === 'Enter') {
      setFormWasInteracted(true);

      const inputType = e.target.name;
      let value = Number(e.target.value);

      if (inputType === 'minPrice' && value > currentMaxPrice) {
        value = currentMaxPrice;
      } else if (inputType === 'maxPrice' && value < currentMinPrice) {
        value = currentMinPrice;
      } else if (value < totalMinPrice) {
        value = totalMinPrice;
      } else if (value > totalMaxPrice) {
        value = totalMaxPrice;
      }

      if (inputType === 'minPrice') {
        setMinInputValue(value);
        setCurrentMinPrice(value);
      } else {
        setMaxInputValue(value);
        setCurrentMaxPrice(value);
      }
    }
  }

  function roundButtonOnKeyDown(e) {
    const { buttonType } = e.target.dataset;

    if (e.code === 'ArrowUp' || e.code === 'ArrowRight') {
      e.preventDefault();
      setFormWasInteracted(true);

      if (buttonType === 'min') {
        let newCurrentMin = currentMinPrice + 1;

        if (newCurrentMin > currentMaxPrice) newCurrentMin = currentMaxPrice;

        setCurrentMinPrice(newCurrentMin);
        setMinInputValue(newCurrentMin);
      } else {
        let newCurrentMax = currentMaxPrice + 1;

        if (newCurrentMax > totalMaxPrice) newCurrentMax = totalMaxPrice;

        setCurrentMaxPrice(newCurrentMax);
        setMaxInputValue(newCurrentMax);
      }
    } else if (e.code === 'ArrowDown' || e.code === 'ArrowLeft') {
      e.preventDefault();
      setFormWasInteracted(true);

      if (buttonType === 'min') {
        let newCurrentMin = currentMinPrice - 1;

        if (newCurrentMin < totalMinPrice) newCurrentMin = totalMinPrice;

        setCurrentMinPrice(newCurrentMin);
        setMinInputValue(newCurrentMin);
      } else {
        let newCurrentMax = currentMaxPrice - 1;

        if (newCurrentMax < currentMinPrice) newCurrentMax = currentMinPrice;

        setCurrentMaxPrice(newCurrentMax);
        setMaxInputValue(newCurrentMax);
      }
    } else if (e.code === 'PageUp') {
      e.preventDefault();
      setFormWasInteracted(true);

      const fivePercentValue = (totalMaxPrice - totalMinPrice) * 0.05;

      if (buttonType === 'min') {
        let newCurrentMin = Number((currentMinPrice + fivePercentValue).toFixed(0));

        if (newCurrentMin > currentMaxPrice) newCurrentMin = currentMaxPrice;

        setCurrentMinPrice(newCurrentMin);
        setMinInputValue(newCurrentMin);
      } else {
        let newCurrentMax = Number((currentMaxPrice + fivePercentValue).toFixed(0));

        if (newCurrentMax > totalMaxPrice) newCurrentMax = totalMaxPrice;

        setCurrentMaxPrice(newCurrentMax);
        setMaxInputValue(newCurrentMax);
      }
    } else if (e.code === 'PageDown') {
      e.preventDefault();
      setFormWasInteracted(true);

      const fivePercentValue = (totalMaxPrice - totalMinPrice) * 0.05;

      if (buttonType === 'min') {
        let newCurrentMin = Number((currentMinPrice - fivePercentValue).toFixed(0));

        if (newCurrentMin < totalMinPrice) newCurrentMin = totalMinPrice;

        setCurrentMinPrice(newCurrentMin);
        setMinInputValue(newCurrentMin);
      } else {
        let newCurrentMax = Number((currentMaxPrice - fivePercentValue).toFixed(0));

        if (newCurrentMax < currentMinPrice) newCurrentMax = currentMinPrice;

        setCurrentMaxPrice(newCurrentMax);
        setMaxInputValue(newCurrentMax);
      }
    } else if (e.code === 'Home') {
      e.preventDefault();
      setFormWasInteracted(true);

      if (buttonType === 'min') {
        const newCurrentMin = currentMaxPrice;

        setCurrentMinPrice(newCurrentMin);
        setMinInputValue(newCurrentMin);
      } else {
        const newCurrentMax = totalMaxPrice;

        setCurrentMaxPrice(newCurrentMax);
        setMaxInputValue(newCurrentMax);
      }
    } else if (e.code === 'End') {
      e.preventDefault();
      setFormWasInteracted(true);

      if (buttonType === 'min') {
        const newCurrentMin = totalMinPrice;

        setCurrentMinPrice(newCurrentMin);
        setMinInputValue(newCurrentMin);
      } else {
        const newCurrentMax = currentMinPrice;

        setCurrentMaxPrice(newCurrentMax);
        setMaxInputValue(newCurrentMax);
      }
    }
  }

  return (
    <form
      onSubmit={formOnSubmit}
      className={filterCls.form}
    >
      <button
        type="button"
        className={filterCls.titleButton}
        onClick={() => setIsClose(!isClosed)}
        aria-label={isClosed ? 'Розкрити меню фільтрів Ціна' : 'Згорнути меню фільтрів Ціна'}
      >
        <p className={classNames(
          textCls.text,
          textCls.textFw700,
          filterCls.title,
        )}
        >
          Ціна, ₴
        </p>
        <ChevronUp className={classNames(
          filterCls.chevron,
          isClosed && filterCls.chevron_transformed,
        )}
        />
      </button>
      <div
        ref={contentRef}
        className={filterCls.content}
        style={{ display: isClosed ? 'none' : '' }}
      >
        <div className={filterCls.roundButtonBlock}>
          <span
            ref={mainLineRef}
            className={filterCls.mainLine}
          />
          <span
            ref={activeLineRef}
            className={filterCls.activeLine}
          />
          <button
            ref={minButtonRef}
            onPointerDown={roundButtonOnDown}
            onKeyDown={roundButtonOnKeyDown}
            type="submit"
            data-button-type="min"
            className={filterCls.roundButton}
            style={{ left: `${minButtonLeft}%` }}
            role="slider"
            aria-valuemin={totalMinPrice}
            aria-valuemax={currentMaxPrice}
            aria-valuenow={currentMinPrice}
            aria-label="Повзунок мінімальної ціни товару"
          />
          <button
            ref={maxButtonRef}
            onPointerDown={roundButtonOnDown}
            onKeyDown={roundButtonOnKeyDown}
            type="submit"
            data-button-type="max"
            className={filterCls.roundButton}
            style={{ left: `${maxButtonLeft}%` }}
            role="slider"
            aria-valuemin={currentMinPrice}
            aria-valuemax={totalMaxPrice}
            aria-valuenow={currentMaxPrice}
            aria-label="Повзунок максимальної ціни товару"
          />
        </div>
        <div className={filterCls.inputBlock}>
          <input
            onInput={inputOnInput}
            onKeyDown={inputOnKeyDown}
            type="number"
            name="minPrice"
            className={filterCls.input}
            value={minInputValue}
            min={totalMinPrice}
            max={currentMaxPrice}
            aria-label="Введіть мінімальну ціну товару"
          />
          <span className={filterCls.inputBlockSpan}>-</span>
          <input
            onInput={inputOnInput}
            onKeyDown={inputOnKeyDown}
            type="number"
            name="maxPrice"
            className={filterCls.input}
            value={maxInputValue}
            min={currentMinPrice}
            max={totalMaxPrice}
            aria-label="Введіть максимальну ціну товару"
          />
        </div>
      </div>
    </form>
  );
}
