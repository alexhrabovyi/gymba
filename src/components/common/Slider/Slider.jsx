/* eslint-disable consistent-return */
import {
  useEffect, useState, memo, useRef,
} from 'react';
import sliderCls from './Slider.module.scss';

const Slider = memo(({
  slides,
  gap,
  initActiveSlideId = 0,
  perView = 1,
  btnPrevDetails,
  btnNextDetails,
}) => {
  const [activeSlideId, setActiveSlideId] = useState(+initActiveSlideId);
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  const slideWidth = (100 - +gap * (+perView - 1)) / +perView;
  const gridTemplateColumns = `repeat(${slides.length}, ${slideWidth}%)`;
  const translateValue = -(activeSlideId * slideWidth + activeSlideId * +gap);

  useEffect(() => {
    if (!btnPrevDetails) return;

    btnPrevDetails.toggleInactive(false);
    btnNextDetails.toggleInactive(false);

    if (activeSlideId === 0) {
      btnPrevDetails.toggleInactive(true);
    } else if (activeSlideId === slides.length - perView) {
      btnNextDetails.toggleInactive(true);
    }
  }, [btnPrevDetails, btnNextDetails, activeSlideId, slides, perView]);

  useEffect(() => {
    if (!btnPrevDetails) return;

    function prevCallback() {
      setActiveSlideId((prevActiveId) => prevActiveId - 1);
    }

    function nextCallback() {
      setActiveSlideId((prevActiveId) => prevActiveId + 1);
    }

    const btnPrev = document.getElementById(btnPrevDetails.id);
    const btnNext = document.getElementById(btnNextDetails.id);

    btnPrev.addEventListener('click', prevCallback);
    btnNext.addEventListener('click', nextCallback);

    return () => {
      if (!btnPrevDetails) return;

      btnPrev.removeEventListener('click', prevCallback);
      btnNext.removeEventListener('click', nextCallback);
    };
  }, [btnPrevDetails, btnNextDetails, slides]);

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

      wrapper.setPointerCapture(e.pointerId);

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
        wrapper.removeEventListener('pointermove', onPointerMove);
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

      wrapper.addEventListener('pointermove', onPointerMove);
      wrapper.addEventListener('pointerup', onPointerUp, { once: true });
    }

    wrapper.addEventListener('pointerdown', onPointerDown);

    return () => {
      wrapper.removeEventListener('pointerdown', onPointerDown);
    };
  }, [slides, activeSlideId, perView]);

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
