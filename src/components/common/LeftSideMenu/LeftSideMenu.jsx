/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  memo, useRef, useCallback, useEffect,
} from 'react';
import classNames from 'classnames';
import useHideScrollbarOnOpen from '../../../hooks/useHideScrollbarOnOpen.jsx';
import useToggleInteractiveElements from '../../../hooks/useToggleInteractiveElements.jsx';
import useOnResize from '../../../hooks/useOnResize.jsx';
import backdropCls from '../../../scss/_backdrop.module.scss';
import containerCls from '../../../scss/_container.module.scss';
import menuCls from './LeftSideMenu.module.scss';
import CrossIcon from '../../../assets/images/icons/cross.svg';

const LeftSideMenu = memo(({
  children, isMenuOpen, setIsMenuOpen, label, openButton, id,
}) => {
  const menuBackdropRef = useRef(null);
  const menuRef = useRef(null);

  useHideScrollbarOnOpen(isMenuOpen);
  useToggleInteractiveElements(menuRef, isMenuOpen);

  const calcMenuHeight = useCallback(() => {
    const menu = menuRef.current;

    if (!menu) return;

    menu.style.height = '';
    menu.style.overflowY = '';

    const maximumMenuHeight = window.innerHeight;
    const realMenuHeight = menu.scrollHeight;

    menu.style.overflowY = realMenuHeight > maximumMenuHeight ? 'scroll' : 'hidden';
    menu.style.height = `${maximumMenuHeight}px`;
  }, []);

  calcMenuHeight();
  useOnResize(calcMenuHeight);

  const focusOnOpen = useCallback(() => {
    if (isMenuOpen) menuRef.current.focus();
  }, [isMenuOpen]);

  useEffect(focusOnOpen, [focusOnOpen]);

  function backdropOnClick(e) {
    if (e.target === menuBackdropRef.current) {
      setIsMenuOpen(false);
      openButton.focus();
    }
  }

  return (
    <div
      ref={menuBackdropRef}
      className={classNames(
        backdropCls.backdrop,
        isMenuOpen && backdropCls.backdrop_active,
      )}
      onClick={backdropOnClick}
    >
      <div
        id={id || null}
        ref={menuRef}
        className={classNames(
          containerCls.container,
          menuCls.menu,
          isMenuOpen && menuCls.menu_open,
        )}
        aria-hidden={!isMenuOpen}
        role="dialog"
        aria-modal
        aria-label={label}
        tabIndex={isMenuOpen ? '0' : '-1'}
      >
        <button
          type="button"
          className={menuCls.closeButton}
          aria-label={`Закрити ${label}`}
          onClick={() => {
            setIsMenuOpen(false);
            openButton.focus();
          }}
        >
          <CrossIcon className={menuCls.crossIcon} />
        </button>
        {children}
      </div>
    </div>
  );
});

export default LeftSideMenu;
