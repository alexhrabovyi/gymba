/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  useCallback, useLayoutEffect, useRef, useState,
} from 'react';
import { useLoaderData } from 'react-router-dom';
import classNames from 'classnames';
import textCls from '../../../../scss/_text.module.scss';
import filterCls from './FilterPriceForm.module.scss';
import Chevron from './images/chevron.svg';

export default function FilterPriceForm() {
  const [isClosed, setIsClose] = useState(false);
  const [currentMinPrice, setCurrentMinPrice] = useState(null);
  const [currentMaxPrice, setCurrentMaxPrice] = useState(null);
  const [minButtonLeft, setMinButtonLeft] = useState(0);
  const [maxButtonLeft, setMaxButtonLeft] = useState();
  const { minPrice: totalMinPrice, maxPrice: totalMaxPrice } = useLoaderData();
  const minButtonRef = useRef(null);
  const maxButtonRef = useRef(null);
  const mainLineRef = useRef(null);
  const activeLineRef = useRef(null);

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

  function getMainLineLeftCoord() {
    const mainLine = mainLineRef.current;

    return mainLine.getBoundingClientRect().left;
  }

  useLayoutEffect(() => {
    setMaxButtonLeft(100 - getRoundButtonPercentWidth());
  }, [getRoundButtonPercentWidth]);

  if (currentMinPrice === null) {
    setCurrentMinPrice(totalMinPrice);
    setCurrentMaxPrice(totalMaxPrice);
  }

  function roundButtonOnDown(e) {
    e.preventDefault();

    const { buttonType } = e.target.dataset;
    const button = buttonType === 'min' ? minButtonRef.current : maxButtonRef.current;
    button.style.transition = '';

    let minLeft;
    let maxLeft;

    if (buttonType === 'min') {
      minLeft = 0;
      maxLeft = maxButtonLeft - getRoundButtonPercentWidth();
    } else {
      minLeft = minButtonLeft + getRoundButtonPercentWidth();
      maxLeft = 100 - getRoundButtonPercentWidth();
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

      if (buttonType === 'min') {
        setMinButtonLeft(buttonLeftInPercent);
      } else {
        setMaxButtonLeft(buttonLeftInPercent);
      }
    }

    function roundButtonOnUp() {
      button.removeEventListener('pointermove', roundButtonOnMove);
    }

    button.addEventListener('pointermove', roundButtonOnMove);
    button.addEventListener('pointerup', roundButtonOnUp, { once: true });
  }

  return (
    <form className={filterCls.form}>
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
            type="button"
            data-button-type="min"
            className={filterCls.roundButton}
            style={{
              left: `${minButtonLeft}%`,
              transition: 'all .05s ease-in-out',
            }}
          />
          <button
            ref={maxButtonRef}
            onPointerDown={roundButtonOnDown}
            type="button"
            data-button-type="max"
            className={filterCls.roundButton}
            style={{
              left: `${maxButtonLeft}%`,
              transition: 'all .05s ease-in-out',
            }}
          />
        </div>
        <div className={filterCls.inputBlock}>
          <input
            type="number"
            className={filterCls.input}
            value={currentMinPrice}
          />
          <span className={filterCls.inputBlockSpan}>-</span>
          <input
            type="number"
            className={filterCls.input}
            value={currentMaxPrice}
          />
        </div>
      </div>
    </form>
  );
}
