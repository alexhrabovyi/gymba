import classNames from 'classnames';
import sliderButtonCls from './MainSliderButton.module.scss';
import ChevronRight from '../../../assets/images/icons/chevronRight.svg';

export default function SliderButton({ id, isInactive, isRight }) {
  return (
    <button
      type="button"
      className={classNames(sliderButtonCls.button, isInactive && sliderButtonCls.button_inactive)}
      id={id}
      disabled={isInactive}
      aria-hidden
    >
      <ChevronRight
        className={classNames(sliderButtonCls.arrow, isRight && sliderButtonCls.arrow_right)}
      />
    </button>
  );
}
