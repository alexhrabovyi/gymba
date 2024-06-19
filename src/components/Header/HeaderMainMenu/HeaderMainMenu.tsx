import React, {
  memo, useEffect, useRef, useState, useCallback, useLayoutEffect, useMemo, Suspense,
} from 'react';
import { Link, NavLink, Await } from 'react-router-dom';
import classNames from 'classnames';
import { useGetWishlistIdsQuery, useGetCompareIdsQuery, useGetRandomProductQuery } from '../../../queryAPI/queryAPI';
import useOnResize from '../../../hooks/useOnResize';
import findAllInteractiveElements from '../../../utils/findAllInteractiveElements';
import getScrollWidth from '../../../utils/getScrollWidth';
import ThreeDotsSpinnerBlock from '../../common/ThreeDotsSpinnerBlock/ThreeDotsSpinnerBlock';
import Spinner from '../../common/Spinner/Spinner';
import DynamicImage from '../../common/DynamicImage/DynamicImage';
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
import { CategoryShort, ProductWithIds } from '../../../utils/dataAPI';

interface HeaderMainMenuProps {
  isMenuOpen: boolean,
  categories: Record<string, CategoryShort> | null,
  catalogBtnOnClick: React.MouseEventHandler<HTMLButtonElement>,
  openLoginPopupBtnOnClick: React.MouseEventHandler<HTMLButtonElement>,
}

const HeaderMainMenu = memo<HeaderMainMenuProps>(({
  isMenuOpen, categories, catalogBtnOnClick, openLoginPopupBtnOnClick,
}) => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [wishlistAmount, setWishlistAmount] = useState<number | null>(null);
  const [compareAmount, setCompareAmount] = useState<number | null>(null);
  const [randomProduct, setRandomProduct] = useState<ProductWithIds | null>(null);

  const activeCategory = useMemo(
    () => (activeCategoryId ? categories?.[activeCategoryId] : undefined),
    [categories, activeCategoryId],
  );
  const subcategories = useMemo(() => activeCategory?.subcategories.entities, [activeCategory]);

  // setup functions

  const getWindowWidth = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useLayoutEffect(getWindowWidth, [getWindowWidth]);
  useOnResize(getWindowWidth);

  const initialSetupActiveCategory = useCallback(() => {
    if (activeCategoryId === null && categories) {
      setActiveCategoryId(Object.keys(categories)[0]);
    }
  }, [activeCategoryId, categories]);

  useEffect(initialSetupActiveCategory);

  function useToggleInteractiveElements() {
    if (menuRef.current) {
      const mainElement = menuRef.current;

      const noMainElements = Array.from(findAllInteractiveElements(document.body))
        .filter((el) => !el.closest('[role="dialog"]'));
      const mainElements = Array.from(findAllInteractiveElements(mainElement));

      if (isMenuOpen) {
        noMainElements.forEach((el) => {
          el.tabIndex = -1;
          el.ariaHidden = 'true';
        });

        mainElements.forEach((el) => {
          el.tabIndex = 0;
          el.ariaHidden = 'false';
        });
      } else {
        noMainElements.forEach((el) => {
          el.tabIndex = 0;
          el.ariaHidden = 'false';
        });

        mainElements.forEach((el) => {
          el.tabIndex = -1;
          el.ariaHidden = 'true';
        });
      }

      const openMenuBtn = document.querySelector<HTMLButtonElement>('[ data-open-menu-btn]');

      if (openMenuBtn) {
        openMenuBtn.tabIndex = 0;
        openMenuBtn.ariaHidden = 'false';
      }
    }
  }

  useToggleInteractiveElements();

  const setupMenuPadding = useCallback(() => {
    const menu = menuRef.current;

    if (!menu) return;

    menu.style.paddingRight = '';

    if (isMenuOpen && window.innerWidth > 1024) {
      const menuPadding = Number(getComputedStyle(menu).paddingRight.match(/\d+/)?.[0]);
      const newMenuPadding = getScrollWidth() + menuPadding;
      menu.style.paddingRight = `${newMenuPadding}px`;
    }
  }, [isMenuOpen]);

  useLayoutEffect(setupMenuPadding, [setupMenuPadding]);
  useOnResize(setupMenuPadding);

  const setupMenuHeight = useCallback(() => {
    const menu = menuRef.current;

    if (!menu) return;

    menu.style.overflowY = '';
    menu.style.height = '';

    if (window.innerWidth <= 1024) {
      setTimeout(() => {
        const headerHeight = menu.offsetTop;
        const windowHeight = window.innerHeight;

        const maximumMenuHeight = windowHeight - headerHeight;
        const realMenuHeight = menu.scrollHeight;

        menu.style.overflowY = realMenuHeight > maximumMenuHeight ? 'scroll' : '';
        menu.style.height = `${maximumMenuHeight}px`;
      });
    }
  }, []);

  useLayoutEffect(setupMenuHeight, [setupMenuHeight]);
  useOnResize(setupMenuHeight);

  useEffect(() => {
    if (isMenuOpen) menuRef.current?.focus();
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
            to={`${activeCategory?.id}/${subC.id}`}
            className={classNames(linkCls.link, linkCls.link18px)}
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
        <Link to={link} className={headerMenuCls.imgLink}>
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
          <Link to={link} className={linkCls.link}>
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

  function onPointerMoveHandler(e: React.PointerEvent<HTMLElement> | React.FocusEvent) {
    const link = (e.target as HTMLElement).closest('a');
    if (!link) return;

    const id = link.dataset.categoryId;
    setActiveCategoryId(id!);
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
      tabIndex={isMenuOpen ? 0 : -1}
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
              aria-label="Наш магазин знаходиться в місті Одеса"
            >
              <Tag />
              <p className={textCls.text}>Одеса</p>
            </a>
            <a
              href="tel:+380974311101"
              className={headerMenuCls.linkWithIcon}
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
