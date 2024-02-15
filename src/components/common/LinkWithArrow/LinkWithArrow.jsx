import { Link } from 'react-router-dom';
import classNames from 'classnames';
import linkWithArrowCls from './LinkWithArrow.module.scss';
import Oblique from './images/oblique.svg';
import Arrow from './images/arrow.svg';

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
    >
      <Oblique className={linkWithArrowCls.oblique} />
      {children}
      <Arrow
        className={classNames(linkWithArrowCls.arrow, isWhite && linkWithArrowCls.arrow_white)}
      />
    </Link>
  );
}
