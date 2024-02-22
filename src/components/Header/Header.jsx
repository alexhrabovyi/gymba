import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
} from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import containerCls from '../../scss/_container.module.scss';
import textCls from '../../scss/_text.module.scss';
import linkCls from '../../scss/_link.module.scss';
import headerCls from './Header.module.scss';
import Logo from './images/logo.svg';
import LogoSmall from './images/logoSmall.svg';
import Tag from './images/tag.svg';
import Phone from './images/phone.svg';
import User from './images/user.svg';
import Compare from './images/compare.svg';
import Favorite from './images/favorite.svg';
import Cart from './images/cart.svg';
import HeaderMenu from './HeaderMenu/HeaderMenu.jsx';
import getScrollwidth from '../../utils/getScrollWidth.jsx';
import useOnResize from '../../hooks/useOnResize.jsx';
import Button from '../common/Button/Button.jsx';
import Input from '../common/Input/Input.jsx';
import Search from './images/search.svg';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerBottomCoord, setHeaderBottomCoord] = useState(0);
  const [windowWidth, setWindowWidth] = useState(null);
  const headerRef = useRef(null);

  const getWindowWidth = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  const getHeaderBottom = useCallback(() => {
    const { bottom } = headerRef.current.getBoundingClientRect();
    setHeaderBottomCoord(() => bottom);
  }, []);

  const closeMenuOnResize = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useLayoutEffect(() => {
    getWindowWidth();
  }, [getWindowWidth]);

  useLayoutEffect(() => {
    getHeaderBottom();
  }, [getHeaderBottom]);

  useOnResize(getWindowWidth);
  useOnResize(getHeaderBottom);
  useOnResize(closeMenuOnResize);

  useEffect(() => {
    const header = headerRef.current;

    if (isMenuOpen) {
      const scrollWidth = getScrollwidth();
      document.body.style.paddingRight = `${scrollWidth}px`;
      document.body.style.overflowY = 'hidden';

      const paddingRight = +getComputedStyle(header).paddingRight.match(/\d+/)[0];
      const newPaddingRight = paddingRight + scrollWidth;

      header.style.paddingRight = `${newPaddingRight}px`;
      header.style.width = `${window.innerWidth}px`;
    }

    return () => {
      document.body.style.paddingRight = '';
      document.body.style.overflowY = '';
      header.style.paddingRight = '';
      header.style.width = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className={classNames(containerCls.container, headerCls.header)}
      >
        {windowWidth > 768 && (
        <Link to="/" className={headerCls.logoLink}>
          <Logo className={headerCls.logoLinkImg} />
        </Link>
        )}
        {windowWidth > 1024 && (
        <div className={headerCls.topBlock}>
          {windowWidth > 1360 && (
          <div className={headerCls.locationAndTelBlock}>
            <a href="/" className={headerCls.linkWithIcon} alt="Казань">
              <Tag className={headerCls.icon} />
              <p className={textCls.text}>Казань</p>
            </a>
            <a href="tel:+78552448409" className={headerCls.linkWithIcon} alt="+7 8552 44-84-09">
              <Phone className={headerCls.icon} />
              <p className={textCls.text}>+7 8552 44-84-09</p>
            </a>
          </div>
          )}
          <nav className={headerCls.linkListTopNav}>
            <ul className={classNames(headerCls.linkList, headerCls.linkList_top)}>
              <li>
                <Link to="/" className={linkCls.link} alt="Доставка">Доставка</Link>
              </li>
              <li>
                <Link to="/" className={linkCls.link} alt="Оплата">Оплата</Link>
              </li>
              <li>
                <Link to="/" className={linkCls.link} alt="Прайс-лист">Прайс-лист</Link>
              </li>
              <li>
                <Link to="/" className={linkCls.link} alt="Оптовикам">Оптовикам</Link>
              </li>
              <li>
                <Link to="/" className={linkCls.link} alt="Вакансии">Вакансии</Link>
              </li>
              <li>
                <Link to="/" className={linkCls.link} alt="Новости">Новости</Link>
              </li>
              <li>
                <Link to="/" className={linkCls.link} alt="Контакты">Контакты</Link>
              </li>
            </ul>
          </nav>
        </div>
        )}
        <div className={headerCls.bottomBlock}>
          <button
            type="button"
            className={
              classNames(headerCls.openMenuButton, isMenuOpen && headerCls.openMenuButton_active)
            }
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className={headerCls.burger} viewBox="0 0 100 100">
              <path
                className={classNames(
                  headerCls.burgerLine,
                  isMenuOpen ? headerCls.burgerLine_1_active : headerCls.burgerLine_1,
                )}
                d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
              />
              <path
                className={classNames(
                  headerCls.burgerLine,
                  isMenuOpen ? headerCls.burgerLine_2_active : headerCls.burgerLine_2,
                )}
                d="M 20,50 H 80"
              />
              <path
                className={classNames(
                  headerCls.burgerLine,
                  isMenuOpen ? headerCls.burgerLine_3_active : headerCls.burgerLine_3,
                )}
                d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
              />
            </svg>
            {windowWidth > 1025 ? 'Каталог' : windowWidth > 768 ? 'Меню' : ''}
          </button>
          {windowWidth <= 768 && (
          <Link to="/" className={headerCls.logoLink}>
            <LogoSmall className={headerCls.logoLinkImg} />
          </Link>
          )}
          <div className={headerCls.inputBlock}>
            <Input className={headerCls.input} placeholder="Поиск товаров" />
            {windowWidth > 768
              ? (<Button className={headerCls.submitButton} type="submit">Найти</Button>)
              : (
                <button type="submit" className={headerCls.submitButtonWithIcon}>
                  <Search className={headerCls.submitButtonIcon} />
                </button>
              )}
          </div>
          <nav className={headerCls.linkListBottomNav}>
            <ul className={classNames(headerCls.linkList, headerCls.linkList_bottom)}>
              {windowWidth > 1360 && (
              <>
                <li>
                  <Link to="/" className={headerCls.iconLink}>
                    <User className={headerCls.iconInLink} />
                  </Link>
                </li>
                <li>
                  <Link to="/" className={headerCls.iconLink}>
                    <Compare className={headerCls.iconInLink} />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className={classNames(headerCls.iconLink, headerCls.iconLinkWithCircle)}
                    data-before={5}
                  >
                    <Favorite className={headerCls.iconInLink} />
                  </Link>
                </li>
              </>
              )}
              <li>
                <Link
                  to="/"
                  className={classNames(headerCls.iconLink, headerCls.iconLinkWithCircle)}
                  data-before={2}
                >
                  <Cart className={headerCls.iconInLink} />
                </Link>
              </li>
            </ul>
          </nav>
          {windowWidth > 1024 && (<p className={classNames(headerCls.price, textCls.text)}>221 465 ₽</p>)}
        </div>
      </header>
      <HeaderMenu isMenuOpen={isMenuOpen} topCoord={headerBottomCoord} />
      <div
        className={classNames(
          headerCls.backdrop,
          isMenuOpen && headerCls.backdrop_active,
        )}
        onClick={() => setIsMenuOpen(false)}
      />
    </>
  );
}
