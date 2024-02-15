import classNames from 'classnames';
import containerCls from '../../scss/_container.module.scss';
import mainSliderCls from './MainSlider.module.scss';
import Slide from './MainSliderSlide/MainSliderSlide.jsx';
import SliderButton from './MainSliderButton/MainSliderButton.jsx';

export default function MainSlider() {
  const slides = [
    <Slide to="/" alt="Узнать подробнее" linkText="Узнать подробнее">
      Закажи онлайн —
      <br />
      забери в пункте
      <br />
      выдачи
    </Slide>,
  ];

  return (
    <section className={classNames(containerCls.container, mainSliderCls.mainSlider)}>
      <div className={mainSliderCls.slider}>
        <Slide to="/" alt="Узнать подробнее" linkText="Узнать подробнее">
          Закажи онлайн —
          <br />
          забери в пункте
          <br />
          выдачи
        </Slide>
        <div className={mainSliderCls.buttonBlock}>
          <SliderButton />
          <SliderButton isRight />
        </div>
      </div>
    </section>
  );
}
