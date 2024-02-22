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
import Cart from '../images/cart.svg';

const HeaderMenu = memo(({ isMenuOpen, topCoord }) => {
  const categories = useLoaderData();
  const menuRef = useRef(null);
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0].id);
  // const [windowWidth, setWindowWidth] = useState(null);

  const activeCategory = categories.find((c) => c.id === activeCategoryId);
  const { subcategories } = activeCategory;

  // const getWindowWidth = useCallback(() => {
  //   setWindowWidth(window.innerWidth);
  // }, []);

  // useLayoutEffect(() => {
  //   getWindowWidth();
  // }, [getWindowWidth]);

  // useOnResize(getWindowWidth);

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

    const id = link.id.match(/^(link-)(.+)/i)[2];
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
      style={{ top: topCoord }}
    >
      <nav className={headerMenuCls.iconLinkBlock}>
        <ul className={headerMenuCls.iconLinkList}>
          <li>
            <Link to="/" className={classNames(headerMenuCls.iconLink, headerMenuCls.iconLink_user)}>
              <User className={headerMenuCls.iconInLink} />
            </Link>
          </li>
          <li>
            <Link to="/" className={classNames(headerMenuCls.iconLink, headerMenuCls.iconLink_compare)}>
              <Compare className={headerMenuCls.iconInLink} />
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className={classNames(
                headerMenuCls.iconLink,
                headerMenuCls.iconLink_favorite,
                headerMenuCls.iconLinkWithCircle,
              )}
              data-before={5}
            >
              <Favorite className={headerMenuCls.iconInLink} />
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className={classNames(
                headerMenuCls.iconLink,
                headerMenuCls.iconLink_cart,
                headerMenuCls.iconLinkWithCircle,
              )}
              data-before={2}
            >
              <Cart className={headerMenuCls.iconInLink} />
            </Link>
          </li>
        </ul>
      </nav>
      <nav
        className={headerMenuCls.mainLinkBlock}
        onPointerMove={onPointerMoveHandler}
      >
        <ul className={headerMenuCls.mainLinkList}>
          {categories.map((c) => (
            <li key={c.id}>
              <Link
                to={`categories/${c.id}`}
                id={`link-${c.id}`}
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
        <p className={
          classNames(textCls.text, textCls.textFw800, textCls.text18px, headerMenuCls.popularTitle)
        }
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
    </div>
  );
});

export default HeaderMenu;
