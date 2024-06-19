import { useState, useMemo } from 'react';
import classNames from 'classnames';
import containerCls from '../../scss/_container.module.scss';
import mainSliderCls from './MainSlider.module.scss';
import Slide from './MainSliderSlide/MainSliderSlide';
import SliderButton from './MainSliderButton/MainSliderButton';
import Slider from '../common/Slider/Slider';

const MainSlider: React.FC = () => {
  const [activeSlideId, setActiveSlideId] = useState<number>(0);

  const slides = useMemo(() => [
    <Slide
      to="/delivery"
      className={mainSliderCls.slide_1}
      alt="Дізнатися докладніше про умови доставки та пункти видачі"
      linkText="Детальніше"
      key={mainSliderCls.slide_1}
    >
      Замов онлайн —
      <br />
      забери в пункті
      <br />
      видачі
    </Slide>,
    <Slide
      to="/"
      className={mainSliderCls.slide_2}
      alt="Дізнатись детальніше про співпрацю з оптовиками"
      linkText="Детальніше"
      key={mainSliderCls.slide_2}
    >
      Працюємо з
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
          gap={1.5}
        />
      </div>
    </section>
  );
};

export default MainSlider;
