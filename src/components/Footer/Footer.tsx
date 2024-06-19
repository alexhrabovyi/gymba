/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import containerCls from '../../scss/_container.module.scss';
import textCls from '../../scss/_text.module.scss';
import footerCls from './Footer.module.scss';
import Button from '../common/Button/Button';
import ValidationForm from '../common/ValidationForm/ValidationForm';
import InputWithErrorMessage from '../common/InputWithErrorMessage/InputWithErrorMessage';
import Logo from './images/logo.svg';

const Footer: React.FC = () => (
  <footer className={classNames(footerCls.footer, containerCls.container)}>
    <div className={footerCls.mainBlock}>
      <Link to="/" className={footerCls.logoLink} aria-label="Головна сторінка Ґимба">
        <Logo className={footerCls.logo} />
      </Link>
      <nav className={footerCls.mainLinkBlock}>
        <ul className={footerCls.mainLinkList}>
          <li>
            <Link to="/delivery" className={footerCls.link}>Доставка</Link>
          </li>
          <li>
            <Link to="/payment" className={footerCls.link}>Оплата</Link>
          </li>
          <li>
            <Link to="/news" className={footerCls.link}>Новини</Link>
          </li>
          <li>
            <Link to="/contacts" className={footerCls.link}>Контакти</Link>
          </li>
        </ul>
      </nav>
      <ValidationForm className={footerCls.subscribeForm}>
        <label htmlFor="input_subscribe" className={classNames(textCls.text, textCls.textWhite)}>
          Підпишіться на розсилку новин, акцій, спецпропозицій
        </label>
        <div className={footerCls.footerWithButtonBlock}>
          <InputWithErrorMessage
            type="email"
            name="subscribeEmail"
            inputBlockClassName={footerCls.inputBLock}
            inputClassName={footerCls.input}
            placeholder="Електронна пошта"
            id="input_subscribe"
            required
          />
          <Button
            className={footerCls.subscribeButton}
            type="submit"
          >
            Підписатися
          </Button>
        </div>
      </ValidationForm>
      <p className={classNames(footerCls.address, textCls.text, textCls.textWhite)}>
        ТОВ “Ґимба“
        <br />
        65069, Одеська область
        <br />
        м. Одеса, вул. Рішельєвська, 21
      </p>
      <div className={footerCls.contactBlock}>
        <a
          href="tel:+380974311101"
          className={classNames(footerCls.link, footerCls.linkBig)}
          aria-label="Номер телефону магазину +38 097 431-11-01"
        >
          +38 097 431-11-01
        </a>
        <a
          href="mailto:gymba@gmail.com"
          className={classNames(footerCls.link, footerCls.linkBig)}
          aria-label="Електронна пошта магазину gymba@gmail.com"
        >
          gymba@gmail.com
        </a>
      </div>
    </div>
    <div className={footerCls.additionalBlock}>
      <p className={classNames(textCls.text, textCls.textWhite, textCls.text13px)}>
        ТОВ “Ґимба“, ЄДРПОУ: 40367123, IBAN UANP3057564166410648351904781
      </p>
      <p className={classNames(footerCls.text, textCls.text, textCls.text13px)}>
        Вказана вартість товарів та умови їх придбання дійсні за станом поточну дату.
        <br />
        <br />
        Продовжуючи роботу з сайтом, ви погоджуєтеся на використання сайтом cookies
        та обробку персональних даних з метою функціонування сайту, проведення ретаргетингу,
        статистичних досліджень, покращення сервісу та надання релевантної рекламної
        інформації на основі ваших уподобань та інтересів.
      </p>
      <nav className={footerCls.additionalLinkBlock}>
        <ul className={footerCls.additionalLinkList}>
          <li>
            <Link
              to="/"
              className={classNames(footerCls.link, footerCls.linkSmall)}
            >
              Персональні дані
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className={classNames(footerCls.link, footerCls.linkSmall)}
            >
              Умови використання сайту
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className={classNames(footerCls.link, footerCls.linkSmall)}
            >
              Умови продажу
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
);

export default Footer;
