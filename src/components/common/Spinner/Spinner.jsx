import { memo } from 'react';
import SpinnerSVG from '../../../assets/images/icons/spinner.svg';

const Spinner = memo(({ className }) => (
  <SpinnerSVG className={className} alt="Loading spinner..." />
));

export default Spinner;
