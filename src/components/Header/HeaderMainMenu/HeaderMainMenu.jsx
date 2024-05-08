import {
  memo, useEffect, useRef, useState, useCallback, useLayoutEffect, useMemo, Suspense,
} from 'react';
import { Link, NavLink, Await } from 'react-router-dom';
import classNames from 'classnames';
import { useGetWishlistIdsQuery, useGetCompareIdsQuery, useGetRandomProductQuery } from '../../../queryAPI/queryAPI.js';
import useOnResize from '../../../hooks/useOnResize.jsx';
import findAllInteractiveElements from '../../../utils/findAllInteractiveElements.js';
import getScrollWidth from '../../../utils/getScrollWidth.jsx';
import ThreeDotsSpinnerBlock from '../../common/ThreeDotsSpinnerBlock/ThreeDotsSpinnerBlock.jsx';
import Spinner from '../../common/Spinner/Spinner.jsx';
import DynamicImage from '../../common/DynamicImage/DynamicImage.jsx';
import containerCls from '../../../scss/_container.module.scss';
import linkCls from '../../../scss/_link.module.scss';
import textCls from '../../../scss/_text.module.scss';
import headerMenuCls from './HeaderMainMenu.module.scss';
import User from '../images/user.svg';
import Compare from '../../../assets/images/icons/compare.svg';
import Favorite from '../../../assets/images/icons/favorite.svg';
import ChevronRight from '../../../assets/images/icons/chevronRight.svg';
import Tag from '../images/tag.svg';
import Phone from '../images/phone.svg';

const HeaderMainMenu = memo(({
  isMenuOpen, categories, catalogBtnOnClick, openLoginPopupBtnOnClick,
}) => {
  const menuRef = useRef(null);

  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [windowWidth, setWindowWidth] = useState(null);
  const [wishlistAmount, setWishlistAmount] = useState(null);
  const [compareAmount, setCompareAmount] = useState(null);
  const [randomProduct, setRandomProduct] = useState(null);

  const activeCategory = categories?.[activeCategoryId];
  const subcategories = activeCategory?.subcategories.entities;

  // setup functions

  const getWindowWidth = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useLayoutEffect(getWindowWidth, [getWindowWidth]);
  useOnResize(getWindowWidth);

  const setupActiveCategory = useCallback(() => {
    setActiveCategoryId(categories && Object.keys(categories)[0]);
  }, [categories]);

  useEffect(setupActiveCategory);

  function useToggleInteractiveElements() {
    if (menuRef.current) {
      const mainElement = menuRef.current;

      const noMainElements = Array.from(findAllInteractiveElements(document.body))
        .filter((el) => !el.closest('[role="dialog"]'));
      const mainElements = Array.from(findAllInteractiveElements(mainElement));

      if (isMenuOpen) {
        noMainElements.forEach((el) => {
          el.tabIndex = '-1';
          el.ariaHidden = true;
        });

        mainElements.forEach((el) => {
          el.tabIndex = '0';
          el.ariaHidden = false;
        });
      } else {
        noMainElements.forEach((el) => {
          el.tabIndex = '';
          el.ariaHidden = false;
        });

        mainElements.forEach((el) => {
          el.tabIndex = '-1';
          el.ariaHidden = true;
        });
      }

      const openMenuBtn = document.querySelector('[ data-open-menu-btn]');
      openMenuBtn.tabIndex = '0';
      openMenuBtn.ariaHidden = false;
    }
  }

  useToggleInteractiveElements();

  const setupMenuPadding = useCallback(() => {
    const menu = menuRef.current;

    menu.style.paddingRight = '';

    if (isMenuOpen && window.innerWidth > 1024) {
      const menuPadding = +getComputedStyle(menu).paddingRight.match(/\d+/)[0];
      const newMenuPadding = getScrollWidth() + menuPadding;
      menu.style.paddingRight = `${newMenuPadding}px`;
    }
  }, [isMenuOpen]);

  useLayoutEffect(setupMenuPadding, [setupMenuPadding]);
  useOnResize(setupMenuPadding);

  const setupMenuHeight = useCallback(() => {
    const menu = menuRef.current;

    menu.style.overflowY = '';
    menu.style.height = '';

    if (window.innerWidth <= 1024) {
      setTimeout(() => {
        const headerHeight = menu.offsetTop;
        const windowHeight = window.innerHeight;

        const maximumMenuHeight = windowHeight - headerHeight;
        const realMenuHeight = menu.scrollHeight;

        menu.style.overflowY = realMenuHeight > maximumMenuHeight && 'scroll';
        menu.style.height = `${maximumMenuHeight}px`;
      });
    }
  }, []);

  useLayoutEffect(setupMenuHeight, [setupMenuHeight]);
  useOnResize(setupMenuHeight);

  useEffect(() => {
    if (isMenuOpen) menuRef.current.focus();
  }, [isMenuOpen]);

  // fetcher functions

  const { data: fetchedWishlistIds } = useGetWishlistIdsQuery();

  if (fetchedWishlistIds) {
    if (fetchedWishlistIds.length !== wishlistAmount) {
      setWishlistAmount(fetchedWishlistIds.length);
    }
  }

  const { data: fetchedCompareIds } = useGetCompareIdsQuery();

  if (fetchedCompareIds) {
    if (fetchedCompareIds.length !== compareAmount) {
      setCompareAmount(fetchedCompareIds.length);
    }
  }

  const { data: fetchedRandomProduct } = useGetRandomProductQuery();

  if (fetchedRandomProduct) {
    if (fetchedRandomProduct !== randomProduct) {
      setRandomProduct(fetchedRandomProduct);
    }
  }

  // element creating functions

  const categoryLinkList = useMemo(() => (
    <ul className={headerMenuCls.mainLinkList}>
      {categories && Object.values(categories).map((c) => (
        <li key={c.id}>
          <Link
            to={c.id}
            data-category-id={c.id}
            className={classNames(
              headerMenuCls.mainLink,
              activeCategoryId === c.id && headerMenuCls.mainLink_active,
            )}
            alt={c.name}
          >
            {c.name}
          </Link>
        </li>
      ))}
    </ul>
  ), [categories, activeCategoryId]);

  const subcategoryLinkList = useMemo(() => (
    <ul className={headerMenuCls.additionalLinkList}>
      {subcategories && Object.values(subcategories).map((subC) => (
        <li key={subC.id}>
          <Link
            to={`${activeCategory.id}/${subC.id}`}
            className={classNames(linkCls.link, linkCls.link18px)}
            alt={subC.name}
          >
            {subC.name}
          </Link>
        </li>
      ))}
    </ul>
  ), [subcategories, activeCategory]);

  const randomProductElement = useMemo(() => {
    if (!randomProduct) return;

    const { categoryId, subcategoryId, product } = randomProduct;
    const link = `/${categoryId}/${subcategoryId}/${product.id}`;
    const imgSrc = import(`../../../assets/images/productImgs/${product.id}.webp`);

    return (
      <div className={headerMenuCls.productCard}>
        <Link to={link} className={headerMenuCls.imgLink} alt={product.name}>
          <Suspense
            fallback={<Spinner className={headerMenuCls.productCardImgSpinner} />}
          >
            <Await
              resolve={imgSrc}
            >
              <DynamicImage
                className={headerMenuCls.productImg}
                alt={product.name}
              />
            </Await>
          </Suspense>
        </Link>
        <div className={headerMenuCls.nameAndPriceBlock}>
          <Link to={link} className={linkCls.link} alt={product.name}>
            {product.name}
          </Link>
          <div className={headerMenuCls.priceBlock}>
            {product.oldPrice && (
              <p className={headerMenuCls.oldPrice}>
                {product.oldPrice}
                &nbsp;₴/шт
              </p>
            )}
            <p className={headerMenuCls.actualPrice}>
              {product.price}
              <span className={headerMenuCls.actualPriceSpan}>₴/шт</span>
            </p>
          </div>
        </div>
      </div>
    );
  }, [randomProduct]);

  // event functions

  function onPointerMoveHandler(e) {
    const link = e.target.closest('a');
    if (!link) return;

    const id = link.dataset.categoryId;
    setActiveCategoryId(id);
  }

  return (
    <div
      ref={menuRef}
      className={
        classNames(
          containerCls.container,
          headerMenuCls.menu,
          isMenuOpen && headerMenuCls.menu_open,
        )
      }
      aria-hidden={!isMenuOpen}
      role="dialog"
      aria-modal
      aria-label={windowWidth <= 1024 ? 'Меню каталогу та навігації' : 'Меню каталогу'}
      tabIndex={isMenuOpen ? '0' : '-1'}
    >
      {windowWidth > 1024 && (
      <>
        <nav
          className={headerMenuCls.mainLinkBlock}
          onPointerMove={onPointerMoveHandler}
          onFocus={onPointerMoveHandler}
        >
          {categories ? categoryLinkList : (
            <ThreeDotsSpinnerBlock
              blockClassName={headerMenuCls.loadingBlock}
              spinnerClassName={headerMenuCls.loadingSpinner}
            />
          )}
        </nav>
        <nav className={headerMenuCls.additionalLinkBlock}>
          {subcategories ? subcategoryLinkList : (
            <ThreeDotsSpinnerBlock
              blockClassName={headerMenuCls.loadingBlock}
              spinnerClassName={headerMenuCls.loadingSpinner}
            />
          )}
        </nav>
        <article className={headerMenuCls.popularBlock}>
          <p className={classNames(
            textCls.text,
            textCls.textFw800,
            textCls.text18px,
            headerMenuCls.popularTitle,
          )}
          >
            Популярне сьогодні
          </p>
          {randomProduct ? randomProductElement : (
            <ThreeDotsSpinnerBlock
              blockClassName={headerMenuCls.loadingProductBlock}
              spinnerClassName={headerMenuCls.loadingSpinner}
            />
          )}
        </article>
      </>
      )}
      {windowWidth <= 1024 && (
      <>
        <nav className={headerMenuCls.iconLinkBlock}>
          <ul className={headerMenuCls.iconLinkList}>
            <li>
              <button
                className={headerMenuCls.openLoginPopupBtn}
                type="button"
                onClick={openLoginPopupBtnOnClick}
                aria-haspopup="dialog"
                aria-label="Відкрити вікно Профіль користувача"
              >
                <User className={headerMenuCls.iconInLink} />
              </button>
            </li>
            <li>
              <Link
                to="/compare"
                className={classNames(
                  headerMenuCls.iconLink,
                  compareAmount && headerMenuCls.iconLinkWithCircle,
                )}
                data-before={compareAmount}
                aria-label="Порівняти товари"
              >
                <Compare className={headerMenuCls.iconInLink} />
              </Link>
            </li>
            <li>
              <Link
                to="/wishlist"
                className={classNames(
                  headerMenuCls.iconLink,
                  wishlistAmount && headerMenuCls.iconLinkWithCircle,
                )}
                data-before={wishlistAmount}
                aria-label="Лист бажань"
              >
                <Favorite className={headerMenuCls.iconInLink} />
              </Link>
            </li>
          </ul>
        </nav>
        <nav>
          <ul className={headerMenuCls.mainLinkList}>
            <li>
              <button
                type="button"
                className={headerMenuCls.catalogButton}
                onClick={catalogBtnOnClick}
                aria-haspopup="dialog"
                aria-label="Відкрити меню каталогу"
              >
                Каталог
                <ChevronRight className={headerMenuCls.catalogButtonChevron} />
              </button>
            </li>
            <li>
              <NavLink
                to="/delivery"
                className={({ isActive }) => (isActive
                  ? classNames(linkCls.link, linkCls.link18px, linkCls.link_active)
                  : classNames(linkCls.link, linkCls.link18px))}
                alt="Доставка"
              >
                Доставка
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/payment"
                className={({ isActive }) => (isActive
                  ? classNames(linkCls.link, linkCls.link18px, linkCls.link_active)
                  : classNames(linkCls.link, linkCls.link18px))}
                alt="Оплата"
              >
                Оплата
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/news"
                className={({ isActive }) => (isActive
                  ? classNames(linkCls.link, linkCls.link18px, linkCls.link_active)
                  : classNames(linkCls.link, linkCls.link18px))}
                alt="Новини"
              >
                Новини
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contacts"
                className={({ isActive }) => (isActive
                  ? classNames(linkCls.link, linkCls.link18px, linkCls.link_active)
                  : classNames(linkCls.link, linkCls.link18px))}
                alt="Контакти"
              >
                Контакти
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={headerMenuCls.locationAndTelBlock}>
          <a
            href="/"
            className={headerMenuCls.linkWithIcon}
            alt="Наш магазин знаходиться в місті Одеса"
            aria-label="Наш магазин знаходиться в місті Одеса"
          >
            <Tag />
            <p className={textCls.text}>Одеса</p>
          </a>
          <a
            href="tel:+380974311101"
            className={headerMenuCls.linkWithIcon}
            alt="Номер телефону магазину +38 097 431-11-01"
            aria-label="Номер телефону магазину +38 097 431-11-01"
          >
            <Phone />
            <p className={textCls.text}>+38 097 431-11-01</p>
          </a>
        </div>
      </>
      )}
    </div>
  );
});

export default HeaderMainMenu;
