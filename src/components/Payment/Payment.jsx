import classNames from 'classnames';
import textCls from '../../scss/_text.module.scss';
import containerCls from '../../scss/_container.module.scss';
import paymentCls from './Payment.module.scss';
import LegalIcon from './images/legal.svg';
import IndividualIcon from './images/individual.svg';
import Line from '../../assets/images/icons/oblique.svg';

export default function Payment() {
  return (
    <main className={classNames(
      containerCls.container,
      paymentCls.main,
    )}
    >
      <h1 className={classNames(
        textCls.text,
        textCls.textFw800,
        textCls.text48px,
        textCls.textBlack,
        paymentCls.title,
      )}
      >
        Оплата
      </h1>
      <div className={paymentCls.methodBlocks}>
        <div className={paymentCls.methodBlock}>
          <LegalIcon
            className={paymentCls.methodIcon}
          />
          <h2 className={classNames(
            textCls.text,
            textCls.textFw800,
            textCls.text24px,
            textCls.textBlue,
            paymentCls.subtitle,
          )}
          >
            Для юридических лиц
          </h2>
          <ul className={paymentCls.methodList}>
            <li className={paymentCls.methodListElement}>
              <Line className={paymentCls.lineIcon} />
              <div className={paymentCls.methodListElementTextBlock}>
                <p className={classNames(
                  textCls.text,
                  textCls.textFw800,
                  textCls.text16px,
                  textCls.textBlack,
                  paymentCls.methodListElementTitle,
                )}
                >
                  Оплата наличными
                </p>
                <p className={classNames(
                  textCls.text,
                  textCls.text16px,
                  textCls.textBlack,
                )}
                >
                  В центральном офисе или при доставке службой ЭПК
                </p>
              </div>
            </li>
            <li className={paymentCls.methodListElement}>
              <Line className={paymentCls.lineIcon} />
              <div className={paymentCls.methodListElementTextBlock}>
                <p className={classNames(
                  textCls.text,
                  textCls.textFw800,
                  textCls.text16px,
                  textCls.textBlack,
                  paymentCls.methodListElementTitle,
                )}
                >
                  Безналичная оплата по выставленному счету
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className={paymentCls.methodBlock}>
          <IndividualIcon
            className={paymentCls.methodIcon}
          />
          <h2 className={classNames(
            textCls.text,
            textCls.textFw800,
            textCls.text24px,
            textCls.textBlue,
            paymentCls.subtitle,
          )}
          >
            Для Физических лиц
          </h2>
          <ul className={paymentCls.methodList}>
            <li className={paymentCls.methodListElement}>
              <Line className={paymentCls.lineIcon} />
              <div className={paymentCls.methodListElementTextBlock}>
                <p className={classNames(
                  textCls.text,
                  textCls.textFw800,
                  textCls.text16px,
                  textCls.textBlack,
                  paymentCls.methodListElementTitle,
                )}
                >
                  Оплата наличными
                </p>
                <p className={classNames(
                  textCls.text,
                  textCls.text16px,
                  textCls.textBlack,
                )}
                >
                  В центральном офисе или при доставке службой ЭПК
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
