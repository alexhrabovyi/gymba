import classNames from 'classnames';
import sliderButtonCls from './MainSliderButton.module.scss';
import ChevronRight from '../../../assets/images/icons/chevronRight.svg';

export default function SliderButton({ isInactive, isRight, onClick }) {
  const label = !isRight ? 'Показати попередній слайд' : 'Показати наступний слайд';

  return (
    <button
      type="button"
      className={classNames(sliderButtonCls.button, isInactive && sliderButtonCls.button_inactive)}
      disabled={isInactive}
      onClick={onClick}
      aria-label={label}
    >
      <ChevronRight
        className={classNames(sliderButtonCls.arrow, isRight && sliderButtonCls.arrow_right)}
      />
    </button>
  );
}
