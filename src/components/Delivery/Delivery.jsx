/* eslint-disable react/jsx-no-bind */
import { useRef, useState } from 'react';
import classNames from 'classnames';
import LinkWithArrow from '../common/LinkWithArrow/LinkWithArrow.jsx';
import AskQuestionBanner from '../common/AskQuestionBanner/AskQuestionBanner.jsx';
import AskQuestionPopup from '../common/AskQuestionPopup/AskQuestionPopup.jsx';
import containerCls from '../../scss/_container.module.scss';
import textCls from '../../scss/_text.module.scss';
import deliveryCls from './Delivery.module.scss';
import Line from '../../assets/images/icons/oblique.svg';

export default function Delivery() {
  const askQuestionBannerBtnRef = useRef(null);

  const [isQuestionPopupActive, setIsQuestionPopupActive] = useState(false);

  function askQuestionBannerBtnOnClick() {
    setIsQuestionPopupActive(true);
  }

  return (
    <>
      <main className={classNames(
        containerCls.container,
        deliveryCls.main,
      )}
      >
        <div className={deliveryCls.mainBanner}>
          <div className={deliveryCls.mainBannerContent}>
            <h1 className={classNames(
              textCls.text,
              textCls.textFw800,
              textCls.text48px,
              textCls.textBlack,
              deliveryCls.mainTitle,
            )}
            >
              Доставка
            </h1>
            <p className={classNames(
              textCls.text,
              textCls.textBlack,
              deliveryCls.mainBannerText,
            )}
            >
              Купуючи товари в ТОВ &quot;Ґимба&quot;, Ви можете скористатися послугою
              доставки товару.
            </p>
            <LinkWithArrow
              to="#/delivery#mainInformation"
              alt="Гортайте далі"
              className={deliveryCls.LinkWithArrow}
              arrowDown
              isAnchorNavigation
            >
              Гортайте далі
            </LinkWithArrow>
          </div>
        </div>
        <div
          id="mainInformation"
          className={deliveryCls.infoAndQuestionBannerBlock}
        >
          <div className={deliveryCls.infoBlocks}>
            <div className={deliveryCls.infoBlock}>
              <h2 className={classNames(
                textCls.text,
                textCls.textFw800,
                textCls.text36px,
                textCls.textBlack,
                deliveryCls.subtitle,
              )}
              >
                Вартість та умови доставки по м. Одесі
              </h2>
              <ul className={deliveryCls.infoBlockList}>
                <li className={deliveryCls.infoBlockListChild}>
                  <Line
                    className={deliveryCls.lineIcon}
                  />
                  Доступний самовивіз в робочі часи
                </li>
                <li className={deliveryCls.infoBlockListChild}>
                  <Line
                    className={deliveryCls.lineIcon}
                  />
                  Абсолютно безкоштовна при замовленні від 5 000 ₴
                </li>
                <li className={deliveryCls.infoBlockListChild}>
                  <Line
                    className={deliveryCls.lineIcon}
                  />
                  Можлива звичайна або кур&apos;єрська доставка за допомогою поштових операторів
                  Meest Express, NovaPoshta
                </li>
                <li className={deliveryCls.infoBlockListChild}>
                  <Line
                    className={deliveryCls.lineIcon}
                  />
                  Також можлива доставка нашою власною кур&apos;єрською службою
                </li>
                <li className={deliveryCls.infoBlockListChild}>
                  <Line
                    className={deliveryCls.lineIcon}
                  />
                  Доставка здійснюється максимально близько до місця розвантаження.
                  Розвантаження товару провадиться силами покупця.
                </li>
                <li className={deliveryCls.infoBlockListChild}>
                  <Line
                    className={deliveryCls.lineIcon}
                  />
                  Обмеження за вагою сухих сумішей – не більше 200 кг.
                </li>
              </ul>
            </div>
            <div className={deliveryCls.infoBlock}>
              <h2 className={classNames(
                textCls.text,
                textCls.textFw800,
                textCls.text36px,
                textCls.textBlack,
                deliveryCls.subtitle,
              )}
              >
                Вартість та умови доставки по Україні
              </h2>
              <ul className={deliveryCls.infoBlockList}>
                <li className={deliveryCls.infoBlockListChild}>
                  <Line
                    className={deliveryCls.lineIcon}
                  />
                  Абсолютно безкоштовна при замовленні від 5 000 ₴
                </li>
                <li className={deliveryCls.infoBlockListChild}>
                  <Line
                    className={deliveryCls.lineIcon}
                  />
                  Можлива звичайна або кур&apos;єрська доставка за допомогою поштових операторів
                  Meest Express, NovaPoshta
                </li>
                <li className={deliveryCls.infoBlockListChild}>
                  <Line
                    className={deliveryCls.lineIcon}
                  />
                  Доставка здійснюється наступного дня після погодження замовлення.
                </li>
              </ul>
            </div>
          </div>
          <aside className={deliveryCls.questionBannerBlock}>
            <AskQuestionBanner
              title="Є питання щодо доставки?"
              subtitle="Запитайте нас і ми обов'язково допоможемо Вам."
              btnOnClick={askQuestionBannerBtnOnClick}
              ref={askQuestionBannerBtnRef}
            />
          </aside>
        </div>
      </main>
      <AskQuestionPopup
        isActive={isQuestionPopupActive}
        setIsActive={setIsQuestionPopupActive}
        openButtonRef={askQuestionBannerBtnRef}
      />
    </>
  );
}
