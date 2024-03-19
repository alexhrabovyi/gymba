import {
  memo, useEffect, useRef, useState, useCallback, useLayoutEffect,
} from 'react';
import { Link, useFetcher } from 'react-router-dom';
import classNames from 'classnames';
import headerMenuCls from './HeaderMainMenu.module.scss';
import containerCls from '../../../scss/_container.module.scss';
import linkCls from '../../../scss/_link.module.scss';
import textCls from '../../../scss/_text.module.scss';
import productImg from './images/product.png';
import getScrollWidth from '../../../utils/getScrollWidth.jsx';
import useOnResize from '../../../hooks/useOnResize.jsx';
import useToggleInteractiveElements from '../../../hooks/useToggleInteractiveElements.jsx';
import User from '../images/user.svg';
import Compare from '../../../assets/images/icons/compare.svg';
import Favorite from '../../../assets/images/icons/favorite.svg';
import Tag from '../images/tag.svg';
import Phone from '../images/phone.svg';
import ChevronRight from '../../../assets/images/icons/chevronRight.svg';

const HeaderMainMenu = memo(({ isMenuOpen, categories, catalogBtnOnClick }) => {
  const fetcher = useFetcher();

  const menuRef = useRef(null);
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0].id);
  const [windowWidth, setWindowWidth] = useState(null);

  const activeCategory = categories.find((c) => c.id === activeCategoryId);
  const { subcategories } = activeCategory;

  const getWindowWidth = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useLayoutEffect(() => {
    getWindowWidth();
  }, [getWindowWidth]);

  useOnResize(getWindowWidth);

  useEffect(() => {
    const menu = menuRef.current;

    if (isMenuOpen) {
      const menuPadding = +getComputedStyle(menu).paddingRight.match(/\d+/)[0];
      const newMenuPadding = getScrollWidth() + menuPadding;
      menu.style.paddingRight = `${newMenuPadding}px`;
    }

    return () => {
      menu.style.paddingRight = '';
    };
  }, [isMenuOpen]);

  useLayoutEffect(() => {
    const menu = menuRef.current;

    if (window.innerWidth <= 1024) {
      const headerHeight = menu.offsetTop;
      const windowHeight = window.innerHeight;

      const maximumMenuHeight = windowHeight - headerHeight;
      const realMenuHeight = menu.scrollHeight;

      menu.style.overflowY = realMenuHeight > maximumMenuHeight && 'scroll';
      menu.style.height = `${maximumMenuHeight}px`;
    }

    return () => {
      menu.style.height = '';
      menu.style.overflowY = '';
    };
  }, [isMenuOpen]);

  useToggleInteractiveElements(menuRef, isMenuOpen);

  function onPointerMoveHandler(e) {
    const link = e.target.closest('a');
    if (!link) return;

    const id = link.dataset.categoryId;
    setActiveCategoryId(id);
  }

  useEffect(() => {
    if (isMenuOpen) menuRef.current.focus();
  }, [isMenuOpen]);

  useEffect(() => {
    if (fetcher.state === 'idle' && !fetcher.data) {
      fetcher.load('../wishlist');
    }
  }, [fetcher]);

  const [wishlistAmount, setWishlistAmount] = useState(null);

  if (fetcher.data) {
    if (fetcher.data.wishlistAmount !== wishlistAmount) {
      setWishlistAmount(fetcher.data.wishlistAmount);
    }
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
      aria-label={windowWidth <= 1024 ? 'Меню каталога и навигации' : 'Меню каталога'}
      tabIndex={isMenuOpen ? '0' : '-1'}
    >
      {windowWidth > 1024 && (
      <>
        {windowWidth <= 1360 && (
        <nav className={headerMenuCls.iconLinkBlock}>
          <ul className={headerMenuCls.iconLinkList}>
            <li>
              <Link
                to="/"
                className={headerMenuCls.iconLink}
                aria-label="Профиль пользователя"
              >
                <User className={headerMenuCls.iconInLink} />
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className={headerMenuCls.iconLink}
                aria-label="Сравнить товары"
              >
                <Compare className={headerMenuCls.iconInLink} />
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className={classNames(
                  headerMenuCls.iconLink,
                  wishlistAmount && headerMenuCls.iconLinkWithCircle,
                )}
                data-before={wishlistAmount}
                aria-label="Понравившиеся товары"
              >
                <Favorite className={headerMenuCls.iconInLink} />
              </Link>
            </li>
          </ul>
        </nav>
        )}
        <nav
          className={headerMenuCls.mainLinkBlock}
          onPointerMove={onPointerMoveHandler}
          onFocus={onPointerMoveHandler}
        >
          <ul className={headerMenuCls.mainLinkList}>
            {categories.map((c) => (
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
        </nav>
        <nav className={headerMenuCls.additionalLinkBlock}>
          <ul className={headerMenuCls.additionalLinkList}>
            {subcategories.map((subC) => (
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
        </nav>
        <article className={headerMenuCls.popularBlock}>
          <p className={classNames(
            textCls.text,
            textCls.textFw800,
            textCls.text18px,
            headerMenuCls.popularTitle,
          )}
          >
            Популярное сегодня
          </p>
          <div className={headerMenuCls.productCard}>
            <Link to="/" className={headerMenuCls.imgLink} alt="Dulux MASTER 30 BC 2,3 л. краска алк. полуматовая б/цв">
              <img src={productImg} className={headerMenuCls.productImg} alt="Dulux MASTER 30 BC 2,3 л. краска алк. полуматовая б/цв" />
            </Link>
            <div className={headerMenuCls.nameAndPriceBlock}>
              <Link to="/" className={linkCls.link} alt="Dulux MASTER 30 BC 2,3 л. краска алк. полуматовая б/цв">
                Dulux MASTER 30 BC 2,3 л. краска алк. полуматовая б/цв
              </Link>
              <div className={headerMenuCls.priceBlock}>
                <p className={headerMenuCls.oldPrice}>3 512 ₽/шт</p>
                <p className={headerMenuCls.actualPrice}>
                  3 088
                  <span className={headerMenuCls.actualPriceSpan}>₽/шт</span>
                </p>
              </div>
            </div>
          </div>
        </article>
      </>
      )}
      {windowWidth <= 1024 && (
      <>
        <nav className={headerMenuCls.iconLinkBlock}>
          <ul className={headerMenuCls.iconLinkList}>
            <li>
              <Link
                to="/"
                className={headerMenuCls.iconLink}
                aria-label="Профиль пользователя"
              >
                <User className={headerMenuCls.iconInLink} />
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className={headerMenuCls.iconLink}
                aria-label="Сравнить товары"
              >
                <Compare className={headerMenuCls.iconInLink} />
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className={classNames(
                  headerMenuCls.iconLink,
                  wishlistAmount && headerMenuCls.iconLinkWithCircle,
                )}
                data-before={wishlistAmount}
                aria-label="Понравившиеся товары"
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
                aria-label="Открыть меню каталога"
              >
                Каталог
                <ChevronRight className={headerMenuCls.catalogButtonChevron} />
              </button>
            </li>
            <li>
              <Link to="/" className={classNames(linkCls.link, linkCls.link18px)} alt="Доставка">Доставка</Link>
            </li>
            <li>
              <Link to="/" className={classNames(linkCls.link, linkCls.link18px)} alt="Оплата">Оплата</Link>
            </li>
            <li>
              <Link to="/" className={classNames(linkCls.link, linkCls.link18px)} alt="Прайс-лист">Прайс-лист</Link>
            </li>
            <li>
              <Link to="/" className={classNames(linkCls.link, linkCls.link18px)} alt="Оптовикам">Оптовикам</Link>
            </li>
            <li>
              <Link to="/" className={classNames(linkCls.link, linkCls.link18px)} alt="Вакансии">Вакансии</Link>
            </li>
            <li>
              <Link to="/" className={classNames(linkCls.link, linkCls.link18px)} alt="Новости">Новости</Link>
            </li>
            <li>
              <Link to="/" className={classNames(linkCls.link, linkCls.link18px)} alt="Контакты">Контакты</Link>
            </li>
          </ul>
        </nav>
        <div className={headerMenuCls.locationAndTelBlock}>
          <a
            href="/"
            className={headerMenuCls.linkWithIcon}
            alt="Наш магазин находится в городе Казань"
            aria-label="Наш магазин находится в городе Казань"
          >
            <Tag />
            <p className={textCls.text}>Казань</p>
          </a>
          <a
            href="tel:+78552448409"
            className={headerMenuCls.linkWithIcon}
            alt="Номер телефона магазина +7 8552 44-84-09"
            aria-label="Номер телефона магазина +7 8552 44-84-09"
          >
            <Phone />
            <p className={textCls.text}>+7 8552 44-84-09</p>
          </a>
        </div>
      </>
      )}
    </div>
  );
});

export default HeaderMainMenu;
