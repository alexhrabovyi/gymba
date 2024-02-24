import classNames from 'classnames';
import { memo, useRef, useLayoutEffect } from 'react';
import categoryMenuCls from './HeaderCategoryMenu.module.scss';
import containerCls from '../../../scss/_container.module.scss';
import textCls from '../../../scss/_text.module.scss';
import Chevron from '../images/chevron.svg';

const HeaderCategoryMenu = memo(({
  isMenuOpen,
  categories,
  categoryBtnOnClick,
  backToMenuOnClick,
}) => {
  const menuRef = useRef(null);

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
        categoryMenuCls.categoryMenu,
        isMenuOpen && categoryMenuCls.categoryMenu_open,
      )}
    >
      <button
        type="button"
        className={categoryMenuCls.backButton}
        onClick={backToMenuOnClick}
      >
        <Chevron className={categoryMenuCls.backButtonChevron} />
        Меню
      </button>
      <p className={classNames(
        categoryMenuCls.title,
        textCls.text,
        textCls.textFw800,
        textCls.text21px,
      )}
      >
        Каталог
      </p>
      <nav
        className={categoryMenuCls.categoryMenuLinkBlock}
        onClick={categoryBtnOnClick}
      >
        <ul className={categoryMenuCls.categoryMenuLinkList}>
          {categories.map((c) => (
            <li key={c.id}>
              <button
                className={categoryMenuCls.categoryButton}
                type="button"
                data-category-id={c.id}
              >
                {c.name}
                <Chevron className={categoryMenuCls.categoryButtonChevron} />
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
});

export default HeaderCategoryMenu;
