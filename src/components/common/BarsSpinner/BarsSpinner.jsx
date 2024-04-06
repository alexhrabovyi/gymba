/* eslint-disable import/no-unresolved */
import classNames from 'classnames';
import spinnerCls from './BarsSpinner.module.scss';
import barsSpinnerSrc from '../../../assets/images/icons/barsSpinner.svg?url';

export default function BarsSpinner({ className }) {
  return (
    <img
      src={barsSpinnerSrc}
      className={classNames(className, spinnerCls.spinner)}
      alt="Loading spinner..."
    />
  );
}
