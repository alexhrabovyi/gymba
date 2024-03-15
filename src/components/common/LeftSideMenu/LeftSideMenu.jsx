/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  memo, useRef, useCallback, useLayoutEffect, useEffect,
} from 'react';
import classNames from 'classnames';
import containerCls from '../../../scss/_container.module.scss';
import menuCls from './LeftSideMenu.module.scss';
import useOnResize from '../../../hooks/useOnResize.jsx';
import findAllInteractiveElements from '../../../utils/findAllInteractiveElements.js';
import getScrollWidth from '../../../utils/getScrollWidth.jsx';
import CrossIcon from '../../../assets/images/icons/cross.svg';

const LeftSideMenu = memo(({
  children, isMenuOpen, setIsMenuOpen, label,
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

  const hideScrollbarOnOpen = useCallback(() => {
    if (isMenuOpen) {
      const scrollWidth = getScrollWidth();
      document.body.style.paddingRight = `${scrollWidth}px`;
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.paddingRight = '';
      document.body.style.overflowY = '';
    };
  }, [isMenuOpen]);

  useEffect(hideScrollbarOnOpen, [hideScrollbarOnOpen]);

  const closeMenusOnResize = useCallback(() => {
    setIsMenuOpen(false);
  }, [setIsMenuOpen]);

  useOnResize(closeMenusOnResize);

  const makeMenuElementsDisabled = useCallback(() => {
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
  }, [isMenuOpen]);

  useEffect(makeMenuElementsDisabled, [makeMenuElementsDisabled]);

  const makePageElementsDisabled = useCallback(() => {
    let nonDialogElements;

    if (isMenuOpen) {
      nonDialogElements = Array.from(findAllInteractiveElements(document.body))
        .filter((el) => !el.closest('[role="dialog"]'));

      nonDialogElements.forEach((el) => {
        el.tabIndex = '-1';
        el.ariaHidden = true;
      });
    }

    return () => {
      if (isMenuOpen) {
        nonDialogElements.forEach((el) => {
          el.tabIndex = '';
          el.ariaHidden = '';
        });
      }
    };
  }, [isMenuOpen]);

  useEffect(makePageElementsDisabled, [makePageElementsDisabled]);

  const focusOnOpen = useCallback(() => {
    if (isMenuOpen) menuRef.current.focus();
  }, [isMenuOpen]);

  useEffect(focusOnOpen, [focusOnOpen]);

  function backdropOnClick() {
    setIsMenuOpen(false);
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
          onClick={() => setIsMenuOpen(false)}
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
