import {
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import containerCls from '../../scss/_container.module.scss';
import textCls from '../../scss/_text.module.scss';
import linkCls from '../../scss/_link.module.scss';
import headerCls from './Header.module.scss';
import Logo from './images/logo.svg';
import Tag from './images/tag.svg';
import Phone from './images/phone.svg';
import Button from '../common/Button/Button.jsx';
import User from './images/user.svg';
import Compare from './images/compare.svg';
import Favorite from './images/favorite.svg';
import Cart from './images/cart.svg';
import HeaderMenu from './HeaderMenu/HeaderMenu.jsx';
import Input from '../common/Input/Input.jsx';
import getScrollwidth from '../../utils/getScrollWidth.jsx';
import useOnResize from '../../hooks/useOnResize.jsx';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerBottomCoord, setHeaderBottomCoord] = useState(0);
  const headerRef = useRef(null);

  const onResizeCallback = useCallback(() => {
    const { bottom } = headerRef.current.getBoundingClientRect();
    setHeaderBottomCoord(() => bottom);
  }, []);

  useOnResize(onResizeCallback);

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
        <Link to="/" className={headerCls.logoLink}>
          <Logo width="100%" height="auto" />
        </Link>
        <div className={headerCls.topBlock}>
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
          <nav>
            <ul className={headerCls.linkList}>
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
            <p className={classNames(textCls.text, textCls.textFw800, textCls.text18px)}>Каталог</p>
          </button>
          <div className={headerCls.inputBlock}>
            <Input className={headerCls.input} placeholder="Поиск товаров" />
            <Button className={headerCls.submitButton} type="submit">Найти</Button>
          </div>
          <nav>
            <ul className={headerCls.linkList}>
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
          <p className={classNames(headerCls.price, textCls.text)}>221 465 ₽</p>
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
