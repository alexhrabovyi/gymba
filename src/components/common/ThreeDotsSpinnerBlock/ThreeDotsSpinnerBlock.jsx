/* eslint-disable import/no-unresolved */
import spinnerBlockCls from './ThreeDotsSpinnerBlock.module.scss';
import threeDotsSpinnerSvgSrc from '../../../assets/images/icons/threeDotsSpinner.svg?url';

export default function ThreeDotsSpinnerBlock({ blockClassName, spinnerClassName }) {
  return (
    <div className={blockClassName || spinnerBlockCls.spinnerBlock}>
      <img
        className={spinnerClassName || spinnerBlockCls.spinner}
        src={threeDotsSpinnerSvgSrc}
        alt="Loading spinner ..."
      />
    </div>
  );
}
