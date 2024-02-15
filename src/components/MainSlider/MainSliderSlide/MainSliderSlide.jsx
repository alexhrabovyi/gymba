import classNames from 'classnames';
import slideCls from './MainSliderSlide.module.scss';
import textCls from '../../../scss/_text.module.scss';
import LinkWithArrow from '../../common/LinkWithArrow/LinkWithArrow.jsx';

export default function Slide({
  className, to, alt, linkText, children,
}) {
  return (
    <article className={classNames(slideCls.slide, className)}>
      <p
        className={classNames(
          slideCls.text,
          textCls.text,
          textCls.textWhite,
          textCls.textFw800,
          textCls.text48px,
        )}
      >
        {children}
      </p>
      <LinkWithArrow to={to} alt={alt} isWhite>{linkText}</LinkWithArrow>
    </article>
  );
}
