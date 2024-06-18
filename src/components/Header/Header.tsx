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
} from '../../queryAPI/queryAPI';
import useScrollToTop from '../../hooks/useScrollToTop';
import useHideScrollbarOnOpen from '../../hooks/useHideScrollbarOnOpen';
import useOnResize from '../../hooks/useOnResize';
import getScrollWidth from '../../utils/getScrollWidth';
import Button from '../common/Button/Button';
import HeaderMainMenu from './HeaderMainMenu/HeaderMainMenu';
import HeaderCategoryMenu from './HeaderCategoryMenu/HeaderCategoryMenu';
import HeaderSubcategoryMenu from './HeaderSubcategoryMenu/HeaderSubcategoryMenu';
import LoginRegisterPopup from './LoginRegisterPopup/LoginRegisterPopup';
import SearchResultBlock from './SearchResultsBlock/SearchResultsBlock';
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
import { CategoryShort } from '../../utils/dataAPI';

const Header: React.FC = () => {
  interface SearchBlockStyles {
    width: number,
    left: number,
    headerBottom: number,
  }

  const location = useLocation();
  const [searchParams] = useSearchParams();

  const headerWrapperRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const openMenuButtonRef = useRef<HTMLButtonElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const openLoginPopupBtnRef = useRef<HTMLButtonElement | null>(null);

  const [categories, setCategories] = useState<Record<string, CategoryShort> | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryShort | null>(null);
  const [isMainMenuOpen, setIsMainMenuOpen] = useState<boolean>(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState<boolean>(false);
  const [isSubcategoryMenuOpen, setIsSubcategoryMenuOpen] = useState<boolean>(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState<boolean>(false);
  const [isSearchBlockActive, setIsSearchBlockActive] = useState<boolean>(false);
  const [searchBlockStyles, setSearchBlockStyles] = useState<SearchBlockStyles | null>(null);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [wishlistAmount, setWishlistAmount] = useState<number | null>(null);
  const [compareAmount, setCompareAmount] = useState<number | null>(null);
  const [cartAmount, setCartAmount] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(0);

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
    if (!categories) return;

    setActiveCategory(Object.values(categories)?.[0]);
  }, [categories]);

  useEffect(setupActiveCategory, [setupActiveCategory]);

  const setupHeaderAndHeaderWrapperStyles = useCallback(() => {
    const headerWrapper = headerWrapperRef.current;
    const header = headerRef.current;

    if (!headerWrapper || !header) return;

    header.style.paddingRight = '';
    header.style.width = '';
    headerWrapper.style.width = '';

    if (isAnyMenuOpen) {
      const headerPaddingRight: number = Number(getComputedStyle(header).paddingRight.match(/\d+/)?.[0]);
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

    if (!openMenuButton) return;

    if (isMainMenuOpen || isCategoryMenuOpen || isSubcategoryMenuOpen) {
      openMenuButton.tabIndex = 0;
      openMenuButton.ariaHidden = 'false';
    }
  }, [isMainMenuOpen, isCategoryMenuOpen, isSubcategoryMenuOpen]);

  useEffect(keepOpenMenuBtnEnabled, [keepOpenMenuBtnEnabled]);

  const searchInputValueInitialSetup = useCallback(() => {
    if (location.pathname === '/search') {
      const searchParamValue = searchParams.get('search');

      setSearchValue(searchParamValue || '');

      searchInputRef.current!.value = searchParamValue || '';
    }
  }, [location.pathname, searchParams]);

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

  function headerOnClick(e: React.MouseEvent<HTMLElement>) {
    if (!(e.target as HTMLElement).closest('a')) return;

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

  function searchInputOnChange(e: React.ChangeEvent<HTMLInputElement>) {
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

  const categoryBtnOnClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = (e.target as HTMLButtonElement).closest<HTMLButtonElement>('[data-category-id]');
    if (!btn) return;

    const activeCategoryId = btn.dataset.categoryId;

    if (!activeCategoryId || !categories) return;

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
            <Link to="/" className={headerCls.logoLink} aria-label="Головна сторінка Ґимба">
              <Logo className={headerCls.logoLinkImg} />
            </Link>
          )}
          {windowWidth > 1024 && (
            <div className={headerCls.topBlock}>
              <div className={headerCls.locationAndTelBlock}>
                <a
                  href="/"
                  className={headerCls.linkWithIcon}
                  aria-label="Наш магазин знаходиться в місті Одеса"
                >
                  <Tag />
                  <p className={textCls.text}>Одеса</p>
                </a>
                <a
                  href="tel:+380974311101"
                  className={headerCls.linkWithIcon}
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
                    >
                      Доставка
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/payment"
                      className={({ isActive }) => (isActive
                        ? classNames(linkCls.link, linkCls.link_active) : classNames(linkCls.link))}
                    >
                      Оплата
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/news"
                      className={({ isActive }) => (isActive
                        ? classNames(linkCls.link, linkCls.link_active) : classNames(linkCls.link))}
                    >
                      Новини
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/contacts"
                      className={({ isActive }) => (isActive
                        ? classNames(linkCls.link, linkCls.link_active) : classNames(linkCls.link))}
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
              <Link to="/" className={headerCls.logoLink} aria-label="Головна сторінка Ґимба">
                <LogoSmall className={headerCls.logoLinkImg} />
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
      <LoginRegisterPopup
        isActive={isLoginPopupOpen}
        setIsActive={setIsLoginPopupOpen}
        openButtonRef={openLoginPopupBtnRef}
      />
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
};

export default Header;