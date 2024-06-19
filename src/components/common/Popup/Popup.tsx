/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  memo, useCallback, useEffect, useRef, useLayoutEffect,
  ReactNode,
} from 'react';
import classNames from 'classnames';
import useHideScrollbarOnOpen from '../../../hooks/useHideScrollbarOnOpen';
import useToggleInteractiveElements from '../../../hooks/useToggleInteractiveElements';
import useOnResize from '../../../hooks/useOnResize';
import backdropCls from '../../../scss/_backdrop.module.scss';
import popupCls from './Popup.module.scss';
import Cross from '../../../assets/images/icons/cross.svg';

interface PopupProps {
  children: ReactNode[],
  isActive: boolean,
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>,
  label: string,
  openButton?: HTMLButtonElement | null,
}

const Popup = memo<PopupProps>(({
  children, isActive = false, setIsActive, label, openButton,
}) => {
  const popupBackdropRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLElement | null>(null);

  useHideScrollbarOnOpen(isActive);
  useToggleInteractiveElements<HTMLElement | null>(popupRef, isActive);

  const calcPopupHeight = useCallback(() => {
    const popup = popupRef.current;

    if (!popup) return;

    popup.style.height = '';
    popup.style.overflowY = '';

    const maximumPopupHeight = window.innerHeight - window.innerHeight * 0.1;
    const realPopupHeight = popup.scrollHeight;

    if (realPopupHeight > maximumPopupHeight) {
      popup.style.height = `${maximumPopupHeight}px`;
      popup.style.overflowY = realPopupHeight > maximumPopupHeight ? 'scroll' : '';
    }
  }, []);

  useLayoutEffect(calcPopupHeight);
  useOnResize(calcPopupHeight);

  const focusOnOpen = useCallback(() => {
    if (isActive) popupRef.current?.focus();
  }, [isActive]);

  useEffect(focusOnOpen, [focusOnOpen]);

  function backdropOnClick(e: React.MouseEvent<HTMLElement>) {
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
        tabIndex={isActive ? 0 : -1}
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
