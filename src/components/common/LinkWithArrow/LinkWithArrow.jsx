import { Link } from 'react-router-dom';
import classNames from 'classnames';
import linkWithArrowCls from './LinkWithArrow.module.scss';
import Oblique from '../../../assets/images/icons/oblique.svg';
import ArrowRight from '../../../assets/images/icons/arrow-right.svg';

export default function LinkWithArrow({
  to,
  alt,
  className,
  isWhite,
  children,
}) {
  return (
    <Link
      to={to}
      className={
        classNames(
          linkWithArrowCls.link,
          isWhite && linkWithArrowCls.link_white,
          className,
        )
      }
      alt={alt}
      aria-label={alt}
    >
      <Oblique className={linkWithArrowCls.oblique} />
      {children}
      <ArrowRight
        className={classNames(linkWithArrowCls.arrow, isWhite && linkWithArrowCls.arrow_white)}
      />
    </Link>
  );
}
