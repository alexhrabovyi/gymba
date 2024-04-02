import classNames from 'classnames';
import {
  memo, useRef, useEffect, useLayoutEffect, useCallback,
} from 'react';
import useToggleInteractiveElements from '../../../hooks/useToggleInteractiveElements.jsx';
import useOnResize from '../../../hooks/useOnResize.jsx';
import containerCls from '../../../scss/_container.module.scss';
import textCls from '../../../scss/_text.module.scss';
import categoryMenuCls from './HeaderCategoryMenu.module.scss';
import ChevronRight from '../../../assets/images/icons/chevronRight.svg';

const HeaderCategoryMenu = memo(({
  isMenuOpen,
  categories,
  categoryBtnOnClick,
  backToMenuOnClick,
}) => {
  const menuRef = useRef(null);

  useToggleInteractiveElements(menuRef, isMenuOpen);

  const setupMenuHeight = useCallback(() => {
    const menu = menuRef.current;

    menu.style.overflowY = '';
    menu.style.height = '';

    setTimeout(() => {
      const headerHeight = menu.offsetTop;
      const windowHeight = window.innerHeight;

      const maximumMenuHeight = windowHeight - headerHeight;
      const realMenuHeight = menu.scrollHeight;

      menu.style.overflowY = realMenuHeight > maximumMenuHeight && 'scroll';
      menu.style.height = `${maximumMenuHeight}px`;
    });
  }, []);

  useLayoutEffect(setupMenuHeight, [setupMenuHeight]);
  useOnResize(setupMenuHeight);

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
      aria-label="Меню каталогу"
      tabIndex={isMenuOpen ? '0' : '-1'}
    >
      <button
        type="button"
        className={categoryMenuCls.backButton}
        onClick={backToMenuOnClick}
        aria-label="Повернутися до меню навігації"
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
                aria-label={`Відкрити меню категорії ${c.name}`}
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
