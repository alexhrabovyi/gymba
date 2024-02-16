import { useState, useMemo } from 'react';
import classNames from 'classnames';
import containerCls from '../../scss/_container.module.scss';
import mainSliderCls from './MainSlider.module.scss';
import Slide from './MainSliderSlide/MainSliderSlide.jsx';
import SliderButton from './MainSliderButton/MainSliderButton.jsx';
import Slider from '../common/Slider/Slider.jsx';

export default function MainSlider() {
  const [isPrevBtnInactive, setIsPrevBtnInactive] = useState(true);
  const [isNextBtnInactive, setIsNextBtnInactive] = useState(false);

  console.log('MainSlider rendered');

  const slides = useMemo(() => [
    <Slide
      to="/amogus"
      className={mainSliderCls.slide_1}
      alt="Узнать подробнее"
      linkText="Узнать подробнее"
      key={mainSliderCls.slide_1}
    >
      Закажи онлайн —
      <br />
      забери в пункте
      <br />
      выдачи
    </Slide>,
    <Slide
      to="/"
      className={mainSliderCls.slide_3}
      alt="Узнать подробнее"
      linkText="Узнать подробнее"
      key={mainSliderCls.slide_3}
    >
      Закажи онлайн —
      <br />
      забери в пункте
      <br />
      выдачи
    </Slide>,
    <Slide
      to="/"
      className={mainSliderCls.slide_2}
      alt="Узнать подробнее"
      linkText="Узнать подробнее"
      key={mainSliderCls.slide_2}
    >
      Закажи онлайн —
      <br />
      забери в пункте
      <br />
      выдачи
    </Slide>,
  ], []);

  const btnPrevId = 'mainSliderBtnPrev';
  const btnNextId = 'mainSliderBtnNext';

  const btnPrevDetails = useMemo(() => ({
    id: btnPrevId,
    toggleInactive: setIsPrevBtnInactive,
  }), []);

  const btnNextDetails = useMemo(() => ({
    id: btnNextId,
    toggleInactive: setIsNextBtnInactive,
  }), []);

  return (
    <section className={classNames(containerCls.container, mainSliderCls.mainSlider)}>
      <div className={mainSliderCls.slider}>
        <Slider
          slides={slides}
          gap="1.5"
          btnPrevDetails={btnPrevDetails}
          btnNextDetails={btnNextDetails}
        />
        <div className={mainSliderCls.buttonBlock}>
          <SliderButton id={btnPrevId} isInactive={isPrevBtnInactive} />
          <SliderButton id={btnNextId} isInactive={isNextBtnInactive} isRight />
        </div>
      </div>
    </section>
  );
}
