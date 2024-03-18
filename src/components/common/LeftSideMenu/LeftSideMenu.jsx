/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  memo, useRef, useCallback, useLayoutEffect, useEffect,
} from 'react';
import classNames from 'classnames';
import containerCls from '../../../scss/_container.module.scss';
import menuCls from './LeftSideMenu.module.scss';
import useHideScrollbarOnOpen from '../../../hooks/useHideScrollbarOnOpen.jsx';
import useCloseOnResize from '../../../hooks/useCloseOnResize.jsx';
import useToggleInteractiveElements from '../../../hooks/useToggleInteractiveElements.jsx';
import CrossIcon from '../../../assets/images/icons/cross.svg';

const LeftSideMenu = memo(({
  children, isMenuOpen, setIsMenuOpen, label, openButton,
}) => {
  const menuRef = useRef(null);

  const calcMenuHeight = useCallback(() => {
    const menu = menuRef.current;

    if (isMenuOpen) {
      const maximumMenuHeight = window.innerHeight;
      const realMenuHeight = menu.scrollHeight;

      menu.style.overflowY = realMenuHeight > maximumMenuHeight && 'scroll';
      menu.style.height = `${maximumMenuHeight}px`;
    }

    return () => {
      menu.style.height = '';
      menu.style.overflowY = '';
    };
  }, [isMenuOpen]);

  useLayoutEffect(calcMenuHeight, [calcMenuHeight]);

  useHideScrollbarOnOpen(isMenuOpen);
  useCloseOnResize(setIsMenuOpen);
  useToggleInteractiveElements(menuRef.current, isMenuOpen);

  const focusOnOpen = useCallback(() => {
    if (isMenuOpen) menuRef.current.focus();
  }, [isMenuOpen]);

  useEffect(focusOnOpen, [focusOnOpen]);

  function backdropOnClick() {
    setIsMenuOpen(false);
    openButton.focus();
  }

  return (
    <>
      <div
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
          aria-label={`Закрыть ${label}`}
          onClick={() => {
            setIsMenuOpen(false);
            openButton.focus();
          }}
        >
          <CrossIcon className={menuCls.crossIcon} />
        </button>
        {children}
      </div>
      <div
        className={classNames(
          menuCls.backdrop,
          isMenuOpen && menuCls.backdrop_active,
        )}
        onClick={backdropOnClick}
      />
    </>
  );
});

export default LeftSideMenu;
