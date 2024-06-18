import { forwardRef } from 'react';
import classNames from 'classnames';
import Button from '../Button/Button';
import textCls from '../../../scss/_text.module.scss';
import bannerCls from './AskQuestionBanner.module.scss';
import InfoIcon from './images/info.svg';

const AskQuestionBannerAndPopup = forwardRef(({ title, subtitle, btnOnClick }, ref) => (
  <div className={bannerCls.banner}>
    <InfoIcon className={bannerCls.infoIcon} />
    <p className={classNames(
      textCls.text,
      textCls.textFw800,
      textCls.text18px,
      textCls.textBlack,
      bannerCls.bannerTitle,
    )}
    >
      {title}
    </p>
    <p className={classNames(
      textCls.text,
      textCls.textBlack,
    )}
    >
      {subtitle}
    </p>
    <Button
      ref={ref}
      className={bannerCls.bannerButton}
      onClick={btnOnClick}
      aria-haspopup="dialog"
      aria-label="Відкрити вікно Задати питання"
    >
      Зв&apos;язатися з нами
    </Button>
  </div>
));

export default AskQuestionBannerAndPopup;
