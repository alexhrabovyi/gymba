/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  memo, useCallback, useEffect, useRef, useLayoutEffect,
} from 'react';
import classNames from 'classnames';
import useCloseOnResize from '../../../hooks/useCloseOnResize.jsx';
import useHideScrollbarOnOpen from '../../../hooks/useHideScrollbarOnOpen.jsx';
import useToggleInteractiveElements from '../../../hooks/useToggleInteractiveElements.jsx';
import popupCls from './Popup.module.scss';
import Cross from '../../../assets/images/icons/cross.svg';

const Popup = memo(({
  children, isActive = false, setIsActive, label, openButton,
}) => {
  const popupBackdropRef = useRef();
  const popupRef = useRef();

  useCloseOnResize(setIsActive);
  useHideScrollbarOnOpen(isActive);
  useToggleInteractiveElements(popupRef.current, isActive);

  const calcPopupHeight = useCallback(() => {
    const popup = popupRef.current;

    if (isActive) {
      const maximumPopupHeight = window.innerHeight;
      const realPopupHeight = popup.scrollHeight;

      if (realPopupHeight > maximumPopupHeight) {
        popup.style.height = `${maximumPopupHeight}px`;
        popup.style.overflowY = realPopupHeight > maximumPopupHeight && 'scroll';
      }
    }

    return () => {
      popup.style.height = '';
      popup.style.overflowY = '';
    };
  }, [isActive]);

  useLayoutEffect(calcPopupHeight, [calcPopupHeight]);

  const focusOnOPen = useCallback(() => {
    if (isActive) popupRef.current.focus();
  }, [isActive]);

  useEffect(focusOnOPen, [focusOnOPen]);

  function backdropOnClick(e) {
    if (e.target === popupBackdropRef.current) {
      setIsActive(false);
      openButton.focus();
    }
  }

  return (
    <div
      ref={popupBackdropRef}
      className={classNames(
        popupCls.popupBackdrop,
        isActive && popupCls.popupBackdrop_active,
      )}
      onClick={backdropOnClick}
    >
      <aside
        ref={popupRef}
        className={classNames(
          popupCls.popup,
        )}
        aria-hidden={!isActive}
        role="dialog"
        aria-modal
        aria-label={label}
        tabIndex={isActive ? '0' : '-1'}
      >
        <button
          type="button"
          className={popupCls.closeButton}
          aria-label={`Закрыть ${label}`}
          onClick={() => {
            setIsActive(false);
            openButton.focus();
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
