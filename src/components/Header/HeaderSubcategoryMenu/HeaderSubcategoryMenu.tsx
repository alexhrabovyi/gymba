import { Link } from 'react-router-dom';
import classNames from 'classnames';
import {
  memo, useRef, useEffect, useCallback, useMemo,
} from 'react';
import useToggleInteractiveElements from '../../../hooks/useToggleInteractiveElements';
import useOnResize from '../../../hooks/useOnResize';
import ThreeDotsSpinnerBlock from '../../common/ThreeDotsSpinnerBlock/ThreeDotsSpinnerBlock';
import containerCls from '../../../scss/_container.module.scss';
import textCls from '../../../scss/_text.module.scss';
import linkCls from '../../../scss/_link.module.scss';
import subcategoryMenuCls from './HeaderSubcategoryMenu.module.scss';
import ChevronRight from '../../../assets/images/icons/chevronRight.svg';
import ArrowRight from '../../../assets/images/icons/arrow-right.svg';
import { CategoryShort } from '../../../utils/dataAPI';

interface HeaderSubcategoryMenuProps {
  isMenuOpen: boolean,
  category: CategoryShort | null,
  backToCatalogOnClick: () => void,
}

const HeaderSubcategoryMenu = memo<HeaderSubcategoryMenuProps>(({
  isMenuOpen,
  category,
  backToCatalogOnClick,
}) => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  const subcategories = category && Object.values(category.subcategories.entities);

  useToggleInteractiveElements<HTMLDivElement | null>(menuRef, isMenuOpen, [category]);

  const setupMenuHeight = useCallback(() => {
    const menu = menuRef.current;

    if (!menu) return;

    menu.style.overflowY = '';
    menu.style.height = '';

    setTimeout(() => {
      const headerHeight = menu.offsetTop;
      const windowHeight = window.innerHeight;

      const maximumMenuHeight = windowHeight - headerHeight;
      const realMenuHeight = menu.scrollHeight;

      menu.style.overflowY = realMenuHeight > maximumMenuHeight ? 'scroll' : '';
      menu.style.height = `${maximumMenuHeight}px`;
    });
  }, []);

  setupMenuHeight();
  useOnResize(setupMenuHeight);

  const subcategoryLinkList = useMemo(() => (
    subcategories?.map((subC) => (
      <li key={subC!.id}>
        <Link
          to={`${category?.id}/${subC!.id}`}
          className={classNames(linkCls.link, linkCls.link18px)}
        >
          {subC!.name}
        </Link>
      </li>
    ))
  ), [subcategories, category]);

  useEffect(() => {
    if (isMenuOpen) menuRef.current?.focus();
  }, [isMenuOpen]);

  return (
    <div
      ref={menuRef}
      className={classNames(
        containerCls.container,
        subcategoryMenuCls.menu,
        isMenuOpen && subcategoryMenuCls.menu_open,
      )}
      aria-hidden={!isMenuOpen}
      role="dialog"
      aria-modal
      aria-label={`Меню категорії ${category?.name}`}
      tabIndex={isMenuOpen ? 0 : -1}
    >
      <button
        type="button"
        className={subcategoryMenuCls.backButton}
        onClick={backToCatalogOnClick}
        aria-label="Повернутись до меню каталогу"
        aria-haspopup="dialog"
      >
        <ChevronRight className={subcategoryMenuCls.backButtonChevron} />
        Каталог
      </button>
      <p className={classNames(
        subcategoryMenuCls.title,
        textCls.text,
        textCls.textFw800,
        textCls.text21px,
      )}
      >
        {category?.name}
      </p>
      <nav className={subcategoryMenuCls.linkBlock}>
        <ul className={subcategoryMenuCls.linkList}>
          {subcategories ? subcategoryLinkList : (
            <ThreeDotsSpinnerBlock
              blockClassName={subcategoryMenuCls.loadingSpinnerBlock}
              spinnerClassName={subcategoryMenuCls.loadingSpinner}
            />
          )}
          <li>
            <Link to={category?.id || ''} className={subcategoryMenuCls.allCategoriesLink}>
              Усі категорії
              <ArrowRight className={subcategoryMenuCls.allCategoriesArrow} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
});

export default HeaderSubcategoryMenu;
