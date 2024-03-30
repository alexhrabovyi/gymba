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
              Приобретая товары в ООО &quot;ЭПК&quot;, Вы можете воспользоваться услугой
              доставки товара.
            </p>
            <LinkWithArrow
              to="#mainInformation"
              alt="Листайте дальше"
              className={deliveryCls.LinkWithArrow}
              arrowDown
              isAnchorNavigation
            >
              Листайте дальше
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
                Стоимость и условия доставки по г. Казань
              </h2>
              <ul className={deliveryCls.infoBlockList}>
                <li className={deliveryCls.infoBlockListChild}>
                  <Line
                    className={deliveryCls.lineIcon}
                  />
                  Абсолютно бесплатна при заказе от 10 000 ₽
                </li>
                <li className={deliveryCls.infoBlockListChild}>
                  <Line
                    className={deliveryCls.lineIcon}
                  />
                  Доставка осуществляется на следующий день после согласования заказа.
                </li>
                <li className={deliveryCls.infoBlockListChild}>
                  <Line
                    className={deliveryCls.lineIcon}
                  />
                  Доставка осуществляется максимально близко к месту выгрузки.
                  Разгрузка товара производится силами покупателя.
                </li>
                <li className={deliveryCls.infoBlockListChild}>
                  <Line
                    className={deliveryCls.lineIcon}
                  />
                  Ограничение по весу сухих смесей - не более 200 кг.
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
                Стоимость и условия доставки по Республике Татарстан
              </h2>
              <ul className={deliveryCls.infoBlockList}>
                <li className={deliveryCls.infoBlockListChild}>
                  <Line
                    className={deliveryCls.lineIcon}
                  />
                  Абсолютно бесплатна при заказе от 10 000 ₽
                </li>
                <li className={deliveryCls.infoBlockListChild}>
                  <Line
                    className={deliveryCls.lineIcon}
                  />
                  Доставка осуществляется согласно определенному графику, уточнить который можно
                  у ответственного менеджера или по телефону 8 (843) 233-44-22.
                </li>
                <li className={deliveryCls.infoBlockListChild}>
                  <Line
                    className={deliveryCls.lineIcon}
                  />
                  Доставка осуществляется максимально близко к месту выгрузки.
                  Разгрузка товара производится силами покупателя.
                </li>
                <li className={deliveryCls.infoBlockListChild}>
                  <Line
                    className={deliveryCls.lineIcon}
                  />
                  Ограничение по весу сухих смесей - не более 200 кг.
                </li>
              </ul>
            </div>
          </div>
          <aside className={deliveryCls.questionBannerBlock}>
            <AskQuestionBanner
              title="Есть вопросы по доставке?"
              subtitle="Задайте их нам и мы обязательно поможем вам."
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
