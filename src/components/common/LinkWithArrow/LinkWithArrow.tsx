import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import linkWithArrowCls from './LinkWithArrow.module.scss';
import Oblique from '../../../assets/images/icons/oblique.svg';
import ArrowRight from '../../../assets/images/icons/arrow-right.svg';

interface LinkWithArrowProps {
  to: string,
  alt: string,
  className?: string,
  isWhite?: boolean,
  arrowDown?: boolean,
  children: ReactNode,
  isAnchorNavigation?: boolean,
}

const LinkWithArrow: React.FC<LinkWithArrowProps> = ({
  to,
  alt,
  className,
  isWhite,
  arrowDown,
  children,
  isAnchorNavigation = false,
}) => {
  if (isAnchorNavigation) {
    return (
      <a
        href={to}
        className={classNames(
          linkWithArrowCls.link,
          isWhite && linkWithArrowCls.link_white,
          className,
        )}
        aria-label={alt}
      >
        <Oblique className={linkWithArrowCls.oblique} />
        {children}
        <ArrowRight
          className={classNames(
            linkWithArrowCls.arrow,
            isWhite && linkWithArrowCls.arrow_white,
            arrowDown && linkWithArrowCls.arrow_down,
          )}
        />
      </a>
    );
  }
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
      aria-label={alt}
    >
      <Oblique className={linkWithArrowCls.oblique} />
      {children}
      <ArrowRight
        className={classNames(
          linkWithArrowCls.arrow,
          isWhite && linkWithArrowCls.arrow_white,
          arrowDown && linkWithArrowCls.arrow_down,
        )}
      />
    </Link>
  );
};

export default LinkWithArrow;
