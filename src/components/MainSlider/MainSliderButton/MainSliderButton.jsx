import classNames from 'classnames';
import sliderButtonCls from './MainSliderButton.module.scss';
import Arrow from './images/arrow.svg';

export default function SliderButton({ id, isInactive, isRight }) {
  return (
    <button
      type="button"
      className={classNames(sliderButtonCls.button, isInactive && sliderButtonCls.button_inactive)}
      id={id}
      disabled={isInactive}
    >
      <Arrow
        className={classNames(sliderButtonCls.arrow, isRight && sliderButtonCls.arrow_right)}
      />
    </button>
  );
}
