import classNames from 'classnames';
import buttonCls from './BigPrevNextButton.module.scss';
import BigChevronRight from '../../../assets/images/icons/bigChevronRight.svg';

export default function BigPrevNextButton({
  className, isInactive, isPrev = false, id, onClick, label,
}) {
  if (!label && isPrev) {
    label = 'Показати попередній слайд';
  } else if (!label && !isPrev) {
    label = 'Показати наступний слайд';
  }

  return (
    <button
      id={id}
      type="button"
      className={
        classNames(
          className,
          buttonCls.button,
          isPrev && buttonCls.button_prev,
          isInactive && buttonCls.button_disabled,
        )
      }
      onClick={onClick}
      aria-hidden={isInactive}
      disabled={isInactive}
      aria-label={label}
    >
      <BigChevronRight
        className={buttonCls.chevronIcon}
      />
    </button>
  );
}
