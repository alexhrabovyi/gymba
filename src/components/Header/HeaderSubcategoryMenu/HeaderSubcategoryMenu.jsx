import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { memo, useRef, useLayoutEffect } from 'react';
import containerCls from '../../../scss/_container.module.scss';
import subcategoryMenuCls from './HeaderSubcategoryMenu.module.scss';
import linkCls from '../../../scss/_link.module.scss';
import textCls from '../../../scss/_text.module.scss';
import Chevron from '../images/chevron.svg';

const HeaderSubcategoryMenu = memo(({ isMenuOpen, category, backToCatalogOnClick }) => {
  const menuRef = useRef(null);
  const { subcategories } = category;

  useLayoutEffect(() => {
    const menu = menuRef.current;
    const headerHeight = menu.offsetTop;
    const windowHeight = window.innerHeight;

    const maximumMenuHeight = windowHeight - headerHeight;
    const realMenuHeight = menu.scrollHeight;

    menu.style.overflowY = realMenuHeight > maximumMenuHeight && 'scroll';
    menu.style.height = `${maximumMenuHeight}px`;

    return () => {
      menu.style.height = '';
      menu.style.overflowY = '';
    };
  }, [isMenuOpen]);

  return (
    <div
      ref={menuRef}
      className={classNames(
        containerCls.container,
        subcategoryMenuCls.menu,
        isMenuOpen && subcategoryMenuCls.menu_open,
      )}
    >
      <button
        type="button"
        className={subcategoryMenuCls.backButton}
        onClick={backToCatalogOnClick}
      >
        <Chevron className={subcategoryMenuCls.backButtonChevron} />
        Каталог
      </button>
      <p className={classNames(
        subcategoryMenuCls.title,
        textCls.text,
        textCls.textFw800,
        textCls.text21px,
      )}
      >
        {category.name}
      </p>
      <nav className={subcategoryMenuCls.linkBlock}>
        <ul className={subcategoryMenuCls.linkList}>
          {subcategories.map((subC) => (
            <li key={subC.id}>
              <Link
                to={`categories/${category.id}/${subC.id}`}
                className={classNames(linkCls.link, linkCls.link18px)}
                alt={subC.name}
              >
                {subC.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
});

export default HeaderSubcategoryMenu;
