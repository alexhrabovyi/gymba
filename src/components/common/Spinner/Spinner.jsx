import { memo } from 'react';
import SpinnerSVG from './images/spinner.svg';

const Spinner = memo(({ className }) => (
  <SpinnerSVG className={className} alt="Loading spinner..." />
));

export default Spinner;
