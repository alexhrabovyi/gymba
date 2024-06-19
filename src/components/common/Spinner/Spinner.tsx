import { memo } from 'react';
import SpinnerSVG from '../../../assets/images/icons/spinner.svg';

interface SpinnerProps {
  className: string,
}

const Spinner = memo<SpinnerProps>(({ className }) => (
  <SpinnerSVG className={className} />
));

export default Spinner;
