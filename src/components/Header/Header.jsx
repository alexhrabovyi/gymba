/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
} from 'react';
import { Link, useLoaderData } from 'react-router-dom';
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
import HeaderMainMenu from './HeaderMainMenu/HeaderMainMenu.jsx';
import getScrollwidth from '../../utils/getScrollWidth.jsx';
import useOnResize from '../../hooks/useOnResize.jsx';
import Button from '../common/Button/Button.jsx';
import Input from '../common/Input/Input.jsx';
import Search from './images/search.svg';
import HeaderCategoryMenu from './HeaderCategoryMenu/HeaderCategoryMenu.jsx';
import HeaderSubcategoryMenu from './HeaderSubcategoryMenu/HeaderSubcategoryMenu.jsx';
import findAllInteractiveElements from '../../utils/findAllInteractiveElements.js';

export default function Header() {
  const categories = useLoaderData();
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isSubcategoryMenuOpen, setIsSubcategoryMenuOpen] = useState(false);

  const isAnyMenuOpen = isMainMenuOpen || isCategoryMenuOpen || isSubcategoryMenuOpen;

  function menuBtnOnClick() {
    if (!isAnyMenuOpen) {
      setIsMainMenuOpen(true);
    } else {
      setIsMainMenuOpen(false);
      setIsCategoryMenuOpen(false);
      setIsSubcategoryMenuOpen(false);
    }
  }

  const catalogBtnOnClick = useCallback(() => {
    setIsMainMenuOpen(false);
    setIsCategoryMenuOpen(true);
  }, []);

  const backToMenuOnClick = useCallback(() => {
    setIsMainMenuOpen(true);
    setIsCategoryMenuOpen(false);
  }, []);

  const categoryBtnOnClick = useCallback((e) => {
    const btn = e.target.closest('[data-category-id]');
    if (!btn) return;

    const activeCategoryId = btn.dataset.categoryId;
    const category = categories.find((c) => c.id === activeCategoryId);
    setActiveCategory(category);

    setIsCategoryMenuOpen(false);
    setIsSubcategoryMenuOpen(true);
  }, [categories]);

  const backToCatalogOnClick = useCallback(() => {
    setIsCategoryMenuOpen(true);
    setIsSubcategoryMenuOpen(false);
  }, []);

  function backdropOnClick() {
    setIsMainMenuOpen(false);
    setIsCategoryMenuOpen(false);
    setIsSubcategoryMenuOpen(false);
  }

  const closeMenusOnResize = useCallback(() => {
    setIsMainMenuOpen(false);
    setIsCategoryMenuOpen(false);
    setIsSubcategoryMenuOpen(false);
  }, []);

  useOnResize(closeMenusOnResize);

  const [windowWidth, setWindowWidth] = useState(null);

  const getWindowWidth = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useLayoutEffect(() => {
    getWindowWidth();
  }, [getWindowWidth]);

  useOnResize(getWindowWidth);

  const headerWrapperRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const headerWrapper = headerWrapperRef.current;
    const header = headerRef.current;

    if (isAnyMenuOpen) {
      const scrollWidth = getScrollwidth();
      document.body.style.paddingRight = `${scrollWidth}px`;
      document.body.style.overflow = 'hidden';

      const paddingRight = +getComputedStyle(header).paddingRight.match(/\d+/)[0];
      const newPaddingRight = paddingRight + scrollWidth;

      header.style.paddingRight = `${newPaddingRight}px`;
      header.style.width = `${window.innerWidth}px`;

      headerWrapper.style.width = `${window.innerWidth}px`;
    }

    return () => {
      document.body.style.paddingRight = '';
      document.body.style.overflowY = '';
      header.style.paddingRight = '';
      header.style.width = '';
      headerWrapper.style.width = '';
    };
  }, [isAnyMenuOpen]);

  const openMenuButtonRef = useRef(null);

  useEffect(() => {
    const openMenuButton = openMenuButtonRef.current;
    let nonDialogElements;

    if (isAnyMenuOpen) {
      nonDialogElements = Array.from(findAllInteractiveElements(document.body))
        .filter((el) => !el.closest('[role="dialog"]'));

      nonDialogElements.forEach((el) => {
        el.tabIndex = '-1';
        el.ariaHidden = true;
      });

      openMenuButton.tabIndex = '0';
      openMenuButton.ariaHidden = false;
    }

    return () => {
      if (isAnyMenuOpen) {
        nonDialogElements.forEach((el) => {
          el.tabIndex = '';
          el.ariaHidden = '';
        });
      }
    };
  }, [isAnyMenuOpen]);

  return (
    <>
      <div
        ref={headerWrapperRef}
        className={headerCls.headerWrapper}
      >
        <header
          ref={headerRef}
          className={classNames(containerCls.container, headerCls.header)}
        >
          {windowWidth > 768 && (
          <Link to="/" className={headerCls.logoLink} alt="Everest логотип" aria-label="Everest логотип">
            <Logo className={headerCls.logoLinkImg} alt="Everest логотип" />
          </Link>
          )}
          {windowWidth > 1024 && (
          <div className={headerCls.topBlock}>
            {windowWidth > 1360 && (
            <div className={headerCls.locationAndTelBlock}>
              <a
                href="/"
                className={headerCls.linkWithIcon}
                alt="Наш магазин находится в городе Казань"
                aria-label="Наш магазин находится в городе Казань"
              >
                <Tag />
                <p className={textCls.text}>Казань</p>
              </a>
              <a
                href="tel:+78552448409"
                className={headerCls.linkWithIcon}
                alt="Номер телефона магазина +7 8552 44-84-09"
                aria-label="Номер телефона магазина +7 8552 44-84-09"
              >
                <Phone />
                <p className={textCls.text}>+7 8552 44-84-09</p>
              </a>
            </div>
            )}
            <nav className={headerCls.linkListTopNav}>
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
          )}
          <div className={headerCls.bottomBlock}>
            <button
              ref={openMenuButtonRef}
              type="button"
              className={classNames(
                headerCls.openMenuButton,
                isAnyMenuOpen && headerCls.openMenuButton_active,
              )}
              onClick={menuBtnOnClick}
              aria-label={
                windowWidth <= 1024 ? isAnyMenuOpen ? 'Закрыть меню' : 'Открыть меню'
                  : isAnyMenuOpen ? 'Закрыть каталог' : 'Открыть каталог'
              }
              aria-haspopup="dialog"
            >
              <svg className={headerCls.burger} viewBox="0 0 100 100">
                <path
                  className={classNames(
                    headerCls.burgerLine,
                    isAnyMenuOpen ? headerCls.burgerLine_1_active : headerCls.burgerLine_1,
                  )}
                  d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
                />
                <path
                  className={classNames(
                    headerCls.burgerLine,
                    isAnyMenuOpen ? headerCls.burgerLine_2_active : headerCls.burgerLine_2,
                  )}
                  d="M 20,50 H 80"
                />
                <path
                  className={classNames(
                    headerCls.burgerLine,
                    isAnyMenuOpen ? headerCls.burgerLine_3_active : headerCls.burgerLine_3,
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
              <Input
                type="search"
                className={headerCls.input}
                placeholder="Поиск товаров"
                required
              />
              {windowWidth > 768
                ? (<Button className={headerCls.submitButton} type="submit">Найти</Button>)
                : (
                  <button type="submit" className={headerCls.submitButtonWithIcon}>
                    <Search className={headerCls.submitButtonIcon} />
                  </button>
                )}
            </div>
            <nav className={headerCls.linkListBottomNav}>
              <ul className={headerCls.linkList}>
                {windowWidth > 1360 && (
                <>
                  <li>
                    <Link
                      to="/"
                      className={headerCls.iconLink}
                      aria-label="Профиль пользователя"
                    >
                      <User className={headerCls.iconInLink} />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className={headerCls.iconLink}
                      aria-label="Сравнить товары"
                    >
                      <Compare className={headerCls.iconInLink} />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className={classNames(headerCls.iconLink, headerCls.iconLinkWithCircle)}
                      data-before={5}
                      aria-label="Понравившиеся товары"
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
                    aria-label="Корзина"
                  >
                    <Cart className={headerCls.iconInLink} />
                  </Link>
                </li>
              </ul>
            </nav>
            {windowWidth > 1024 && (
            <p className={classNames(headerCls.price, textCls.text)}>221 465 ₽</p>
            )}
          </div>
        </header>
        <HeaderMainMenu
          isMenuOpen={isMainMenuOpen}
          categories={categories}
          catalogBtnOnClick={catalogBtnOnClick}
        />
        {windowWidth <= 1024 && (
        <>
          <HeaderCategoryMenu
            isMenuOpen={isCategoryMenuOpen}
            categories={categories}
            categoryBtnOnClick={categoryBtnOnClick}
            backToMenuOnClick={backToMenuOnClick}
          />
          <HeaderSubcategoryMenu
            isMenuOpen={isSubcategoryMenuOpen}
            category={activeCategory}
            backToCatalogOnClick={backToCatalogOnClick}
          />
        </>
        )}
      </div>
      <div
        className={classNames(
          headerCls.backdrop,
          isAnyMenuOpen && headerCls.backdrop_active,
        )}
        onClick={backdropOnClick}
      />
    </>
  );
}
