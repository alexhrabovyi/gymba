import {
  useCallback, useLayoutEffect, useRef, useState,
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

  const [isClosed, setIsClose] = useState(false);
  const [formWasInteracted, setFormWasInteracted] = useState(false);
  const [totalMinPrice, setTotalMinPrice] = useState(null);
  const [totalMaxPrice, setTotalMaxPrice] = useState(null);
  const [currentMinPrice, setCurrentMinPrice] = useState();
  const [currentMaxPrice, setCurrentMaxPrice] = useState(null);
  const [minInputValue, setMinInputValue] = useState('');
  const [maxInputValue, setMaxInputValue] = useState('');
  const [minButtonLeft, setMinButtonLeft] = useState(null);
  const [maxButtonLeft, setMaxButtonLeft] = useState(null);

  const currentMinPriceRef = useRef(null);
  const currentMaxPriceRef = useRef(null);

  const contentRef = useRef(null);
  const mainLineRef = useRef(null);
  const activeLineRef = useRef(null);
  const minButtonRef = useRef(null);
  const maxButtonRef = useRef(null);

  const loaderMinPrice = Number(loaderData.minPrice);
  const loaderMaxPrice = Number(loaderData.maxPrice);

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
      currentMinPriceRef.current = result;
    } else {
      let result = (((leftInPercent - roundButtonWidthInPercent)
        / availableMainLineWidth) * minMaxDiff) + totalMinPrice;
      result = Number(result.toFixed());

      setCurrentMaxPrice(result);
      setMaxInputValue(result);
      currentMaxPriceRef.current = result;
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
        currentMinPriceRef.current = value;
      } else {
        setMaxInputValue(value);
        setCurrentMaxPrice(value);
        currentMaxPriceRef.current = value;
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
        currentMinPriceRef.current = newCurrentMin;
      } else {
        let newCurrentMax = currentMaxPrice + 1;

        if (newCurrentMax > totalMaxPrice) newCurrentMax = totalMaxPrice;

        setCurrentMaxPrice(newCurrentMax);
        setMaxInputValue(newCurrentMax);
        currentMaxPriceRef.current = newCurrentMax;
      }
    } else if (e.code === 'ArrowDown' || e.code === 'ArrowLeft') {
      e.preventDefault();
      setFormWasInteracted(true);

      if (buttonType === 'min') {
        let newCurrentMin = currentMinPrice - 1;

        if (newCurrentMin < totalMinPrice) newCurrentMin = totalMinPrice;

        setCurrentMinPrice(newCurrentMin);
        setMinInputValue(newCurrentMin);
        currentMinPriceRef.current = newCurrentMin;
      } else {
        let newCurrentMax = currentMaxPrice - 1;

        if (newCurrentMax < currentMinPrice) newCurrentMax = currentMinPrice;

        setCurrentMaxPrice(newCurrentMax);
        setMaxInputValue(newCurrentMax);
        currentMaxPriceRef.current = newCurrentMax;
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
        currentMinPriceRef.current = newCurrentMin;
      } else {
        let newCurrentMax = Number((currentMaxPrice + fivePercentValue).toFixed(0));

        if (newCurrentMax > totalMaxPrice) newCurrentMax = totalMaxPrice;

        setCurrentMaxPrice(newCurrentMax);
        setMaxInputValue(newCurrentMax);
        currentMaxPriceRef.current = newCurrentMax;
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
        currentMinPriceRef.current = newCurrentMin;
      } else {
        let newCurrentMax = Number((currentMaxPrice - fivePercentValue).toFixed(0));

        if (newCurrentMax < currentMinPrice) newCurrentMax = currentMinPrice;

        setCurrentMaxPrice(newCurrentMax);
        setMaxInputValue(newCurrentMax);
        currentMaxPriceRef.current = newCurrentMax;
      }
    } else if (e.code === 'Home') {
      e.preventDefault();
      setFormWasInteracted(true);

      if (buttonType === 'min') {
        const newCurrentMin = currentMaxPrice;

        setCurrentMinPrice(newCurrentMin);
        setMinInputValue(newCurrentMin);
        currentMinPriceRef.current = newCurrentMin;
      } else {
        const newCurrentMax = totalMaxPrice;

        setCurrentMaxPrice(newCurrentMax);
        setMaxInputValue(newCurrentMax);
        currentMaxPriceRef.current = newCurrentMax;
      }
    } else if (e.code === 'End') {
      e.preventDefault();
      setFormWasInteracted(true);

      if (buttonType === 'min') {
        const newCurrentMin = totalMinPrice;

        setCurrentMinPrice(newCurrentMin);
        setMinInputValue(newCurrentMin);
        currentMinPriceRef.current = newCurrentMin;
      } else {
        const newCurrentMax = currentMinPrice;

        setCurrentMaxPrice(newCurrentMax);
        setMaxInputValue(newCurrentMax);
        currentMaxPriceRef.current = newCurrentMax;
      }
    }
  }

  const formUninteractedOnLoaderPriceChange = useCallback(() => {
    if (!formWasInteracted) {
      const contentBlock = contentRef.current;
      contentBlock.style.opacity = '';
      contentBlock.style.pointerEvents = '';

      setTotalMinPrice(loaderMinPrice);
      setTotalMaxPrice(loaderMaxPrice);

      if (searchParams.has('minPrice')) {
        const searchParamsMinPrice = Number(searchParams.get('minPrice'));
        const searchParamsMaxPrice = Number(searchParams.get('maxPrice'));

        setCurrentMinPrice(searchParamsMinPrice);
        setCurrentMaxPrice(searchParamsMaxPrice);

        setMinInputValue(searchParamsMinPrice);
        setMaxInputValue(searchParamsMaxPrice);

        currentMinPriceRef.current = searchParamsMinPrice;
        currentMaxPriceRef.current = searchParamsMaxPrice;
      } else {
        setCurrentMinPrice(loaderMinPrice);
        setCurrentMaxPrice(loaderMaxPrice);

        setMinInputValue(loaderMinPrice);
        setMaxInputValue(loaderMaxPrice);

        currentMinPriceRef.current = loaderMinPrice;
        currentMaxPriceRef.current = loaderMaxPrice;
      }

      if (loaderMinPrice === loaderMaxPrice) {
        contentBlock.style.opacity = '0.5';
        contentBlock.style.pointerEvents = 'none';
      }
    }
  }, [formWasInteracted, searchParams, loaderMinPrice, loaderMaxPrice]);

  useLayoutEffect(formUninteractedOnLoaderPriceChange, [formUninteractedOnLoaderPriceChange]);

  const formInteractedOnLoaderPriceChange = useCallback(() => {
    if (!formWasInteracted) return;

    if (loaderMinPrice > currentMinPriceRef.current) {
      setTotalMinPrice(currentMinPriceRef.current);
    } else {
      setTotalMinPrice(loaderMinPrice);
    }

    if (loaderMaxPrice < currentMaxPriceRef.current) {
      setTotalMaxPrice(currentMaxPriceRef.current);
    } else {
      setTotalMaxPrice(loaderMaxPrice);
    }
  }, [formWasInteracted, loaderMinPrice, loaderMaxPrice]);

  useLayoutEffect(formInteractedOnLoaderPriceChange, [formInteractedOnLoaderPriceChange]);

  const calcAndUpdateButtonsLeft = useCallback(() => {
    calcAndUpdateButtonLeft('min', currentMinPrice);
    calcAndUpdateButtonLeft('max', currentMaxPrice);
  }, [currentMinPrice, currentMaxPrice, calcAndUpdateButtonLeft]);

  useLayoutEffect(calcAndUpdateButtonsLeft, [calcAndUpdateButtonsLeft]);

  const setupActiveLineStyles = useCallback(() => {
    const width = maxButtonLeft - minButtonLeft;
    const left = minButtonLeft;

    activeLineRef.current.style.width = `${width}%`;
    activeLineRef.current.style.left = `${left}%`;
  }, [minButtonLeft, maxButtonLeft]);

  useLayoutEffect(setupActiveLineStyles, [setupActiveLineStyles]);

  const onNavigate = useCallback(() => {
    if (navigation.state === 'loading') {
      const urlSearchParams = new URLSearchParams(navigation.location.search);

      if (urlSearchParams.has('minPrice')) {
        const searchParamsMinPrice = Number(urlSearchParams.get('minPrice'));
        const searchParamsMaxPrice = Number(urlSearchParams.get('maxPrice'));

        if (searchParamsMinPrice !== currentMinPrice) {
          setCurrentMinPrice(searchParamsMinPrice);
          setMinInputValue(searchParamsMinPrice);
          currentMinPriceRef.current = searchParamsMinPrice;
        }

        if (searchParamsMaxPrice !== currentMaxPrice) {
          setCurrentMaxPrice(searchParamsMaxPrice);
          setMaxInputValue(searchParamsMaxPrice);
          currentMaxPriceRef.current = searchParamsMaxPrice;
        }
      } else if (new URLSearchParams(navigation.location.search).size === 0) {
        setFormWasInteracted(false);
      }
    }
  }, [navigation, currentMinPrice, currentMaxPrice]);

  useLayoutEffect(onNavigate, [onNavigate]);

  return (
    <form
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
