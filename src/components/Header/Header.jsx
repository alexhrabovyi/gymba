/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
} from 'react';
import {
  Link,
  NavLink,
  Form,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import classNames from 'classnames';
import {
  useGetCategoriesQuery,
  useGetWishlistIdsQuery,
  useGetCartIdsQuery,
  useGetCompareIdsQuery,
} from '../../queryAPI/queryAPI.js';
import useScrollToTop from '../../hooks/useScrollToTop.jsx';
import useHideScrollbarOnOpen from '../../hooks/useHideScrollbarOnOpen.jsx';
import useOnResize from '../../hooks/useOnResize.jsx';
import getScrollWidth from '../../utils/getScrollWidth.jsx';
import Button from '../common/Button/Button.jsx';
import HeaderMainMenu from './HeaderMainMenu/HeaderMainMenu.jsx';
import HeaderCategoryMenu from './HeaderCategoryMenu/HeaderCategoryMenu.jsx';
import HeaderSubcategoryMenu from './HeaderSubcategoryMenu/HeaderSubcategoryMenu.jsx';
import LoginRegisterPopup from './LoginRegisterPopup/LoginRegisterPopup.jsx';
import SearchResultBlock from './SearchResultsBlock/SearchResultsBlock.jsx';
import containerCls from '../../scss/_container.module.scss';
import textCls from '../../scss/_text.module.scss';
import linkCls from '../../scss/_link.module.scss';
import backdropCls from '../../scss/_backdrop.module.scss';
import headerCls from './Header.module.scss';
import Logo from './images/logo.svg';
import Tag from './images/tag.svg';
import Phone from './images/phone.svg';
import LogoSmall from './images/logoSmall.svg';
import Search from './images/search.svg';
import User from './images/user.svg';
import Compare from '../../assets/images/icons/compare.svg';
import Favorite from '../../assets/images/icons/favorite.svg';
import Cart from '../../assets/images/icons/cart.svg';

export default function Header() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const headerWrapperRef = useRef(null);
  const headerRef = useRef(null);
  const openMenuButtonRef = useRef(null);
  const searchInputRef = useRef(null);
  const openLoginPopupBtnRef = useRef(null);

  const [categories, setCategories] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isSubcategoryMenuOpen, setIsSubcategoryMenuOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isSearchBlockActive, setIsSearchBlockActive] = useState(false);
  const [searchBlockStyles, setSearchBlockStyles] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  const [wishlistAmount, setWishlistAmount] = useState(null);
  const [compareAmount, setCompareAmount] = useState(null);
  const [cartAmount, setCartAmount] = useState(null);
  const [windowWidth, setWindowWidth] = useState(null);

  const isAnyMenuOpen = isMainMenuOpen || isCategoryMenuOpen || isSubcategoryMenuOpen;

  // setup functions

  useScrollToTop();
  useHideScrollbarOnOpen(isAnyMenuOpen);

  const getWindowWidth = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useLayoutEffect(getWindowWidth, [getWindowWidth]);
  useOnResize(getWindowWidth);

  const setupActiveCategory = useCallback(() => {
    setActiveCategory(categories?.[0]);
  }, [categories]);

  useEffect(setupActiveCategory, [setupActiveCategory]);

  const setupHeaderAndHeaderWrapperStyles = useCallback(() => {
    const headerWrapper = headerWrapperRef.current;
    const header = headerRef.current;

    header.style.paddingRight = '';
    header.style.width = '';
    headerWrapper.style.width = '';

    if (isAnyMenuOpen) {
      const headerPaddingRight = +getComputedStyle(header).paddingRight.match(/\d+/)[0];
      const newHeaderPaddingRight = headerPaddingRight + getScrollWidth();

      setTimeout(() => {
        header.style.paddingRight = `${newHeaderPaddingRight}px`;
        header.style.width = `${window.innerWidth}px`;
        headerWrapper.style.width = `${window.innerWidth}px`;
      });
    }
  }, [isAnyMenuOpen]);

  useLayoutEffect(setupHeaderAndHeaderWrapperStyles, [setupHeaderAndHeaderWrapperStyles]);
  useOnResize(setupHeaderAndHeaderWrapperStyles);

  const closeAdditionalMenusOnResize = useCallback(() => {
    if (window.innerWidth > 1024 && isCategoryMenuOpen) {
      setIsCategoryMenuOpen(false);
    } else if (window.innerWidth > 1024 && isSubcategoryMenuOpen) {
      setIsSubcategoryMenuOpen(false);
    }
  }, [isCategoryMenuOpen, isSubcategoryMenuOpen]);

  useOnResize(closeAdditionalMenusOnResize);

  const keepOpenMenuBtnEnabled = useCallback(() => {
    const openMenuButton = openMenuButtonRef.current;

    if (isMainMenuOpen || isCategoryMenuOpen || isSubcategoryMenuOpen) {
      openMenuButton.tabIndex = '0';
      openMenuButton.ariaHidden = false;
    }
  }, [isMainMenuOpen, isCategoryMenuOpen, isSubcategoryMenuOpen]);

  useEffect(keepOpenMenuBtnEnabled, [keepOpenMenuBtnEnabled]);

  const searchInputValueInitialSetup = useCallback(() => {
    if (location.pathname === '/search') {
      const searchParamValue = searchParams.get('search');

      setSearchValue(searchParamValue);
      searchInputRef.current.value = searchParamValue;
    }
  }, []);

  useEffect(searchInputValueInitialSetup, [searchInputValueInitialSetup]);

  // fetcher functions

  const { data: fetchedCategories } = useGetCategoriesQuery();

  if (fetchedCategories && categories === null) {
    setCategories(fetchedCategories.entities);
  }

  const { data: fetchedWishlistIds } = useGetWishlistIdsQuery();

  if (fetchedWishlistIds) {
    if (fetchedWishlistIds.length !== wishlistAmount) {
      setWishlistAmount(fetchedWishlistIds.length);
    }
  }

  const { data: fetchedCartIds } = useGetCartIdsQuery();

  if (fetchedCartIds) {
    if (fetchedCartIds.length !== cartAmount) {
      setCartAmount(fetchedCartIds.length);
    }
  }

  const { data: fetchedCompareIds } = useGetCompareIdsQuery();

  if (fetchedCompareIds) {
    if (fetchedCompareIds.length !== compareAmount) {
      setCompareAmount(fetchedCompareIds.length);
    }
  }

  // searchBlock functions

  const setupSearchBlockStyles = useCallback(() => {
    const searchInput = searchInputRef.current;
    const header = headerRef.current;

    if (!searchInput || !header) return;

    setTimeout(() => {
      const width = searchInput.offsetWidth;
      const { left } = searchInput.getBoundingClientRect();
      const headerBottom = header.getBoundingClientRect().bottom;

      setSearchBlockStyles({
        width,
        left,
        headerBottom,
      });
    });
  }, []);

  useLayoutEffect(setupSearchBlockStyles, [setupSearchBlockStyles]);

  useOnResize(setupSearchBlockStyles);

  // event functions

  function headerOnClick(e) {
    if (!e.target.closest('a')) return;

    setIsMainMenuOpen(false);
    setIsCategoryMenuOpen(false);
    setIsSubcategoryMenuOpen(false);
  }

  function menuBtnOnClick() {
    if (!isAnyMenuOpen) {
      setIsMainMenuOpen(true);
    } else {
      setIsMainMenuOpen(false);
      setIsCategoryMenuOpen(false);
      setIsSubcategoryMenuOpen(false);
    }
  }

  function searchInputOnFocus() {
    setIsSearchBlockActive(true);
  }

  function searchInputOnChange(e) {
    setSearchValue(e.target.value);
  }

  const openLoginPopupBtnOnClick = useCallback(() => {
    setIsLoginPopupOpen(true);
    setIsSearchBlockActive(false);
  }, []);

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
    const category = categories[activeCategoryId];
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

  return (
    <>
      <div
        ref={headerWrapperRef}
        className={headerCls.headerWrapper}
        onClick={headerOnClick}
      >
        <header
          ref={headerRef}
          className={classNames(containerCls.container, headerCls.header)}
        >
          {windowWidth > 768 && (
          <Link to="/" className={headerCls.logoLink} alt="Головна сторінка Ґимба" aria-label="Головна сторінка Ґимба">
            <Logo className={headerCls.logoLinkImg} alt="Ґимба логотип" />
          </Link>
          )}
          {windowWidth > 1024 && (
          <div className={headerCls.topBlock}>
            <div className={headerCls.locationAndTelBlock}>
              <a
                href="/"
                className={headerCls.linkWithIcon}
                alt="Наш магазин знаходиться в місті Одеса"
                aria-label="Наш магазин знаходиться в місті Одеса"
              >
                <Tag />
                <p className={textCls.text}>Одеса</p>
              </a>
              <a
                href="tel:+380974311101"
                className={headerCls.linkWithIcon}
                alt="Номер телефону магазину +38 097 431-11-01"
                aria-label="Номер телефону магазину +38 097 431-11-01"
              >
                <Phone />
                <p className={textCls.text}>+38 097 431-11-01</p>
              </a>
            </div>
            <nav className={headerCls.topNav}>
              <ul className={headerCls.linkListTopNav}>
                <li>
                  <NavLink
                    to="/delivery"
                    className={({ isActive }) => (isActive
                      ? classNames(linkCls.link, linkCls.link_active) : classNames(linkCls.link))}
                    alt="Доставка"
                  >
                    Доставка
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/payment"
                    className={({ isActive }) => (isActive
                      ? classNames(linkCls.link, linkCls.link_active) : classNames(linkCls.link))}
                    alt="Оплата"
                  >
                    Оплата
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/news"
                    className={({ isActive }) => (isActive
                      ? classNames(linkCls.link, linkCls.link_active) : classNames(linkCls.link))}
                    alt="Новини"
                  >
                    Новини
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contacts"
                    className={({ isActive }) => (isActive
                      ? classNames(linkCls.link, linkCls.link_active) : classNames(linkCls.link))}
                    alt="Контакти"
                  >
                    Контакти
                  </NavLink>
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
                windowWidth <= 1024 ? isAnyMenuOpen ? 'Закрити меню' : 'Відкрити меню'
                  : isAnyMenuOpen ? 'Закрити каталог' : 'Відкрити каталог'
              }
              aria-haspopup="dialog"
              data-open-menu-btn
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
            <Link to="/" className={headerCls.logoLink} alt="Головна сторінка Ґимба" aria-label="Головна сторінка Ґимба">
              <LogoSmall className={headerCls.logoLinkImg} alt="Ґимба логотип" />
            </Link>
            )}
            <Form
              role="search"
              action="/search"
              className={headerCls.inputBlock}
              onSubmit={() => setIsSearchBlockActive(false)}
            >
              <input
                ref={searchInputRef}
                type="search"
                name="search"
                className={headerCls.input}
                placeholder="Пошук товарів"
                required
                onFocus={searchInputOnFocus}
                onChange={searchInputOnChange}
              />
              {windowWidth > 768
                ? (<Button className={headerCls.submitButton} type="submit">Знайти</Button>)
                : (
                  <button
                    type="submit"
                    className={headerCls.submitButtonWithIcon}
                    aria-label="Пошук по сайту"
                  >
                    <Search className={headerCls.submitButtonIcon} />
                  </button>
                )}
            </Form>
            <nav className={headerCls.bottomNav}>
              <ul className={headerCls.linkListBottomNav}>
                {windowWidth > 1024 && (
                <>
                  <li>
                    <button
                      ref={openLoginPopupBtnRef}
                      className={headerCls.openLoginPopupBtn}
                      type="button"
                      onClick={openLoginPopupBtnOnClick}
                      aria-haspopup="dialog"
                      aria-label="Відкрити вікно Профіль користувача"
                    >
                      <User className={headerCls.iconInLink} />
                    </button>
                  </li>
                  <li>
                    <Link
                      to="/compare"
                      className={classNames(
                        headerCls.iconLink,
                        compareAmount && headerCls.iconLinkWithCircle,
                      )}
                      data-before={compareAmount}
                      aria-label="Порівняти товари"
                    >
                      <Compare className={headerCls.iconInLink} />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/wishlist"
                      className={classNames(
                        headerCls.iconLink,
                        wishlistAmount && headerCls.iconLinkWithCircle,
                      )}
                      data-before={wishlistAmount}
                      aria-label="Лист бажань"
                    >
                      <Favorite className={headerCls.iconInLink} />
                    </Link>
                  </li>
                </>
                )}
                <li>
                  <Link
                    to="/cart"
                    className={classNames(
                      headerCls.iconLink,
                      cartAmount && headerCls.iconLinkWithCircle,
                    )}
                    data-before={cartAmount}
                    aria-label="Кошик"
                  >
                    <Cart className={headerCls.iconInLink} />
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <HeaderMainMenu
          isMenuOpen={isMainMenuOpen}
          categories={categories}
          catalogBtnOnClick={catalogBtnOnClick}
          openLoginPopupBtnOnClick={openLoginPopupBtnOnClick}
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
          backdropCls.backdrop,
          headerCls.backdrop,
          isAnyMenuOpen && backdropCls.backdrop_active,
        )}
        onClick={backdropOnClick}
      />
      {/* <LoginRegisterPopup
        isActive={isLoginPopupOpen}
        setIsActive={setIsLoginPopupOpen}
        openButtonRef={openLoginPopupBtnRef}
      /> */}
      <SearchResultBlock
        isActive={isSearchBlockActive}
        setIsActive={setIsSearchBlockActive}
        inputLeft={searchBlockStyles?.left}
        inputWidth={searchBlockStyles?.width}
        headerBottom={searchBlockStyles?.headerBottom}
        searchValue={searchValue}
      />
    </>
  );
}
