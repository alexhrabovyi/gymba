import {
  useEffect, useState, memo, useRef,
} from 'react';
import sliderCls from './Slider.module.scss';

const Slider = memo(({
  slides,
  gap,
  initActiveSlideId = 0,
  btnPrevDetails,
  btnNextDetails,
}) => {
  const [activeSlideId, setActiveSlideId] = useState(+initActiveSlideId);
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  const slideAmount = slides.length;
  const translateValue = -(activeSlideId * 100 + activeSlideId * +gap);

  console.log('Slider rendered');

  useEffect(() => {
    console.log('Slider Buttons Inactive UseEffect');

    btnPrevDetails.toggleInactive(false);
    btnNextDetails.toggleInactive(false);

    if (activeSlideId === 0) {
      btnPrevDetails.toggleInactive(true);
    } else if (activeSlideId === slides.length - 1) {
      btnNextDetails.toggleInactive(true);
    }
  }, [btnPrevDetails, btnNextDetails, activeSlideId, slides]);

  useEffect(() => {
    console.log('Slider Buttons OnClick UseEffect');

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
      btnPrev.removeEventListener('click', prevCallback);
      btnNext.removeEventListener('click', nextCallback);
    };
  }, [btnPrevDetails, btnNextDetails, slides]);

  useEffect(() => {
    console.log('Slider Wrapper UseEffect');

    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    const lastSlide = wrapper.lastElementChild;

    function onMouseDown(e) {
      e.preventDefault();

      const initialTranslateValueInPercents = wrapper.style.transform;

      wrapper.style.transitionDuration = '0s';

      const mouseDownXCoord = e.clientX;

      const containerLeftCoord = container.getBoundingClientRect().left;
      const wrapperLeftCoord = wrapper.getBoundingClientRect().left;

      const initTranslateValue = wrapperLeftCoord < 0
        ? wrapperLeftCoord - containerLeftCoord : containerLeftCoord - wrapperLeftCoord;

      let previousTranslateValue;
      let newTranslateValue;

      function onMouseMove(onMouseMoveEvent) {
        const mouseMoveXCoord = onMouseMoveEvent.clientX;
        const mouseXCoordDiff = mouseMoveXCoord - mouseDownXCoord;

        newTranslateValue = initTranslateValue + mouseXCoordDiff;

        const lastSlideRightCoord = lastSlide.getBoundingClientRect().right;
        const containerRightCoord = container.getBoundingClientRect().right;

        if (newTranslateValue > 0) {
          newTranslateValue /= 4;
        } else if (+lastSlideRightCoord.toFixed() < containerRightCoord) {
          newTranslateValue = (newTranslateValue
            - previousTranslateValue) / 4 + previousTranslateValue;
        } else {
          previousTranslateValue = newTranslateValue;
        }

        wrapper.style.transform = `translateX(${newTranslateValue}px)`;
      }

      function onMouseUp(onMouseUpEvent) {
        window.removeEventListener('mousemove', onMouseMove);
        wrapper.style.transitionDuration = '1s';

        const minDiff = container.offsetWidth * 0.05;

        const mouseUpXCoord = onMouseUpEvent.clientX;
        const finalMouseXCoordDiff = mouseUpXCoord - mouseDownXCoord;

        const lastSlideRightCoord = lastSlide.getBoundingClientRect().right;
        const containerRightCoord = container.getBoundingClientRect().right;

        if (
          Math.abs(finalMouseXCoordDiff) > minDiff
          && newTranslateValue < 0
          && lastSlideRightCoord > containerRightCoord
        ) {
          if (finalMouseXCoordDiff < 0) {
            setActiveSlideId((prevSlideId) => {
              let nextSlideId = prevSlideId + 1;
              if (nextSlideId === slides.length) nextSlideId = prevSlideId;

              return nextSlideId;
            });
          } else if (finalMouseXCoordDiff > 0) {
            setActiveSlideId((prevSlideId) => {
              let nextSlideId = prevSlideId - 1;
              if (nextSlideId < 0) nextSlideId = 0;

              return nextSlideId;
            });
          }
        } else {
          wrapper.style.transform = initialTranslateValueInPercents;
        }
      }

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp, { once: true });
    }

    wrapper.addEventListener('mousedown', onMouseDown);

    return () => {
      wrapper.removeEventListener('mousedown', onMouseDown);
    };
  }, [slides]);

  return (
    <div ref={containerRef} className={sliderCls.container}>
      <div
        ref={wrapperRef}
        className={sliderCls.wrapper}
        style={
          {
            gridTemplateColumns: `repeat(${slideAmount}, 100%)`,
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
