/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-unresolved */
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import containerCls from '../../scss/_container.module.scss';
import textCls from '../../scss/_text.module.scss';
import footerCls from './Footer.module.scss';
import Input from '../common/Input/Input.jsx';
import Button from '../common/Button/Button.jsx';
import ValidationForm from '../common/ValidationForm/ValidationForm.jsx';
import logo from './images/logo.svg?url';

export default function Footer() {
  return (
    <footer className={classNames(footerCls.footer, containerCls.container)}>
      <div className={footerCls.mainBlock}>
        <Link to="/" className={footerCls.logoLink}>
          <img src={logo} className={footerCls.logo} alt="Everest" />
        </Link>
        <nav className={footerCls.mainLinkBlock}>
          <ul className={footerCls.mainLinkList}>
            <li>
              <Link to="/" className={footerCls.link} alt="Каталог">Каталог</Link>
            </li>
            <li>
              <Link to="/" className={footerCls.link} alt="Доставка">Доставка</Link>
            </li>
            <li>
              <Link to="/" className={footerCls.link} alt="Оплата">Оплата</Link>
            </li>
            <li>
              <Link to="/" className={footerCls.link} alt="Прайс-лист">Прайс-лист</Link>
            </li>
            <li>
              <Link to="/" className={footerCls.link} alt="Оптовикам">Оптовикам</Link>
            </li>
            <li>
              <Link to="/" className={footerCls.link} alt="Вакансии">Вакансии</Link>
            </li>
            <li>
              <Link to="/" className={footerCls.link} alt="Контакты">Контакты</Link>
            </li>
          </ul>
        </nav>
        <ValidationForm className={footerCls.subscribeForm}>
          <label htmlFor="input_subscribe" className={classNames(textCls.text, textCls.textWhite)}>
            Подпишитесь на рассылку новостей, акций, спецпредложений
          </label>
          <div className={footerCls.inputBLock}>
            <Input
              type="email"
              name="subscribeEmail"
              className={footerCls.input}
              placeholder="Электронная почта"
              id="input_subscribe"
              required
            />
            <Button
              className={footerCls.subscribeButton}
              type="submit"
            >
              Подписаться
            </Button>
          </div>
        </ValidationForm>
        <p className={classNames(footerCls.address, textCls.text, textCls.textWhite)}>
          ООО «ЭПК»
          <br />
          420054, Республика Татарстан
          <br />
          г. Казань, ул. Техническая, д. 10, к. 2
        </p>
        <div className={footerCls.contactBlock}>
          <a
            href="tel:+78552448409"
            className={classNames(footerCls.link, footerCls.linkBig)}
            alt="tel:+78552448409"
          >
            +7 8552 44-84-09
          </a>
          <a
            href="mailto:sale@everest-rt.ru"
            className={classNames(footerCls.link, footerCls.linkBig)}
            alt="sale@everest-rt.ru"
          >
            sale@everest-rt.ru
          </a>
        </div>
      </div>
      <div className={footerCls.additionalBlock}>
        <p className={classNames(textCls.text, textCls.textWhite, textCls.text13px)}>
          ПАО Сбербанк, Расч/счет 40702810162000033064, Корр/счет 30101810600000000603
          , БИК 049205603, ОГРН 1121674004143
        </p>
        <p className={classNames(footerCls.text, textCls.text, textCls.text13px)}>
          Указанная стоимость товаров и условия их
          приобретения действительны по состоянию на текущую дату.
          <br />
          <br />
          Продолжая работу с сайтом, вы даете согласие на использование сайтом cookies
          и обработку персональных данных в целях функционирования сайта, проведения ретаргетинга,
          статистических исследований, улучшения сервиса и предоставления релевантной рекламной
          информации на основе ваших предпочтений и интересов.
        </p>
        <nav className={footerCls.additionalLinkBlock}>
          <ul className={footerCls.additionalLinkList}>
            <li>
              <Link
                to="/"
                className={classNames(footerCls.link, footerCls.linkSmall)}
                alt="Персональные данные"
              >
                Персональные данные
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className={classNames(footerCls.link, footerCls.linkSmall)}
                alt="Условия пользовательского соглашения"
              >
                Условия пользовательского соглашения
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className={classNames(footerCls.link, footerCls.linkSmall)}
                alt="Условия продажи"
              >
                Условия продажи
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
