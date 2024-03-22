import { useState, useMemo } from 'react';
import classNames from 'classnames';
import containerCls from '../../scss/_container.module.scss';
import mainSliderCls from './MainSlider.module.scss';
import Slide from './MainSliderSlide/MainSliderSlide.jsx';
import SliderButton from './MainSliderButton/MainSliderButton.jsx';
import Slider from '../common/Slider/Slider.jsx';

export default function MainSlider() {
  const [activeSlideId, setActiveSlideId] = useState(0);

  const slides = useMemo(() => [
    <Slide
      to="/amogus"
      className={mainSliderCls.slide_1}
      alt="Узнать подробнее об условиях доставки и пунктах выдачи"
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
      className={mainSliderCls.slide_2}
      alt="Узнать подробнее о работе с оптовиками"
      linkText="Узнать подробнее"
      key={mainSliderCls.slide_2}
    >
      Работаем с
      <br />
      оптовиками
    </Slide>,
  ], []);

  return (
    <section className={classNames(containerCls.container, mainSliderCls.mainSlider)}>
      <div className={mainSliderCls.slider}>
        <div className={mainSliderCls.buttonBlock}>
          <SliderButton
            isInactive={activeSlideId === 0}
            onClick={() => setActiveSlideId((id) => id - 1)}
          />
          <SliderButton
            isInactive={activeSlideId === slides.length - 1}
            isRight
            onClick={() => setActiveSlideId((id) => id + 1)}
          />
        </div>
        <Slider
          activeSlideId={activeSlideId}
          setActiveSlideId={setActiveSlideId}
          slides={slides}
          gap="1.5"
        />
      </div>
    </section>
  );
}
