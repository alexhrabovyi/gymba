import {
  memo, useEffect, useRef, useState, useCallback, useLayoutEffect,
} from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import classNames from 'classnames';
import headerMenuCls from './HeaderMenu.module.scss';
import containerCls from '../../../scss/_container.module.scss';
import linkCls from '../../../scss/_link.module.scss';
import textCls from '../../../scss/_text.module.scss';
import productImg from './images/product.png';
import getScrollWidth from '../../../utils/getScrollWidth.jsx';
import useOnResize from '../../../hooks/useOnResize.jsx';
import User from '../images/user.svg';
import Compare from '../images/compare.svg';
import Favorite from '../images/favorite.svg';
import Tag from '../images/tag.svg';
import Phone from '../images/phone.svg';
import Chevron from './images/chevron.svg';

const HeaderMenu = memo(({ isMenuOpen, topCoord }) => {
  const categories = useLoaderData();
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

  function onPointerMoveHandler(e) {
    const link = e.target.closest('a');
    if (!link) return;

    const id = link.dataset.categoryId;
    setActiveCategoryId(id);
  }

  return (
    <>
      <div
        ref={menuRef}
        className={
        classNames(
          containerCls.container,
          headerMenuCls.menu,
          isMenuOpen && headerMenuCls.menu_open,
        )
      }
        style={{ top: topCoord }}
      >
        {windowWidth > 1024 && (
          <>
            {windowWidth <= 1360 && (
            <nav className={headerMenuCls.iconLinkBlock}>
              <ul className={headerMenuCls.iconLinkList}>
                <li>
                  <Link to="/" className={headerMenuCls.iconLink}>
                    <User className={headerMenuCls.iconInLink} />
                  </Link>
                </li>
                <li>
                  <Link to="/" className={headerMenuCls.iconLink}>
                    <Compare className={headerMenuCls.iconInLink} />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className={classNames(headerMenuCls.iconLink, headerMenuCls.iconLinkWithCircle)}
                    data-before={5}
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
            >
              <ul className={headerMenuCls.mainLinkList}>
                {categories.map((c) => (
                  <li key={c.id}>
                    <Link
                      to={`categories/${c.id}`}
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
                      to={`categories/${activeCategory.id}/${subC.id}`}
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
                  <Link to="/" className={headerMenuCls.iconLink}>
                    <User className={headerMenuCls.iconInLink} />
                  </Link>
                </li>
                <li>
                  <Link to="/" className={headerMenuCls.iconLink}>
                    <Compare className={headerMenuCls.iconInLink} />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className={classNames(headerMenuCls.iconLink, headerMenuCls.iconLinkWithCircle)}
                    data-before={5}
                  >
                    <Favorite className={headerMenuCls.iconInLink} />
                  </Link>
                </li>
              </ul>
            </nav>
            <nav className={headerMenuCls.mainLinkBlock}>
              <ul className={headerMenuCls.mainLinkList}>
                <li>
                  <button type="button" className={headerMenuCls.catalogButton}>
                    Каталог
                    <Chevron className={headerMenuCls.catalogButtonChevron} />
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
              <a href="/" className={headerMenuCls.linkWithIcon} alt="Казань">
                <Tag />
                <p className={textCls.text}>Казань</p>
              </a>
              <a href="tel:+78552448409" className={headerMenuCls.linkWithIcon} alt="+7 8552 44-84-09">
                <Phone />
                <p className={textCls.text}>+7 8552 44-84-09</p>
              </a>
            </div>
          </>
        )}
      </div>
      {windowWidth <= 1024 && (
        <div
          className={classNames(
            containerCls.container,
            headerMenuCls.categoryMenu,
          )}
          style={{ top: topCoord }}
        >
          <nav className={headerMenuCls.categoryMenuLinkBlock}>
            <ul className={headerMenuCls.categoryMenuLinkList}>
              {categories.map((c) => (
                <li key={c.id}>
                  <button
                    className={headerMenuCls.categoryButton}
                    type="button"
                    data-category-id={c.id}
                  >
                    {c.name}
                    <Chevron className={headerMenuCls.categoryButtonChevron} />
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
});

export default HeaderMenu;
