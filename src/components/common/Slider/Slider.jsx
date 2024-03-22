/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable consistent-return */
import { useEffect, memo, useRef } from 'react';
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

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    const lastSlide = wrapper.lastElementChild;

    function onPointerDown(e) {
      e.preventDefault();

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
          if (finalpointerXCoordDiff < 0) {
            setActiveSlideId((prevSlideId) => prevSlideId + 1);
          } else if (finalpointerXCoordDiff > 0) {
            setActiveSlideId((prevSlideId) => prevSlideId - 1);
          }
        } else if (newTranslateValue > 0 && activeSlideId !== 0) {
          setActiveSlideId(0);
        } else if (
          lastSlideRightCoord < containerRightCoord
          && activeSlideId !== slides.length - 1
        ) {
          const newSlideId = slides.length - perView;
          if (newSlideId === activeSlideId) {
            wrapper.style.transform = initialTranslateValueInPercents;
          } else {
            setActiveSlideId(slides.length - perView);
          }
        } else {
          wrapper.style.transform = initialTranslateValueInPercents;
        }
      }

      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup', onPointerUp, { once: true });
    }

    wrapper.addEventListener('pointerdown', onPointerDown);

    return () => {
      wrapper.removeEventListener('pointerdown', onPointerDown);
    };
  }, [slides, activeSlideId, setActiveSlideId, perView]);

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
      >
        {slides}
      </div>
    </div>
  );
});

export default Slider;
