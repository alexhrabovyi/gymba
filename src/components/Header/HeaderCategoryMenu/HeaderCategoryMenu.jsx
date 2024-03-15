import classNames from 'classnames';
import {
  memo, useRef, useEffect, useLayoutEffect,
} from 'react';
import categoryMenuCls from './HeaderCategoryMenu.module.scss';
import containerCls from '../../../scss/_container.module.scss';
import textCls from '../../../scss/_text.module.scss';
import ChevronRight from '../../../assets/images/icons/chevronRight.svg';
import findAllInteractiveElements from '../../../utils/findAllInteractiveElements.js';

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

  useEffect(() => {
    let menuElements;

    if (!isMenuOpen) {
      menuElements = findAllInteractiveElements(menuRef.current);
      menuElements.forEach((el) => {
        el.tabIndex = '-1';
        el.ariaHidden = true;
      });
    }

    return () => {
      if (!isMenuOpen) {
        menuElements.forEach((el) => {
          el.tabIndex = '';
          el.ariaHidden = false;
        });
      }
    };
  });

  useEffect(() => {
    if (isMenuOpen) menuRef.current.focus();
  }, [isMenuOpen]);

  return (
    <div
      ref={menuRef}
      className={classNames(
        containerCls.container,
        categoryMenuCls.categoryMenu,
        isMenuOpen && categoryMenuCls.categoryMenu_open,
      )}
      aria-hidden={!isMenuOpen}
      role="dialog"
      aria-modal
      aria-label="Меню каталога"
      tabIndex={isMenuOpen ? '0' : '-1'}
    >
      <button
        type="button"
        className={categoryMenuCls.backButton}
        onClick={backToMenuOnClick}
        aria-label="Вернуться в меню навигации"
        aria-haspopup="dialog"
      >
        <ChevronRight className={categoryMenuCls.backButtonChevron} />
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
                aria-haspopup="dialog"
                aria-label={`Открыть меню категории ${c.name}`}
              >
                {c.name}
                <ChevronRight className={categoryMenuCls.categoryButtonChevron} />
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
});

export default HeaderCategoryMenu;
