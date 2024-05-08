/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  memo, useCallback, useEffect, useRef, useLayoutEffect,
} from 'react';
import classNames from 'classnames';
import useHideScrollbarOnOpen from '../../../hooks/useHideScrollbarOnOpen.jsx';
import useToggleInteractiveElements from '../../../hooks/useToggleInteractiveElements.jsx';
import backdropCls from '../../../scss/_backdrop.module.scss';
import popupCls from './Popup.module.scss';
import Cross from '../../../assets/images/icons/cross.svg';

import useOnResize from '../../../hooks/useOnResize.jsx';

const Popup = memo(({
  children, isActive = false, setIsActive, label, openButton,
}) => {
  const popupBackdropRef = useRef(null);
  const popupRef = useRef(null);

  useHideScrollbarOnOpen(isActive);
  useToggleInteractiveElements(popupRef, isActive);

  const calcPopupHeight = useCallback(() => {
    const popup = popupRef.current;

    if (!popup) return;

    popup.style.height = '';
    popup.style.overflowY = '';

    const maximumPopupHeight = window.innerHeight - window.innerHeight * 0.1;
    const realPopupHeight = popup.scrollHeight;

    if (realPopupHeight > maximumPopupHeight) {
      popup.style.height = `${maximumPopupHeight}px`;
      popup.style.overflowY = realPopupHeight > maximumPopupHeight && 'scroll';
    }
  }, []);

  useLayoutEffect(calcPopupHeight);
  useOnResize(calcPopupHeight);

  const focusOnOpen = useCallback(() => {
    if (isActive) popupRef.current.focus();
  }, [isActive]);

  useEffect(focusOnOpen, [focusOnOpen]);

  function backdropOnClick(e) {
    if (e.target === popupBackdropRef.current) {
      setIsActive(false);

      if (openButton) {
        openButton.focus();
      }
    }
  }

  return (
    <div
      ref={popupBackdropRef}
      className={classNames(
        backdropCls.backdrop,
        popupCls.popupBackdrop,
        isActive && backdropCls.backdrop_active,
      )}
      onClick={backdropOnClick}
    >
      <aside
        ref={popupRef}
        className={popupCls.popup}
        aria-hidden={!isActive}
        role="dialog"
        aria-modal
        aria-label={label}
        tabIndex={isActive ? '0' : '-1'}
      >
        <button
          type="button"
          className={popupCls.closeButton}
          aria-label={`Закрити ${label}`}
          onClick={() => {
            setIsActive(false);

            if (openButton) {
              openButton.focus();
            }
          }}
          aria-haspopup="dialog"
        >
          <Cross className={popupCls.crossIcon} />
        </button>
        {children}
      </aside>
    </div>
  );
});

export default Popup;
