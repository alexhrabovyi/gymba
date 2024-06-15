import classNames from 'classnames';
import spinnerCls from './BarsSpinner.module.scss';
import barsSpinnerSrc from '../../../assets/images/icons/barsSpinner.svg?url';

interface BarsSpinnerProps {
  className?: string,
}

const BarsSpinner: React.FC<BarsSpinnerProps> = ({ className }) => {
  return (
    <img
      src={barsSpinnerSrc}
      className={classNames(className, spinnerCls.spinner)}
      alt="Loading spinner..."
    />
  );
}

export default BarsSpinner;
