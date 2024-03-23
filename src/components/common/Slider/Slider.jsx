/* eslint-disable react-hooks/exhaustive-deps */
import {
  memo, useCallback, useEffect, useRef,
} from 'react';
import sliderCls from './Slider.module.scss';

const Slider = memo(({
  activeSlideId,
  setActiveSlideId,
  slides,
  gap,
  perView = 1,
}) => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  const slideWidth = (100 - +gap * (+perView - 1)) / +perView;
  const gridTemplateColumns = `repeat(${slides.length}, ${slideWidth}%)`;
  const translateValue = -(activeSlideId * slideWidth + activeSlideId * +gap);

  const addIdToSlides = useCallback(() => {
    const slideElements = Array.from(wrapperRef.current.children);

    slideElements.forEach((slide, i) => slide.setAttribute('data-slide-id', i));
  }, [slides]);

  useEffect(addIdToSlides, [addIdToSlides]);

  function onPointerDown(e) {
    e.preventDefault();

    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    const lastSlide = wrapper.lastElementChild;

    const initialTranslateValueInPercents = wrapper.style.transform;

    wrapper.style.transitionDuration = '0s';

    const pointerDownXCoord = e.clientX;

    const containerLeftCoord = container.getBoundingClientRect().left;
    const wrapperLeftCoord = wrapper.getBoundingClientRect().left;

    const initTranslateValue = wrapperLeftCoord - containerLeftCoord;

    let previousTranslateValue;
    let newTranslateValue;

    function onPointerMove(onPointerMoveEvent) {
      const pointerMoveXCoord = onPointerMoveEvent.clientX;
      const pointerXCoordDiff = pointerMoveXCoord - pointerDownXCoord;

      newTranslateValue = initTranslateValue + pointerXCoordDiff;

      const lastSlideRightCoord = lastSlide.getBoundingClientRect().right;
      const containerRightCoord = container.getBoundingClientRect().right;

      if (newTranslateValue > 0) {
        newTranslateValue /= 4;
      } else if (Math.floor(lastSlideRightCoord) < Math.floor(containerRightCoord)) {
        newTranslateValue = (newTranslateValue
          - previousTranslateValue) / 4 + previousTranslateValue;
      } else {
        previousTranslateValue = newTranslateValue;
      }

      wrapper.style.transform = `translateX(${newTranslateValue}px)`;
    }

    function onPointerUp(onPointerUpEvent) {
      document.removeEventListener('pointermove', onPointerMove);
      wrapper.style.transitionDuration = '1s';

      const minDiff = container.offsetWidth * 0.05;

      const pointerUpXCoord = onPointerUpEvent.clientX;
      const finalpointerXCoordDiff = pointerUpXCoord - pointerDownXCoord;

      const lastSlideRightCoord = lastSlide.getBoundingClientRect().right;
      const containerRightCoord = container.getBoundingClientRect().right;

      if (
        Math.abs(finalpointerXCoordDiff) > minDiff
        && newTranslateValue < 0
        && lastSlideRightCoord > containerRightCoord
      ) {
        const containerCoords = container.getBoundingClientRect();
        const containerY = containerCoords.top + 1;

        if (finalpointerXCoordDiff < 0) {
          let containerRightX = containerCoords.right - 1;
          let lastVisibleSlide = document.elementFromPoint(containerRightX, containerY).closest('[data-slide-id]');

          if (!lastVisibleSlide) {
            containerRightX -= containerCoords.width * (+gap / 100);
            lastVisibleSlide = document.elementFromPoint(containerRightX, containerY).closest('[data-slide-id]');
          }

          const lastVisibleSlideId = +lastVisibleSlide.dataset.slideId;
          const newActiveSlideId = lastVisibleSlideId - (perView - 1);

          setActiveSlideId(newActiveSlideId);
        } else if (finalpointerXCoordDiff > 0) {
          let containerLeftX = containerCoords.left + 1;
          let firstVisibleSlide = document.elementFromPoint(containerLeftX, containerY).closest('[data-slide-id]');

          if (!firstVisibleSlide) {
            containerLeftX += containerCoords.width * (+gap / 100);
            firstVisibleSlide = document.elementFromPoint(containerLeftX, containerY).closest('[data-slide-id]');
          }

          const firstVisibleSlideId = +firstVisibleSlide.dataset.slideId;
          setActiveSlideId(firstVisibleSlideId);
        }
      } else if (newTranslateValue > 0 && activeSlideId !== 0) {
        setActiveSlideId(0);
      } else if (
        lastSlideRightCoord < containerRightCoord
        && activeSlideId !== slides.length - perView
      ) {
        setActiveSlideId(slides.length - perView);
      } else {
        wrapper.style.transform = initialTranslateValueInPercents;
      }
    }

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp, { once: true });
  }

  return (
    <div ref={containerRef} className={sliderCls.container}>
      <div
        ref={wrapperRef}
        className={sliderCls.wrapper}
        style={
            {
              gridTemplateColumns,
              gap: `${gap}%`,
              transform: `translateX(${translateValue}%)`,
            }
          }
        onPointerDown={onPointerDown}
      >
        {slides}
      </div>
    </div>
  );
});

export default Slider;
