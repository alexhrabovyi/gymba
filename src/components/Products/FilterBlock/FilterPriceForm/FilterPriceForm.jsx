/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  useCallback, useEffect, useLayoutEffect, useRef, useState,
} from 'react';
import { useLoaderData, useNavigation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import textCls from '../../../../scss/_text.module.scss';
import filterCls from './FilterPriceForm.module.scss';
import Chevron from './images/chevron.svg';

export default function FilterPriceForm() {
  const loaderData = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigation();

  const [totalMinPrice, setTotalMinPrice] = useState(null);
  const [totalMaxPrice, setTotalMaxPrice] = useState(null);

  const [isClosed, setIsClose] = useState(false);
  const [formWasInteracted, setFormWasInteracted] = useState(false);
  const [minInputValue, setMinInputValue] = useState('');
  const [maxInputValue, setMaxInputValue] = useState('');
  const [currentMinPrice, setCurrentMinPrice] = useState(null);
  const [currentMaxPrice, setCurrentMaxPrice] = useState(null);
  const [minButtonLeft, setMinButtonLeft] = useState(null);
  const [maxButtonLeft, setMaxButtonLeft] = useState(null);

  const formRef = useRef(null);
  const contentRef = useRef(null);
  const minButtonRef = useRef(null);
  const maxButtonRef = useRef(null);
  const mainLineRef = useRef(null);
  const activeLineRef = useRef(null);

  const getTotalPrices = useCallback(() => {
    setTotalMinPrice(Number(loaderData.minPrice));
    setTotalMaxPrice(Number(loaderData.maxPrice));
  }, [loaderData]);

  useLayoutEffect(getTotalPrices, [getTotalPrices]);

  const checkOnTotalPricesChange = useCallback(() => {
    console.log(totalMinPrice);

    if (totalMinPrice === Number(loaderData.minPrice)) {
      if (totalMinPrice > currentMinPrice) setTotalMinPrice(currentMinPrice);
    }

    if (totalMaxPrice === Number(loaderData.maxPrice)) {
      if (totalMaxPrice < currentMaxPrice) setTotalMaxPrice(currentMaxPrice);
    }
  }, [totalMinPrice, totalMaxPrice, currentMinPrice, currentMaxPrice, loaderData]);

  useLayoutEffect(checkOnTotalPricesChange, [checkOnTotalPricesChange]);

  const onNavigate = useCallback(() => {
    if (navigation.state === 'loading') {
      const urlSearchParams = new URLSearchParams(navigation.location.search);

      if (urlSearchParams.has('minPrice')) {
        const searchParamsMinPrice = Number(urlSearchParams.get('minPrice'));
        const searchParamsMaxPrice = Number(urlSearchParams.get('maxPrice'));

        if (searchParamsMinPrice !== currentMinPrice) {
          setCurrentMinPrice(searchParamsMinPrice);
          setMinInputValue(searchParamsMinPrice);
        }

        if (searchParamsMaxPrice !== currentMaxPrice) {
          setCurrentMinPrice(currentMaxPrice);
          setMaxInputValue(currentMaxPrice);
        }
      }
    }
  }, [navigation, currentMinPrice, currentMaxPrice]);

  useLayoutEffect(onNavigate, [onNavigate]);

  const getMainLinePxWidth = useCallback(() => {
    const mainLine = mainLineRef.current;

    return mainLine.offsetWidth;
  }, []);

  function getMainLineLeftCoord() {
    const mainLine = mainLineRef.current;

    return mainLine.getBoundingClientRect().left;
  }

  const getRoundButtonPercentWidth = useCallback(() => {
    const roundButton = minButtonRef.current;
    const roundButtonPxWidth = roundButton.offsetWidth;
    const mainLinePxWidth = getMainLinePxWidth();

    const roundButtonPercentWidth = (roundButtonPxWidth / mainLinePxWidth) * 100;
    return roundButtonPercentWidth;
  }, [getMainLinePxWidth]);

  // let totalMinPrice = Number(loaderData.minPrice);
  // let totalMaxPrice = Number(loaderData.maxPrice);

  if (!formWasInteracted) {
    if (searchParams.has('minPrice')) {
      const searchParamsMinPrice = Number(searchParams.get('minPrice'));
      const searchParamsMaxPrice = Number(searchParams.get('maxPrice'));

      if (currentMinPrice !== searchParamsMinPrice) {
        setCurrentMinPrice(searchParamsMinPrice);
        setMinInputValue(searchParamsMinPrice);
      }
      if (currentMaxPrice !== searchParamsMaxPrice) {
        setCurrentMaxPrice(searchParamsMaxPrice);
        setMaxInputValue(searchParamsMaxPrice);
      }
    } else {
      if (currentMinPrice !== totalMinPrice) {
        setCurrentMinPrice(totalMinPrice);
        setMinInputValue(totalMinPrice);
      }
      if (currentMaxPrice !== totalMaxPrice) {
        setCurrentMaxPrice(totalMaxPrice);
        setMaxInputValue(totalMaxPrice);
      }
    }
  } else {
    // if (totalMinPrice > currentMinPrice) totalMinPrice = currentMinPrice;
    // if (totalMaxPrice < currentMaxPrice) totalMaxPrice = currentMaxPrice;
  }

  const calcButtonLeft = useCallback((buttonType, value) => {
    const roundButtonWidthInPercent = getRoundButtonPercentWidth();
    const availableMainLineWidth = 100 - roundButtonWidthInPercent * 2;
    const minMaxPriceDiff = totalMaxPrice - totalMinPrice;
    const valueInPercent = ((value - totalMinPrice) / minMaxPriceDiff);

    if (buttonType === 'min') {
      const buttonLeft = valueInPercent * availableMainLineWidth;

      setMinButtonLeft(Number(buttonLeft.toFixed(2)));
    } else if (buttonType === 'max') {
      const buttonLeft = valueInPercent * availableMainLineWidth + roundButtonWidthInPercent;

      setMaxButtonLeft(Number(buttonLeft.toFixed(2)));
    }
  }, [getRoundButtonPercentWidth, totalMinPrice, totalMaxPrice]);

  const calcButtonsLeft = useCallback(() => {
    if (!formWasInteracted) {
      const contentBlock = contentRef.current;
      contentBlock.style.opacity = '';
      contentBlock.style.pointerEvents = '';

      if (currentMinPrice === currentMaxPrice) {
        contentBlock.style.opacity = '0.5';
        contentBlock.style.pointerEvents = 'none';
      }
    }

    calcButtonLeft('min', currentMinPrice);
    calcButtonLeft('max', currentMaxPrice);
  }, [
    formWasInteracted,
    currentMinPrice,
    currentMaxPrice,
    calcButtonLeft,
  ]);

  useLayoutEffect(calcButtonsLeft, [calcButtonsLeft]);

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
      const mainLineLeftCoord = getMainLineLeftCoord();
      const cursorCoordXOnMove = onMoveEvent.clientX;
      const buttonLeftInPx = cursorCoordXOnMove - mainLineLeftCoord - cursorDiff;

      let buttonLeftInPercent = (buttonLeftInPx / getMainLinePxWidth()) * 100;

      if (buttonLeftInPercent < minLeft) {
        buttonLeftInPercent = minLeft;
      } else if (buttonLeftInPercent > maxLeft) {
        buttonLeftInPercent = maxLeft;
      }

      buttonLeftInPercent = Number(buttonLeftInPercent.toFixed(2));

      if (buttonType === 'min') {
        setMinButtonLeft(buttonLeftInPercent);
      } else {
        setMaxButtonLeft(buttonLeftInPercent);
      }

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

  const setupActiveLineStyles = useCallback(() => {
    const width = maxButtonLeft - minButtonLeft;
    const left = minButtonLeft;

    activeLineRef.current.style.width = `${width}%`;
    activeLineRef.current.style.left = `${left}%`;
  }, [minButtonLeft, maxButtonLeft]);

  useLayoutEffect(setupActiveLineStyles, [setupActiveLineStyles]);

  return (
    <form
      ref={formRef}
      onSubmit={formOnSubmit}
      className={filterCls.form}
    >
      <button
        type="button"
        className={filterCls.titleButton}
        onClick={() => setIsClose(!isClosed)}
        aria-label={isClosed ? 'Расскрыть меню фильтров Цена' : 'Свернуть меню фильтров Цена'}
      >
        <p className={classNames(
          textCls.text,
          textCls.textFw700,
          filterCls.title,
        )}
        >
          Цена, ₴
        </p>
        <Chevron className={classNames(
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
            type="submit"
            data-button-type="min"
            className={filterCls.roundButton}
            style={{ left: `${minButtonLeft}%` }}
          />
          <button
            ref={maxButtonRef}
            onPointerDown={roundButtonOnDown}
            type="submit"
            data-button-type="max"
            className={filterCls.roundButton}
            style={{ left: `${maxButtonLeft}%` }}
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
          />
          <span className={filterCls.inputBlockSpan}>-</span>
          <input
            onInput={inputOnInput}
            onKeyDown={inputOnKeyDown}
            type="number"
            name="maxPrice"
            className={filterCls.input}
            value={maxInputValue}
          />
        </div>
      </div>
    </form>
  );
}
