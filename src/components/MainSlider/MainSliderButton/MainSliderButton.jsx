import classNames from 'classnames';
import sliderButtonCls from './MainSliderButton.module.scss';
import Arrow from './images/arrow.svg';

export default function SliderButton({ isRight }) {
  return (
    <button type="button" className={sliderButtonCls.button}>
      <Arrow
        className={classNames(sliderButtonCls.arrow, isRight && sliderButtonCls.arrow_right)}
      />
    </button>
  );
}
